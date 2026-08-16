import { Activity, ACTIVITY_POOL, CategoryTag } from "./activities";

// ── Config types (used by configure.tsx and night-plan.tsx) ──────────────────

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

// ── Generated experience ──────────────────────────────────────────────────────

export interface GeneratedExperience {
  title: string;
  tagline: string;
  activities: Activity[];
  totalDurationMin: number;
}

// ── Guided experience ─────────────────────────────────────────────────────────

export interface GuidedExperience {
  id: string;
  title: string;
  emoji: string;
  tagline: string;
  color: string;
  activityIds: string[];
}

// ── Budget compatibility ──────────────────────────────────────────────────────
// Activity's budget = minimum required. Config's budget = max willing to spend.
// "nada" activities are always included.
// "poco" activities need config.budget of "poco" or "flexible".
// "flexible" activities need config.budget of "flexible".

const BUDGET_LEVEL: Record<string, number> = { nada: 0, poco: 1, flexible: 2 };

function budgetCompatible(activityBudget: string, configBudget: BudgetOption): boolean {
  return BUDGET_LEVEL[activityBudget] <= BUDGET_LEVEL[configBudget];
}

// ── Time budget ───────────────────────────────────────────────────────────────

const TIME_BUDGET_MINUTES: Record<TimeOption, number> = {
  "15min": 15,
  "30min": 30,
  "1h": 60,
  "2h": 120,
  toda: 180,
};

const MAX_ACTIVITIES: Record<TimeOption, number> = {
  "15min": 2,
  "30min": 3,
  "1h": 4,
  "2h": 5,
  toda: 6,
};

// ── Shuffle (Fisher-Yates) ────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Title / tagline generation ────────────────────────────────────────────────

const TITLES: Record<EnergyOption, Record<PlaceOption, string[]>> = {
  baja: {
    casa: ["Noche tranquila", "Para quedarse quietos", "Una noche sin apuro", "Modo lento"],
    afuera: ["Salida relajada", "Afuera sin prisa", "La noche al paso"],
  },
  media: {
    casa: ["Noche equilibrada", "Una noche para los dos", "Lo que venga", "Noche en casa"],
    afuera: ["A ver qué pasa", "Salida espontánea", "La noche y nosotros"],
  },
  alta: {
    casa: ["Noche intensa", "Sin frenos", "Para los que necesitan más", "Noche completa"],
    afuera: ["Noche afuera", "Salida con todo", "Esta noche sí"],
  },
};

