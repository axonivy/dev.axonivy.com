import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconArrowRight, IconCircleCheck } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "../ui/button";

export type NewsTimelineItem = {
  id: string;
  versionTitle: string;
  slogan: string | null;
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
    <ol className="flex flex-col">
      {items.map((item, index) => (
        <li
          key={item.id}
          className="grid grid-cols-1 gap-4 pb-8 last:pb-0 md:grid-cols-[auto_1.5rem_minmax(0,1fr)]"
        >
          <time
            dateTime={item.releaseDate.toISOString()}
            className="hidden pt-0.5 text-sm font-medium text-n700 md:block"
          >
            {formatDate(item.releaseDate)}
          </time>

          <div className="relative hidden justify-center md:flex">
            <span className="mt-1 size-4 rounded-full border-2 border-primary bg-accent" />
            {index < items.length - 1 && (
              <span className="absolute top-5 -bottom-12 w-px bg-n200" />
            )}
          </div>

          <Card className="flex flex-col px-2 py-6 md:col-start-3 md:flex-row gap-0">
            <CardHeader className="flex flex-col items-start min-w-0 w-full md:flex-[1.1]">
              <span className="flex flex-wrap w-full items-center justify-between md:justify-start gap-4">
                <p className="min-w-0 text-xl font-semibold">
                  {item.versionTitle}
                </p>
                <Badge variant="green" className="uppercase">
                  Release
                </Badge>
              </span>
              <CardDescription className="text-n900">
                {item.slogan}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col min-w-0 w-full md:flex-[2.5] gap-2">
              {item.overview.map((fact) => (
                <span key={fact} className="flex min-w-0 items-start gap-2">
                  <IconCircleCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{fact}</span>
                </span>
              ))}
            </CardContent>
            <div className="flex items-end w-full shrink-0 justify-end px-4 md:w-auto md:px-0 md:pr-4">
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
