export const Colors = {
  // Backgrounds
  background: "#F5EFE7",
  backgroundDark: "#1C1410",
  surface: "#FDFAF6",
  surfaceDark: "#2A1F18",
  card: "#FFFDF9",
  cardDark: "#2E231A",

  // Primary palette — warm rose/gold
  primary: "#C9735A",
  primaryLight: "#E8956B",
  primaryDark: "#A85542",

  // Accent — deep plum
  accent: "#7B4F6E",
  accentLight: "#A07090",

  // Text
  text: "#2C1810",
  textSecondary: "#7A5C4A",
  textTertiary: "#B8967A",
  textDark: "#F5EFE7",
  textSecondaryDark: "#C4A08A",
  textTertiaryDark: "#8A6B58",

  // Category colors
  conexion: "#C9735A",
  coqueteo: "#E8956B",
  intimo: "#A85542",
  diversion: "#D4A843",
  profundo: "#7B4F6E",
  sorpresa: "#5A7B6E",

  // Borders & dividers
  border: "#E8D9CC",
  borderDark: "#3D2D22",

  // Status
  success: "#5A8A5F",
  error: "#C95A5A",

  // Misc
  white: "#FFFFFF",
  black: "#000000",
  overlay: "rgba(44,24,16,0.5)",
  overlayLight: "rgba(44,24,16,0.15)",
  heartRed: "#E05C5C",
  gold: "#D4A843",
} as const;

export type ColorKey = keyof typeof Colors;
