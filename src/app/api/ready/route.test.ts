// @vitest-environment node
import pkg from '../../../../package.json';
import { GET } from './route';

describe('GET /api/ready', () => {
  it('returns 200 and ready true', async () => {
    const res = GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ready: true });
  });

  it('sends the X-App-Version header with the version from package.json', () => {
    const res = GET();
    expect(res.headers.get('X-App-Version')).toBe(pkg.version);
  });

  it('keeps Cache-Control: no-store', () => {
    const res = GET();
    expect(res.headers.get('Cache-Control')).toBe('no-store');
  });
});
