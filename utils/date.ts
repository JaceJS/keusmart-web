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
