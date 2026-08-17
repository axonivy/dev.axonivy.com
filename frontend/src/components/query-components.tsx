import { QueryProvider } from "@/providers/query-provider";
import Documentation from "./documentation";

export function DocumentationQuery() {
  return (
    <QueryProvider>
      <Documentation />
    </QueryProvider>
  );
}
