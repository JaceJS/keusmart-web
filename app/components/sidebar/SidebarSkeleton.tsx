import { Skeleton } from "@/app/components/ui/Skeleton";

export function SidebarSkeleton() {
  const skeletonItems = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-border flex flex-col h-screen">
      <div className="h-16 border-b border-border flex items-center px-6">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <div className="ml-3 flex-1 space-y-2">
          <Skeleton className="h-3 w-24 rounded" />
          <Skeleton className="h-2 w-16 rounded" />
        </div>
      </div>
      <div className="flex-1 py-6 px-4 space-y-2">
        {skeletonItems.map((i) => (
          <Skeleton key={i} className="h-10 rounded-lg" />
        ))}
      </div>
    </aside>
  );
}
