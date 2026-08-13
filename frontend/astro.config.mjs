import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  outDir: '../src/web',
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      // preserve docs/, releases/, images/, etc. in src/web
      emptyOutDir: false,
    },
    server: {
      proxy: {
        '/api': 'http://localhost:8080',
      },
    },
  },
});
