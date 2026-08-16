export type PlaceOption = "casa" | "afuera";
export type TimeOption = "15min" | "30min" | "1h" | "2h" | "toda";
export type EnergyOption = "baja" | "media" | "alta";
export type BudgetOption = "nada" | "poco" | "flexible";

export interface NightConfig {
  place: PlaceOption;
  time: TimeOption;
  energy: EnergyOption;
  budget: BudgetOption;
}

export interface NightStep {
  id: string;
  emoji: string;
  title: string;
  description: string;
  durationMin: number;
  route: string;
}

export interface GeneratedNight {
  title: string;
  tagline: string;
  steps: NightStep[];
}

export interface GuidedNight {
  id: string;
  title: string;
  emoji: string;
  tagline: string;
  color: string;
  steps: NightStep[];
}

// ── Step library ─────────────────────────────────────────────────────────────

const STEP_CONEXION: NightStep = {
  id: "s_conexion",
  emoji: "❤️",
  title: "Preguntas de conexión",
  description: "Para volver a encontrarnos.",
  durationMin: 15,
  route: "/game?modeId=conexion",
};

const STEP_COQUETEO: NightStep = {
  id: "s_coqueteo",
  emoji: "😉",
  title: "Coqueteo",
  description: "Para volver a mirarnos distinto.",
  durationMin: 15,
  route: "/game?modeId=coqueteo",
};

const STEP_INTIMO: NightStep = {
  id: "s_intimo",
  emoji: "🔥",
  title: "Más íntimo",
  description: "Preguntas para los dos solos, sin filtro.",
  durationMin: 15,
  route: "/game?modeId=intimo",
};

const STEP_PROFUNDO: NightStep = {
  id: "s_profundo",
  emoji: "💭",
  title: "Conversación profunda",
  description: "Para esas conversaciones que quedan.",
  durationMin: 20,
  route: "/game?modeId=profundo",
};

const STEP_DIVERSION: NightStep = {
  id: "s_diversion",
  emoji: "😄",
  title: "Para reírnos",
  description: "Porque juntos también somos un desastre.",
  durationMin: 15,
  route: "/game?modeId=diversion",
};

const STEP_PREVIAS: NightStep = {
  id: "s_previas",
  emoji: "🥂",
  title: "Previas",
  description: "Verdades, desafíos y tragos.",
  durationMin: 30,
  route: "/game?modeId=previas",
};

const STEP_CHALLENGE: NightStep = {
  id: "s_challenge",
  emoji: "🎯",
  title: "Un desafío",
  description: "A ver quién puede más.",
  durationMin: 10,
  route: "/experience?category=challenge",
};

const STEP_MISSION: NightStep = {
  id: "s_mission",
  emoji: "🕵️",
  title: "Misión secreta",
  description: "Cada uno tiene instrucciones.",
  durationMin: 10,
  route: "/experience?category=mission",
};

const STEP_TIMER_SILENCIO: NightStep = {
  id: "s_timer_silencio",
  emoji: "🤫",
  title: "Silencio completo",
  description: "5 minutos mirándose sin hablar.",
  durationMin: 5,
  route: "/experience?id=ti01",
};

const STEP_TIMER_ABRAZO: NightStep = {
  id: "s_timer_abrazo",
  emoji: "🤗",
  title: "El abrazo de 3 minutos",
  description: "Sin apuro. Solo el abrazo.",
  durationMin: 3,
  route: "/experience?id=ti02",
};

const STEP_ACTIVITY_CARTA: NightStep = {
  id: "s_activity_carta",
  emoji: "✉️",
  title: "Carta sin enviar",
  description: "Escríbanse una carta a mano.",
  durationMin: 15,
  route: "/experience?id=ac04",
};

const STEP_ACTIVITY_PLAYLIST: NightStep = {
  id: "s_activity_playlist",
  emoji: "🎵",
  title: "Playlist de los dos",
  description: "La banda sonora de su historia.",
  durationMin: 15,
  route: "/experience?id=ac02",
};

const STEP_ACTIVITY_CAMINATA: NightStep = {
  id: "s_activity_caminata",
  emoji: "🚶",
  title: "Caminata sin destino",
  description: "A ver adónde llegan.",
  durationMin: 30,
  route: "/experience?id=ac03",
};

const STEP_ACTIVITY_COCINAR: NightStep = {
  id: "s_activity_cocinar",
  emoji: "🍳",
  title: "Cocinen juntos",
  description: "Simple. Lo que tengan.",
  durationMin: 30,
  route: "/experience?id=ac05",
};

