export function GET(): Response {
  return Response.json({ ready: true }, { headers: { 'Cache-Control': 'no-store' } });
}
