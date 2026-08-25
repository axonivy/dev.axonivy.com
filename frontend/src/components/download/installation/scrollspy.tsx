import {
  ScrollSpy,
  ScrollSpyLink,
  ScrollSpyNav,
  ScrollSpySection,
  ScrollSpyViewport,
} from "@/components/ui/scroll-spy";
import {
  IconArrowRight,
  IconBook2,
  IconBrandDocker,
  IconCheck,
  IconCopy,
  IconDownload,
  IconFileDescription,
  IconMap2,
  IconMessageChatbot,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";

const installationImages = import.meta.glob(
  "/src/assets/installation/**/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default", query: "?url" },
) as Record<string, string>;

function imageUrl(path: string) {
  return installationImages[`/src/assets/installation/${path}`];
}

function queryParameter(name: string) {
  if (typeof window === "undefined") return undefined;
  return new URLSearchParams(window.location.search).get(name) ?? undefined;
}

function DockerCommandBlock({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-start justify-between gap-4 rounded-md bg-n100 p-4 text-n900">
      <code className="min-w-0 flex-1 whitespace-pre-line wrap-break-word font-code text-sm">
        {command}
      </code>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={copyCommand}
        aria-label={copied ? "Command copied" : "Copy command"}
      >
        {copied ? (
          <IconCheck className="size-4" aria-hidden="true" />
        ) : (
          <IconCopy className="size-4" aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}

export type InstallationSubstep = {
  id: string;
  title: string;
  img?: string;
};

export type InstallationStep = {
  id: string;
  title: string;
  url?: string;
  img?: string;
  substeps?: InstallationSubstep[];
};

export type InstallationGuide = {
  title: string;
  type: string;
  product: "designer" | "engine";
  hint?: {
    title: string;
    description: string;
  };
  steps: InstallationStep[];
};

type InstallationScrollSpyProps = {
  guideId: string;
  guide: InstallationGuide;
};

export default function InstallationScrollSpy({
  guideId,
  guide,
}: InstallationScrollSpyProps) {
  const [downloadUrl] = useState(() => queryParameter("downloadUrl"));
  const [docLink] = useState(() => queryParameter("docLink"));

  return (
    <div className="flex flex-col">
      <ScrollSpy offset={200} className="h-auto w-full gap-8">
        <ScrollSpyNav className="sticky top-50 z-10 hidden shrink-0 self-start bg-white pt-2.5 md:flex">
          {guide.steps.map((step) => (
            <ScrollSpyLink key={step.id} value={`step-${step.id}`}>
              {step.title}
            </ScrollSpyLink>
          ))}
        </ScrollSpyNav>
        <ScrollSpyViewport className="p-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold">{guide.title}</h1>
            <p className="uppercase font-semibold text-n800 tracking-widest">
              Step-by-step guide
            </p>
            <p className="text-n900">
              Follow these steps to download and install Axon Ivy{" "}
              {guide.product}{" "}
              {guide.type != "Engine" ? `for ${guide.type}` : ""}.
            </p>
            {guide.hint ? (
              <div className="flex flex-col gap-4 rounded-md bg-yellow-bg border border-yellow p-4">
                <h2 className="text-xl font-semibold">{guide.hint.title}</h2>
                <p className="text-n900">{guide.hint.description}</p>
              </div>
            ) : null}
          </div>
          <Separator />
          {guide.steps.map((step, stepIndex) => (
            <ScrollSpySection
              key={step.id}
              value={`step-${step.id}`}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-row gap-2 items-center">
                <div className="flex size-6.5 shrink-0 items-center justify-center rounded-full border border-primary bg-accent text-primary">
                  {step.id}
                </div>
                <h2 className="text-xl font-semibold">{step.title}</h2>
              </div>
              {step.img && imageUrl(step.img) ? (
                <img
                  src={imageUrl(step.img)}
                  alt={step.title}
                  className="h-auto w-full"
                />
              ) : null}
              {step.substeps?.some(
                (substep) => !(guideId === "docker" && substep.id === "2.1"),
              ) ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {step.substeps
                    .filter(
                      (substep) =>
                        !(guideId === "docker" && substep.id === "2.1"),
                    )
                    .map((substep) => (
                      <div key={substep.id} className="flex flex-col gap-4">
                        <p>
                          {substep.id} {substep.title}
                        </p>
                        {substep.img && imageUrl(substep.img) ? (
                          <img
                            src={imageUrl(substep.img)}
                            alt={substep.title}
                            className="h-auto w-full"
                          />
                        ) : null}
                      </div>
                    ))}
                </div>
              ) : null}
              {guideId === "docker"
                ? step.substeps?.map((substep) =>
                    substep.id === "2.1" ? (
                      <div key={substep.id} className="w-full">
                        <DockerCommandBlock
                          command={substep.title
                            .split(/\s*<br\s*\/?>\s*/i)
                            .join("\n")}
                        />
                      </div>
                    ) : null,
                  )
                : null}
              {step.id === "1" && guideId !== "docker" && downloadUrl ? (
                <a
                  href={downloadUrl}
                  className={buttonVariants({
                    className: "h-10 w-fit justify-start",
                  })}
                >
                  <IconDownload
                    className="size-5 shrink-0"
                    aria-hidden="true"
                  />
                  Download Axon Ivy {guide.product}
                </a>
              ) : null}
              {guideId === "docker" && step.id === "1" && step.url ? (
                <a
                  href={step.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    className: "h-10 w-fit justify-start",
                  })}
                >
                  <IconBook2 className="size-5 shrink-0" aria-hidden="true" />
                  Official guide
                </a>
              ) : null}
              {stepIndex < guide.steps.length - 1 ? <Separator /> : null}
            </ScrollSpySection>
          ))}
          {guideId.startsWith("designer-") ? (
            <div className="flex flex-col items-stretch gap-4 rounded-md bg-n50 p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full flex-row items-center gap-4 md:w-auto">
                <div className="bg-orange-bg text-orange shrink-0 rounded-md p-2">
                  <IconMap2 className="size-8" />
                </div>
                <p className="text-n900">
                  We're here to help <br /> you get started.
                </p>
              </div>
              <Separator orientation="horizontal" className="md:hidden" />
              <Separator
                orientation="vertical"
                className="hidden shrink-0 md:block"
              />
              <div className="flex w-full flex-col md:w-auto">
                <div className="flex flex-row gap-1 items-center">
                  <IconMessageChatbot className="size-5" />
                  <p className="text-lg">Tutorials</p>
                </div>
                <p className="text-n900">Learn how to use the Designer.</p>
                <a
                  href="https://www.axonivy.com/tutorials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-primary"
                >
                  <span className="flex items-center gap-2">
                    Go to tutorials
                    <IconArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </a>
              </div>
              <Separator orientation="horizontal" className="md:hidden" />
              <Separator
                orientation="vertical"
                className="hidden shrink-0 md:block"
              />
              <div className="flex w-full flex-col md:w-auto">
                <div className="flex flex-row gap-1 items-center">
                  <IconFileDescription className="size-5" />
                  <p className="text-lg">Documentation</p>
                </div>
                <p className="text-n900">Find guides and references.</p>
                <a href="/support" className="group text-primary">
                  <span className="flex items-center gap-2">
                    Go to Docs
                    <IconArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </a>
              </div>
            </div>
          ) : null}
          {guideId === "engine" && docLink ? (
            <a
              href={`${docLink}/engine-guide/getting-started/index.html`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                className: "h-10 w-fit justify-start",
              })}
            >
              <IconBook2 className="size-5 shrink-0" aria-hidden="true" />
              Getting Started
            </a>
          ) : null}
          {guideId === "docker" ? (
            <a
              href={guide.steps.at(-1)?.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                className: "h-10 w-fit justify-start",
              })}
            >
              <IconBrandDocker className="size-5 shrink-0" aria-hidden="true" />
              Getting Started with Docker
            </a>
          ) : null}
        </ScrollSpyViewport>
      </ScrollSpy>
    </div>
  );
}
