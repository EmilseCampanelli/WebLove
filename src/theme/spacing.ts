export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const Radius = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 26,
  card: 26,
  full: 9999,
} as const;

export const Shadow = {
  small: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 6,
  },
  medium: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 8,
  },
  large: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 34 },
    shadowOpacity: 0.62,
    shadowRadius: 60,
    elevation: 14,
  },
};
