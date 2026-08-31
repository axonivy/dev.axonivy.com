import {
  ScrollSpy,
  ScrollSpyLink,
  ScrollSpyNav,
  ScrollSpySection,
  ScrollSpyViewport,
} from "@/components/ui/scroll-spy";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheck,
  IconDownload,
  IconExternalLink,
  IconZoomIn,
} from "@tabler/icons-react";
import type { NewsBlock, NewsLink, NewsListItem } from "@/data/news/news";
import { buttonVariants } from "@/components/ui/button";
import { useState, type KeyboardEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Base, H3, H4, H5, H6 } from "@/components/ui/typography";

const newsImages = import.meta.glob(
  "/src/assets/news/**/*.{gif,jpeg,jpg,png,webp,PNG}",
  { eager: true, import: "default", query: "?url" },
) as Record<string, string>;

type NewsScrollSpySection = {
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

function imageUrl(image: string) {
  return newsImages[`/src/assets/news/${image}`] ?? `/src/assets/news/${image}`;
}

function sectionValue(
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

function InlineText({ text }: { text: string }) {
  const parts = text.split(
    /(`[^`]+`|\*\*[^*]+\*\*|<a\s+href="[^"]+">.*?<\/a>|<code>.*?<\/code>)/g,
  );

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={index}
              className="rounded bg-n100 px-1.5 py-0.5 font-mono text-[0.9em] text-n900"
            >
              {part.slice(1, -1)}
            </code>
          );
        }

        const link = part.match(/^<a\s+href="([^"]+)">(.*)<\/a>$/);
        if (link) {
          return (
            <a
              key={index}
              href={link[1]}
              className="text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link[2]}
            </a>
          );
        }

        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }

        const code = part.match(/^<code>(.*)<\/code>$/);
        if (code) {
          return (
            <code
              key={index}
              className="rounded bg-n100 px-1.5 py-0.5 font-mono text-[0.9em] text-n900"
            >
              {code[1]}
            </code>
          );
        }

        return part;
      })}
    </>
  );
}

function NewsList({ items }: { items: NewsListItem[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, index) => (
        <li
          key={`${item.term ?? item.text}-${index}`}
          className="flex flex-col gap-2"
        >
          <span className="flex items-start gap-2">
            <IconCircleCheck className="mt-1 size-4 shrink-0 text-primary" />
            <Base className="text-n900">
              {item.term ? (
                <strong className="font-semibold">
                  <InlineText text={item.term} />:{" "}
                </strong>
              ) : null}
              <InlineText text={item.text} />
            </Base>
          </span>
          {item.items && item.items.length > 0 ? (
            <div className="pl-6">
              <NewsList items={item.items} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function NewsContent({ content }: { content: NewsBlock[] }) {
  return (
    <div className="flex flex-col gap-4">
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <Base key={index} className="leading-relaxed text-n900">
                <InlineText text={block.text} />
              </Base>
            );
          case "list":
            return <NewsList key={index} items={block.items} />;
          case "heading":
            return (
              <H5 key={index}>
                <InlineText text={block.text} />
              </H5>
            );
          case "code":
            return (
              <pre
                key={index}
                className="overflow-x-auto rounded-lg bg-n100 p-4"
              >
                <code className="font-code text-sm text-n900">
                  {block.code}
                </code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function NewsImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const showPrev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);
  const showNext = () => setIndex((i) => (i + 1) % images.length);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 justify-items-center">
        {images.map((image, i) => (
          <button
            key={image}
            type="button"
            onClick={() => openAt(i)}
            className="group relative rounded-lg p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <img
              src={imageUrl(image)}
              alt={title}
              className="max-h-32 rounded-lg transition-opacity group-hover:opacity-80"
              loading="lazy"
            />
            <span className="absolute right-2 bottom-2 flex size-8 items-center justify-center rounded-md bg-background/90 text-n900 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <IconZoomIn className="size-4" />
              <span className="sr-only">Open image preview</span>
            </span>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          onKeyDown={handleKeyDown}
          className="overflow-auto sm:max-w-5xl p-0"
        >
          <div className="relative">
            <img
              src={imageUrl(images[index])}
              alt={title}
              className="max-h-[calc(100vh-5rem)] max-w-[calc(100vw-1rem)] w-full rounded-lg"
            />
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-n900 shadow-sm hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <IconChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-n900 shadow-sm hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <IconChevronRight className="size-4" />
                </button>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background/90 py-1 px-2 text-xs font-medium text-n900 shadow-sm">
                  {index + 1} / {images.length}
                </span>
              </>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
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
        <ScrollSpyNav className="sticky top-40 z-10 hidden shrink-0 self-start bg-background pt-2.5 md:flex">
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
          <div className="flex flex-col gap-4 border-b border-n200 pb-8">
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
            <H4>{title}</H4>
            <H6>{slogan}</H6>
            <span className="flex flex-row gap-2 text-n900 items-center">
              <IconCalendar className="size-4 shrink-0" />
              {releaseDate}
            </span>
            <div className="flex flex-col md:flex-row gap-4">
              <a
                href={downloadUrl}
                className={buttonVariants({ variant: "default", size: "lg" })}
              >
                <IconDownload className="size-4 shrink-0" />
                Download
              </a>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={releaseNotesUrl}
                  className={
                    buttonVariants({ variant: "outline", size: "lg" }) +
                    " w-full md:w-auto"
                  }
                >
                  Release Notes
                  <IconExternalLink className="size-4 shrink-0" />
                </a>
                <a
                  href={migrationGuideUrl}
                  className={
                    buttonVariants({ variant: "outline", size: "lg" }) +
                    " w-full md:w-auto"
                  }
                >
                  Migration Guide
                  <IconExternalLink className="size-4 shrink-0" />
                </a>
              </div>
            </div>
          </div>
          {sections.map((section, index) => (
            <ScrollSpySection
              key={sectionValue(section, index, sections)}
              value={sectionValue(section, index, sections)}
              className="flex flex-col gap-6 border-b border-n200 pb-12 last:border-b-0"
            >
              <H3>{section.heading}</H3>
              <NewsContent content={section.content} />
              {section.links.length > 0 ? (
                <ul className="flex flex-wrap items-center gap-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={link.url} className="flex items-center gap-2">
                      {linkIndex > 0 ? (
                        <span className="text-p75">•</span>
                      ) : null}
                      <a
                        href={link.url}
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                        <IconExternalLink className="size-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.images.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <Base className="font-semibold">Demo screenshots:</Base>
                  {section.images.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      <NewsImageGallery
                        images={section.images}
                        title={section.heading}
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </ScrollSpySection>
          ))}
        </ScrollSpyViewport>
      </ScrollSpy>
    </div>
  );
}
