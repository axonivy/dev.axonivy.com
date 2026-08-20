import { useQuery } from "@tanstack/react-query";
import { DownloadCards, type DownloadRelease } from "./download-cards";

type UiDownloadResponse = {
  ltsCurrent: DownloadRelease[];
  ltsMaintenance: DownloadRelease[];
  le: DownloadRelease[];
  dev: DownloadRelease[];
};

const testdata = {
  version: "8.0.1",
  versionShort: "LTS 8.0",
  releaseDate: "24.12.2019",
  releaseNotesLink: "/doc/8.0/en/release-notes",
  docLink: "/doc/8.0",
  vscodeExtensionLink:
    "https://marketplace.visualstudio.com/items?itemName=axonivy.vscode-designer-14",
  designerArtifacts: [],
  engineArtifacts: [
    {
      name: "Windows",
      url: "/installation?downloadUrl=https://download.axonivy.com/8.0.1/AxonIvyEngine8.0.1.96047_Windows_x64.zip&version=8.0.1&product=engine&type=Windows",
      filename: "AxonIvyEngine8.0.1.96047_Windows_x64.zip",
      permalink:
        "http://localhost:8080/permalink/8.0.1/axonivy-engine-windows.zip",
    },
    {
      name: "Docker",
      url: "/installation?downloadUrl=https://hub.docker.com/r/axonivy/axonivy-engine&version=8.0.1&product=engine&type=docker",
      filename: "axonivy/axonivy-engine:8.0.1",
      permalink: "",
    },
    {
      name: "Linux",
      url: "/installation?downloadUrl=https://download.axonivy.com/8.0.1/AxonIvyEngine8.0.1.96047_All_x64.zip&version=8.0.1&product=engine&type=All",
      filename: "AxonIvyEngine8.0.1.96047_All_x64.zip",
      permalink: "http://localhost:8080/permalink/8.0.1/axonivy-engine.zip",
    },
  ],
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
    // add DownloadSkeleton component for better UX
    return <p className="text-sm text-n900">Loading download data...</p>;
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
        <DownloadCards release={testdata} releaseLabel="Long Term Support" />
      </div>
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
