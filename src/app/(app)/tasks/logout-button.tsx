'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

/**
 * Log out on this phone (S-30). After a successful logout the page is replaced through a full
 * page load, so neither the history entry nor the Next.js client router cache keeps a task page.
 */
export function LogoutButton() {
  const t = useTranslations('logout');
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  // WebKit may restore this page from the back/forward cache after logging out; a reload
  // asks the server again, which sends a logged-out visitor to /login.
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) window.location.reload();
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  async function logOut() {
    setPending(true);
    setFailed(false);
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.status === 200) {
        // The button stays disabled while /login loads.
        window.location.replace('/login');
        return;
      }
    } catch {
      // Network error: handled like a failed response below.
    }
    setFailed(true);
    setPending(false);
  }

  return (
    <div style={{ display: 'grid', gap: '0.5rem', justifyItems: 'start' }}>
      <button type="button" onClick={logOut} disabled={pending}>
        {t('button')}
      </button>
      {failed && (
        <p role="alert" style={{ color: '#b00020', margin: 0 }}>
          {t('error')}
        </p>
      )}
    </div>
  );
}
