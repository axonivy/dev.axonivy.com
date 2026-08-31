import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { IconArrowRight, IconCircleCheck } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "../ui/button";
import { H4 } from "@/components/ui/typography";

export type NewsTimelineItem = {
  id: string;
  versionTitle: string;
  slogan: string | null;
  tag: "Long Term Support" | "Leading Edge" | "Archived";
  releaseDate: Date;
  overview: string[];
};

type NewsTimelineProps = {
  items: NewsTimelineItem[];
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
  }).format(date);

export function NewsTimeline({ items }: NewsTimelineProps) {
  return (
    <ol className="grid grid-cols-1 gap-4 md:grid-cols-[auto_1.5rem_minmax(0,1fr)]">
      {items.map((item, index) => (
        <li key={item.id} className="contents">
          <time
            dateTime={item.releaseDate.toISOString()}
            className="text-n700 hidden pt-0.5 text-sm font-medium md:block"
          >
            {formatDate(item.releaseDate)}
          </time>

          <div className="relative hidden justify-center md:flex">
            <span className="border-primary bg-accent relative z-10 mt-1 size-4 rounded-full border-2" />
            {index < items.length - 1 && (
              <span className="bg-n200 absolute top-5 -bottom-8 left-1/2 w-px -translate-x-1/2" />
            )}
          </div>

          <Card className="flex flex-col gap-0 px-2 py-6 md:col-start-3 md:flex-row">
            <CardHeader className="flex w-full min-w-0 flex-col items-start gap-4 px-4 md:flex-[1.5] md:px-0 md:pl-4">
              <span className="flex w-full flex-wrap items-center justify-between gap-4 md:justify-start">
                <H4 className="min-w-0">{item.versionTitle}</H4>
                <Badge
                  variant={
                    item.tag === "Long Term Support"
                      ? "green"
                      : item.tag === "Leading Edge"
                        ? "orange"
                        : "gray"
                  }
                  className="uppercase"
                >
                  {item.tag}
                </Badge>
              </span>
              <CardDescription className="text-n900">
                {item.slogan}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex w-full min-w-0 flex-col gap-2 px-4 md:flex-[2.5] md:px-0 md:pl-4">
              {item.overview.map((fact) => (
                <span key={fact} className="flex min-w-0 items-start gap-2">
                  <IconCircleCheck className="text-primary mt-0.5 size-4 shrink-0" />
                  <span>{fact}</span>
                </span>
              ))}
            </CardContent>
            <div className="flex w-full shrink-0 items-end justify-end px-4 md:w-auto md:px-0 md:pr-4">
              <a
                href={`/news/${item.id}`}
                className={buttonVariants({ variant: "link" }) + " group"}
              >
                View Details
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Card>
        </li>
      ))}
    </ol>
  );
}
