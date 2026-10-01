import {
  ScrollSpy,
  ScrollSpyLink,
  ScrollSpyNav,
  ScrollSpySection,
  ScrollSpyViewport,
} from "@/components/ui/scroll-spy";
import {
  IconBook2,
  IconBrandDocker,
  IconBrandVscode,
  IconDownload,
  IconFileDescription,
  IconMap2,
  IconMessageChatbot,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type {
  InstallationGuide,
  InstallationSubstep,
} from "@/data/installation-guides";
import { Base, H3, H4, H6 } from "@/components/ui/typography";
import { DockerCommandBlock } from "@/components/download/installation/docker-command-block";
import { HelpBox } from "@/components/help-box";

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

function safeUrl(value: string | undefined) {
  if (!value || typeof window === "undefined") return undefined;
  try {
    const url = new URL(value, window.location.origin);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
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

function GuideLinkButton({
  href,
  icon: Icon,
  external = true,
  children,
}: {
  href: string | undefined;
  icon: React.ElementType;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(buttonVariants({ className: "h-10 w-fit justify-start" }))}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      {children}
    </a>
  );
}

type InstallationScrollSpyProps = { guideId: string; guide: InstallationGuide };

export default function InstallationScrollSpy({
  guideId,
  guide,
}: InstallationScrollSpyProps) {
  const [downloadUrl] = useState(() => safeUrl(queryParameter("downloadUrl")));
  const [docLink] = useState(() => safeUrl(queryParameter("docLink")));

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
              {guide.type === "Docker" ? (
                <>
                  for{" "}
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Docker
                  </a>
                </>
              ) : guide.type !== "Engine" ? (
                `for ${guide.type}`
              ) : null}
            </Base>
            {guide.hint ? (
              <div className="border-info bg-info-bg flex flex-col gap-4 rounded-md border p-4">
                <H4>{guide.hint.title}</H4>
                <Base className="text-n900">{guide.hint.description}</Base>
              </div>
            ) : null}
          </div>
          <Separator />
          {guide.steps.map((step, stepIndex) => {
            const substeps = visibleSubsteps(guideId, step.substeps);
            const dockerCommand =
              guideId === "docker"
                ? step.substeps?.find((substep) => substep.id === 2.1)
                : undefined;

            return (
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
                {substeps.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {substeps.map((substep) => (
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
                {dockerCommand ? (
                  <div className="w-full">
                    <DockerCommandBlock
                      command={dockerCommand.title
                        .split(/\s*<br\s*\/?>\s*/i)
                        .join("\n")}
                    />
                  </div>
                ) : null}
                {step.id === 1 &&
                guideId !== "docker" &&
                guideId !== "designer-vscode" &&
                downloadUrl ? (
                  <GuideLinkButton
                    href={downloadUrl}
                    icon={IconDownload}
                    external={false}
                  >
                    Download Axon Ivy {guide.product}
                  </GuideLinkButton>
                ) : null}
                {(guideId === "docker" || guideId === "designer-vscode") &&
                step.id === 1 &&
                step.url ? (
                  <GuideLinkButton href={step.url} icon={IconBook2}>
                    Official guide
                  </GuideLinkButton>
                ) : null}
                {guideId === "designer-vscode" &&
                step.id === 2 &&
                downloadUrl ? (
                  <GuideLinkButton href={downloadUrl} icon={IconBrandVscode}>
                    Open VS Code Marketplace
                  </GuideLinkButton>
                ) : null}
                {stepIndex < guide.steps.length - 1 ? <Separator /> : null}
              </ScrollSpySection>
            );
          })}
          {guideId.startsWith("designer-") ? (
            <HelpBox
              icon={IconMap2}
              links={[
                {
                  icon: IconMessageChatbot,
                  title: "Tutorials",
                  description: "Learn how to use the Designer.",
                  href: "https://www.axonivy.com/tutorials",
                  linkLabel: "Go to Tutorials",
                  external: true,
                },
                {
                  icon: IconFileDescription,
                  title: "Documentation",
                  description: "Find guides and references.",
                  href: "/doc",
                  linkLabel: "Go to Documentation",
                },
              ]}
            />
          ) : null}
          {guideId === "engine" && docLink ? (
            <GuideLinkButton href={docLink} icon={IconBook2}>
              Getting Started
            </GuideLinkButton>
          ) : null}
          {guideId === "docker" ? (
            <GuideLinkButton
              href={guide.steps.at(-1)?.url}
              icon={IconBrandDocker}
            >
              Getting Started with Docker
            </GuideLinkButton>
          ) : null}
        </ScrollSpyViewport>
      </ScrollSpy>
    </div>
  );
}
