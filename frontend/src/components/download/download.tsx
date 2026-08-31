import { useQuery } from "@tanstack/react-query";
import {
  DownloadCards,
  type DownloadRelease,
} from "@/components/download/download-cards";
import { DownloadSkeleton } from "@/components/skeletons/download-skeleton";
import { IconArrowRight, IconRefresh } from "@tabler/icons-react";
import { Base, H2, H4, H5, P } from "@/components/ui/typography";

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
      <P className="text-destructive">
        Failed to load download links: {error.message}
      </P>
    );
  }

  if (!data) {
    return <P className="text-n900">No download data available.</P>;
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
    return <P className="text-n900">No download data available.</P>;
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
          href="/download/release-cycle"
          className="group flex min-w-0 flex-row items-center justify-between gap-3 rounded-md bg-n50 p-4 md:gap-4"
        >
          <div className="grid min-w-0 flex-1 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1 md:gap-x-4">
            <div className="bg-blue-bg text-blue row-start-1 shrink-0 rounded-md p-2 md:row-span-2">
              <IconRefresh className="size-8" />
            </div>
            <H5>Learn more about our release cycle</H5>
            <Base className="col-span-2 text-n900 md:col-span-1">
              Get familiar with our release cycle before you are going to use
              the Leading Edge version.
            </Base>
          </div>
          <IconArrowRight className="text-primary size-6 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
      <div className="flex flex-col gap-6">
        <H2>Download {data.ltsMaintenance[0].versionShort}</H2>
        <H4>Download second to last released long term support version.</H4>
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          <DownloadCards
            release={data.ltsMaintenance[0]}
            releaseLabel="Long Term Support"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <H2>Want to check out brand new features?</H2>
        <H4>
          Download the Leading Edge version for early access to the newest
          features! <br />
          Be prepared for frequent migrations.
        </H4>
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          <DownloadCards release={data.le[0]} releaseLabel="Leading Edge" />
        </div>
      </div>
    </div>
  );
}
