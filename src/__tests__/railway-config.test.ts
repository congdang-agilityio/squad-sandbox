// @vitest-environment node
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));

function readJson(name: string): Record<string, unknown> {
  return JSON.parse(readFileSync(`${repoRoot}${name}`, 'utf8')) as Record<string, unknown>;
}

describe('Railway deploy config (railway.json)', () => {
  it('exists at the repository root', () => {
    expect(existsSync(`${repoRoot}railway.json`)).toBe(true);
  });

  it('references the Railway config schema', () => {
    expect(readJson('railway.json').$schema).toBe('https://railway.com/railway.schema.json');
  });

  it('runs the database migration as the pre-deploy command', () => {
    const deploy = readJson('railway.json').deploy as { preDeployCommand?: unknown };
    expect(deploy.preDeployCommand).toEqual(['npm run db:deploy']);
  });

  it('has a db:deploy script that runs prisma migrate deploy', () => {
    const scripts = readJson('package.json').scripts as Record<string, string>;
    expect(scripts['db:deploy']).toMatch(/prisma\b.*\bmigrate deploy$/);
  });
});
