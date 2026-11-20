import type { DownloadRelease } from "@/components/download/download-artifacts";
import { DownloadCards } from "@/components/download/download-cards";
import { Base, H2, H4, H5, P } from "@/components/ui/typography";
import { IconArrowRight, IconRefresh } from "@tabler/icons-react";
import { localePath } from "@/translation/language";
import type { Lang } from "@/translation/ui";
import { useTranslation } from "react-i18next";

export type UiDownloadResponse = {
  ltsCurrent: DownloadRelease[];
  ltsMaintenance: DownloadRelease[];
  le: DownloadRelease[];
  dev: DownloadRelease[];
};

export default function Download({
  data,
  lang,
}: {
  data: UiDownloadResponse;
  lang: Lang;
}) {
  const { t } = useTranslation(undefined, { lng: lang });

  if (!data) {
    return <P className="text-n900">{t("download.noData")}</P>;
  }

  const hasReleases = [
    data.ltsCurrent[0],
    data.ltsMaintenance[0],
    data.le[0],
    data.dev[0],
  ].some(Boolean);
  if (!hasReleases) {
    return <P className="text-n900">{t("download.noData")}</P>;
  }

  return (
    <div className="flex flex-col gap-12 md:gap-24">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          <DownloadCards
            release={data.ltsCurrent[0]}
            isLts={true}
            badge={t("download.labels.stable")}
            lang={lang}
          />
        </div>
        <a
          href={localePath(lang, "/download/release-cycle")}
          className="group bg-n50 flex min-w-0 flex-row items-center justify-between gap-3 rounded-md p-4 md:gap-4"
        >
          <div className="grid min-w-0 flex-1 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1 md:gap-x-4">
            <div className="bg-blue-bg text-blue row-start-1 shrink-0 rounded-md p-2 md:row-span-2">
              <IconRefresh className="size-8" />
            </div>
            <H5>{t("download.releaseCycle.title")}</H5>
            <Base className="text-n900 col-span-2 md:col-span-1">
              {t("download.releaseCycle.description")}
            </Base>
          </div>
          <IconArrowRight className="text-primary size-6 shrink-0 self-end transition-transform duration-200 group-hover:translate-x-1 md:self-center" />
        </a>
      </div>
      <div className="flex flex-col gap-4 md:gap-6">
        <H2>
          {t("download.maintenance.title", {
            version: data.ltsMaintenance[0].versionShort,
          })}
        </H2>
        <H4>{t("download.maintenance.description")}</H4>
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          <DownloadCards
            release={data.ltsMaintenance[0]}
            isLts={true}
            badge={t("download.labels.maintenance")}
            lang={lang}
          />
        </div>
      </div>
      {data.le.length !== 0 && (
        <div className="flex flex-col gap-4 md:gap-6">
          <H2>{t("download.leadingEdge.title")}</H2>
          <H4>
            {t("download.leadingEdge.descriptionBefore")}
            <br />
            {t("download.leadingEdge.descriptionAfter")}
          </H4>
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
            <DownloadCards
              release={data.le[0]}
              isLts={false}
              badge={t("download.labels.latestFeatures")}
              lang={lang}
            />
          </div>
        </div>
      )}
    </div>
  );
}
