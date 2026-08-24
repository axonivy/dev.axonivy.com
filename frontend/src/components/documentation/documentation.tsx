import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  IconArrowRight,
  IconBook2,
  IconNotes,
  IconRoute,
  IconListDetails,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { DocumentationSkeleton } from "@/components/skeletons/documentation-skeleton";

type DocLink = {
  url: string;
  text: string;
};

type DocVersionLinks = {
  version: string;
  links: DocLink[];
};

type UiDocResponse = {
  docLinksLTS: DocVersionLinks[];
  docLinksLE: DocVersionLinks[];
  docLinksDev: DocVersionLinks[];
};

const sections: Array<{ key: keyof UiDocResponse; title: string }> = [
  { key: "docLinksLTS", title: "LTS - Long Term Support" },
  { key: "docLinksLE", title: "LE - Leading Edge" },
  { key: "docLinksDev", title: "Development build" },
];

const SecondaryIconForText = ({ text }: { text: string }) => {
  const normalized = text.toLowerCase();
  if (normalized.includes("migration")) {
    return <IconRoute className="size-4 shrink-0" aria-hidden="true" />;
  }
  if (normalized.includes("release notes")) {
    return <IconListDetails className="size-4 shrink-0" aria-hidden="true" />;
  }
  return <IconNotes className="size-4 shrink-0" aria-hidden="true" />;
};

const getBadge = (
  sectionKey: keyof UiDocResponse,
  group: DocVersionLinks,
  groups: DocVersionLinks[],
): { label: string; variant: "green" | "orange" | "purple" } => {
  if (sectionKey === "docLinksLE") {
    return { label: "Latest features", variant: "orange" };
  }
  if (sectionKey === "docLinksDev") {
    return { label: "In development", variant: "purple" };
  }

  const newestVersion = Math.max(...groups.map((g) => parseFloat(g.version)));
  const isNewest = parseFloat(group.version) === newestVersion;
  return isNewest
    ? { label: "Stable", variant: "green" }
    : { label: "Maintenance", variant: "green" };
};

export default function Documentation() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["documentation"],
    queryFn: async () => {
      const response = await fetch("/ui/doc", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return (await response.json()) as UiDocResponse;
    },
  });

  if (isLoading) {
    return <DocumentationSkeleton />;
  }

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Failed to load documentation links: {error.message}
      </p>
    );
  }

  if (!data) {
    return (
      <p className="text-sm text-n900">No documentation data available.</p>
    );
  }

  const visibleSections = sections.filter(
    (section) => data[section.key].length > 0,
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {visibleSections.map((section) => {
        const groups = data[section.key];

        return (
          <div
            key={section.key}
            className={`flex min-w-0 flex-col gap-3 ${
              groups.length > 1 ? "md:col-span-2" : ""
            }`}
          >
            <h2 className="text-xl font-semibold">{section.title}</h2>

            <Card className="flex-1">
              <CardContent className="flex h-full flex-col gap-6 md:flex-row md:items-stretch">
                {groups.map((group, groupIndex) => {
                  const docLink = group.links.find((l) =>
                    l.text.toLowerCase().includes("documentation"),
                  );
                  const secondaryLinks = group.links.filter(
                    (l) => !l.text.toLowerCase().includes("documentation"),
                  );
                  const badge = getBadge(section.key, group, groups);

                  return (
                    <Fragment key={`${section.key}-${group.version}`}>
                      <div className="flex flex-1 flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-medium leading-tight">
                            Version {group.version}
                          </p>
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                        </div>

                        {docLink && (
                          <a
                            href={docLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={buttonVariants({
                              variant: "default",
                              size: "lg",
                              className: "group",
                            })}
                          >
                            <span className="flex w-full items-center gap-2">
                              <IconBook2
                                className="size-4 shrink-0"
                                aria-hidden="true"
                              />
                              Documentation
                            </span>
                            <IconArrowRight
                              className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                              aria-hidden="true"
                            />
                          </a>
                        )}

                        {secondaryLinks.length > 0 && (
                          <div
                            className="grid gap-2"
                            style={{
                              gridTemplateColumns: `repeat(${secondaryLinks.length}, minmax(0, 1fr))`,
                            }}
                          >
                            {secondaryLinks.map((link) => (
                              <a
                                key={`${section.key}-${group.version}-${link.url}`}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={buttonVariants({
                                  variant: "outline",
                                  size: "sm",
                                  className:
                                    "min-w-0 w-full h-auto flex-col gap-1 py-2 whitespace-normal! wrap-normal text-center",
                                })}
                              >
                                <SecondaryIconForText text={link.text} />
                                <span className="w-full min-w-0 text-xs">
                                  {link.text}
                                </span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      {groupIndex < groups.length - 1 && (
                        <>
                          <Separator
                            orientation="horizontal"
                            className="md:hidden"
                          />
                          <Separator
                            orientation="vertical"
                            className="hidden md:block"
                          />
                        </>
                      )}
                    </Fragment>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
