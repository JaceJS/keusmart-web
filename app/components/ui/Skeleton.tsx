import { cn } from "@/app/lib/utils";

/**
 * Skeleton component with shimmer effect.
 * Uses the custom animate-shimmer util from globals.css
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-200 rounded-md",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
    </div>
  );
}

export { Skeleton };
