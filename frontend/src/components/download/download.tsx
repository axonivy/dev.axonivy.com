import { useQuery } from "@tanstack/react-query";
import {
  DownloadCards,
  type DownloadRelease,
} from "@/components/download/download-cards";
import { DownloadSkeleton } from "@/components/skeletons/download-skeleton";
import { IconArrowRight, IconRefresh } from "@tabler/icons-react";

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
      <div className="flex flex-col gap-12">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          <DownloadCards
            release={data.ltsCurrent[0]}
            releaseLabel="Long Term Support"
          />
        </div>
        <a
          href="/release-cycle"
          className="group flex min-w-0 flex-row items-center justify-between gap-3 rounded-md bg-n50 p-4 md:gap-4"
        >
          <div className="grid min-w-0 flex-1 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1 md:gap-x-4">
            <div className="bg-blue-bg text-blue row-start-1 shrink-0 rounded-md p-2 md:row-span-2">
              <IconRefresh className="size-8" />
            </div>
            <p className="min-w-0 text-lg sm:text-xl">
              Learn more about our release cycle
            </p>
            <p className="col-span-2 text-n900 md:col-span-1">
              Get familiar with our release cycle before you are going to use
              the Leading Edge version.
            </p>
          </div>
          <IconArrowRight className="text-primary size-6 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
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
