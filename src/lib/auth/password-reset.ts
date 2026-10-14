// Server-side helper: do not import from client components.
import { createHash, randomBytes } from 'node:crypto';
import { hashPassword } from '@/lib/auth/password-hash';
import { passwordResetEmail, type PasswordResetEmailLocale } from '@/lib/auth/password-reset-email';
import { checkPasswordRule, type PasswordRuleFailure } from '@/lib/auth/password-rule';
import { db } from '@/lib/db';
import { sendMail } from '@/lib/email/mailer';

export type RequestPasswordResetOptions = { locale: PasswordResetEmailLocale; baseUrl: string };

export type ResetPasswordResult =
  | { ok: true }
  | { ok: false; error: 'INVALID_TOKEN' }
  | { ok: false; error: 'PASSWORD_RULE'; failures: PasswordRuleFailure[] };

// Technical security choice: a reset link works once and for 1 hour.
const TOKEN_LIFETIME_MS = 60 * 60 * 1000;
// 32 random bytes in base64url without padding are exactly 43 characters.
const TOKEN_SHAPE = /^[A-Za-z0-9_-]{43}$/;
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+$/;
const EMAIL_MAX_LENGTH = 254;

class TokenAlreadyUsedError extends Error {}

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/** Validates the server-provided base URL and returns it without trailing slashes. */
function normalizeBaseUrl(baseUrl: string): string {
  let url: URL | null = null;
  try {
    url = typeof baseUrl === 'string' ? new URL(baseUrl) : null;
  } catch {
    url = null;
  }
  if (!url || (url.protocol !== 'https:' && url.protocol !== 'http:')) {
    throw new Error('requestPasswordReset: baseUrl must be an absolute http(s) URL');
  }
  return baseUrl.replace(/\/+$/, '');
}

/**
 * Starts a password reset (S-04 AC1): for an existing account, stores a single-use token (only
 * its SHA-256 hash) valid for 1 hour and emails the reset link in `locale`. An unknown or
 * malformed email sends nothing and returns the same result, so accounts cannot be enumerated.
 * Send errors reach the caller.
 */
export async function requestPasswordReset(
  email: string,
  { locale, baseUrl }: RequestPasswordResetOptions,
): Promise<void> {
  const base = normalizeBaseUrl(baseUrl);
  if (typeof email !== 'string') return;
  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail.length > EMAIL_MAX_LENGTH || !EMAIL_SHAPE.test(normalizedEmail)) return;

  const user = await db.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, email: true },
  });
  if (!user) return;

  const token = randomBytes(32).toString('base64url');
  await db.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + TOKEN_LIFETIME_MS),
    },
  });

  const link = `${base}/reset-password?token=${token}`;
  await sendMail({ to: user.email, ...passwordResetEmail(locale, link) });
}

/**
 * Sets a new password with a reset token (S-04 AC2, AC3). The token must be well-formed, known,
 * unexpired and unused; the password must meet the password rule (FR-27, A-18), otherwise nothing
 * is saved and the token stays usable. The new hash and the used token are saved in one
 * transaction. Existing sessions are kept (A-21).
 */
export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<ResetPasswordResult> {
  if (typeof token !== 'string' || !TOKEN_SHAPE.test(token)) {
    return { ok: false, error: 'INVALID_TOKEN' };
  }

  const tokenHash = hashToken(token);
  const record = await db.passwordResetToken.findUnique({
    where: { tokenHash },
    select: { id: true, userId: true, expiresAt: true, usedAt: true },
  });
  if (!record || record.usedAt !== null || record.expiresAt.getTime() <= Date.now()) {
    return { ok: false, error: 'INVALID_TOKEN' };
  }

  const rule = checkPasswordRule(newPassword);
  if (!rule.ok) return { ok: false, error: 'PASSWORD_RULE', failures: rule.failures };

  const passwordHash = await hashPassword(newPassword);
  try {
    await db.$transaction(async (tx) => {
      // Claim the token atomically, so two concurrent resets cannot both use it.
      const now = new Date();
      const claimed = await tx.passwordResetToken.updateMany({
        where: { id: record.id, usedAt: null, expiresAt: { gt: now } },
        data: { usedAt: now },
      });
      if (claimed.count !== 1) throw new TokenAlreadyUsedError();
      await tx.user.update({ where: { id: record.userId }, data: { passwordHash } });
    });
  } catch (error) {
    if (error instanceof TokenAlreadyUsedError) return { ok: false, error: 'INVALID_TOKEN' };
    throw error;
  }
  return { ok: true };
}
