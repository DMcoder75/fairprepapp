/**
 * Fairprep branding constants
 */

export const FAIRPREP_BRANDING = {
  logoUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663181029140/dp4QnTVpHE5nSdYADWWEF8/fairprep-logo_982ca333.png",
  colors: {
    primary: "#6B46C1", // Bluish purple
    secondary: "#4C1D95", // Dark purple
    text: "#FFFFFF", // White
    textDark: "#1F2937", // Dark gray for light backgrounds
    background: "#F9FAFB", // Light background
    border: "#E5E7EB", // Light border
  },
  appName: "Fairprep",
  orgName: "Dalsi",
};

export const DELETE_REQUEST_REASONS = [
  "I am not interested",
  "I found a better application",
  "It is very expensive",
  "It is slow",
  "It doesn't have features I want",
  "Other reason",
] as const;

export type DeleteRequestReason = (typeof DELETE_REQUEST_REASONS)[number];