// ── Plan templates ────────────────────────────────────────────────────────────

const PLAN_RELAX: NightStep[] = [
  STEP_TIMER_ABRAZO,
  STEP_CONEXION,
  STEP_PROFUNDO,
  STEP_ACTIVITY_CARTA,
  STEP_TIMER_SILENCIO,
  STEP_ACTIVITY_PLAYLIST,
];

const PLAN_BALANCED: NightStep[] = [
  STEP_CONEXION,
  STEP_CHALLENGE,
  STEP_COQUETEO,
  STEP_MISSION,
  STEP_PROFUNDO,
  STEP_TIMER_ABRAZO,
];

const PLAN_ACTIVE: NightStep[] = [
  STEP_CHALLENGE,
  STEP_PREVIAS,
  STEP_MISSION,
  STEP_COQUETEO,
  STEP_INTIMO,
  STEP_DIVERSION,
];

const TIME_STEPS: Record<TimeOption, number> = {
  "15min": 2,
  "30min": 3,
  "1h": 4,
  "2h": 5,
  toda: 6,
};

export function generateNightPlan(config: NightConfig): GeneratedNight {
  const template =
    config.energy === "baja"
      ? PLAN_RELAX
      : config.energy === "alta"
      ? PLAN_ACTIVE
      : PLAN_BALANCED;

  const count = TIME_STEPS[config.time];
  const steps = template.slice(0, count);

  const titles: Record<EnergyOption, string> = {
    baja: "Noche tranquila",
    media: "Noche equilibrada",
    alta: "Noche intensa",
  };

  const taglines: Record<EnergyOption, string> = {
    baja: "Para quedarse quietos y estar juntos.",
    media: "Un poco de todo. Lo que venga.",
    alta: "Para los que necesitan más.",
  };

  return {
    title: titles[config.energy],
    tagline: taglines[config.energy],
    steps,
  };
}

// ── Guided nights ─────────────────────────────────────────────────────────────

export const GUIDED_NIGHTS: GuidedNight[] = [
  {
    id: "gn01",
    title: "Primera cita otra vez",
    emoji: "🌹",
    tagline: "Como si no se conocieran todavía.",
    color: "#B5607A",
    steps: [
      STEP_CONEXION,
      STEP_COQUETEO,
      STEP_CHALLENGE,
      STEP_MISSION,
      STEP_TIMER_ABRAZO,
    ],
  },
  {
    id: "gn02",
    title: "Noche de invierno",
    emoji: "🕯️",
    tagline: "Adentro, tranquilos, sin apuro.",
    color: "#6B5090",
    steps: [
      STEP_TIMER_ABRAZO,
      STEP_PROFUNDO,
      STEP_ACTIVITY_CARTA,
      STEP_TIMER_SILENCIO,
      STEP_CONEXION,
    ],
  },
  {
    id: "gn03",
    title: "Noche de risas",
    emoji: "😂",
    tagline: "Porque juntos también somos un desastre.",
    color: "#9A7830",
    steps: [
      STEP_DIVERSION,
      STEP_CHALLENGE,
      STEP_PREVIAS,
      STEP_MISSION,
      STEP_CHALLENGE,
    ],
  },
  {
    id: "gn04",
    title: "Noche de reconexión",
    emoji: "🔁",
    tagline: "Para volver a encontrarse.",
    color: "#5A7B6E",
    steps: [
      STEP_CONEXION,
      STEP_ACTIVITY_CARTA,
      STEP_PROFUNDO,
      STEP_TIMER_ABRAZO,
      STEP_TIMER_SILENCIO,
    ],
  },
  {
    id: "gn05",
    title: "Noche de coqueteo",
    emoji: "💫",
    tagline: "Para volver a mirarnos distinto.",
    color: "#C09A52",
    steps: [
      STEP_COQUETEO,
      STEP_MISSION,
      STEP_INTIMO,
      STEP_TIMER_ABRAZO,
      STEP_COQUETEO,
    ],
  },
  {
    id: "gn06",
    title: "Noche sorpresa",
    emoji: "🎲",
    tagline: "No sabemos qué va a salir.",
    color: "#3D7870",
    steps: [
      STEP_CHALLENGE,
      STEP_CONEXION,
      STEP_MISSION,
      STEP_DIVERSION,
      STEP_ACTIVITY_PLAYLIST,
    ],
  },
];
