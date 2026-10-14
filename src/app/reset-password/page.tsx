import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { ResetPasswordForm } from './reset-password-form';

// The URL holds the reset token: never send it to another site in the Referer header.
export const metadata: Metadata = { referrer: 'no-referrer' };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function ResetPasswordView({ token }: { token: string }) {
  const t = useTranslations('resetPassword');

  return (
    <main style={{ maxWidth: '40rem', margin: '0 auto', padding: '1rem', lineHeight: 1.5 }}>
      <h1>{t('title')}</h1>
      <ResetPasswordForm token={token} />
    </main>
  );
}

// Public page (not matched by the middleware), opened from the reset email.
export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;
  // A missing or repeated token is shown as an invalid link.
  return <ResetPasswordView token={typeof token === 'string' ? token : ''} />;
}
