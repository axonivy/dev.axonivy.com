import { useQuery } from "@tanstack/react-query";
import { DownloadCards, type DownloadRelease } from "./download-cards";
import { DownloadSkeleton } from "./skeletons/download-skeleton";

type UiDownloadResponse = {
  ltsCurrent: DownloadRelease[];
  ltsMaintenance: DownloadRelease[];
  le: DownloadRelease[];
  dev: DownloadRelease[];
};

export default function Download() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["download"],
    queryFn: async () => {
      const response = await fetch("/ui/download", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as UiDownloadResponse;
      return data;
    },
  });

  if (isLoading) {
    return <DownloadSkeleton />;
  }

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Failed to load download links: {error.message}
      </p>
    );
  }

  if (!data) {
    return <p className="text-sm text-n900">No download data available.</p>;
  }

  const releases = [
    { release: data.ltsCurrent[0], releaseLabel: "Long Term Support" },
    { release: data.ltsMaintenance[0], releaseLabel: "Maintenance" },
    { release: data.le[0], releaseLabel: "Leading Edge" },
  ].filter(
    (entry): entry is { release: DownloadRelease; releaseLabel: string } =>
      Boolean(entry.release),
  );

  if (releases.length === 0) {
    return <p className="text-sm text-n900">No download data available.</p>;
  }

  return (
    <div className="flex flex-col gap-24">
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        <DownloadCards
          release={data.ltsCurrent[0]}
          releaseLabel="Long Term Support"
        />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-5xl font-semibold">
          Download {data.ltsMaintenance[0].versionShort}
        </h2>
        <p className="text-xl font-semibold">
          Download the second last released long term support version.
        </p>
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          <DownloadCards
            release={data.ltsMaintenance[0]}
            releaseLabel="Long Term Support"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-5xl font-semibold">
          Want to check out brand new features?
        </h2>
        <p className="text-xl font-semibold">
          Download the Leading Edge version for early access to the newest
          features! <br />
          Be prepared for frequent migrations.
        </p>
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          <DownloadCards release={data.le[0]} releaseLabel="Leading Edge" />
        </div>
      </div>
    </div>
  );
}
