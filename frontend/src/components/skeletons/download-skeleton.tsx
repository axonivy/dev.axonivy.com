import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DownloadProductCardSkeleton() {
  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-col gap-3">
        <div className="flex w-full flex-row items-start justify-between gap-4">
          <Skeleton className="h-12 w-12 rounded-md" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-24" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="flex items-center justify-between gap-4 space-y-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

function DownloadSectionSkeleton({
  titleWidth,
  withDescription = true,
}: {
  titleWidth: string;
  withDescription?: boolean;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className={`h-12 ${titleWidth}`} />
      {withDescription && <Skeleton className="h-7 w-2/3" />}
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        <DownloadProductCardSkeleton />
        <DownloadProductCardSkeleton />
      </div>
    </div>
  );
}

export function DownloadSkeleton() {
  return (
    <div className="flex flex-col gap-24" aria-hidden="true">
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        <DownloadProductCardSkeleton />
        <DownloadProductCardSkeleton />
      </div>

      <DownloadSectionSkeleton titleWidth="w-80" />
      <DownloadSectionSkeleton titleWidth="w-full max-w-3xl" />
    </div>
  );
}
