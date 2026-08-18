import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function DocumentationSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="md:col-span-2">
        <Skeleton className="h-7 w-48 mb-3" />
        <Card className="flex-1">
          <CardContent className="flex h-full flex-col gap-6 md:flex-row md:items-stretch">
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-9 w-full" />
              <div className="grid grid-cols-3 gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            </div>

            <div className="hidden md:block w-px bg-border" />

            <div className="flex flex-1 flex-col gap-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-9 w-full" />
              <div className="grid grid-cols-3 gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Skeleton className="h-7 w-32 mb-3" />
        <Card className="flex-1">
          <CardContent className="flex h-full flex-col gap-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <Skeleton className="h-8 w-full" />
            <div className="grid grid-cols-3 gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-13 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Skeleton className="h-7 w-40 mb-3" />
        <Card className="flex-1">
          <CardContent className="flex h-full flex-col gap-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <Skeleton className="h-8 w-full" />
            <div className="grid grid-cols-3 gap-2">
              {[...Array(3)].map((_, i) => {
                return <Skeleton key={i} className="h-13 w-full" />;
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
