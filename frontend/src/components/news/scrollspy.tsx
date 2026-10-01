import {
  ScrollSpy,
  ScrollSpyLink,
  ScrollSpyNav,
  ScrollSpySection,
  ScrollSpyViewport,
} from "@/components/ui/scroll-spy";
import {
  IconArrowUpRight,
  IconCalendar,
  IconDownload,
} from "@tabler/icons-react";
import type { NewsBlock, NewsLink } from "@/data/news/news";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import { Base, H3, H4, H6 } from "@/components/ui/typography";
import { NewsContent } from "@/components/news/news-content";
import { NewsImageGallery } from "@/components/news/news-image-gallery";

export type NewsScrollSpySection = {
  heading: string;
  anchor: string | null;
  content: NewsBlock[];
  links: NewsLink[];
  images: string[];
};

type NewsScrollSpyProps = {
  title: string;
  slogan: string | null;
  tag: "Long Term Support" | "Leading Edge" | "Archived";
  releaseDate: string;
  downloadUrl: string;
  releaseNotesUrl: string;
  migrationGuideUrl: string;
  sections: NewsScrollSpySection[];
};

export function sectionValue(
  section: NewsScrollSpySection,
  index: number,
  sections: NewsScrollSpySection[],
) {
  const value = section.anchor ?? `section-${index + 1}`;
  const firstValueIndex = sections.findIndex(
    (otherSection, otherIndex) =>
      (otherSection.anchor ?? `section-${otherIndex + 1}`) === value,
  );

  return firstValueIndex === index ? value : `${value}-${index + 1}`;
}

export default function NewsScrollSpy({
  title,
  slogan,
  tag,
  releaseDate,
  downloadUrl,
  releaseNotesUrl,
  sections,
  migrationGuideUrl,
}: NewsScrollSpyProps) {
  const defaultSection = sections[0]
    ? sectionValue(sections[0], 0, sections)
    : undefined;

  return (
    <div className="flex flex-col">
      <ScrollSpy
        offset={200}
        defaultValue={defaultSection}
        className="h-auto w-full gap-8"
      >
        <ScrollSpyNav className="bg-background sticky top-40 z-10 hidden shrink-0 self-start pt-2.5 md:flex">
          {sections.map((section, index) => (
            <ScrollSpyLink
              key={sectionValue(section, index, sections)}
              value={sectionValue(section, index, sections)}
            >
              {section.heading}
            </ScrollSpyLink>
          ))}
        </ScrollSpyNav>
        <ScrollSpyViewport className="p-4">
          <div className="border-n200 flex flex-col gap-4 border-b pb-8">
            <Badge
              variant={
                tag === "Long Term Support"
                  ? "green"
                  : tag === "Leading Edge"
                    ? "orange"
                    : "gray"
              }
              className="uppercase"
            >
              {tag}
            </Badge>
            <H3>{title}</H3>
            <H6>{slogan}</H6>
            <span className="text-n900 flex flex-row items-center gap-2">
              <IconCalendar className="size-4 shrink-0" />
              {releaseDate}
            </span>
            <div className="flex flex-col gap-4 md:flex-row">
              <a
                href={downloadUrl}
                className={buttonVariants({ variant: "default", size: "lg" })}
              >
                <IconDownload className="size-4 shrink-0" />
                Download
              </a>
              <div className="grid grid-cols-2 gap-4">
                {tag === "Long Term Support" || tag === "Leading Edge" ? (
                  <a
                    href={releaseNotesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "lg",
                        className: "w-full md:w-auto",
                      }),
                    )}
                  >
                    Release Notes
                    <IconArrowUpRight className="size-4 shrink-0" />
                  </a>
                ) : null}
                <a
                  href={migrationGuideUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "lg",
                      className: "w-full md:w-auto",
                    }),
                  )}
                >
                  Migration Guide
                  <IconArrowUpRight className="size-4 shrink-0" />
                </a>
              </div>
            </div>
          </div>
          {sections.map((section, index) => (
            <ScrollSpySection
              key={sectionValue(section, index, sections)}
              value={sectionValue(section, index, sections)}
              className="border-n200 flex flex-col gap-6 border-b pb-12 last:border-b-0"
            >
              <H4>{section.heading}</H4>
              <NewsContent content={section.content} />
              {section.links ? (
                <p className="leading-7">
                  {section.links.map((link, linkIndex) => (
                    <Fragment key={link.url}>
                      <a
                        href={link.url}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                        <IconArrowUpRight className="ml-1 inline-block size-4 align-middle" />
                      </a>
                      {linkIndex < section.links.length - 1 ? (
                        <span className="text-p75 mx-3">•</span>
                      ) : null}
                    </Fragment>
                  ))}
                </p>
              ) : null}
              {section.images ? (
                <div className="flex flex-col gap-4">
                  <Base className="font-semibold">Demo screenshots:</Base>
                  <div className="flex flex-col gap-4">
                    <NewsImageGallery
                      images={section.images}
                      title={section.heading}
                    />
                  </div>
                </div>
              ) : null}
            </ScrollSpySection>
          ))}
        </ScrollSpyViewport>
      </ScrollSpy>
    </div>
  );
}
