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
 * Format number as compact Indonesian Rupiah (e.g., Rp 2.5Jt, Rp 500Rb)
 */
export const formatCurrencyCompact = (value: number): string => {
  if (value >= 1000000000) {
    return `Rp ${(value / 1000000000).toFixed(1)}M`;
  }
  if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(1)}Jt`;
  }
  if (value >= 1000) {
    return `Rp ${(value / 1000).toFixed(0)}Rb`;
  }
  return `Rp ${value.toLocaleString("id-ID")}`;
};

/**
 * Format number with thousands separator (Indonesian locale)
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString("id-ID");
};
