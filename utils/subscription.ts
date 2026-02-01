import { differenceInDays } from "date-fns";

export function getTrialDaysRemaining(endDate: string | undefined): number {
  if (!endDate) return 0;
  const days = differenceInDays(new Date(endDate), new Date());
  return Math.max(0, days);
}

export function getTrialUrgencyLevel(
  daysRemaining: number
): "info" | "warning" | "danger" {
  if (daysRemaining >= 8) return "info";
  if (daysRemaining >= 4) return "warning";
  return "danger";
}

export function isTrialExpiringSoon(daysRemaining: number): boolean {
  return daysRemaining <= 14 && daysRemaining > 0;
}
