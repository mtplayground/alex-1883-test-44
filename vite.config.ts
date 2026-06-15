import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts: true,
  },
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
