// Server-side helper: do not import from client components.
import { hash, verify, type Algorithm } from '@node-rs/argon2';

// `Algorithm` is an ambient const enum (not usable at runtime with isolatedModules); 2 = Argon2id.
const ARGON2ID = 2 as Algorithm;

/** Hashes a password with argon2id (random salt). The result never contains the password. */
export async function hashPassword(password: string): Promise<string> {
  if (typeof password !== 'string' || password.length === 0) {
    throw new TypeError('password must be a non-empty string');
  }
  return hash(password, { algorithm: ARGON2ID });
}

/** Returns true only when `password` matches the argon2 `passwordHash`. */
export async function verifyPassword(passwordHash: string, password: string): Promise<boolean> {
  if (typeof passwordHash !== 'string' || typeof password !== 'string') return false;
  try {
    return await verify(passwordHash, password);
  } catch {
    return false;
  }
}
