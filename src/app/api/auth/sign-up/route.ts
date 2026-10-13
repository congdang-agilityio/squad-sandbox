import { signUp, type SignUpInput } from '@/lib/auth/sign-up';

function invalidInput(): Response {
  return Response.json({ error: 'INVALID_INPUT' }, { status: 400 });
}

// Length caps for a public endpoint: RFC 5321 address limit, a password cap above the
// NIST SP 800-63B minimum of 64, and a display name cap chosen for this app.
const MAX_EMAIL = 254;
const MAX_PASSWORD = 128;
const MAX_DISPLAY_NAME = 100;

function isSignUpInput(body: unknown): body is SignUpInput {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) return false;
  const { email, password, displayName, agreedToPrivacyNotice } = body as Record<string, unknown>;
  return (
    typeof email === 'string' &&
    email.length <= MAX_EMAIL &&
    typeof password === 'string' &&
    password.length <= MAX_PASSWORD &&
    typeof displayName === 'string' &&
    displayName.length <= MAX_DISPLAY_NAME &&
    typeof agreedToPrivacyNotice === 'boolean'
  );
}

/** Sign-up endpoint (S-02). Business rules live in `signUp`; this only checks shapes and lengths. */
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalidInput();
  }
  if (!isSignUpInput(body)) return invalidInput();

  const { email, password, displayName, agreedToPrivacyNotice } = body;
  const result = await signUp({ email, password, displayName, agreedToPrivacyNotice });

  if (result.ok) return Response.json({ ok: true }, { status: 201 });
  if (result.error === 'PASSWORD_RULE') {
    return Response.json({ error: result.error, failures: result.failures }, { status: 400 });
  }
  return Response.json(
    { error: result.error },
    { status: result.error === 'EMAIL_TAKEN' ? 409 : 400 },
  );
}
