import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true, // This is needed by @testing-library to be cleaned up after each test
    include: ['**/*.test.{js,jsx,ts,tsx}'],
    coverage: {
      provider: 'v8',
      all: false,
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
    environmentMatchGlobs: [
      ['**/*.test.tsx', 'jsdom'],
      ['src/hooks/**/*.test.ts', 'jsdom'],
    ],
    setupFiles: ['./vitest-setup.ts'],
    env: loadEnv('', process.cwd(), ''),
  },
});
