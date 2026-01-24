/**
 * Format number as Indonesian Rupiah currency
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Format number with thousands separator (Indonesian locale)
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString("id-ID");
};
