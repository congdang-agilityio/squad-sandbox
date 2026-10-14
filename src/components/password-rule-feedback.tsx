'use client';

import { useTranslations } from 'next-intl';
// Type-only: the password-rule module is server-side by convention.
import type { PasswordRuleFailure } from '@/lib/auth/password-rule';

type MessageKey = 'tooShort' | 'missingType' | 'invalidCharacter';

const MESSAGE_KEYS: Record<PasswordRuleFailure, MessageKey> = {
  tooShort: 'tooShort',
  noLowercase: 'missingType',
  noUppercase: 'missingType',
  noDigit: 'missingType',
  noSymbol: 'missingType',
  invalidCharacter: 'invalidCharacter',
};
const MESSAGE_ORDER: readonly MessageKey[] = ['tooShort', 'missingType', 'invalidCharacter'];

/** Keeps only known failure values from untrusted input, e.g. an API response. */
export function toPasswordRuleFailures(value: unknown): PasswordRuleFailure[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is PasswordRuleFailure =>
      typeof item === 'string' && Object.hasOwn(MESSAGE_KEYS, item),
  );
}

type Props = {
  /** Id of the rule text, for the password field's `aria-describedby`. */
  id: string;
  failures?: readonly PasswordRuleFailure[];
};

/** Password rule (FR-27) and, after a refused password, why it was refused (#62 AC 1-4). */
export function PasswordRuleFeedback({ id, failures = [] }: Props) {
  const t = useTranslations('passwordRule');
  const shown = new Set(failures.map((failure) => MESSAGE_KEYS[failure]));
  const messages = MESSAGE_ORDER.filter((key) => shown.has(key));

  return (
    <>
      <small id={id}>{t('rule')}</small>
      {messages.length > 0 && (
        <div role="alert" style={{ color: '#b00020' }}>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {messages.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
