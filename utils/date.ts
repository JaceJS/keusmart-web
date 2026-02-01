/**
 * Format date string to Indonesian locale (e.g., "24 Jan 2026")
 */
export const formatDate = (
  dateString: string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString(
    "id-ID",
    options || defaultOptions,
  );
};

/**
 * Format date string to short format (dd/mm/yyyy)
 */
export const formatDateShort = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("id-ID");
};

/**
 * Format date string to long format (e.g., "Jumat, 24 Januari 2026")
 */
export const formatDateLong = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * Format date with hour and minute (e.g., "24 Januari 2026, 14:30")
 */
export const formatDateTimeWithHour = (dateString: string): string => {
  try {
    const date = new Date(dateString);

    const datePart = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${datePart}, ${timePart}`;
  } catch (error) {
    console.error("Failed to format date with hour:", error);
    return dateString;
  }
};

/**
 * Format date with hour and minute (short format) (e.g., "24 Jan 2026, 14:30")
 */
export const formatDateTimeShort = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timePart = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${datePart}, ${timePart}`;
  } catch (error) {
    console.error("Failed to format date with hour (short):", error);
    return dateString;
  }
};

/**
 * Format seconds to countdown (e.g., "01:30")
 */
export const formatCountdown = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;

  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};
