import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Integration tests use the real PostgreSQL database from DATABASE_URL. CI sets it in the
// environment; locally it comes from the slot's .env.local (Vitest does not load it).
if (!process.env.DATABASE_URL) {
  const envFile = resolve(process.cwd(), '.env.local');
  if (existsSync(envFile)) process.loadEnvFile(envFile);
}
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set; integration tests need a PostgreSQL test database');
}

const { db } = await import('@/lib/db');

export { db };

/** Empties every application table so each integration test starts from a clean database. */
export async function resetDatabase(): Promise<void> {
  const rows = await db.$queryRaw<{ tablename: string }[]>`
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public' AND tablename <> '_prisma_migrations'`;
  if (rows.length === 0) return;
  const tables = rows.map(({ tablename }) => `"public"."${tablename.replace(/"/g, '""')}"`);
  await db.$executeRawUnsafe(`TRUNCATE TABLE ${tables.join(', ')} RESTART IDENTITY CASCADE`);
}
