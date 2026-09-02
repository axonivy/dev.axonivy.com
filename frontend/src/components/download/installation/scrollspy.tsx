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
import type {
  InstallationGuide,
  InstallationSubstep,
} from "@/data/installation-guides";
import { Base, H3, H4, H5, H6 } from "@/components/ui/typography";

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

function visibleSubsteps(
  guideId: string,
  substeps: InstallationSubstep[] | undefined,
) {
  return (
    substeps?.filter(
      (substep) => !(guideId === "docker" && substep.id === 2.1),
    ) ?? []
  );
}

function InfoBoxLink({
  icon,
  title,
  description,
  link,
  external,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  external: boolean;
}) {
  return (
    <div className="flex w-full flex-col md:w-auto">
      <a
        href={link}
        target={external ? "_blank" : "_self"}
        rel={external ? "noopener noreferrer" : undefined}
        className="flex flex-row items-center justify-between gap-3 md:hidden"
      >
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-1">
            {icon}
            <H5>{title}</H5>
          </div>
          <Base className="text-n900">{description}</Base>
        </div>
        <IconArrowRight className="size-8 shrink-0" />
      </a>

      <div className="hidden md:flex md:flex-col">
        <div className="flex flex-row items-center gap-1">
          {icon}
          <H5>{title}</H5>
        </div>
        <Base className="text-n900">{description}</Base>
        <a
          href={link}
          target={external ? "_blank" : "_self"}
          rel={external ? "noopener noreferrer" : undefined}
          className="group text-primary"
        >
          <span className="flex items-center gap-2">
            Go to {title}
            <IconArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </a>
      </div>
    </div>
  );
}

function DockerCommandBlock({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-n100 text-n900 flex items-start justify-between gap-4 rounded-md p-4">
      <code className="font-code min-w-0 flex-1 text-sm wrap-break-word whitespace-pre-line">
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
        <ScrollSpyNav className="bg-background sticky top-40 z-10 hidden shrink-0 self-start pt-2.5 md:flex">
          {guide.steps.map((step) => (
            <ScrollSpyLink key={step.id} value={`step-${step.id}`}>
              {step.title}
            </ScrollSpyLink>
          ))}
        </ScrollSpyNav>
        <ScrollSpyViewport className="p-4">
          <div className="flex flex-col gap-4">
            <H3>{guide.title}</H3>
            <H6>Step-by-step guide</H6>
            <Base className="text-n900">
              Follow these steps to download and install Axon Ivy{" "}
              {guide.product}{" "}
              {guide.type != "Engine" ? `for ${guide.type}` : ""}.
            </Base>
            {guide.hint ? (
              <div className="flex flex-col gap-4 rounded-md border border-[#FFC696] bg-[#FFF1E6] p-4">
                <H4>{guide.hint.title}</H4>
                <Base className="text-n900">{guide.hint.description}</Base>
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
              <div className="flex flex-row items-center gap-2">
                <div className="border-primary bg-accent text-primary flex size-6.5 shrink-0 items-center justify-center rounded-full border">
                  {step.id}
                </div>
                <H4>{step.title}</H4>
              </div>
              {step.img && imageUrl(step.img) ? (
                <img
                  src={imageUrl(step.img)}
                  alt={step.title}
                  className="h-auto w-full"
                />
              ) : null}
              {visibleSubsteps(guideId, step.substeps).length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {visibleSubsteps(guideId, step.substeps).map((substep) => (
                    <div key={substep.id} className="flex flex-col gap-4">
                      <Base>
                        {substep.id} {substep.title}
                      </Base>
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
                    substep.id === 2.1 ? (
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
              {step.id === 1 && guideId !== "docker" ? (
                <>
                  {downloadUrl ? (
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
                </>
              ) : null}
              {guideId === "docker" && step.id === 1 && step.url ? (
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
            <div className="bg-n50 flex flex-col items-stretch gap-4 rounded-md p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full flex-row items-center gap-4 md:w-auto">
                <div className="bg-orange-bg text-orange shrink-0 rounded-md p-2">
                  <IconMap2 className="size-8" />
                </div>
                <Base className="text-n900">
                  We're here to help <br className="hidden md:block" />
                  you get started.
                </Base>
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                <Separator orientation="horizontal" className="md:hidden" />
                <Separator
                  orientation="vertical"
                  className="hidden shrink-0 md:block"
                />
                <InfoBoxLink
                  icon={<IconMessageChatbot className="size-5" />}
                  title="Tutorials"
                  description="Learn how to use the Designer."
                  link="https://www.axonivy.com/tutorials"
                  external
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                <Separator orientation="horizontal" className="md:hidden" />
                <Separator
                  orientation="vertical"
                  className="hidden shrink-0 md:block"
                />
                <InfoBoxLink
                  icon={<IconFileDescription className="size-5" />}
                  title="Documentation"
                  description="Find guides and references."
                  link="/doc"
                  external={false}
                />
              </div>
            </div>
          ) : null}
          {guideId === "engine" ? (
            <>
              {docLink ? (
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
            </>
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
