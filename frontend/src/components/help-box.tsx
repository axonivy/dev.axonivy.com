import type { ComponentType, ReactNode } from "react";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Base, H4, H5 } from "@/components/ui/typography";

type Icon = ComponentType<{ className?: string }>;

const tones = {
  orange: "bg-orange-bg text-orange",
  yellow: "bg-yellow-bg text-yellow",
};

export type HelpBoxLink = {
  icon: Icon;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  external?: boolean;
  arrow?: boolean;
};

function HelpBoxLinkItem({
  icon: Icon,
  title,
  description,
  href,
  linkLabel,
  external = false,
  arrow = true,
}: HelpBoxLink) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  const ArrowIcon = external ? IconArrowUpRight : IconArrowRight;
  const heading = (
    <div className="flex flex-row items-center gap-1">
      <Icon className="size-5" />
      <H5>{title}</H5>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
      <Separator orientation="horizontal" className="md:hidden" />
      <Separator orientation="vertical" className="hidden shrink-0 md:block" />
      {arrow ? (
        <div className="flex w-full flex-col md:w-auto">
          <a
            href={href}
            {...linkProps}
            className="flex flex-row items-center justify-between gap-3 md:hidden"
          >
            <div className="flex flex-col">
              {heading}
              <Base className="text-n900">{description}</Base>
            </div>
            <IconArrowRight className="size-8 shrink-0" />
          </a>

          <div className="hidden md:flex md:flex-col">
            {heading}
            <Base className="text-n900">{description}</Base>
            <a href={href} {...linkProps} className="group text-primary">
              <span className="flex items-center gap-2">
                {linkLabel}
                <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col md:w-auto">
          {heading}
          <Base className="text-n900">{description}</Base>
          <a href={href} {...linkProps} className="group text-primary">
            {linkLabel}
          </a>
        </div>
      )}
    </div>
  );
}

export function HelpBox({
  icon: Icon,
  title,
  text = (
    <>
      We're here to help <br className="hidden md:block" /> you get started.
    </>
  ),
  tone = "orange",
  links,
}: {
  icon: Icon;
  title?: string;
  text?: ReactNode;
  tone?: keyof typeof tones;
  links: HelpBoxLink[];
}) {
  return (
    <div className="bg-n50 flex flex-col items-stretch gap-4 rounded-md p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full flex-row items-center gap-4 md:w-auto">
        <div className={`shrink-0 rounded-md p-2 ${tones[tone]}`}>
          <Icon className="size-8" />
        </div>
        <div className="flex flex-col">
          {title ? <H4>{title}</H4> : null}
          <Base className="text-n900">{text}</Base>
        </div>
      </div>
      {links.map((link) => (
        <HelpBoxLinkItem key={link.href} {...link} />
      ))}
    </div>
  );
}
