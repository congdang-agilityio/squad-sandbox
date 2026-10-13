import { signUp, type SignUpInput } from '@/lib/auth/sign-up';

function invalidInput(): Response {
  return Response.json({ error: 'INVALID_INPUT' }, { status: 400 });
}

function isSignUpInput(body: unknown): body is SignUpInput {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) return false;
  const { email, password, displayName, agreedToPrivacyNotice } = body as Record<string, unknown>;
  return (
    typeof email === 'string' &&
    typeof password === 'string' &&
    typeof displayName === 'string' &&
    typeof agreedToPrivacyNotice === 'boolean'
  );
}

/** Sign-up endpoint (S-02). Business rules live in `signUp`; this only checks shapes. */
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
