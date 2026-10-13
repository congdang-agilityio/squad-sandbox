// @vitest-environment node
import { hashPassword, verifyPassword } from './password-hash';

describe('hashPassword / verifyPassword', () => {
  const password = 'Abcdef1!';

  it('returns an argon2id hash that does not contain the password', async () => {
    const hash = await hashPassword(password);
    expect(hash.startsWith('$argon2id$')).toBe(true);
    expect(hash).not.toContain(password);
  });

  it('produces a different hash each time (random salt)', async () => {
    expect(await hashPassword(password)).not.toBe(await hashPassword(password));
  });

  it('verifies the right password', async () => {
    const hash = await hashPassword(password);
    await expect(verifyPassword(hash, password)).resolves.toBe(true);
  });

  it('rejects a wrong password', async () => {
    const hash = await hashPassword(password);
    await expect(verifyPassword(hash, 'Abcdef1?')).resolves.toBe(false);
  });

  it('refuses to hash an empty password', async () => {
    await expect(hashPassword('')).rejects.toThrow(TypeError);
  });

  it('returns false for a malformed hash instead of throwing', async () => {
    await expect(verifyPassword('not-a-hash', password)).resolves.toBe(false);
  });
});
