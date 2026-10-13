import { getAppInfo } from '@/lib/version';

export function GET(): Response {
  return Response.json(
    { ready: true },
    { headers: { 'Cache-Control': 'no-store', 'X-App-Version': getAppInfo().version } },
  );
}
