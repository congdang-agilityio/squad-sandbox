import { resolveLocale } from '@/i18n/request';
import { requestPasswordReset } from '@/lib/auth/password-reset';

// Same email cap as sign-up: no account can have a longer email.
const MAX_EMAIL = 254;

function isRequestInput(body: unknown): body is { email: string } {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) return false;
  const { email } = body as Record<string, unknown>;
  return typeof email === 'string' && email.length <= MAX_EMAIL;
}

/**
 * Password reset request endpoint (S-04 AC1). Always answers 202 for a well-formed body, so the
 * response never reveals whether an account exists; a send failure is logged, not returned.
 */
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = undefined;
  }
  if (!isRequestInput(body)) return Response.json({ error: 'INVALID_INPUT' }, { status: 400 });

  const locale = resolveLocale(request.headers.get('accept-language'));
  const baseUrl = process.env.APP_BASE_URL || new URL(request.url).origin;
  try {
    await requestPasswordReset(body.email, { locale, baseUrl });
  } catch (error) {
    // Never log the email body: it holds the reset link.
    console.error('Password reset request failed:', error instanceof Error ? error.message : error);
  }
  return Response.json({ ok: true }, { status: 202 });
}