const TAGLINES: Record<EnergyOption, string[]> = {
  baja: [
    "Para quedarse quietos y estar juntos.",
    "Sin apuro. Solo ustedes.",
    "Una noche para respirar.",
  ],
  media: [
    "Un poco de todo. Lo que venga.",
    "Ni mucho ni poco. Lo justo.",
    "Para los que no saben bien qué quieren.",
  ],
  alta: [
    "Para los que necesitan más.",
    "Esta noche no se guarda nada.",
    "Con todo.",
  ],
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Main generator ────────────────────────────────────────────────────────────

export function generateExperience(config: NightConfig): GeneratedExperience {
  const timeBudget = TIME_BUDGET_MINUTES[config.time];
  const maxActivities = MAX_ACTIVITIES[config.time];

  // 1. Filter by all 4 dimensions
  const compatible = ACTIVITY_POOL.filter(
    (a) =>
      a.tags.locations.includes(config.place) &&
      a.tags.energy.includes(config.energy) &&
      budgetCompatible(a.tags.budget, config.budget)
  );

  // 2. Shuffle for variety — same config can produce different experiences
  const shuffled = shuffle(compatible);

  // 3. Greedy pick: fill time budget without exceeding maxActivities
  const selected: Activity[] = [];
  let usedTime = 0;

  for (const activity of shuffled) {
    if (selected.length >= maxActivities) break;
    // Allow slight overflow (up to 5 min) to avoid ending with very small gaps
    if (usedTime + activity.durationMin <= timeBudget + 5) {
      selected.push(activity);
      usedTime += activity.durationMin;
    }
  }

  // 4. Fallback: if too few activities, relax energy constraint and keep location + budget
  if (selected.length < 2) {
    const relaxed = shuffle(
      ACTIVITY_POOL.filter(
        (a) =>
          a.tags.locations.includes(config.place) &&
          budgetCompatible(a.tags.budget, config.budget) &&
          !selected.find((s) => s.id === a.id)
      )
    );
    for (const activity of relaxed) {
      if (selected.length >= maxActivities) break;
      selected.push(activity);
      usedTime += activity.durationMin;
    }
  }

  const title = pick(TITLES[config.energy][config.place]);
  const tagline = pick(TAGLINES[config.energy]);

  return {
    title,
    tagline,
    activities: selected,
    totalDurationMin: usedTime,
  };
}

// ── Quick session generator (for mood buttons on home) ────────────────────────
// Generates a short 2–3 activity session filtered by category, 30 min max.

export function generateQuickSession(category: CategoryTag): GeneratedExperience {
  const pool = shuffle(
    ACTIVITY_POOL.filter(
      (a) =>
        a.tags.categories.includes(category) &&
        a.tags.locations.includes("casa") // quick sessions default to "casa"
    )
  );

  const selected: Activity[] = [];
  let usedTime = 0;

  for (const activity of pool) {
    if (selected.length >= 3) break;
    if (usedTime + activity.durationMin <= 35) {
      selected.push(activity);
      usedTime += activity.durationMin;
    }
  }

  const CATEGORY_TITLES: Record<CategoryTag, string> = {
    conexion: "Un momento para conectar",
    coqueteo: "Un rato de coqueteo",
    intimo: "Para los dos solos",
    diversion: "Para reírnos un rato",
    juego: "A jugar",
    relajarse: "Para relajarse",
    sorpresa: "Sorpresa",
  };

  const CATEGORY_TAGLINES: Record<CategoryTag, string> = {
    conexion: "Sin apuro. Para estar presentes.",
    coqueteo: "Para volver a mirarnos distinto.",
    intimo: "Solo para ustedes. Sin filtro.",
    diversion: "Porque juntos somos un desastre.",
    juego: "Que gane el mejor.",
    relajarse: "Nada que hacer. Solo estar.",
    sorpresa: "No saben qué va a salir.",
  };

  return {
    title: CATEGORY_TITLES[category],
    tagline: CATEGORY_TAGLINES[category],
    activities: selected,
    totalDurationMin: usedTime,
  };
}

// ── Guided experiences ────────────────────────────────────────────────────────

export const GUIDED_EXPERIENCES: GuidedExperience[] = [
  {
    id: "gn01",
    title: "Primera cita otra vez",
    emoji: "🌹",
    tagline: "Como si no se conocieran todavía.",
    color: "#B5607A",
    activityIds: ["da01", "qu01", "ch05", "ms02", "ti04"],
  },
  {
    id: "gn02",
    title: "Noche de invierno",
    emoji: "🕯️",
    tagline: "Adentro, tranquilos, sin apuro.",
    color: "#6B5090",
    activityIds: ["np01", "ac01", "qu02", "ti02", "np02"],
  },
  {
    id: "gn03",
    title: "Noche de risas",
    emoji: "😂",
    tagline: "Porque juntos también somos un desastre.",
    color: "#9A7830",
    activityIds: ["ch02", "ga02", "ch01", "ms04", "ch06"],
  },
  {
    id: "gn04",
    title: "Noche de reconexión",
    emoji: "🔁",
    tagline: "Para volver a encontrarse.",
    color: "#5A7B6E",
    activityIds: ["qu01", "ac01", "ga01", "ti04", "np02"],
  },
  {
    id: "gn05",
    title: "Noche de coqueteo",
    emoji: "💫",
    tagline: "Para volver a mirarnos distinto.",
    color: "#C09A52",
    activityIds: ["ms01", "ch05", "ti01", "ms05", "co03"],
  },
  {
    id: "gn06",
    title: "Noche sorpresa",
    emoji: "🎲",
    tagline: "No sabemos qué va a salir.",
    color: "#3D7870",
    activityIds: ["su01", "ms02", "ch07", "co01", "ti03"],
  },
];

export function getGuidedExperienceActivities(guided: GuidedExperience): Activity[] {
  return guided.activityIds
    .map((id) => ACTIVITY_POOL.find((a) => a.id === id))
    .filter((a): a is Activity => a !== undefined);
}
