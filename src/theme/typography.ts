import { Platform } from "react-native";

const fontFamily = Platform.select({
  ios: {
    regular: "Georgia",
    medium: "Georgia",
    bold: "Georgia-Bold",
    display: "Georgia-Bold",
    sans: "System",
    sansMedium: "System",
  },
  android: {
    regular: "serif",
    medium: "serif",
    bold: "serif",
    display: "serif",
    sans: "sans-serif",
    sansMedium: "sans-serif-medium",
  },
  default: {
    regular: "Georgia",
    medium: "Georgia",
    bold: "Georgia-Bold",
    display: "Georgia-Bold",
    sans: "System",
    sansMedium: "System",
  },
});

export const Typography = {
  // Display sizes
  display: {
    fontFamily: fontFamily!.display,
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  // Large headings
  h1: {
    fontFamily: fontFamily!.bold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily: fontFamily!.bold,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.2,
  },
  h3: {
    fontFamily: fontFamily!.medium,
    fontSize: 18,
    lineHeight: 26,
  },
  // Question text — main card
  question: {
    fontFamily: fontFamily!.regular,
    fontSize: 24,
    lineHeight: 34,
    letterSpacing: 0.1,
  },
  questionSmall: {
    fontFamily: fontFamily!.regular,
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 0.1,
  },
  // Body
  body: {
    fontFamily: fontFamily!.sans,
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: fontFamily!.sans,
    fontSize: 14,
    lineHeight: 20,
  },
  // Labels
  label: {
    fontFamily: fontFamily!.sansMedium,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.8,
    textTransform: "uppercase" as const,
  },
  labelSmall: {
    fontFamily: fontFamily!.sansMedium,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 1,
    textTransform: "uppercase" as const,
  },
  // Caption
  caption: {
    fontFamily: fontFamily!.sans,
    fontSize: 12,
    lineHeight: 16,
  },
  // Button text
  button: {
    fontFamily: fontFamily!.sansMedium,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  buttonSmall: {
    fontFamily: fontFamily!.sansMedium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
};
