import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Public page: no login check. The privacy notice link stays above the form.
export default function SignUpPage() {
  const t = useTranslations('signup');

  return (
    <main style={{ maxWidth: '40rem', margin: '0 auto', padding: '1rem', lineHeight: 1.5 }}>
      <h1>{t('title')}</h1>
      <p>
        <Link href="/privacy">{t('privacyLink')}</Link>
      </p>
      {/* The sign-up form (story #35) goes here. */}
    </main>
  );
}
