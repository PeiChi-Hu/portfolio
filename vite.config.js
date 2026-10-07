import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works on GitHub Pages under any repo name
// (https://<user>.github.io/<repo>/) as well as on a custom domain.
export default defineConfig({
  plugins: [react()],
  base: './',
});
