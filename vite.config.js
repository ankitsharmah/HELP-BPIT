import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/


export default defineConfig({
  base: './', // or appropriate path based on deployment structure
  plugins: [react()],
});
