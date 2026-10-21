import {
  ScrollSpy,
  ScrollSpyLink,
  ScrollSpyNav,
  ScrollSpySection,
  ScrollSpyViewport,
} from "@/components/ui/scroll-spy";
import { IconCircleCheck, IconBulb } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import ReleaseCycleIllustration from "@/assets/release-cycle-illustration.svg?react";
import { Base, H3, H4, H6 } from "@/components/ui/typography";
import "@/translation/ui";
import type { Lang } from "@/translation/ui";
import { Trans, useTranslation } from "react-i18next";

export default function ReleaseCycleScrollspy({
  currentVersion,
  ltsVersion,
  lang,
}: {
  currentVersion: string;
  ltsVersion: string;
  lang: Lang;
}) {
  const { t } = useTranslation(undefined, { lng: lang });

  return (
    <div className="flex flex-col">
      <ScrollSpy offset={200} className="h-auto w-full gap-8">
        <ScrollSpyNav className="bg-background sticky top-40 z-10 hidden shrink-0 self-start pt-2.5 md:flex">
          <ScrollSpyLink value="LTS">
            {t("releaseCycle.lts.title")}
          </ScrollSpyLink>
          <ScrollSpyLink value="LE">{t("releaseCycle.le.title")}</ScrollSpyLink>
          <ScrollSpyLink value="Milestones">
            {t("releaseCycle.milestones.title")}
          </ScrollSpyLink>
          <ScrollSpyLink value="maintenance">
            {t("releaseCycle.maintenance.nav")}
          </ScrollSpyLink>
          <ScrollSpyLink value="illustration">
            {t("releaseCycle.illustration")}
          </ScrollSpyLink>
        </ScrollSpyNav>
        <ScrollSpyViewport className="p-4">
          <ScrollSpySection value="LTS" className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <H3>{t("releaseCycle.title")}</H3>
              <H6>{t("releaseCycle.subtitle")}</H6>
              <Base className="text-n900">
                <Trans
                  i18nKey="releaseCycle.intro"
                  t={t}
                  components={{ bold: <span className="font-semibold" /> }}
                />
              </Base>
            </div>
            <Separator />
            <div className="flex flex-col gap-4">
              <H4>{t("releaseCycle.lts.title")}</H4>
              <Base className="text-n900">
                {t("releaseCycle.lts.description")}
              </Base>
              <Base className="text-n900">{t("releaseCycle.lts.support")}</Base>
              <div className="flex flex-row items-center gap-2">
                <IconCircleCheck className="text-primary size-4" />
                <Base className="text-n900 font-semibold">
                  {t("releaseCycle.lts.current")}
                  <span className="font-normal">
                    {" "}
                    {ltsVersion} / {currentVersion}
                  </span>
                </Base>
              </div>
            </div>
            <Separator />
          </ScrollSpySection>
          <ScrollSpySection value="LE" className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <H4>{t("releaseCycle.le.title")}</H4>
              <Base className="text-n900">
                {t("releaseCycle.le.description")}
              </Base>
              <Base className="text-n900">
                {t("releaseCycle.le.newProjects")}
              </Base>
              <div className="flex flex-row items-center gap-2">
                <IconCircleCheck className="text-primary size-4" />
                <Base className="text-n900 font-semibold">
                  {t("releaseCycle.le.current")}
                  <span className="font-normal"> 13.2</span>
                </Base>
              </div>
              <div className="bg-n50 flex flex-col gap-4 rounded-md p-4 md:flex-row">
                <div className="bg-yellow-bg text-yellow flex h-fit w-fit rounded-md p-2">
                  <IconBulb className="size-8" />
                </div>
                <div className="flex flex-col gap-2">
                  <H4>{t("releaseCycle.upgrade.title")}</H4>
                  <Base className="text-n900">
                    {t("releaseCycle.upgrade.description")}
                  </Base>
                </div>
              </div>
            </div>
            <Separator />
          </ScrollSpySection>
          <ScrollSpySection value="Milestones" className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <H4>{t("releaseCycle.milestones.title")}</H4>
              <Base className="text-n900">
                {t("releaseCycle.milestones.description")}
              </Base>
            </div>
            <Separator />
          </ScrollSpySection>
          <ScrollSpySection value="maintenance" className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <H4>{t("releaseCycle.maintenance.title")}</H4>
              <Base className="text-n900">
                <Trans
                  i18nKey="releaseCycle.maintenance.description"
                  t={t}
                  components={{
                    mail: (
                      <a
                        className="text-primary"
                        href="mailto:support@axonivy.com"
                      />
                    ),
                  }}
                />
              </Base>
            </div>
            <Separator />
          </ScrollSpySection>
          <ScrollSpySection
            value="illustration"
            className="flex flex-col gap-8"
          >
            <div>
              <H4>{t("releaseCycle.illustration")}</H4>
              <ReleaseCycleIllustration className="h-auto w-full max-w-svw" />
            </div>
          </ScrollSpySection>
        </ScrollSpyViewport>
      </ScrollSpy>
    </div>
  );
}
