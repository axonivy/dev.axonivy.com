import { defineConfig, fontProviders } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  outDir: "../src/web/astro",

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
        "/ui": "http://localhost:8080",
      },
    },

    plugins: [tailwindcss()],
  },

  integrations: [react()],

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Inter Variable",
      cssVariable: "--font-inter",
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: [
              "./node_modules/@fontsource-variable/inter/files/inter-latin-standard-normal.woff2",
            ],
          },
        ],
      },
    },
  ],
});
