import { Skeleton } from "@/components/ui/skeleton";

function TableSkeleton({ rows }: { rows: number }) {
  return (
    <div className="bg-background hidden rounded-md px-4 py-2 md:block">
      <div className="border-n200 grid grid-cols-6 gap-3 border-b py-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>

      <div className="flex flex-col">
        {[...Array(rows)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="border-n200 grid grid-cols-6 gap-3 border-b py-3 last:border-b-0"
          >
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCardSkeleton({ rows }: { rows: number }) {
  return (
    <div className="flex flex-col gap-6 md:hidden">
      {[...Array(rows)].map((_, cardIndex) => (
        <div
          key={cardIndex}
          className="bg-background rounded-3xl px-6 py-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="mt-4 flex flex-col">
            {[...Array(4)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="border-n200 flex items-center gap-3 border-b py-2 last:border-b-0"
              >
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ArchiveSkeleton({ rows }: { rows: number }) {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true">
      <Skeleton className="bg-n400 h-6 w-56" />
      <TableSkeleton rows={rows} />
      <MobileCardSkeleton rows={rows} />
    </div>
  );
}

export default ArchiveSkeleton;
