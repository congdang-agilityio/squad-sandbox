'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, type FormEvent } from 'react';

type ErrorKey = 'errorInvalidCredentials' | 'errorUnexpected';

const field = { display: 'flex', flexDirection: 'column', gap: '0.25rem' } as const;

/**
 * Login form (S-03): email and password only, no other provider (Q-01). The password rule is
 * not checked here; it applies only when a password is set.
 */
export function LoginForm() {
  const t = useTranslations('login');
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<ErrorKey | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (name: string) => String(data.get(name) ?? '');
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: text('email'), password: text('password') }),
      });
      if (response.status === 200) return router.replace('/tasks');
      // A malformed input is reported like wrong credentials: no hint about which part is wrong.
      setError(
        response.status === 401 || response.status === 400
          ? 'errorInvalidCredentials'
          : 'errorUnexpected',
      );
    } catch {
      setError('errorUnexpected');
    } finally {
      // The email stays as typed; the password is never kept.
      const password = form.elements.namedItem('password');
      if (password instanceof HTMLInputElement) password.value = '';
      setSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: '1rem' }}>
      <label style={field}>
        {t('emailLabel')}
        <input name="email" type="email" autoComplete="email" maxLength={254} />
      </label>
      <label style={field}>
        {t('passwordLabel')}
        <input name="password" type="password" autoComplete="current-password" maxLength={128} />
      </label>
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
