import { convertToTSX } from "@astrojs/compiler";
import { defineConfig, type Plugin } from "i18next-cli";

const astro = (): Plugin => ({
  name: "astro",
  async onLoad(code, path) {
    if (!path.endsWith(".astro")) return code;
    const { code: tsx } = await convertToTSX(code, { filename: path });
    return tsx;
  },
});

export default defineConfig({
  locales: ["en", "de"],
  extract: {
    input: ["src/**/*.{ts,tsx,astro}"],
    output: "src/translation/{{namespace}}/{{language}}.json",
    defaultNS: "dev.axonivy.com",
    primaryLanguage: "en",
    sort: true,
  },
  plugins: [astro()],
});
