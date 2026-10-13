import pkg from '../../package.json';

export type AppInfo = {
  name: string;
  version: string;
};

/** Name and version of the app, read from package.json at build time. */
export function getAppInfo(): AppInfo {
  return { name: pkg.name, version: pkg.version };
}
