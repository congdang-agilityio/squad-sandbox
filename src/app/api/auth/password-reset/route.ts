import { resetPassword } from '@/lib/auth/password-reset';

// Same password cap as sign-up (above the NIST SP 800-63B minimum of 64).
const MAX_PASSWORD = 128;

type ResetInput = { token: string; password: string };

function isResetInput(body: unknown): body is ResetInput {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) return false;
  const { token, password } = body as Record<string, unknown>;
  return (
    typeof token === 'string' && typeof password === 'string' && password.length <= MAX_PASSWORD
  );
}

/**
 * Set-new-password endpoint (S-04 AC2, AC3). Business rules live in `resetPassword`; this only
 * checks shapes and lengths. It never sets or clears a session cookie.
 */
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = undefined;
  }
  if (!isResetInput(body)) return Response.json({ error: 'INVALID_INPUT' }, { status: 400 });

  const result = await resetPassword(body.token, body.password);
  if (result.ok) return Response.json({ ok: true }, { status: 200 });
  if (result.error === 'PASSWORD_RULE') {
    return Response.json({ error: result.error, failures: result.failures }, { status: 400 });
  }
  return Response.json({ error: result.error }, { status: 400 });
}
