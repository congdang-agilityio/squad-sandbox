'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState, type FormEvent } from 'react';
import { PasswordRuleFeedback, toPasswordRuleFailures } from '@/components/password-rule-feedback';
import type { PasswordRuleFailure } from '@/lib/auth/password-rule';

const ERROR_KEYS = {
  AGREEMENT_REQUIRED: 'errorAgreementRequired',
  EMAIL_TAKEN: 'errorEmailTaken',
  PASSWORD_RULE: 'errorPasswordRule',
  INVALID_INPUT: 'errorInvalidInput',
} as const;
type ErrorKey = (typeof ERROR_KEYS)[keyof typeof ERROR_KEYS] | 'errorUnexpected';
type Refusal = { error: ErrorKey | null; failures: PasswordRuleFailure[] };

async function refusalFrom(response: Response): Promise<Refusal> {
  const body: unknown = await response.json().catch(() => null);
  const { error: code, failures } = (body ?? {}) as { error?: unknown; failures?: unknown };
  if (typeof code !== 'string' || !Object.hasOwn(ERROR_KEYS, code)) {
    return { error: 'errorUnexpected', failures: [] };
  }
  const known = code === 'PASSWORD_RULE' ? toPasswordRuleFailures(failures) : [];
  // Known password failures are shown by PasswordRuleFeedback instead of the general error.
  return known.length > 0
    ? { error: null, failures: known }
    : { error: ERROR_KEYS[code as keyof typeof ERROR_KEYS], failures: [] };
}

const field = { display: 'flex', flexDirection: 'column', gap: '0.25rem' } as const;

/** Sign-up form (S-02). The server checks every rule; native validation is off (`noValidate`). */
export function SignUpForm() {
  const t = useTranslations('signup');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<ErrorKey | null>(null);
  const [failures, setFailures] = useState<PasswordRuleFailure[]>([]);
  const [done, setDone] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (name: string) => String(data.get(name) ?? '');
    setSubmitting(true);
    setError(null);
    setFailures([]);
    try {
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: text('email'),
          password: text('password'),
          displayName: text('displayName'),
          agreedToPrivacyNotice: data.get('agreed') === 'on',
        }),
      });
      if (response.status === 201) return setDone(true);
      const refusal = await refusalFrom(response);
      setError(refusal.error);
      setFailures(refusal.failures);
    } catch {
      setError('errorUnexpected');
    } finally {
      // Email and display name stay as typed; the password is never kept.
      const password = form.elements.namedItem('password');
      if (password instanceof HTMLInputElement) password.value = '';
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <p role="status">
        {t('success')} <Link href="/login">{t('loginLink')}</Link>
      </p>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: '1rem' }}>
      <label style={field}>
        {t('emailLabel')}
        <input name="email" type="email" autoComplete="email" maxLength={254} />
      </label>
      <label style={field}>
        {t('passwordLabel')}
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          maxLength={128}
          aria-describedby="signup-password-rule"
        />
      </label>
      <PasswordRuleFeedback id="signup-password-rule" failures={failures} />
      <label style={field}>
        {t('displayNameLabel')}
        <input name="displayName" autoComplete="nickname" maxLength={100} />
      </label>
      <p style={{ margin: 0 }}>
        <label>
          <input name="agreed" type="checkbox" /> {t('agreeLabel')}
        </label>{' '}
        <Link href="/privacy">{t('agreePrivacyLink')}</Link>
      </p>
      {error && (
        <p role="alert" style={{ color: '#b00020', margin: 0 }}>
          {t(error)}
        </p>
      )}
      <button type="submit" disabled={submitting}>
        {t('submit')}
      </button>
    </form>
  );
}
