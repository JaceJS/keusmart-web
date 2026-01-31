/**
 * Plan/Tier color utilities
 */

export type PlanTier = "starter" | "growth" | "smart" | "pro" | "free";

/**
 * Get badge color classes for a plan/tier
 */
export const getPlanBadgeColor = (plan: string): string => {
  switch (plan?.toLowerCase()) {
    case "smart":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "growth":
    case "pro":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "starter":
      return "bg-green-100 text-green-700 border-green-200";
    case "free":
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

/**
 * Get background gradient for subscription badge/card
 */
export const getPlanGradient = (plan: string): string => {
  switch (plan?.toLowerCase()) {
    case "smart":
      return "from-blue-50 to-blue-100 border-blue-200";
    case "growth":
    case "pro":
      return "from-amber-50 to-amber-100 border-amber-200";
    case "starter":
      return "from-green-50 to-green-100 border-green-200";
    case "free":
    default:
      return "from-gray-50 to-gray-100 border-gray-200";
  }
};

/**
 * Get icon color for a plan
 */
export const getPlanIconColor = (plan: string): string => {
  switch (plan?.toLowerCase()) {
    case "smart":
      return "text-blue-600 bg-blue-100";
    case "growth":
    case "pro":
      return "text-amber-600 bg-amber-100";
    case "starter":
      return "text-green-600 bg-green-100";
    case "free":
    default:
      return "text-gray-600 bg-gray-100";
  }
};
