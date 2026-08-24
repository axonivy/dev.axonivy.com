import { useQuery } from "@tanstack/react-query";
import { ArchiveTable } from "@/components/download/archive";
import type {
  ArchiveProduct,
  ArchiveResponse,
} from "@/components/download/archive";

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
    return <p className="text-sm text-n900">Loading dev releases...</p>;
  }

  if (error || !data) {
    return (
      <p className="text-sm text-destructive">
        Failed to load dev releases: {error?.message ?? "No data available"}
      </p>
    );
  }

  const releases = data.releaseInfos.filter((release) =>
    product === "designer"
      ? (release.designerArtifacts ?? []).length > 0
      : (release.engineArtifacts ?? []).length > 0,
  );

  return (
    <div className="flex flex-col gap-6">
      <p className="text-xl font-semibold">Dev Releases</p>
      <ArchiveTable product={product} releases={releases} />
    </div>
  );
}
