import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    // Integration test files share one PostgreSQL database and truncate it between tests.
    fileParallelism: false,
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['@testing-library/jest-dom/vitest'],
  },
});
