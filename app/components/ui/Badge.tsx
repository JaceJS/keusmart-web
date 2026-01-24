import { cn } from "@/app/lib/utils";

export type BadgeVariant = "success" | "warning" | "error" | "info" | "default";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-green-50 text-green-700",
  warning: "bg-yellow-50 text-yellow-700",
  error: "bg-red-50 text-red-700",
  info: "bg-blue-50 text-blue-700",
  default: "bg-gray-50 text-gray-700",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Get badge variant based on payment status
 */
export function getPaymentStatusVariant(status: string): BadgeVariant {
  const statusLower = status.toLowerCase();
  if (statusLower === "paid" || statusLower === "lunas") return "success";
  if (statusLower === "pending" || statusLower === "menunggu") return "warning";
  if (statusLower === "cancelled" || statusLower === "batal") return "error";
  return "default";
}

/**
 * Get Indonesian label for payment status
 */
export function getPaymentStatusLabel(status: string): string {
  const statusLower = status.toLowerCase();
  const labels: Record<string, string> = {
    paid: "Lunas",
    lunas: "Lunas",
    pending: "Menunggu",
    menunggu: "Menunggu",
    cancelled: "Batal",
    batal: "Batal",
  };
  return labels[statusLower] || status;
}

/**
 * Get badge variant based on expense/recurring status
 */
export function getExpenseStatusVariant(isRecurring: boolean): BadgeVariant {
  return isRecurring ? "info" : "success";
}
