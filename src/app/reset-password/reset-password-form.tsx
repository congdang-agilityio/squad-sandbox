'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState, type FormEvent } from 'react';
import { PasswordRuleFeedback, toPasswordRuleFailures } from '@/components/password-rule-feedback';
import type { PasswordRuleFailure } from '@/lib/auth/password-rule';

type ErrorKey = 'errorPasswordRule' | 'errorUnexpected';
type Outcome =
  | { kind: 'done' }
  | { kind: 'invalidLink' }
  | { kind: 'refused'; error: ErrorKey | null; failures: PasswordRuleFailure[] };

async function outcomeFrom(response: Response): Promise<Outcome> {
  if (response.status === 200) return { kind: 'done' };
  const body: unknown = await response.json().catch(() => null);
  const { error, failures } = (body ?? {}) as { error?: unknown; failures?: unknown };
  if (response.status === 400 && error === 'INVALID_TOKEN') return { kind: 'invalidLink' };
  if (response.status === 400 && error === 'PASSWORD_RULE') {
    const known = toPasswordRuleFailures(failures);
    // Known failures are shown by PasswordRuleFeedback instead of the general error.
    return known.length > 0
      ? { kind: 'refused', error: null, failures: known }
      : { kind: 'refused', error: 'errorPasswordRule', failures: [] };
  }
  return { kind: 'refused', error: 'errorUnexpected', failures: [] };
}

const field = { display: 'flex', flexDirection: 'column', gap: '0.25rem' } as const;

/**
 * Set-new-password form (S-04 AC2, AC3) for the token from the emailed link. The server checks
 * the token and the password rule; the password field is cleared after every submit.
 */
export function ResetPasswordForm({ token }: { token: string }) {
  const t = useTranslations('resetPassword');
  const [submitting, setSubmitting] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(() =>
    token.trim() === '' ? { kind: 'invalidLink' } : null,
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const password = String(new FormData(form).get('password') ?? '');
    setSubmitting(true);
    setOutcome(null);
    try {
      const response = await fetch('/api/auth/password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      setOutcome(await outcomeFrom(response));
    } catch {
      setOutcome({ kind: 'refused', error: 'errorUnexpected', failures: [] });
    } finally {
      const input = form.elements.namedItem('password');
      if (input instanceof HTMLInputElement) input.value = '';
      setSubmitting(false);
    }
  }

  if (outcome?.kind === 'done') {
    return (
      <p role="status">
        {t('success')} <Link href="/login">{t('loginLink')}</Link>
      </p>
    );
  }
  if (outcome?.kind === 'invalidLink') {
    return (
      <p role="alert" style={{ color: '#b00020' }}>
        {t('invalidLink')} <Link href="/forgot-password">{t('forgotPasswordLink')}</Link>
      </p>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: '1rem' }}>
      <label style={field}>
        {t('passwordLabel')}
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          maxLength={128}
          aria-describedby="reset-password-rule"
        />
      </label>
      <PasswordRuleFeedback id="reset-password-rule" failures={outcome?.failures} />
      {outcome?.error && (
        <p role="alert" style={{ color: '#b00020', margin: 0 }}>
          {t(outcome.error)}
        </p>
      )}
      <button type="submit" disabled={submitting}>
        {t('submit')}
      </button>
    </form>
  );
}
