import Link from 'next/link';
import { useTranslations } from 'next-intl';

const dataItems = ['email', 'displayName', 'password', 'tasks', 'family', 'agreement'] as const;
const protectItems = ['encrypted', 'access', 'deletion', 'noSharing'] as const;

// Public page: no login check. All text lives in messages/*.json under `privacy`,
// so an approved revision of the notice is a message-file-only change.
export default function PrivacyPage() {
  const t = useTranslations('privacy');

  return (
    <main style={{ maxWidth: '40rem', margin: '0 auto', padding: '1rem', lineHeight: 1.5 }}>
      <h1>{t('title')}</h1>
      <p>{t('intro')}</p>

      <h2>{t('dataTitle')}</h2>
      <ul>
        {dataItems.map((key) => (
          <li key={key}>{t(`data.${key}`)}</li>
        ))}
      </ul>

      <h2>{t('protectTitle')}</h2>
      <ul>
        {protectItems.map((key) => (
          <li key={key}>{t(`protect.${key}`)}</li>
        ))}
      </ul>

      <p>
        <Link href="/signup">{t('backToSignUp')}</Link>
      </p>
    </main>
  );
}
