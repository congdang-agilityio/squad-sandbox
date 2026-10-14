// Server-side helper: do not import from client components.
import { verifyPassword } from '@/lib/auth/password-hash';
import { db } from '@/lib/db';

// A real argon2id hash (same parameters as hashPassword) of a password no account uses. An
// unknown email is still checked against it, so the response time does not reveal which
// emails have an account.
const DUMMY_PASSWORD_HASH =
  '$argon2id$v=19$m=19456,t=2,p=1$cHD9j+JSS2K+mEyNwltJfQ$QHrLzX+0mAkV9cls6bzmYl3Cr++EhP9z6PSbf88TeuI';

/**
 * Checks an email and password (S-03). Returns the user id, or null for an unknown email and a
 * wrong password alike. The password rule (FR-27) is not checked at login.
 */
export async function authenticate(email: string, password: string): Promise<string | null> {
  if (typeof email !== 'string' || typeof password !== 'string') return null;
  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail === '' || password === '') return null;

  const user = await db.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, passwordHash: true },
  });
  if (!user) {
    await verifyPassword(DUMMY_PASSWORD_HASH, password);
    return null;
  }
  return (await verifyPassword(user.passwordHash, password)) ? user.id : null;
}
