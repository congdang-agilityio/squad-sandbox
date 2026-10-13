import { getAppInfo } from '@/lib/version';

const ALLOWED_FORMATS = ['short', 'full'] as const;
type Format = (typeof ALLOWED_FORMATS)[number];

function isFormat(value: string): value is Format {
  return (ALLOWED_FORMATS as readonly string[]).includes(value);
}

/**
 * Resolves the `format` query parameter. Absent means `short`; anything other than
 * exactly one `short` or `full` value (empty, repeated, unknown) is invalid.
 */
function parseFormat(searchParams: URLSearchParams): Format | null {
  const values = searchParams.getAll('format');
  if (values.length === 0) return 'short';
  if (values.length > 1) return null;
  return isFormat(values[0]) ? values[0] : null;
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
