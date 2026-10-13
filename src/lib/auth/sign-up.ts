// Server-side helper: do not import from client components.
import { Prisma } from '@prisma/client';
import { hashPassword } from '@/lib/auth/password-hash';
import { checkPasswordRule, type PasswordRuleFailure } from '@/lib/auth/password-rule';
import { db } from '@/lib/db';

export type SignUpInput = {
  email: string;
  password: string;
  displayName: string;
  agreedToPrivacyNotice: boolean;
};

export type SignUpResult =
  | { ok: true; userId: string }
  | { ok: false; error: 'INVALID_INPUT' | 'AGREEMENT_REQUIRED' | 'EMAIL_TAKEN' }
  | { ok: false; error: 'PASSWORD_RULE'; failures: PasswordRuleFailure[] };

// A simple `local@domain` shape: no spaces, exactly one @, something on both sides.
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+$/;

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
}

/**
 * Creates a user account (S-02). Checks run in this order: input, privacy notice agreement
 * (BR-19), password rule (FR-27), email already registered. No user is created on any error.
 */
export async function signUp(input: SignUpInput): Promise<SignUpResult> {
  const { email, password, displayName, agreedToPrivacyNotice } = input ?? {};
  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof displayName !== 'string'
  ) {
    return { ok: false, error: 'INVALID_INPUT' };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const trimmedName = displayName.trim();
  if (!EMAIL_SHAPE.test(normalizedEmail) || trimmedName === '') {
    return { ok: false, error: 'INVALID_INPUT' };
  }

  if (agreedToPrivacyNotice !== true) return { ok: false, error: 'AGREEMENT_REQUIRED' };

  const rule = checkPasswordRule(password);
  if (!rule.ok) return { ok: false, error: 'PASSWORD_RULE', failures: rule.failures };

  const existing = await db.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true },
  });
  if (existing) return { ok: false, error: 'EMAIL_TAKEN' };

  try {
    const user = await db.user.create({
      data: {
        email: normalizedEmail,
        passwordHash: await hashPassword(password),
        displayName: trimmedName,
        privacyNoticeAgreedAt: new Date(),
      },
      select: { id: true },
    });
    return { ok: true, userId: user.id };
  } catch (error) {
    // Two sign-ups with the same email at the same time: the unique index decides.
    if (isUniqueViolation(error)) return { ok: false, error: 'EMAIL_TAKEN' };
    throw error;
  }
}
