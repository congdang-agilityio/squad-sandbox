// @vitest-environment node
import { GET } from './route';

describe('GET /api/health', () => {
  it('returns 200 with {"status":"ok"} and Cache-Control: no-store', async () => {
    const response = GET();

    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(response.headers.get('content-type')).toContain('application/json');
    expect(await response.json()).toEqual({ status: 'ok' });
  });
});
