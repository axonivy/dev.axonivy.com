import { QueryProvider } from "@/providers/query-provider";
import Documentation from "@/components/documentation/documentation";
import Download from "@/components/download/download";
import VersionOverview from "@/components/download/version-overview";

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

export function VersionOverviewQuery() {
  return (
    <QueryProvider>
      <VersionOverview />
    </QueryProvider>
  );
}
