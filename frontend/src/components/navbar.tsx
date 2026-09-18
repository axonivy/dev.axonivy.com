import { useState } from "react";
import {
  IconArrowUpRight,
  IconChevronDown,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Base, H6 } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { label: "Download", href: "/download", external: false },
  { label: "Documentation", href: "/doc", external: false },
  {
    label: "Resources",
    items: [
      {
        label: "Product information",
        items: [
          {
            label: "Release cycle",
            description: "Understand the release schedule",
            href: "/download/release-cycle",
            external: false,
          },
          {
            label: "Deprecation",
            description: "Plan for upcoming changes",
            href: "/deprecation",
            external: false,
          },
        ],
      },
      {
        label: "External resources",
        items: [
          {
            label: "Market",
            description: "Explore extensions and connectors",
            href: "https://market.axonivy.com/",
            external: true,
          },
          {
            label: "Community",
            description: "Ask questions and share ideas",
            href: "https://community.axonivy.com/",
            external: true,
          },
          {
            label: "Tutorial",
            description: "Learn step by step",
            href: "https://axonivy.com/tutorial",
            external: true,
          },
        ],
      },
    ],
  },
  { label: "News", href: "/news", external: false },
  { label: "Team", href: "/team", external: false },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <NavigationMenu align="center" className="hidden md:flex">
        <NavigationMenuList>
          {navItems.map((item) => {
            return item.items ? (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex w-fit gap-4 p-2">
                    {item.items.map((subItem, index) => (
                      <>
                        {index > 0 && <Separator orientation="vertical" />}
                        <ul className="flex flex-1 flex-col">
                          <H6 className="p-2">{subItem.label}</H6>
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
                                      <span className="text-muted-foreground text-sm whitespace-nowrap">
                                        {subSubItem.description}
                                      </span>
                                    </span>
                                  </a>
                                }
                              />
                            </li>
                          ))}
                        </ul>
                      </>
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
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
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
            <nav aria-label="Mobile navigation" className="px-4 pt-4">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) =>
                  item.items ? (
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
                              <>
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
                              </>
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
              <ModeToggle />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
