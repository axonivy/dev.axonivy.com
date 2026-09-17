/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    globals: true,
    exclude: ["**/node_modules/**", "tests/e2e/**"],
    reporters: process.env.CI ? ["default", "junit"] : ["default"],
    outputFile: "report.xml",
  },
});
