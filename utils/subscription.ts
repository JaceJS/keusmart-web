import { differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

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

export interface TrialTimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  totalHours: number;
  isExpired: boolean;
}

export function getTrialTimeRemaining(
  endDate: string | undefined,
): TrialTimeRemaining {
  if (!endDate) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      totalHours: 0,
      isExpired: true,
    };
  }

  const now = new Date();
  const end = new Date(endDate);

  if (end <= now) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      totalHours: 0,
      isExpired: true,
    };
  }

  const totalMinutes = differenceInMinutes(end, now);
  const days = Math.floor(totalMinutes / (24 * 60));
  const remainingMinutesAfterDays = totalMinutes % (24 * 60);
  const hours = Math.floor(remainingMinutesAfterDays / 60);
  const minutes = remainingMinutesAfterDays % 60;
  const totalHours = differenceInHours(end, now);

  return {
    days,
    hours,
    minutes,
    totalHours,
    isExpired: false,
  };
}

export function formatTrialRemaining(timeRemaining: TrialTimeRemaining): string {
  if (timeRemaining.isExpired) {
    return "Trial telah berakhir";
  }

  if (timeRemaining.days > 0) {
    return `${timeRemaining.days} hari ${timeRemaining.hours} jam`;
  }

  if (timeRemaining.hours > 0) {
    return `${timeRemaining.hours} jam ${timeRemaining.minutes} menit`;
  }

  return `${timeRemaining.minutes} menit`;
}
