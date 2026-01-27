import { Skeleton } from "@/app/components/ui/Skeleton";

export function TenantProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div>
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-4 w-96 rounded mt-2" />
      </div>

      <div className="flex items-center gap-4">
        <Skeleton className="w-20 h-20 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-3 w-24 rounded" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-11 rounded-lg" />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-24 rounded-lg" />
      </div>
    </div>
  );
}
