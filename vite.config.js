import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',  // Set base path for assets
  plugins: [react()],
  optimizeDeps: {
    include: ['react-redux'],
  },
  build: {
    outDir: 'build', // Optionally change the output folder
  },
});
