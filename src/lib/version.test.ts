// @vitest-environment node
import pkg from '../../package.json';
import { getAppInfo } from './version';

describe('getAppInfo', () => {
  it('returns the name and version from package.json', () => {
    expect(getAppInfo()).toEqual({ name: pkg.name, version: pkg.version });
  });
});
