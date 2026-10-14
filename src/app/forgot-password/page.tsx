import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ForgotPasswordForm } from './forgot-password-form';

// Public page (not matched by the middleware).
export default function ForgotPasswordPage() {
  const t = useTranslations('forgotPassword');

  return (
    <main style={{ maxWidth: '40rem', margin: '0 auto', padding: '1rem', lineHeight: 1.5 }}>
      <h1>{t('title')}</h1>
      <p>{t('intro')}</p>
      <ForgotPasswordForm />
      <p>
        <Link href="/login">{t('loginLink')}</Link>
      </p>
    </main>
  );
}
