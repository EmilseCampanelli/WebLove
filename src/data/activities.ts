// ── Types ────────────────────────────────────────────────────────────────────

export type ActivityType =
  | "question"
  | "challenge"
  | "game"
  | "activity"
  | "secret_mission"
  | "timer"
  | "choice"
  | "no_phone"
  | "date"
  | "surprise";

export type LocationTag = "casa" | "afuera";
export type EnergyTag = "baja" | "media" | "alta";
export type BudgetTag = "nada" | "poco" | "flexible";
export type CategoryTag =
  | "conexion"
  | "coqueteo"
  | "intimo"
  | "diversion"
  | "juego"
  | "relajarse"
  | "sorpresa";

export interface ActivityTags {
  locations: LocationTag[];
  energy: EnergyTag[];
  budget: BudgetTag;
  categories: CategoryTag[];
  intensity: 1 | 2 | 3;
}

// ── Content per type ──────────────────────────────────────────────────────────

export interface QuestionContent {
  kind: "question";
  question: string;
  followUp?: string;
}

export interface ChallengeContent {
  kind: "challenge";
  prompt: string;
  timeLimitSeconds?: number;
  winCondition?: string;
  prompts?: string[];
}

export interface GameContent {
  kind: "game";
  rules: string;
  rounds?: number;
  trackScore: boolean;
  turnInstructions?: string;
  questions?: string[];
}

export interface StepsContent {
  kind: "steps";
  steps: string[];
  noPhoneHint?: boolean;
}

export interface SecretMissionContent {
  kind: "secret_mission";
  introText: string;
  missionA: string;
  missionB: string;
  revealText: string;
}

export interface TimerContent {
  kind: "timer";
  durationSeconds: number;
  label: string;
  hint?: string;
  completionMessage: string;
}

export interface ChoiceContent {
  kind: "choice";
  prompt: string;
  options: string[];
}

export interface NoPhoneContent {
  kind: "no_phone";
  instruction: string;
  durationSeconds: number;
  returnMessage: string;
}

export interface DateContent {
  kind: "date";
  idea: string;
  steps?: string[];
  budgetNote?: string;
}

export interface SurpriseContent {
  kind: "surprise";
  poolCategories?: CategoryTag[];
}

export type ActivityContent =
  | QuestionContent
  | ChallengeContent
  | GameContent
  | StepsContent
  | SecretMissionContent
  | TimerContent
  | ChoiceContent
  | NoPhoneContent
  | DateContent
  | SurpriseContent;

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  durationMin: number;
  tags: ActivityTags;
  content: ActivityContent;
}

// ── Activity pool ─────────────────────────────────────────────────────────────
// tags.budget = minimum budget required (nada = free, poco = needs some, flexible = costs money)
// tags.energy = energy levels this activity works for
// tags.locations = where it can be done

