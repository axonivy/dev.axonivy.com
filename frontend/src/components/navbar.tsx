import { useState } from "react";
import {
  IconArrowUpRight,
  IconExternalLink,
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
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { CURRENT_VERSION, LTS_VERSION } from "@/data/global-variables";

const navItems = [
  { label: "Download", href: "/download", external: false },
  { label: "News", href: "/news", external: false },

  {
    label: "Platform",
    items: [
      { label: "Market", href: "https://market.axonivy.com/", external: true },

      {
        label: "Release Cycle",
        href: "/download/release-cycle",
        external: false,
      },
      { label: "Deprecation", href: "/deprecation", external: false },

      { label: "Support", href: "/support", external: false },
    ],
  },

  {
    label: "Documentation",
    items: [
      { label: "Overview", href: "/doc", external: false },
      {
        label: `LTS ${CURRENT_VERSION}`,
        href: `/doc/${CURRENT_VERSION}/en`,
        external: true,
      },
      {
        label: `LTS ${LTS_VERSION}`,
        href: `/doc/${LTS_VERSION}/en`,
        external: true,
      },
      {
        label: "Tutorial",
        href: "https://axonivy.com/tutorial",
        external: true,
      },
    ],
  },
  {
    label: "Community",
    href: "https://community.axonivy.com/",
    external: true,
  },
  { label: "Team", href: "/team", external: false },
];

export default function Navbar({ type }: { type: "header" | "footer" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {navItems.map((item) => {
            return item.items ? (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {item.items.map((subItem) => (
                    <NavigationMenuItem key={subItem.href}>
                      <NavigationMenuLink
                        className={
                          navigationMenuTriggerStyle() +
                          " w-full items-start justify-start gap-1"
                        }
                        render={
                          <a
                            href={subItem.href}
                            target={subItem.external ? "_blank" : "_self"}
                            rel={
                              subItem.external
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {subItem.label}

                            {subItem.external && (
                              <IconArrowUpRight
                                className="size-3 stroke-2"
                                aria-hidden="true"
                              />
                            )}
                          </a>
                        }
                      />
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={item.href}>
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
            <DrawerHeader className="p-4 pb-2 text-left"></DrawerHeader>
            <nav aria-label="Mobile navigation" className="px-4 pb-6">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      className="hover:bg-muted focus:bg-muted focus-visible:ring-ring/50 flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium focus-visible:ring-3 focus-visible:outline-1"
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
                ))}
                <a
                  href="https://axonivy.com/tutorial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-muted focus:bg-muted focus-visible:ring-ring/50 flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium focus-visible:ring-3 focus-visible:outline-1"
                >
                  Tutorial
                  <IconArrowUpRight
                    className="mt-3 size-3 self-start stroke-2"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="https://market.axonivy.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-muted focus:bg-muted focus-visible:ring-ring/50 flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium focus-visible:ring-3 focus-visible:outline-1"
                >
                  Market
                  <IconArrowUpRight
                    className="mt-3 size-3 self-start stroke-2"
                    aria-hidden="true"
                  />
                </a>
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
