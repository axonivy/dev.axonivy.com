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
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
        <Drawer open={isOpen} onOpenChange={setIsOpen} swipeDirection="right">
          <DrawerTrigger
            className="inline-flex size-9 items-center justify-center rounded-lg text-foreground hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1"
            aria-label="Open navigation menu"
          >
            <IconMenu2 aria-hidden="true" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="relative p-4 pb-2 text-left">
              <DrawerTitle>Navigation</DrawerTitle>
              <DrawerClose
                className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1"
                aria-label="Close navigation menu"
              >
                <IconX aria-hidden="true" />
              </DrawerClose>
            </DrawerHeader>
            <nav aria-label="Mobile navigation" className="px-4 pb-6">
              <ul className="flex flex-col gap-1">
                {visibleNavItems.map((item) => (
                  <li key={item.href}>
                    <a
                      className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1"
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
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
