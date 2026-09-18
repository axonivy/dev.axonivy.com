/** @type {import("prettier").Config} */
export default {
  endOfLine: "lf",
  printWidth: 80,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  objectWrap: "collapse",
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  tailwindFunctions: ["cn", "cva"],
};
