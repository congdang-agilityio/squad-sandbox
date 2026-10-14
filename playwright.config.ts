import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

// Local runs take the slot's PORT and DATABASE_URL from .env.local; CI sets them directly.
if (existsSync('.env.local')) process.loadEnvFile('.env.local');

const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid PORT: ${process.env.PORT}`);
}
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: 'e2e',
  testMatch: '**/*.test.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'Pixel 7', use: { ...devices['Pixel 7'] } },
    { name: 'iPhone 14', use: { ...devices['iPhone 14'] } },
  ],
  webServer: {
    command: `npm run build && npm run start -- --port ${port}`,
    // Not `/`: it redirects visitors to /login, which may not exist yet.
    url: `${baseURL}/api/health`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    // `next start` runs with NODE_ENV=production, so the session cookie would be Secure, and
    // WebKit does not store a Secure cookie on http://localhost.
    env: { SESSION_COOKIE_SECURE: 'false' },
  },
});
