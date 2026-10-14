// Server-side helper: do not import from client components.
import { createHash, randomBytes } from 'node:crypto';
import { db } from '@/lib/db';

export const SESSION_COOKIE_NAME = 'session';

// 400 days is the longest cookie lifetime browsers accept. There is no server-side expiry:
// a login lasts until logout or account deletion (A-19).
const SESSION_MAX_AGE_SECONDS = 400 * 24 * 60 * 60;
const LAST_USED_UPDATE_MS = 60 * 60 * 1000;
const USER_AGENT_MAX_LENGTH = 512;
// 32 random bytes in base64url without padding are exactly 43 characters.
const TOKEN_SHAPE = /^[A-Za-z0-9_-]{43}$/;

export type SessionUser = { id: string; email: string; displayName: string };

/**
 * SESSION_COOKIE_SECURE="true" or "false" decides the Secure flag (e2e over http sets "false");
 * any other value, or none, falls back to Secure in production only.
 */
export function isSessionCookieSecure(): boolean {
  const setting = process.env.SESSION_COOKIE_SECURE;
  if (setting === 'true' || setting === 'false') return setting === 'true';
  return process.env.NODE_ENV === 'production';
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: isSessionCookieSecure(),
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/** Creates a login on one device and returns the raw token; only its hash is stored. */
export async function createSession(userId: string, userAgent: string | null): Promise<string> {
  const token = randomBytes(32).toString('base64url');
  await db.session.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      userAgent: typeof userAgent === 'string' ? userAgent.slice(0, USER_AGENT_MAX_LENGTH) : null,
    },
  });
  return token;
}

/** Returns the user of a session token, or null for a malformed or unknown token. */
export async function getSessionUser(token: string): Promise<SessionUser | null> {
  if (typeof token !== 'string' || !TOKEN_SHAPE.test(token)) return null;

  const session = await db.session.findUnique({
    where: { tokenHash: hashToken(token) },
    select: {
      id: true,
      lastUsedAt: true,
      user: { select: { id: true, email: true, displayName: true } },
    },
  });
  if (!session) return null;

  if (Date.now() - session.lastUsedAt.getTime() >= LAST_USED_UPDATE_MS) {
    await db.session.updateMany({ where: { id: session.id }, data: { lastUsedAt: new Date() } });
  }
  return session.user;
}

/**
 * Ends the login on the one device the token belongs to. Other sessions and the user are kept.
 * A malformed, unknown or already-ended token does nothing.
 */
export async function deleteSession(token: string): Promise<void> {
  if (typeof token !== 'string' || !TOKEN_SHAPE.test(token)) return;

  await db.session.deleteMany({ where: { tokenHash: hashToken(token) } });
}
