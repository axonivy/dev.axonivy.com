import { defineConfig, envField, fontProviders } from "astro/config";
import svgr from "vite-plugin-svgr";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8080";
// local backend only has empty placeholder docs
const docsUrl = process.env.DOCS_URL ?? "https://dev.axonivy.com";

export default defineConfig({
  output: "static",
  outDir: "../backend/src/web/astro",

  build: { format: "directory" },

  vite: {
    build: {
      // preserve docs/, releases/, images/, etc. in backend/src/web
      emptyOutDir: false,
    },

    server: {
      proxy: {
        "/api": backendUrl,
        "/ui": backendUrl,
        "/docs": { target: docsUrl, changeOrigin: true },
      },
    },

    plugins: [tailwindcss(), svgr()],
  },

  env: {
    schema: {
      BACKEND_URL: envField.string({
        context: "server",
        access: "public",
        default: "http://localhost:8080",
      }),
    },
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
