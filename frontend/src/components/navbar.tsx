import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { buttonVariants } from "./ui/button";

const navItems = [
  { label: "News", href: "/news", external: false },
  { label: "Documentation", href: "/doc", external: false },
  { label: "Market", href: "https://market.axonivy.com/", external: true },
  {
    label: "Community",
    href: "https://community.axonivy.com/",
    external: true,
  },
  {
    label: "Tutorial",
    href: "https://www.axonivy.com/tutorials",
    external: true,
  },
  { label: "Team", href: "/team", external: false },
];

export default function Navbar({ type }: { type: "header" | "footer" }) {
  const [isOpen, setIsOpen] = useState(false);
  const visibleNavItems =
    type === "header"
      ? navItems.filter((item) => item.label !== "News")
      : navItems;

  return (
    <div className="relative">
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {visibleNavItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : "_self"}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                  </a>
                }
              />
            </NavigationMenuItem>
          ))}
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
              top: "4.6rem",
              height: "calc(100dvh - 4.6rem)",
              borderRadius: 0,
            }}
          >
            <DrawerHeader className="p-4 pb-2 text-left"></DrawerHeader>
            <nav aria-label="Mobile navigation" className="px-4 pb-6">
              <ul className="flex flex-col gap-1">
                <a
                  href="/news"
                  className="hover:bg-muted focus:bg-muted focus-visible:ring-ring/50 flex min-h-11 items-center rounded-md px-3 text-sm font-medium focus-visible:ring-3 focus-visible:outline-1"
                >
                  News
                </a>
                <a
                  href="/download"
                  className="hover:bg-muted focus:bg-muted focus-visible:ring-ring/50 flex min-h-11 items-center rounded-md px-3 text-sm font-medium focus-visible:ring-3 focus-visible:outline-1"
                >
                  Download
                </a>
                {visibleNavItems.map((item) => (
                  <li key={item.href}>
                    <a
                      className="hover:bg-muted focus:bg-muted focus-visible:ring-ring/50 flex min-h-11 items-center rounded-md px-3 text-sm font-medium focus-visible:ring-3 focus-visible:outline-1"
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
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
