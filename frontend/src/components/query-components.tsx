import { QueryProvider } from "@/providers/query-provider";
import Documentation from "@/components/documentation/documentation";
import Download from "@/components/download/download";
import LegacyDocumentation from "@/components/documentation/legacy-documentation";
import Archive from "@/components/download/archive/archive";
import type { ComponentProps } from "react";
import { NuqsAdapter } from "nuqs/adapters/react";

export function DocumentationQuery(props: { archived?: boolean }) {
  return (
    <QueryProvider>
      <Documentation {...props} />
    </QueryProvider>
  );
}

export function LegacyDocumentationQuery(
  props: ComponentProps<typeof LegacyDocumentation>,
) {
  return (
    <QueryProvider>
      <LegacyDocumentation {...props} />
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

export function ArchiveQuery() {
  return (
    <NuqsAdapter>
      <QueryProvider>
        <Archive />
      </QueryProvider>
    </NuqsAdapter>
  );
}
