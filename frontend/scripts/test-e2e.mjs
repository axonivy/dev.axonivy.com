import { spawnSync } from "node:child_process";

const BACKEND_URL_OPTION = "--backendUrl=";
const DEFAULT_BACKEND_URL = "http://localhost:8080";

const args = process.argv.slice(2);
const backendUrlArgs = args.filter((arg) => arg.startsWith(BACKEND_URL_OPTION));

if (backendUrlArgs.length > 1) {
  console.error("Specify --backendUrl only once.");
  process.exit(1);
}

const backendUrlValue = backendUrlArgs[0]?.slice(BACKEND_URL_OPTION.length);
const backendUrl = normalizeUrl(backendUrlValue ?? DEFAULT_BACKEND_URL);
const playwrightArgs = args.filter(
  (arg) => !arg.startsWith(BACKEND_URL_OPTION),
);
const env = { ...process.env, BACKEND_URL: backendUrl };

run("pnpm", ["build"], env);
run("pnpm", ["exec", "playwright", "test", ...playwrightArgs], env);

function normalizeUrl(value) {
  const url = value.includes("://") ? value : `http://${value}`;
  return url.replace(/\/+$/, "");
}

function run(command, commandArgs, commandEnv) {
  const result = spawnSync(command, commandArgs, {
    env: commandEnv,
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
