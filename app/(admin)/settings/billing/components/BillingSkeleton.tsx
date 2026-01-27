import { Skeleton } from "@/app/components/ui/Skeleton";
import { Card } from "@/app/components/ui/Card";

export function BillingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div>
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-4 w-96 rounded mt-2" />
      </div>

      {/* Current Plan Card Skeleton */}
      <Card className="p-6 relative overflow-hidden border-border bg-white shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-32 rounded" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-10 w-48 rounded" />
              <Skeleton className="h-4 w-64 rounded" />
            </div>
            <div className="pt-2">
              <Skeleton className="h-2 w-full max-w-sm rounded" />
              <div className="flex justify-between max-w-sm mt-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
          <div className="flex items-end md:items-start flex-col gap-3 min-w-[200px]">
            <Skeleton className="h-10 w-full md:w-40 rounded" />
            <Skeleton className="h-10 w-full md:w-40 rounded" />
          </div>
        </div>
      </Card>

      {/* Plan Selector Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32 rounded" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-24 rounded" />
                <Skeleton className="h-8 w-32 rounded" />
                <Skeleton className="h-4 w-full rounded" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                    <Skeleton className="h-4 w-full rounded" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-10 w-full rounded" />
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-40 rounded" />
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex gap-4">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-4 w-32 rounded" />
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-40 rounded" />
                  <Skeleton className="h-3 w-24 rounded" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
