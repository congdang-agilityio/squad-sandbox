import { useTranslations } from 'next-intl';

// Placeholder: the real task list comes with stories S-05 and S-06.
export default function TasksPage() {
  const t = useTranslations('tasks');

  return (
    <main style={{ maxWidth: '40rem', margin: '0 auto', padding: '1rem', lineHeight: 1.5 }}>
      <h1>{t('title')}</h1>
      <p>{t('empty')}</p>
    </main>
  );
}
