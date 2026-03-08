/**
 * Fairprep branding constants
 * Color scheme matches the dark purple background of the Fairprep logo
 */

export const FAIRPREP_BRANDING = {
  logoUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663181029140/dp4QnTVpHE5nSdYADWWEF8/fairprep-logo_982ca333.png",
  colors: {
    // Header and main backgrounds
    headerBackground: "#1a0f2e", // Dark purple from logo background
    pageBackground: "#2d1b4e", // Dark purple page background
    
    // Interactive elements
    primary: "#6B46C1", // Bluish purple for buttons
    secondary: "#4C1D95", // Dark purple accent
    
    // Text colors
    text: "#FFFFFF", // White text on dark backgrounds
    textSecondary: "#d4d4d8", // Light gray text
    
    // Component backgrounds
    cardBackground: "#3d2a5c", // Card background on dark
    inputBackground: "#4a3570", // Input background
    
    // Borders and dividers
    border: "#5a3a8a", // Purple border
    borderLight: "#6b4fa3", // Lighter purple border
    
    // Status colors
    success: "#10b981", // Green
    error: "#ef4444", // Red
    warning: "#f59e0b", // Amber
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
