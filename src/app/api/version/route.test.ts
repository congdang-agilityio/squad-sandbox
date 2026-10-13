// @vitest-environment node
import pkg from '../../../../package.json';
import { GET } from './route';

const call = (query = '') => GET(new Request(`http://localhost/api/version${query}`));

describe('GET /api/version', () => {
  it('defaults to the short format', async () => {
    const res = await call();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ version: pkg.version });
  });

  it('returns only the version for format=short', async () => {
    const res = await call('?format=short');
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ version: '0.1.0' });
  });

  it('returns name, version and node runtime for format=full', async () => {
    const res = await call('?format=full');
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      name: 'todonow',
      version: '0.1.0',
      node: process.version,
    });
  });
});
