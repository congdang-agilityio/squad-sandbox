// @vitest-environment node
import pkg from '../../../../package.json';
import { GET } from './route';

const call = (query = '') => GET(new Request(`http://localhost/api/version${query}`));

const INVALID = { error: 'INVALID_FORMAT', allowed: ['short', 'full'] };

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

  it.each([
    ['an unknown value', '?format=long'],
    ['a different case', '?format=FULL'],
    ['an empty value', '?format='],
    ['a bare parameter', '?format'],
    ['a repeated parameter', '?format=short&format=full'],
    ['a repeated identical parameter', '?format=short&format=short'],
  ])('returns 400 INVALID_FORMAT for %s', async (_label, query) => {
    const res = await call(query);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual(INVALID);
  });
});
