'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, type FormEvent } from 'react';

const VALIDATION_KEYS = {
  TITLE_REQUIRED: 'errorTitleRequired',
  DUE_DATE_REQUIRED: 'errorDueDateRequired',
} as const;
type ErrorKey = (typeof VALIDATION_KEYS)[keyof typeof VALIDATION_KEYS] | 'errorUnexpected';

/** Message keys for a refused create, in the API's order; anything unknown is the generic one. */
async function errorsFrom(response: Response): Promise<ErrorKey[]> {
  const body: unknown = await response.json().catch(() => null);
  const { error, errors } = (body ?? {}) as { error?: unknown; errors?: unknown };
  if (error !== 'VALIDATION' || !Array.isArray(errors) || errors.length === 0) {
    return ['errorUnexpected'];
  }
  if (!errors.every((code) => typeof code === 'string' && Object.hasOwn(VALIDATION_KEYS, code))) {
    return ['errorUnexpected'];
  }
  const codes = [...new Set(errors as (keyof typeof VALIDATION_KEYS)[])];
  return codes.map((code) => VALIDATION_KEYS[code]);
}

const field = { display: 'flex', flexDirection: 'column', gap: '0.25rem' } as const;

/** Create-task form (S-05). The server checks every rule; native validation is off. */
export function NewTaskForm() {
  const t = useTranslations('newTask');
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<ErrorKey[]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (name: string) => String(data.get(name) ?? '');
    setSubmitting(true);
    setErrors([]);
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: text('title'),
          dueDate: text('dueDate'),
          dueTime: text('dueTime') || null,
        }),
      });
      if (response.status === 201) {
        form.reset();
        router.refresh();
        return;
      }
      // Typed values stay in the fields so the user can correct them.
      setErrors(await errorsFrom(response));
    } catch {
      setErrors(['errorUnexpected']);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: '1rem', margin: '1rem 0' }}>
      <label style={field}>
        {t('titleLabel')}
        <input name="title" maxLength={200} />
      </label>
      <label style={field}>
        {t('dueDateLabel')}
        <input name="dueDate" type="date" />
      </label>
      <label style={field}>
        {t('dueTimeLabel')}
        <input name="dueTime" type="time" />
      </label>
      {errors.length > 0 && (
        <div role="alert" style={{ color: '#b00020' }}>
          {errors.map((key) => (
            <p key={key} style={{ margin: 0 }}>
              {t(key)}
            </p>
          ))}
        </div>
      )}
      <button type="submit" disabled={submitting}>
        {t('submit')}
      </button>
    </form>
  );
}
