import { H1, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { IconLink } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

type LegacyDocLink = { url: string; text: string };

type LegacyDocVersionLinks = { version: string; links: LegacyDocLink[] };

export type UiLegacyDocResponse = {
  version: string;
  releaseDocuments: LegacyDocVersionLinks;
  externalBooks: LegacyDocVersionLinks;
  documentUrl: string;
  currentNiceUrlPath: string;
  portalLink: string;
};

export const legacyDocsVersions = ["8.0", "7.0"] as const;

export type LegacyDocsVersion = (typeof legacyDocsVersions)[number];

export default function LegacyDocumentation({
  data,
  activeUrl,
}: {
  data: UiLegacyDocResponse;
  activeUrl: string | undefined;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [visible, setVisible] = useState(false);

  function resizeIframe(iframe: HTMLIFrameElement) {
    const doc = iframe.contentWindow?.document;
    if (!doc?.body) return;

    removeHeader(doc);
    openLinksInParentTab(doc);
    iframe.style.height = `${doc.documentElement.scrollHeight}px`;
    setVisible(true);

    iframe.contentWindow?.addEventListener(
      "pagehide",
      () => setVisible(false),
      { once: true },
    );
  }

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe?.contentDocument?.readyState === "complete") {
      resizeIframe(iframe);
    }
  }, []);

  function removeHeader(doc: Document) {
    const headerDiv = doc.getElementById("headerdiv");
    headerDiv?.parentElement?.remove();

    for (const navbar of [...doc.getElementsByClassName("navbar ivy-subnav")]) {
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

  if (!data) {
    return <P className="text-n900">No legacy documentation data available.</P>;
  }

  return (
    <div className="flex flex-col gap-6">
      <H1 className="pt-8">Documentation {data.version}</H1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
          {data.releaseDocuments.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className={
                link.url === activeUrl
                  ? "text-primary font-semibold underline"
                  : "text-primary hover:underline"
              }
            >
              {link.text}
            </a>
          ))}
        </div>
        <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
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
        ref={iframeRef}
        key={data.documentUrl}
        src={data.documentUrl}
        title={data.version}
        onLoad={(event) => resizeIframe(event.currentTarget)}
        className={cn(
          "border-n200 min-h-[60vh] w-full rounded-lg border transition-opacity",
          visible ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
