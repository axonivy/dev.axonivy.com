import { useQuery } from "@tanstack/react-query";
import { ArchiveTable } from "@/components/download/archive";
import type {
  ArchiveProduct,
  ArchiveResponse,
} from "@/components/download/archive";
import ArchiveSkeleton from "@/components/skeletons/archive-skeleton";
import { H4, P } from "@/components/ui/typography";

type DevReleasesProps = {
  product: ArchiveProduct;
};

export default function DevReleases({ product }: DevReleasesProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["archive", "unstable"],
    queryFn: async () => {
      const response = await fetch("/ui/archive/unstable");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return (await response.json()) as ArchiveResponse;
    },
  });

  if (isLoading) {
    return <ArchiveSkeleton rows={7} />;
  }

  if (error || !data) {
    return (
      <P className="text-destructive">
        Failed to load dev releases: {error?.message ?? "No data available"}
      </P>
    );
  }

  const releases = data.releaseInfos.filter((release) =>
    product === "designer"
      ? (release.designerArtifacts ?? []).length > 0
      : (release.engineArtifacts ?? []).length > 0,
  );

  return (
    <div className="flex flex-col gap-6">
      <H4>Dev Releases</H4>
      <ArchiveTable product={product} releases={releases} />
    </div>
  );
}
