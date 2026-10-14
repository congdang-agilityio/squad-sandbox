'use client';

import { useTranslations } from 'next-intl';
import { useState, type FormEvent } from 'react';

const field = { display: 'flex', flexDirection: 'column', gap: '0.25rem' } as const;

/**
 * Password reset request form (S-04 AC1). The answer never reveals whether an account exists:
 * an accepted (202) or refused (400) request shows the same "sent" message. Only a server or
 * network failure shows an error, so the person can try again.
 */
export function ForgotPasswordForm() {
  const t = useTranslations('forgotPassword');
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get('email') ?? '');
    setSubmitting(true);
    setFailed(false);
    try {
      const response = await fetch('/api/auth/password-reset/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.status === 202 || response.status === 400) return setSent(true);
      setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) return <p role="status">{t('sent')}</p>;

  return (
    <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: '1rem' }}>
      <label style={field}>
        {t('emailLabel')}
        <input name="email" type="email" autoComplete="email" maxLength={254} />
      </label>
      {failed && (
        <p role="alert" style={{ color: '#b00020', margin: 0 }}>
          {t('errorUnexpected')}
        </p>
      )}
      <button type="submit" disabled={submitting}>
        {t('submit')}
      </button>
    </form>
  );
}
