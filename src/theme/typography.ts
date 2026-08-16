export const FontFamily = {
  serif: "InstrumentSerif_400Regular",
  serifItalic: "InstrumentSerif_400Regular",
  sans: "Manrope_400Regular",
  sansMedium: "Manrope_600SemiBold",
  sansBold: "Manrope_700Bold",
} as const;

export const Typography = {
  display: {
    fontFamily: FontFamily.serif,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h1: {
    fontFamily: FontFamily.serif,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily: FontFamily.serif,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  h3: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 18,
    lineHeight: 26,
  },
  question: {
    fontFamily: FontFamily.serif,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: 0,
  },
  questionSmall: {
    fontFamily: FontFamily.serif,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: 0,
  },
  quoteItalic: {
    fontFamily: FontFamily.serifItalic,
    fontSize: 21,
    lineHeight: 28,
    letterSpacing: 0,
  },
  body: {
    fontFamily: FontFamily.sans,
    fontSize: 15,
    lineHeight: 22,
  },
  bodySmall: {
    fontFamily: FontFamily.sans,
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    fontFamily: FontFamily.sansBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 2.5,
    textTransform: "uppercase" as const,
  },
  labelSmall: {
    fontFamily: FontFamily.sansBold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
  },
  caption: {
    fontFamily: FontFamily.sans,
    fontSize: 11,
    lineHeight: 15,
  },
  button: {
    fontFamily: FontFamily.sansBold,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
  },
  buttonSmall: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
  },
};
