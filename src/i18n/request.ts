import { headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['vi', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'vi';

// A BCP 47 language tag: a 2-8 letter primary subtag, then optional 1-8 character subtags.
const LANGUAGE_TAG = /^[a-z]{2,8}(?:-[a-z0-9]{1,8})*$/i;
const MAX_HEADER_LENGTH = 1024;

/**
 * Picks the interface language from an `Accept-Language` header (BR-22).
 * Only the first (highest-preference) tag counts: Vietnamese gives `vi`, English gives `en`,
 * anything else, a missing header or a malformed one gives `vi`.
 */
export function resolveLocale(acceptLanguage: string | null | undefined): Locale {
  if (typeof acceptLanguage !== 'string' || acceptLanguage.length > MAX_HEADER_LENGTH) {
    return defaultLocale;
  }
  const first = acceptLanguage.split(',', 1)[0].split(';', 1)[0].trim();
  if (!LANGUAGE_TAG.test(first)) return defaultLocale;

  const primary = first.split('-', 1)[0].toLowerCase();
  return primary === 'en' ? 'en' : defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = resolveLocale((await headers()).get('accept-language'));
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return { locale, messages };
});
