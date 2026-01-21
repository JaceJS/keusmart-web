export function SidebarSkeleton() {
  const skeletonItems = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-border flex flex-col h-screen">
      <div className="h-16 border-b border-border flex items-center px-6">
        <div className="w-8 h-8 bg-gray-200 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
        </div>
        <div className="ml-3 flex-1 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-24 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
          </div>
          <div className="h-2 bg-gray-200 rounded w-16 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
          </div>
        </div>
      </div>
      <div className="flex-1 py-6 px-4 space-y-2">
        {skeletonItems.map((i) => (
          <div
            key={i}
            className="h-10 bg-gray-200 rounded-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
          </div>
        ))}
      </div>
    </aside>
  );
}
