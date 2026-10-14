// @vitest-environment node
import { checkPasswordRule } from './password-rule';

// A-20: every printable ASCII character that is not a letter, a digit or a space.
const A20_SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

describe('checkPasswordRule', () => {
  it('accepts a password meeting every part of the rule', () => {
    expect(checkPasswordRule('Abcdef1!')).toEqual({ ok: true });
  });

  it('refuses a password shorter than 8 characters with tooShort', () => {
    expect(checkPasswordRule('Abcde1!')).toEqual({ ok: false, failures: ['tooShort'] });
  });

  it.each([
    ['ABCDEF1!', 'noLowercase'],
    ['abcdef1!', 'noUppercase'],
    ['Abcdefg!', 'noDigit'],
    ['Abcdefg1', 'noSymbol'],
  ])('refuses %s with %s', (password, failure) => {
    expect(checkPasswordRule(password)).toEqual({ ok: false, failures: [failure] });
  });

  it('refuses a password containing a space with invalidCharacter', () => {
    expect(checkPasswordRule('Abcdef1! x')).toEqual({
      ok: false,
      failures: ['invalidCharacter'],
    });
  });

  it.each(['Ăbcdef1!', 'Abcdèf1!', 'Abcdđf1!', 'aBCDƯF1!', 'Abcdef1!ộ'])(
    'refuses %s (letter with Vietnamese mark) with invalidCharacter',
    (password) => {
      const result = checkPasswordRule(password);
      expect(result.ok).toBe(false);
      expect(result.ok === false && result.failures).toContain('invalidCharacter');
    },
  );

  it('refuses other non-ASCII and control characters', () => {
    expect(checkPasswordRule('Abcdef1!\t').ok).toBe(false);
    expect(checkPasswordRule('Abcdef1!€').ok).toBe(false);
  });

  it('defines exactly 32 A-20 symbols in the test fixture', () => {
    expect(A20_SYMBOLS).toHaveLength(32);
  });

  it.each(A20_SYMBOLS.split(''))('accepts %s as the required symbol', (symbol) => {
    expect(checkPasswordRule(`Abcdef1${symbol}`)).toEqual({ ok: true });
  });

  it('reports every failure at once', () => {
    expect(checkPasswordRule('a b')).toEqual({
      ok: false,
      failures: ['tooShort', 'noUppercase', 'noDigit', 'noSymbol', 'invalidCharacter'],
    });
  });

  it('refuses an empty or non-string input', () => {
    expect(checkPasswordRule('').ok).toBe(false);
    expect(checkPasswordRule(undefined as unknown as string).ok).toBe(false);
  });

  it('does not impose a maximum length', () => {
    expect(checkPasswordRule(`Abcdef1!${'a'.repeat(200)}`)).toEqual({ ok: true });
  });

  describe('acceptance criteria examples of #62', () => {
    it.each([
      ['Ab1!xyz', 'tooShort'],
      ['ABCDEFG1!', 'noLowercase'],
      ['abcdefg1!', 'noUppercase'],
      ['Abcdefgh!', 'noDigit'],
      ['Abcdefg12', 'noSymbol'],
      ['Mậtkhẩu1!', 'invalidCharacter'],
      ['Abc 123!x', 'invalidCharacter'],
    ])('refuses %s with only %s', (password, failure) => {
      expect(checkPasswordRule(password)).toEqual({ ok: false, failures: [failure] });
    });

    it.each(['Abcdef1!', 'Todo~2027x'])('accepts %s', (password) => {
      expect(checkPasswordRule(password)).toEqual({ ok: true });
    });
  });
});
