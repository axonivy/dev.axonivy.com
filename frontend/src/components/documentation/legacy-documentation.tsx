import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IconLink } from "@tabler/icons-react";
import { H1, P } from "@/components/ui/typography";

type LegacyDocLink = {
  url: string;
  text: string;
};

type LegacyDocVersionLinks = {
  version: string;
  links: LegacyDocLink[];
};

type UiLegacyDocResponse = {
  version: string;
  releaseDocuments: LegacyDocVersionLinks;
  externalBooks: LegacyDocVersionLinks;
  documentUrl: string;
  currentNiceUrlPath: string;
  portalLink: string;
};

export const legacyDocsVersions = [
  "8.0",
  "7.4",
  "7.3",
  "7.2",
  "7.1",
  "7.0",
  "6.7",
  "6.6",
  "6.5",
  "6.4",
  "6.3",
  "6.2",
  "6.1",
  "6.0",
  "5.1",
  "5.0",
  "3.9",
] as const;

export type LegacyDocsVersion = (typeof legacyDocsVersions)[number];

function apiUrl(version: LegacyDocsVersion, path?: string) {
  return path
    ? `/ui/legacy/doc/${version}/${path}`
    : `/ui/legacy/doc/${version}`;
}

function pathFromNiceUrl(version: LegacyDocsVersion, url: string) {
  const prefix = `/doc/${version}/`;
  return url.startsWith(prefix) ? url.slice(prefix.length) : undefined;
}

function getInitialPath(version: LegacyDocsVersion) {
  if (typeof window === "undefined") return undefined;
  return pathFromNiceUrl(version, window.location.pathname);
}

type LegacyDocumentationProps = {
  version: LegacyDocsVersion;
};

export default function LegacyDocumentation({
  version,
}: LegacyDocumentationProps) {
  const [path, setPath] = useState<string | undefined>(() =>
    getInitialPath(version),
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["legacyDocumentation", version, path ?? "default"],
    queryFn: async () => {
      const response = await fetch(apiUrl(version, path), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return (await response.json()) as UiLegacyDocResponse;
    },
  });

  useEffect(() => {
    function handlePopState() {
      setPath(pathFromNiceUrl(version, window.location.pathname));
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [version]);

  function navigateTo(link: LegacyDocLink) {
    window.history.pushState(null, "", link.url);
    setPath(pathFromNiceUrl(version, link.url));
  }

  function resizeIframe(iframe: HTMLIFrameElement) {
    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    iframe.style.height = `${doc.body.scrollHeight}px`;
    removeHeader(doc);
    openLinksInParentTab(doc);
  }

  function removeHeader(doc: Document) {
    const headerDiv = doc.getElementById("headerdiv");
    headerDiv?.parentElement?.remove();

    for (const navbar of doc.getElementsByClassName("navbar ivy-subnav")) {
      navbar.remove();
    }

    const container = doc.getElementsByClassName("container")[0] as
      HTMLElement | undefined;
    if (container) {
      container.style.marginLeft = "0px";
    }

    doc.getElementsByTagName("nav")[0]?.remove();
  }

  function openLinksInParentTab(doc: Document) {
    const base = doc.createElement("base");
    base.target = "_parent";
    doc.getElementsByTagName("head")[0]?.appendChild(base);
  }

  if (isLoading) {
    // add loading skeleton
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <P className="text-destructive">
        Failed to load legacy documentation links: {error.message}
      </P>
    );
  }

  if (!data) {
    return <P className="text-n900">No legacy documentation data available.</P>;
  }

  return (
    <div className="flex flex-col gap-6">
      <H1 className="pt-8">Documentation {data.version}</H1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          {data.releaseDocuments.links.map((link) => (
            <button
              key={link.url}
              type="button"
              onClick={() => navigateTo(link)}
              className={
                link.url === window.location.pathname
                  ? "text-primary font-semibold underline"
                  : "text-primary hover:underline"
              }
            >
              {link.text}
            </button>
          ))}
        </div>
        <div className="flex flex-row gap-4">
          {data.externalBooks.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              <IconLink className="mr-1 inline-block size-4 shrink-0" />
              {link.text}
            </a>
          ))}
        </div>
      </div>
      <iframe
        key={data.documentUrl}
        src={data.documentUrl}
        title={data.version}
        onLoad={(event) => resizeIframe(event.currentTarget)}
        className="border-n200 w-full rounded-lg border"
      />
    </div>
  );
}
