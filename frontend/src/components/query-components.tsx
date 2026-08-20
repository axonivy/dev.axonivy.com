import { QueryProvider } from "@/providers/query-provider";
import Documentation from "./documentation";
import Download from "./download";

export function DocumentationQuery() {
  return (
    <QueryProvider>
      <Documentation />
    </QueryProvider>
  );
}

export function DownloadQuery() {
  return (
    <QueryProvider>
      <Download />
    </QueryProvider>
  );
}
