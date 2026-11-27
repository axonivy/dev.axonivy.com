import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { H4, H5, P } from "@/components/ui/typography";
import {
  IconArrowRight,
  IconBook2,
  IconListDetails,
  IconNotes,
  IconRoute,
} from "@tabler/icons-react";
import { Fragment } from "react";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import type { Lang } from "@/translation/ui";

type DocLink = { url: string; text: string };

type DocVersionLinks = { version: string; links: DocLink[] };

export type UiDocResponse = {
  docLinksLTS: DocVersionLinks[];
  docLinksArchiveLTS: DocVersionLinks[];
  docLinksLE: DocVersionLinks[];
  docLinksDev: DocVersionLinks[];
};

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
  t: TFunction,
): { label: string; variant: "green" | "orange" | "purple" | "gray" } => {
  if (sectionKey === "docLinksLE") {
    return {
      label: t("documentation.badges.latestFeatures"),
      variant: "orange",
    };
  }
  if (sectionKey === "docLinksDev") {
    return {
      label: t("documentation.badges.inDevelopment"),
      variant: "purple",
    };
  }
  if (sectionKey === "docLinksArchiveLTS") {
    return { label: t("documentation.badges.archived"), variant: "gray" };
  }

  const newestVersion = Math.max(...groups.map((g) => parseFloat(g.version)));
  const isNewest = parseFloat(group.version) === newestVersion;
  return isNewest
    ? { label: t("documentation.badges.stable"), variant: "green" }
    : { label: t("documentation.badges.maintenance"), variant: "green" };
};

export default function Documentation({
  data,
  archived,
  lang,
}: {
  data: UiDocResponse;
  archived?: boolean;
  lang: Lang;
}) {
  const { t } = useTranslation(undefined, { lng: lang });

  if (!data) {
    return <P className="text-n900">{t("documentation.noData")}</P>;
  }

  const sections: Array<{ key: keyof UiDocResponse; title: string }> = [
    { key: "docLinksLTS", title: t("documentation.sections.lts") },
    { key: "docLinksArchiveLTS", title: t("documentation.sections.archive") },
    { key: "docLinksLE", title: t("documentation.sections.leadingEdge") },
    { key: "docLinksDev", title: t("documentation.sections.developmentBuild") },
  ];

  const visibleSections = sections.filter(
    (section) =>
      (section.key === "docLinksArchiveLTS") === !!archived &&
      data[section.key].length > 0,
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {visibleSections.map((section) => {
        const groups =
          section.key === "docLinksLTS" || section.key === "docLinksArchiveLTS"
            ? [...data[section.key]].sort((first, second) =>
                second.version.localeCompare(first.version, undefined, {
                  numeric: true,
                }),
              )
            : data[section.key];

        return (
          <div
            key={section.key}
            className={`flex min-w-0 flex-col gap-3 ${
              groups.length > 1 ? "md:col-span-2" : ""
            }`}
          >
            <H4>{section.title}</H4>

            <Card className="flex-1">
              <CardContent className="flex h-full flex-col gap-6 md:flex-row md:items-stretch">
                {groups.map((group, groupIndex) => {
                  const links =
                    section.key === "docLinksDev"
                      ? group.links.filter(
                          (link) =>
                            !link.url
                              .toLowerCase()
                              .includes("new-and-noteworthy"),
                        )
                      : group.links;
                  const docLink = links.find((l) =>
                    l.text.toLowerCase().includes("documentation"),
                  );
                  const secondaryLinks = links.filter(
                    (l) => !l.text.toLowerCase().includes("documentation"),
                  );
                  const badge = getBadge(section.key, group, groups, t);

                  return (
                    <Fragment key={`${section.key}-${group.version}`}>
                      <div className="flex flex-1 flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <H5 className="leading-tight">
                            {t("documentation.version", {
                              version: group.version,
                            })}
                          </H5>
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
                              {t("documentation.link")}
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
                                    "h-auto w-full min-w-0 flex-col gap-1 py-2 text-center wrap-normal whitespace-normal!",
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
