import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth/current-user';
import { LoginForm } from './login-form';

// Public page (not matched by the middleware). A user who is already logged in goes straight
// to the task list.
export default async function LoginPage() {
  if (await getCurrentUser()) redirect('/tasks');
  const t = await getTranslations('login');

  return (
    <main style={{ maxWidth: '40rem', margin: '0 auto', padding: '1rem', lineHeight: 1.5 }}>
      <h1>{t('title')}</h1>
      <LoginForm />
      <p>
        {t('noAccount')} <Link href="/signup">{t('signUpLink')}</Link>
      </p>
    </main>
  );
}
