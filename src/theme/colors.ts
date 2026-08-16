export const Colors = {
  // Backgrounds — paleta oscura íntima
  background: "#09070D",
  backgroundDark: "#09070D",
  surface: "#130D1A",
  surfaceDark: "#130D1A",
  card: "#F8F1E4",
  cardDark: "#F8F1E4",
  cardText: "#1C1018",
  cardTextMuted: "rgba(28,16,24,0.42)",

  // Primary palette — ámbar dorado
  primary: "#C09A52",
  primaryLight: "#D4B270",
  primaryDark: "#957535",

  // Accent — rosa pálido
  accent: "#C4869B",
  accentLight: "#D4A0B4",

  // Text
  text: "#EBE2D5",
  textSecondary: "rgba(235,226,213,0.55)",
  textTertiary: "rgba(235,226,213,0.28)",
  textDark: "#EBE2D5",
  textSecondaryDark: "rgba(235,226,213,0.55)",
  textTertiaryDark: "rgba(235,226,213,0.28)",

  // Category colors (sobre la carta pergamino — deben ser legibles sobre crema)
  conexion: "#B5607A",
  coqueteo: "#B5607A",
  intimo: "#A04D3A",
  diversion: "#9A7830",
  profundo: "#6B5090",
  sorpresa: "#3D7870",

  // Borders & dividers
  border: "rgba(196,134,155,0.16)",
  borderDark: "rgba(196,134,155,0.16)",

  // Status
  success: "#5A8A5F",
  error: "#C95A5A",

  // Misc
  white: "#FFFFFF",
  black: "#000000",
  overlay: "rgba(9,7,13,0.7)",
  overlayLight: "rgba(9,7,13,0.35)",
  heartRed: "#C4869B",
  gold: "#B5895C",
} as const;

export type ColorKey = keyof typeof Colors;
