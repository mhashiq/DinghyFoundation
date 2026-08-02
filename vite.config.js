import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // Relative asset paths for GitHub Pages hosting
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        programs: resolve(__dirname, 'programs.html'),
        impact: resolve(__dirname, 'impact.html'),
        reports: resolve(__dirname, 'reports.html'),
        team: resolve(__dirname, 'team.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
});
