import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../messages/en.json';
import viMessages from '../../messages/vi.json';
import type { PasswordRuleFailure } from '@/lib/auth/password-rule';
import { PasswordRuleFeedback, toPasswordRuleFailures } from './password-rule-feedback';

function renderFeedback(failures?: readonly PasswordRuleFailure[], locale: 'en' | 'vi' = 'en') {
  return render(
    <NextIntlClientProvider locale={locale} messages={locale === 'en' ? en : viMessages}>
      <PasswordRuleFeedback id="rule" failures={failures} />
    </NextIntlClientProvider>,
  );
}

const t = en.passwordRule;

describe('PasswordRuleFeedback', () => {
  it.each([
    ['en', en],
    ['vi', viMessages],
  ] as const)('shows the rule text with the given id and no alert in %s', (locale, messages) => {
    renderFeedback(undefined, locale);
    expect(screen.getByText(messages.passwordRule.rule)).toHaveAttribute('id', 'rule');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows no alert for an empty failure list', () => {
    renderFeedback([]);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it.each([
    ['tooShort', t.tooShort],
    ['noLowercase', t.missingType],
    ['noUppercase', t.missingType],
    ['noDigit', t.missingType],
    ['noSymbol', t.missingType],
    ['invalidCharacter', t.invalidCharacter],
  ] as const)('maps %s to its refusal message', (failure, message) => {
    renderFeedback([failure]);
    expect(screen.getByRole('alert')).toHaveTextContent(message);
  });

  it('shows each message once, in rule order, even when several failures share it', () => {
    renderFeedback(['invalidCharacter', 'noDigit', 'noSymbol', 'tooShort']);
    const items = screen.getAllByRole('listitem').map((item) => item.textContent);
    expect(items).toEqual([t.tooShort, t.missingType, t.invalidCharacter]);
  });

  it('has the refusal messages in English and Vietnamese with the same keys', () => {
    expect(Object.keys(viMessages.passwordRule).sort()).toEqual(
      ['invalidCharacter', 'missingType', 'rule', 'tooShort'].sort(),
    );
    expect(Object.keys(en.passwordRule).sort()).toEqual(
      Object.keys(viMessages.passwordRule).sort(),
    );
    for (const messages of [en.passwordRule, viMessages.passwordRule]) {
      for (const value of Object.values(messages)) expect(value.trim()).not.toBe('');
    }
  });

  it('states the allowed characters and that marked letters and spaces are refused', () => {
    expect(en.passwordRule.rule).toMatch(/Vietnamese marks/);
    expect(en.passwordRule.rule).toMatch(/spaces/);
    expect(viMessages.passwordRule.rule).toMatch(/có dấu/);
    expect(viMessages.passwordRule.rule).toMatch(/dấu cách/);
    for (const messages of [en.passwordRule, viMessages.passwordRule]) {
      expect(messages.invalidCharacter).toContain('a-z, A-Z, 0-9');
      expect(messages.tooShort).toContain('8');
    }
  });
});

describe('toPasswordRuleFailures', () => {
  it('keeps only known failure values', () => {
    expect(toPasswordRuleFailures(['tooShort', 'boom', 3, null, 'toString', 'noDigit'])).toEqual([
      'tooShort',
      'noDigit',
    ]);
  });

  it.each([undefined, null, 'tooShort', { 0: 'tooShort' }])('returns [] for %j', (value) => {
    expect(toPasswordRuleFailures(value)).toEqual([]);
  });
});
