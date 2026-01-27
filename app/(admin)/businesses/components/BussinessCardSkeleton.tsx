import { Card } from "@/app/components/ui/Card";
import { Skeleton } from "@/app/components/ui/Skeleton";

export function BussinessCardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-48 rounded" />
          <Skeleton className="h-4 w-96 rounded mt-2" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="group relative overflow-hidden flex flex-col border-border"
          >
            <div className="p-6 flex-1">
              <div className="flex items-start gap-4">
                <Skeleton className="w-14 h-14 rounded-xl shrink-0" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-16 rounded" />
                    <Skeleton className="h-5 w-16 rounded" />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex items-center">
                  <Skeleton className="h-4 w-1/2 rounded" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center gap-3">
              <Skeleton className="h-10 w-full rounded" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
