// Server-side helper: do not import from client components.

export type PasswordRuleFailure =
  'tooShort' | 'noLowercase' | 'noUppercase' | 'noDigit' | 'noSymbol' | 'invalidCharacter';

export type PasswordRuleResult = { ok: true } | { ok: false; failures: PasswordRuleFailure[] };

export const PASSWORD_MIN_LENGTH = 8;

// A-20 keyboard symbols: every printable ASCII character that is not a letter, digit or space.
const SYMBOL = /[!-/:-@[-`{-~]/;
const ALLOWED = /^[a-zA-Z0-9!-/:-@[-`{-~]*$/;

/** Checks a password against the password rule (FR-27, BR-24, A-20). */
export function checkPasswordRule(password: string): PasswordRuleResult {
  const value = typeof password === 'string' ? password : '';
  const failures: PasswordRuleFailure[] = [];
  if (value.length < PASSWORD_MIN_LENGTH) failures.push('tooShort');
  if (!/[a-z]/.test(value)) failures.push('noLowercase');
  if (!/[A-Z]/.test(value)) failures.push('noUppercase');
  if (!/[0-9]/.test(value)) failures.push('noDigit');
  if (!SYMBOL.test(value)) failures.push('noSymbol');
  if (!ALLOWED.test(value)) failures.push('invalidCharacter');
  return failures.length === 0 ? { ok: true } : { ok: false, failures };
}
