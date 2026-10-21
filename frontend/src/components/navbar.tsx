import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Base, H6 } from "@/components/ui/typography";
import { localePath } from "@/translation/language";
import "@/translation/ui";
import type { Lang } from "@/translation/ui";
import {
  IconArrowUpRight,
  IconChevronDown,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import type { TFunction } from "i18next";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./language-switcher";

type NavLink = {
  label: string;
  description?: string;
  href: string;
  external: boolean;
};

type NavGroup = { label: string; items: { label: string; items: NavLink[] }[] };

const getNavItems = (t: TFunction, lang: Lang): (NavLink | NavGroup)[] => [
  {
    label: t("common.download"),
    href: localePath(lang, "/download"),
    external: false,
  },
  { label: t("nav.doc"), href: localePath(lang, "/doc"), external: false },
  {
    label: t("nav.resources"),
    items: [
      {
        label: t("nav.productInfo"),
        items: [
          {
            label: t("nav.releaseCycle"),
            description: t("nav.releaseCycleDescription"),
            href: localePath(lang, "/download/release-cycle"),
            external: false,
          },
          {
            label: t("nav.deprecation"),
            description: t("nav.deprecationDescription"),
            href: localePath(lang, "/deprecation"),
            external: false,
          },
        ],
      },
      {
        label: t("nav.external"),
        items: [
          {
            label: t("nav.market"),
            description: t("nav.marketDescription"),
            href: "https://market.axonivy.com/",
            external: false,
          },
          {
            label: t("nav.community"),
            description: t("nav.communityDescription"),
            href: "https://community.axonivy.com/",
            external: true,
          },
          {
            label: t("nav.tutorial"),
            description: t("nav.tutorialDescription"),
            href: "https://axonivy.com/tutorial",
            external: true,
          },
        ],
      },
    ],
  },
  { label: t("nav.news"), href: localePath(lang, "/news"), external: false },
  { label: t("nav.team"), href: localePath(lang, "/team"), external: false },
];

export default function Navbar({
  lang,
  urls,
}: {
  lang: Lang;
  urls: Record<Lang, string>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation(undefined, { lng: lang });

  return (
    <div className="relative">
      <NavigationMenu align="center" className="hidden md:flex">
        <NavigationMenuList>
          {getNavItems(t, lang).map((item) => {
            return "items" in item ? (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex w-fit gap-4 p-2">
                    {item.items.map((subItem, index) => (
                      <Fragment key={subItem.label}>
                        {index > 0 && <Separator orientation="vertical" />}
                        <ul className="flex flex-1 flex-col">
                          <H6 className="dark:text-n700 p-2">
                            {subItem.label}
                          </H6>
                          {subItem.items.map((subSubItem) => (
                            <li key={subSubItem.label}>
                              <NavigationMenuLink
                                className="w-full items-start justify-start"
                                render={
                                  <a
                                    href={subSubItem.href}
                                    target={
                                      subSubItem.external ? "_blank" : "_self"
                                    }
                                    rel={
                                      subSubItem.external
                                        ? "noopener noreferrer"
                                        : undefined
                                    }
                                  >
                                    <span className="flex flex-col gap-0.5">
                                      <span className="flex items-center gap-1">
                                        <Base className="text-n900">
                                          {subSubItem.label}
                                        </Base>
                                        {subSubItem.external && (
                                          <IconArrowUpRight
                                            className="text-n900 size-3 stroke-2"
                                            aria-hidden="true"
                                          />
                                        )}
                                      </span>
                                      <span className="text-muted-foreground dark:text-n700 text-sm whitespace-nowrap">
                                        {subSubItem.description &&
                                          subSubItem.description}
                                      </span>
                                    </span>
                                  </a>
                                }
                              />
                            </li>
                          ))}
                        </ul>
                      </Fragment>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink
                  className={
                    navigationMenuTriggerStyle() + " items-start gap-1"
                  }
                  render={
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : "_self"}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      {item.label}

                      {item.external && (
                        <IconArrowUpRight
                          className="size-3 stroke-2"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  }
                />
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="md:hidden">
        <button
          type="button"
          className="text-foreground focus-visible:ring-ring/50 relative z-50 inline-flex size-9 items-center justify-center rounded-lg focus-visible:ring-3 focus-visible:outline-1"
          aria-label={isOpen ? t("nav.menuClose") : t("nav.menuOpen")}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <IconX aria-hidden="true" />
          ) : (
            <IconMenu2 aria-hidden="true" />
          )}
        </button>
        <Drawer open={isOpen} onOpenChange={setIsOpen} swipeDirection="right">
          <DrawerContent
            className="w-full"
            style={{
              top: "4.3rem",
              height: "calc(100dvh - 4.3rem)",
              borderRadius: 0,
            }}
          >
            <nav
              aria-label={t("ariaLabels.mobileNavigation")}
              className="px-4 pt-4"
            >
              <ul className="flex flex-col gap-1">
                {getNavItems(t, lang).map((item) =>
                  "items" in item ? (
                    <li key={item.label}>
                      <Collapsible className="flex w-full flex-col gap-2">
                        <CollapsibleTrigger
                          render={
                            <button className="group/button focus:bg-muted focus-visible:ring-ring/50 flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium focus-visible:ring-3 focus-visible:outline-1">
                              {item.label}
                              <IconChevronDown className="ml-auto group-data-panel-open/button:rotate-180" />
                            </button>
                          }
                        />
                        <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
                          {item.items.map((subItem) => {
                            return (
                              <Fragment key={subItem.label}>
                                <H6 className="py-2 pl-3 text-xs">
                                  {subItem.label}
                                </H6>
                                {subItem.items.map((subSubItem) => (
                                  <a
                                    key={subSubItem.label}
                                    className="focus:bg-muted focus-visible:ring-ring/50 flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium focus-visible:ring-3 focus-visible:outline-1"
                                    href={subSubItem.href}
                                    target={
                                      subSubItem.external ? "_blank" : undefined
                                    }
                                    rel={
                                      subSubItem.external
                                        ? "noopener noreferrer"
                                        : undefined
                                    }
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {subSubItem.label}
                                    {subSubItem.external && (
                                      <IconArrowUpRight
                                        className="mt-3 size-3 self-start stroke-2"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </a>
                                ))}
                              </Fragment>
                            );
                          })}
                        </CollapsibleContent>
                      </Collapsible>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <a
                        className="focus:bg-muted focus-visible:ring-ring/50 flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium focus-visible:ring-3 focus-visible:outline-1"
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                        {item.external && (
                          <IconArrowUpRight
                            className="mt-3 size-3 self-start stroke-2"
                            aria-hidden="true"
                          />
                        )}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <DrawerFooter className="flex flex-row justify-start">
              <LanguageSwitcher lang={lang} urls={urls} />
              <ModeToggle lang={lang} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
