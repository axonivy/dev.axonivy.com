import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  outDir: "../src/web",

  build: {
    format: "directory",
  },

  vite: {
    build: {
      // preserve docs/, releases/, images/, etc. in src/web
      emptyOutDir: false,
    },

    server: {
      proxy: {
        "/api": "http://localhost:8080",
      },
    },

    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