export const ACTIVITY_POOL: Activity[] = [
  // ── NO_PHONE ────────────────────────────────────────────────────────────────

  {
    id: "np01",
    type: "no_phone",
    title: "El abrazo sin palabras",
    description: "Tres minutos. Solo el abrazo.",
    durationMin: 3,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["relajarse", "conexion"],
      intensity: 1,
    },
    content: {
      kind: "no_phone",
      instruction: "Apoyá el teléfono. Abrazate. Sin hablar. Sin pensar.",
      durationSeconds: 180,
      returnMessage: "¿Cómo se sienten?",
    },
  },
  {
    id: "np02",
    type: "no_phone",
    title: "Silencio completo",
    description: "5 minutos mirándose sin decir nada.",
    durationMin: 5,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja"],
      budget: "nada",
      categories: ["conexion", "relajarse"],
      intensity: 2,
    },
    content: {
      kind: "no_phone",
      instruction: "Mirense. Sin hablar. Sin el teléfono. Solo ustedes.",
      durationSeconds: 300,
      returnMessage: "¿Qué les pasó por la cabeza?",
    },
  },
  {
    id: "np03",
    type: "no_phone",
    title: "Sin pantallas",
    description: "10 minutos completamente fuera del celular.",
    durationMin: 10,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["relajarse", "conexion"],
      intensity: 1,
    },
    content: {
      kind: "no_phone",
      instruction:
        "Apoyá el teléfono boca abajo. Los próximos 10 minutos son solo para ustedes.",
      durationSeconds: 600,
      returnMessage: "¡Lo lograron! ¿Qué hicieron?",
    },
  },
  {
    id: "np04",
    type: "no_phone",
    title: "Caminata nocturna",
    description: "Salgan a caminar sin el celular.",
    durationMin: 20,
    tags: {
      locations: ["afuera"],
      energy: ["media"],
      budget: "nada",
      categories: ["relajarse", "conexion"],
      intensity: 1,
    },
    content: {
      kind: "no_phone",
      instruction:
        "Dejen los teléfonos en casa. Salgan a caminar. No hay destino.",
      durationSeconds: 1200,
      returnMessage: "¿Adónde llegaron?",
    },
  },

  // ── TIMER ────────────────────────────────────────────────────────────────────

  {
    id: "ti01",
    type: "timer",
    title: "El beso largo",
    description: "Un minuto. Un beso. Sin parar.",
    durationMin: 2,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["media", "alta"],
      budget: "nada",
      categories: ["intimo", "coqueteo"],
      intensity: 3,
    },
    content: {
      kind: "timer",
      durationSeconds: 60,
      label: "Beso",
      hint: "Un beso. Sin parar hasta que suene.",
      completionMessage: "Fin del tiempo.",
    },
  },
  {
    id: "ti02",
    type: "timer",
    title: "Masaje express",
    description: "5 minutos cada uno. El que recibe, descansa.",
    durationMin: 10,
    tags: {
      locations: ["casa"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["relajarse", "intimo"],
      intensity: 2,
    },
    content: {
      kind: "timer",
      durationSeconds: 300,
      label: "Masaje",
      hint: "Uno da el masaje. Cuando suene, cambian.",
      completionMessage: "¡Cambien! Ahora le toca al otro.",
    },
  },
  {
    id: "ti03",
    type: "timer",
    title: "Baile en el living",
    description: "3 minutos de baile libre, sin excusas.",
    durationMin: 4,
    tags: {
      locations: ["casa"],
      energy: ["media", "alta"],
      budget: "nada",
      categories: ["diversion", "coqueteo"],
      intensity: 2,
    },
    content: {
      kind: "timer",
      durationSeconds: 180,
      label: "Baile",
      hint: "Pongan una canción que les guste y báilenla.",
      completionMessage: "¡Bien bailado!",
    },
  },
  {
    id: "ti04",
    type: "timer",
    title: "Mirada de 2 minutos",
    description: "Mirense sin hablar. Más incómodo de lo que parece.",
    durationMin: 3,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja"],
      budget: "nada",
      categories: ["conexion"],
      intensity: 2,
    },
    content: {
      kind: "timer",
      durationSeconds: 120,
      label: "Mirada",
      hint: "Mirense a los ojos. Sin reírse. Sin hablar.",
      completionMessage: "¿Qué vieron?",
    },
  },
  {
    id: "ti05",
    type: "timer",
    title: "Tiempo libre sin teléfono",
    description: "Hagan lo que quieran. Sin pantallas.",
    durationMin: 15,
    tags: {
      locations: ["casa"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["relajarse"],
      intensity: 1,
    },
    content: {
      kind: "timer",
      durationSeconds: 900,
      label: "Tiempo libre",
      hint: "El teléfono boca abajo. Hagan lo que quieran.",
      completionMessage: "¿Qué hicieron?",
    },
  },

  // ── SECRET MISSION ───────────────────────────────────────────────────────────

  {
    id: "ms01",
    type: "secret_mission",
    title: "Misión seducción",
    description: "Cada uno recibe una misión privada.",
    durationMin: 10,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["media", "alta"],
      budget: "nada",
      categories: ["coqueteo", "intimo"],
      intensity: 3,
    },
    content: {
      kind: "secret_mission",
      introText: "Cada uno va a recibir una misión secreta. No la muestres.",
      missionA:
        "Tu misión: durante los próximos 10 minutos, cada vez que el otro te mire, miralo dos segundos más de lo necesario antes de bajar la vista.",
      missionB:
        "Tu misión: durante los próximos 10 minutos, buscá excusas para tocarle la mano o el brazo cada vez que hables.",
      revealText: "¿Notaron algo raro en el otro? Cuenten sus misiones.",
    },
  },
  {
    id: "ms02",
    type: "secret_mission",
    title: "El cumplido encubierto",
    description: "Halagos disfrazados. El otro no puede saber.",
    durationMin: 8,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["conexion", "coqueteo"],
      intensity: 1,
    },
    content: {
      kind: "secret_mission",
      introText: "Misiones individuales. No compartan lo que leen.",
      missionA:
        "Tu misión: en los próximos 8 minutos, hacé tres cumplidos al otro sin que suenen a cumplidos directos. Por ejemplo: 'no sé cómo hacés para que todo te quede bien'.",
      missionB:
        "Tu misión: en los próximos 8 minutos, cada vez que el otro diga algo, respondé afirmando con entusiasmo, como si todo lo que diga fuera exactamente lo que pensás vos.",
      revealText: "¿Notaron algo diferente? Cuenten sus misiones.",
    },
  },
  {
    id: "ms03",
    type: "secret_mission",
    title: "Protocolo de contacto",
    description: "Misiones de contacto físico sutil.",
    durationMin: 15,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["media"],
      budget: "nada",
      categories: ["coqueteo", "intimo"],
      intensity: 3,
    },
    content: {
      kind: "secret_mission",
      introText: "Cada uno recibe instrucciones privadas. No las reveles.",
      missionA:
        "Tu misión: en los próximos 15 minutos, lograque el otro te tome de la mano de forma natural, sin pedírselo.",
      missionB:
        "Tu misión: en los próximos 15 minutos, acercate físicamente al otro al menos 3 veces, siempre con una excusa distinta.",
      revealText: "¿Lograron sus objetivos? ¿Qué sintieron?",
    },
  },
  {
    id: "ms04",
    type: "secret_mission",
    title: "La frase prohibida",
    description: "Cada uno tiene una palabra que no puede decir.",
    durationMin: 10,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["diversion", "juego"],
      intensity: 1,
    },
    content: {
      kind: "secret_mission",
      introText: "Misiones separadas. No compartan.",
      missionA:
        "Tu misión: durante los próximos 10 minutos, no podés decir la palabra 'bien'. Buscá sinónimos, describí, lo que sea, pero no la digas.",
      missionB:
        "Tu misión: durante los próximos 10 minutos, no podés decir la palabra 'sí'. Tenés que buscar otras formas de afirmar.",
      revealText:
        "¿Notaron que el otro tenía una restricción? ¿Qué palabra les costó más evitar?",
    },
  },
  {
    id: "ms05",
    type: "secret_mission",
    title: "Deseo encubierto",
    description: "Decile algo sin palabras.",
    durationMin: 10,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["media", "alta"],
      budget: "nada",
      categories: ["intimo", "coqueteo"],
      intensity: 3,
    },
    content: {
      kind: "secret_mission",
      introText: "Cada uno recibe una misión de comunicación sin palabras.",
      missionA:
        "Tu misión: sin decirlo con palabras, hacé saber al otro que lo encontrás atractivo ahora mismo. Usá miradas, lenguaje corporal, lo que quieras.",
      missionB:
        "Tu misión: sin decirlo directamente, hacé que el otro sienta que tenés ganas de estar más cerca de él/ella. Sin palabras, sin gestos exagerados.",
      revealText: "¿Recibieron el mensaje? ¿Cómo lo transmitieron?",
    },
  },

  // ── CHALLENGE ────────────────────────────────────────────────────────────────

  {
    id: "ch01",
    type: "challenge",
    title: "Dibujante secreto",
    description: "Dibujanse mutuamente en 60 segundos, sin mirar.",
    durationMin: 3,
    tags: {
      locations: ["casa"],
      energy: ["media"],
      budget: "nada",
      categories: ["diversion"],
      intensity: 1,
    },
    content: {
      kind: "challenge",
      prompt:
        "Tomen papel y algo para escribir. Con los ojos cerrados, dibujen al otro en 60 segundos. Al terminar: ¡comparen!",
      timeLimitSeconds: 60,
      winCondition: "El que más se parece al original, gana.",
    },
  },
  {
    id: "ch02",
    type: "challenge",
    title: "Hacé reír al otro",
    description: "Tenés 30 segundos para arrancarle una carcajada.",
    durationMin: 2,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["alta"],
      budget: "nada",
      categories: ["diversion"],
      intensity: 2,
    },
    content: {
      kind: "challenge",
      prompt:
        "Solo con palabras, gestos o caras. Nada de cosquillas. Intentá hacer reír al otro en 30 segundos.",
      timeLimitSeconds: 30,
      winCondition: "El que aguanta más sin reír, gana.",
    },
  },
  {
    id: "ch03",
    type: "challenge",
    title: "Cara de piedra",
    description: "El primero que se mueve, pierde.",
    durationMin: 2,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["media"],
      budget: "nada",
      categories: ["diversion", "juego"],
      intensity: 1,
    },
    content: {
      kind: "challenge",
      prompt:
        "Mirense fijo a los ojos. Nadie puede moverse, hablar ni reírse. El primero que lo haga, pierde.",
      winCondition: "El que aguanta más tiempo, gana.",
    },
  },
  {
    id: "ch04",
    type: "challenge",
    title: "El espejo",
    description: "Copiá exactamente cada movimiento del otro.",
    durationMin: 5,
    tags: {
      locations: ["casa"],
      energy: ["media"],
      budget: "nada",
      categories: ["diversion", "conexion"],
      intensity: 1,
    },
    content: {
      kind: "challenge",
      prompt:
        "Párate frente al otro. Por 90 segundos, uno lidera y el otro copia cada movimiento como un espejo. Luego cambien.",
      timeLimitSeconds: 90,
    },
  },
  {
    id: "ch05",
    type: "challenge",
    title: "Confesión en 3 palabras",
    description: "Decí algo importante en exactamente 3 palabras.",
    durationMin: 5,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["conexion", "coqueteo"],
      intensity: 2,
    },
    content: {
      kind: "challenge",
      prompt:
        "Por turnos: digan algo que sientan o piensen del otro usando exactamente 3 palabras. Ni más, ni menos.",
    },
  },
  {
    id: "ch06",
    type: "challenge",
    title: "Imitación",
    description: "Imitá el gesto o costumbre más típica del otro.",
    durationMin: 4,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["media", "alta"],
      budget: "nada",
      categories: ["diversion"],
      intensity: 1,
    },
    content: {
      kind: "challenge",
      prompt:
        "Por turnos: imitá lo que dice la app. El otro adivina de quién es.",
      prompts: [
        "Cómo camina cuando está apurado/a",
        "Cómo pide perdón",
        "Cómo reacciona cuando algo le da asco",
        "Cómo se ríe cuando algo le parece muy gracioso",
        "Cómo reacciona cuando pierde algo",
        "Cómo explica algo complicado",
        "Cómo se queja cuando tiene frío",
        "Cómo reacciona cuando está aburrido/a",
        "Cómo dice 'te quiero' sin palabras",
        "Cómo entra a un lugar cuando llega tarde",
        "Cómo come algo que le encanta",
        "Cómo reacciona cuando se le olvida algo importante",
        "Cómo baila cuando está solo/a en casa",
        "Cómo dice que no sin decir que no",
        "Cómo reacciona cuando algo le sale perfecto",
      ],
    },
  },
  {
    id: "ch07",
    type: "challenge",
    title: "Mímica del recuerdo",
    description: "Actuá un momento que vivieron juntos.",
    durationMin: 5,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["media"],
      budget: "nada",
      categories: ["diversion", "conexion"],
      intensity: 1,
    },
    content: {
      kind: "challenge",
      prompt:
        "Sin hablar, actuá un momento especial que hayan vivido juntos. El otro tiene que adivinar cuál es. Luego cambien.",
    },
  },
  {
    id: "ch08",
    type: "challenge",
    title: "La canción de nosotros",
    description: "Tarareen algo y que el otro adivine.",
    durationMin: 5,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["diversion", "conexion"],
      intensity: 1,
    },
    content: {
      kind: "challenge",
      prompt:
        "Uno tararea una canción que recuerde un momento juntos. El otro tiene que adivinar cuál es y de qué momento.",
    },
  },

  // ── GAME ─────────────────────────────────────────────────────────────────────

  {
    id: "ga01",
    type: "game",
    title: "¿Quién conoce mejor al otro?",
    description: "La app pregunta. Cada uno responde sobre el otro.",
    durationMin: 10,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["conexion", "juego"],
      intensity: 1,
    },
    content: {
      kind: "game",
      rules:
        "La app da una pregunta sobre uno de los dos. El otro responde. Si acierta, punto para él. 10 rondas.",
      rounds: 10,
      trackScore: true,
      turnInstructions: "Lean la pregunta y respondan sobre su pareja.",
      questions: [
        "¿Cuál es su mayor miedo?",
        "¿Qué la/lo hace reír instantáneamente?",
        "¿Cómo reacciona cuando está nervioso/a?",
        "¿Cuál es su canción de cabecera?",
        "¿Qué haría con un día libre sin obligaciones?",
        "¿Cuál es su comida favorita?",
        "¿Qué superpoder elegiría?",
        "¿Qué hace cuando está de mal humor?",
        "¿Cuál es su mayor orgullo personal?",
        "¿Qué es lo primero que hace al levantarse?",
        "¿Cuál es su película favorita de todos los tiempos?",
        "¿Qué le cuesta más pedir: ayuda o perdón?",
        "¿Cómo prefiere que le demuestren cariño?",
        "¿Qué cambiaría de sí mismo/a si pudiera?",
        "¿Cuál es su recuerdo favorito de la infancia?",
        "¿Qué la/lo pone de buen humor enseguida?",
        "¿Dónde viviría si pudiera vivir en cualquier lugar?",
        "¿Qué haría si ganara mucho dinero?",
        "¿Qué virtud suya más te gusta?",
        "¿Qué costumbre suya te parece adorable?",
      ],
    },
  },
  {
    id: "ga02",
    type: "game",
    title: "Completar la historia",
    description: "Una historia, una palabra por turno.",
    durationMin: 5,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["diversion", "juego"],
      intensity: 1,
    },
    content: {
      kind: "game",
      rules:
        "Empezá una historia con una sola palabra. El otro agrega otra. Alternen palabra por palabra durante 2 minutos. Pueden reírse, pero no pueden parar.",
      trackScore: false,
      turnInstructions: "Turnos de a una palabra.",
    },
  },
  {
    id: "ga03",
    type: "game",
    title: "Opiniones rápidas",
    description: "La primera respuesta que salga. Sin filtro.",
    durationMin: 5,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["media"],
      budget: "nada",
      categories: ["diversion", "juego", "conexion"],
      intensity: 1,
    },
    content: {
      kind: "game",
      rules:
        "La app da un disparador. Los dos responden al mismo tiempo con la primera palabra que les venga. Sin pensar. Sin filtro.",
      rounds: 12,
      trackScore: false,
      turnInstructions: "Respondan juntos a la vez. No vale pensar.",
      questions: [
        "¿Playa o montaña?",
        "¿Madrugada o amanecer?",
        "¿Lo más lindo que pasó este año?",
        "¿Qué cambiarías de hoy?",
        "¿Una palabra para describir esta noche?",
        "¿Ciudad o campo?",
        "¿Silencio o música?",
        "¿Aventura o tranquilidad?",
        "¿Qué querés que pase mañana?",
        "¿Una cosa que nunca te cansas de hacer?",
        "¿Invierno o verano?",
        "¿Casa o salir?",
        "¿Algo que te da miedo perder?",
        "¿Una cosa que te da mucha alegría?",
        "¿Qué es lo más importante para vos en una relación?",
        "¿Desayuno o cena?",
        "¿Libro o película?",
        "¿Algo que te gustaría aprender?",
        "¿Qué es lo que más te relaja?",
        "¿Un lugar al que quieras volver?",
      ],
    },
  },
  {
    id: "ga04",
    type: "game",
    title: "Competencia de trivial",
    description: "Preguntas de cultura general. Con marcador.",
    durationMin: 10,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["media", "alta"],
      budget: "nada",
      categories: ["juego", "diversion"],
      intensity: 2,
    },
    content: {
      kind: "game",
      rules:
        "Por turnos, uno hace una pregunta. Si el otro acierta, punto para él. Si no, punto para quien preguntó. 10 rondas.",
      rounds: 10,
      trackScore: true,
      turnInstructions: "Lean la pregunta en voz alta. El que más sabe, gana.",
      questions: [
        "¿Cuál es el río más largo del mundo?",
        "¿En qué año llegó el hombre a la Luna?",
        "¿Cuántos huesos tiene el cuerpo humano?",
        "¿Cuál es la capital de Australia?",
        "¿Quién pintó La Última Cena?",
        "¿Cuántos planetas tiene el sistema solar?",
        "¿Cuál es el elemento más abundante en la Tierra?",
        "¿En qué país está Machu Picchu?",
        "¿Quién escribió Cien años de soledad?",
        "¿Cuánto mide un metro en centímetros?",
        "¿Cuál es el animal terrestre más rápido?",
        "¿De qué país es originaria la pizza?",
        "¿Cuántos colores tiene el arcoíris?",
        "¿Qué idioma hablan en Brasil?",
        "¿Cuál es el océano más grande?",
        "¿Cuántos lados tiene un hexágono?",
        "¿Cuál es la montaña más alta del mundo?",
        "¿En qué continente está Egipto?",
        "¿Qué instrumento toca un pianista?",
        "¿Cuántos minutos tiene una hora?",
        // quien conoce más al otro
        "¿Cuál es la comida favorita de tu pareja?",
        "¿En qué trabaja o estudia la persona que tenés al lado?",
        "¿Cuál es el mayor miedo de tu pareja?",
        "¿Qué serie o película podría ver tu pareja en loop?",
        "¿Cómo se llama el mejor amigo o amiga de tu pareja?",
        "¿Qué haría tu pareja con un día libre sin planes?",
        "¿Cuál es el recuerdo favorito de tu pareja de la infancia?",
        "¿Cuál es el destino de viaje soñado de tu pareja?",
        "¿Qué la/lo pone de buen humor instantáneamente?",
        "¿Qué hábito de tu pareja te parece adorable?",
        "¿Cuándo conociste a tu pareja, qué fue lo primero que te llamó la atención?",
        "¿Cuál es la canción que más identifica a tu pareja?",
        "¿Qué superpoder elegiría tu pareja?",
        "¿Qué haría tu pareja si ganara la lotería?",
        "¿Cuál es la mayor fortaleza de tu pareja según vos?",
      ],
    },
  },

  // ── ACTIVITY (steps) ─────────────────────────────────────────────────────────

  {
    id: "ac01",
    type: "activity",
    title: "Carta sin enviar",
    description: "Escríbanse una carta a mano.",
    durationMin: 15,
    tags: {
      locations: ["casa"],
      energy: ["baja"],
      budget: "nada",
      categories: ["conexion"],
      intensity: 2,
    },
    content: {
      kind: "steps",
      steps: [
        "Consigan papel y algo para escribir.",
        "Cada uno escribe una carta al otro: lo que más le gusta, un recuerdo, lo que espera.",
        "Cuando terminen, intercambien y léanlas en silencio.",
        "Guarden las cartas.",
      ],
    },
  },
  {
    id: "ac02",
    type: "activity",
    title: "Playlist de los dos",
    description: "La banda sonora de su historia, armada ahora.",
    durationMin: 15,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["conexion", "relajarse"],
      intensity: 1,
    },
    content: {
      kind: "steps",
      steps: [
        "Abran Spotify u otra app de música.",
        "Por turnos, cada uno agrega una canción que les recuerde algo juntos.",
        "Al agregar cada canción, cuenten brevemente por qué.",
        "Guarden la playlist con un nombre que los represente.",
      ],
    },
  },
  {
    id: "ac03",
    type: "activity",
    title: "Caminata sin destino",
    description: "Salen a caminar. La primera vuelta a la derecha.",
    durationMin: 30,
    tags: {
      locations: ["afuera"],
      energy: ["media"],
      budget: "nada",
      categories: ["relajarse", "conexion"],
      intensity: 1,
    },
    content: {
      kind: "steps",
      steps: [
        "Salgan de donde están.",
        "En cada esquina, decidan juntos: ¿izquierda o derecha?",
        "Sin teléfono. Sin destino.",
        "Vuelvan cuando quieran.",
      ],
      noPhoneHint: true,
    },
  },
  {
    id: "ac04",
    type: "activity",
    title: "El mapa de los recuerdos",
    description: "Dibujen juntos los lugares que los marcaron.",
    durationMin: 20,
    tags: {
      locations: ["casa"],
      energy: ["baja"],
      budget: "nada",
      categories: ["conexion"],
      intensity: 1,
    },
    content: {
      kind: "steps",
      steps: [
        "Consigan papel y lapiceros.",
        "Dibujen un mapa inventado con los lugares importantes de su historia.",
        "Cada uno puede agregar lugares y explicar por qué.",
        "Ponganle nombre al mapa.",
      ],
    },
  },
  {
    id: "ac05",
    type: "activity",
    title: "Cine mudo en casa",
    description: "Pongan una peli sin sonido e inventen los diálogos.",
    durationMin: 20,
    tags: {
      locations: ["casa"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["diversion", "relajarse"],
      intensity: 1,
    },
    content: {
      kind: "steps",
      steps: [
        "Elijan cualquier película o serie.",
        "Bájenle el volumen a cero.",
        "Inventen los diálogos en voz alta mientras la miran.",
        "No hay reglas. Puede ser dramático o absurdo.",
      ],
    },
  },
  {
    id: "ac06",
    type: "activity",
    title: "Cocinen algo juntos",
    description: "Simple. Lo que tengan. Lo que venga.",
    durationMin: 30,
    tags: {
      locations: ["casa"],
      energy: ["media"],
      budget: "nada",
      categories: ["relajarse", "diversion"],
      intensity: 1,
    },
    content: {
      kind: "steps",
      steps: [
        "Revisen qué tienen en la heladera.",
        "Elijan algo que puedan hacer juntos en 20-30 minutos.",
        "Uno corta, el otro mezcla. Repartan las tareas.",
        "Coman lo que hicieron.",
      ],
    },
  },
  {
    id: "ac07",
    type: "activity",
    title: "La lista del año",
    description: "15 cosas que quieren hacer juntos este año.",
    durationMin: 15,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja"],
      budget: "nada",
      categories: ["conexion", "sorpresa"],
      intensity: 1,
    },
    content: {
      kind: "steps",
      steps: [
        "Abran las notas o usen papel.",
        "Por turnos, vayan agregando cosas que quieren hacer juntos.",
        "Pueden ser grandes (un viaje) o pequeñas (probar ese restaurant).",
        "Apunten mínimo 15. Guárdenla.",
      ],
    },
  },
  {
    id: "ac08",
    type: "activity",
    title: "Cena a oscuras",
    description: "Coman algo con las luces apagadas.",
    durationMin: 20,
    tags: {
      locations: ["casa"],
      energy: ["baja"],
      budget: "nada",
      categories: ["relajarse", "intimo", "conexion"],
      intensity: 2,
    },
    content: {
      kind: "steps",
      steps: [
        "Preparen algo simple para picar.",
        "Apaguen todas las luces.",
        "Coman solo con las manos, sin cubiertos.",
        "Hablen de cualquier cosa. Sin teléfono.",
      ],
      noPhoneHint: true,
    },
  },

  // ── QUESTION ─────────────────────────────────────────────────────────────────

  {
    id: "qu01",
    type: "question",
    title: "Lo que más me gusta de vos",
    description: "Una pregunta. Tomense su tiempo.",
    durationMin: 5,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["conexion"],
      intensity: 1,
    },
    content: {
      kind: "question",
      question: "¿Qué fue lo primero que te llamó la atención de mí?",
      followUp: "¿Sigue siendo eso lo que más te gusta?",
    },
  },
  {
    id: "qu02",
    type: "question",
    title: "El recuerdo favorito",
    description: "Hay uno. Los dos saben cuál es.",
    durationMin: 5,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja"],
      budget: "nada",
      categories: ["conexion"],
      intensity: 1,
    },
    content: {
      kind: "question",
      question: "¿Cuál es el momento de los últimos 30 días que guardarías para siempre?",
      followUp: "¿Por qué ese y no otro?",
    },
  },
  {
    id: "qu03",
    type: "question",
    title: "Lo que nunca dijiste",
    description: "Una pregunta que se queda.",
    durationMin: 8,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["conexion", "intimo"],
      intensity: 2,
    },
    content: {
      kind: "question",
      question: "¿Hay algo que siempre quisiste pedirme y nunca te animaste?",
      followUp: "¿Por qué nunca lo dijiste?",
    },
  },
  {
    id: "qu04",
    type: "question",
    title: "Lo ridículo adorable",
    description: "Hay algo. Decilo.",
    durationMin: 5,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["coqueteo", "diversion"],
      intensity: 1,
    },
    content: {
      kind: "question",
      question: "¿Cuál es la cosa más ridícula que te parece adorable de mí?",
    },
  },
  {
    id: "qu05",
    type: "question",
    title: "Si pudiéramos",
    description: "Sin límites. Sin presupuesto.",
    durationMin: 5,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["conexion", "sorpresa"],
      intensity: 1,
    },
    content: {
      kind: "question",
      question: "Si pudiéramos irnos ahora mismo a cualquier lugar del mundo, ¿a dónde irías?",
      followUp: "¿Por qué ahí y no en otro momento?",
    },
  },

  // ── CHOICE ───────────────────────────────────────────────────────────────────

  {
    id: "co01",
    type: "choice",
    title: "El próximo paso",
    description: "¿Qué hacemos después? Que el azar decida.",
    durationMin: 2,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media", "alta"],
      budget: "nada",
      categories: ["sorpresa"],
      intensity: 1,
    },
    content: {
      kind: "choice",
      prompt: "¿Qué quieren hacer ahora?",
      options: [
        "Seguir con la noche 🎲",
        "Dejar el teléfono 📵",
        "Hablar de algo importante 💬",
        "Empezar de vuelta 🔁",
      ],
    },
  },
  {
    id: "co02",
    type: "choice",
    title: "La cita de esta noche",
    description: "Elijan el plan para lo que sigue.",
    durationMin: 3,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["media"],
      budget: "nada",
      categories: ["sorpresa", "conexion"],
      intensity: 1,
    },
    content: {
      kind: "choice",
      prompt: "¿Cómo terminan la noche?",
      options: [
        "Vemos algo juntos 🎬",
        "Salimos a caminar 🚶",
        "Nos quedamos quietos 😌",
        "Que sea sorpresa 🎲",
      ],
    },
  },
  {
    id: "co03",
    type: "choice",
    title: "Una sola canción",
    description: "Cada uno propone una. El azar elige.",
    durationMin: 3,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media"],
      budget: "nada",
      categories: ["relajarse", "coqueteo"],
      intensity: 1,
    },
    content: {
      kind: "choice",
      prompt: "Cada uno dice una canción. ¿Cuál ponen?",
      options: [
        "La de él/ella 🎵",
        "La mía 🎶",
        "Una al azar 🎲",
        "Las dos seguidas 🎼",
      ],
    },
  },

  // ── DATE ──────────────────────────────────────────────────────────────────────

  {
    id: "da01",
    type: "date",
    title: "Primera cita, otra vez",
    description: "Como si no se conocieran todavía.",
    durationMin: 30,
    tags: {
      locations: ["casa"],
      energy: ["media"],
      budget: "nada",
      categories: ["coqueteo", "conexion"],
      intensity: 2,
    },
    content: {
      kind: "date",
      idea:
        "Recreen su primera cita. Vistan algo que les guste, preparen algo para tomar, y hablen como si recién se estuvieran conociendo.",
      steps: [
        "Vistanse como para salir.",
        "Preparen algo para tomar.",
        "Siéntense frente a frente.",
        "Cuenten cosas como si recién se hubieran conocido.",
      ],
    },
  },
  {
    id: "da02",
    type: "date",
    title: "Salida sin plan",
    description: "Afuera, sin saber a dónde.",
    durationMin: 60,
    tags: {
      locations: ["afuera"],
      energy: ["media", "alta"],
      budget: "poco",
      categories: ["sorpresa", "conexion"],
      intensity: 1,
    },
    content: {
      kind: "date",
      idea:
        "Salgan. Sin destino fijo. En cada bifurcación o local interesante, decidan en el momento si entran o siguen. Dejen que la noche los lleve.",
      steps: [
        "Salgan de casa.",
        "No planeen a dónde van.",
        "Sigan lo que les llame la atención.",
        "Vuelvan cuando quieran.",
      ],
      budgetNote: "Llevan algo de plata por las dudas.",
    },
  },
  {
    id: "da03",
    type: "date",
    title: "Noche de tapas y vino",
    description: "Algo rico, una copa, y tiempo.",
    durationMin: 45,
    tags: {
      locations: ["casa"],
      energy: ["baja", "media"],
      budget: "poco",
      categories: ["relajarse", "coqueteo"],
      intensity: 2,
    },
    content: {
      kind: "date",
      idea:
        "Armen una tabla de picadas o tapas en casa. Abran algo para tomar. Pongan música suave. Sin apuro.",
      steps: [
        "Busquen cosas para picar en la alacena o heladera.",
        "Pongan música.",
        "Siéntense sin mirar el teléfono.",
        "Tómense el tiempo que quieran.",
      ],
      budgetNote: "Una botella de vino o lo que quieran tomar.",
    },
  },

  // ── SURPRISE ──────────────────────────────────────────────────────────────────

  {
    id: "su01",
    type: "surprise",
    title: "Actividad sorpresa",
    description: "No saben qué va a salir.",
    durationMin: 10,
    tags: {
      locations: ["casa", "afuera"],
      energy: ["baja", "media", "alta"],
      budget: "nada",
      categories: ["sorpresa"],
      intensity: 2,
    },
    content: {
      kind: "surprise",
      poolCategories: ["diversion", "conexion", "coqueteo"],
    },
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getActivityById(id: string): Activity | undefined {
  return ACTIVITY_POOL.find((a) => a.id === id);
}

export function getActivitiesByCategory(category: CategoryTag): Activity[] {
  return ACTIVITY_POOL.filter((a) => a.tags.categories.includes(category));
}
