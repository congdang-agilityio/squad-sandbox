import { getAppInfo } from '@/lib/version';

const ALLOWED_FORMATS = ['short', 'full'] as const;
type Format = (typeof ALLOWED_FORMATS)[number];

function isFormat(value: string): value is Format {
  return (ALLOWED_FORMATS as readonly string[]).includes(value);
}

/** Resolves the `format` query parameter; anything that is not `full` means `short`. */
function parseFormat(searchParams: URLSearchParams): Format | null {
  const value = searchParams.get('format');
  return value === 'full' ? 'full' : 'short';
}

export function GET(request: Request): Response {
  const format = parseFormat(new URL(request.url).searchParams);
  if (format === null) {
    return Response.json({ error: 'INVALID_FORMAT', allowed: ALLOWED_FORMATS }, { status: 400 });
  }

  const { name, version } = getAppInfo();
  if (format === 'short') {
    return Response.json({ version });
  }
  return Response.json({ name, version, node: process.version });
}
