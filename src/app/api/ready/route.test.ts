// @vitest-environment node
import { GET } from './route';

describe('GET /api/ready', () => {
  it('returns 200 and ready true', async () => {
    const res = GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ready: true });
  });
});
