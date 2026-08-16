export type ExperienceType =
  | "question"
  | "challenge"
  | "date"
  | "mission"
  | "choice"
  | "timer"
  | "activity";

export type ExperienceCategory =
  | "challenge"
  | "mission"
  | "timer"
  | "activity";

export interface Experience {
  id: string;
  type: ExperienceType;
  category: ExperienceCategory;
  title: string;
  description: string;
  duration: number; // minutes
  intensity: 1 | 2 | 3;
  content: ExperienceContent;
}

export type ExperienceContent =
  | ChallengeContent
  | MissionContent
  | TimerContent
  | ActivityContent;

export interface ChallengeContent {
  kind: "challenge";
  prompt: string;
  timeLimit?: number; // seconds
  winCondition?: string;
}

export interface MissionContent {
  kind: "mission";
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

export interface ActivityContent {
  kind: "activity";
  steps: string[];
  noPhoneRequired: boolean;
}

// ── Challenges ──────────────────────────────────────────────────────────────

export const CHALLENGES: Experience[] = [
  {
    id: "ch01",
    type: "challenge",
    category: "challenge",
    title: "Dibujante secreto",
    description: "Dibujate mutuamente en 60 segundos, sin mirar.",
    duration: 2,
    intensity: 1,
    content: {
      kind: "challenge",
      prompt:
        "Cada uno toma papel y lapiz. Con los ojos cerrados, dibujen al otro en 60 segundos. Al terminar: ¡comparen!",
      timeLimit: 60,
      winCondition: "El que más se parece al original, gana.",
    },
  },
  {
    id: "ch02",
    type: "challenge",
    category: "challenge",
    title: "Haceme reír",
    description: "Tenés 60 segundos para arrancarle una carcajada.",
    duration: 2,
    intensity: 2,
    content: {
      kind: "challenge",
      prompt:
        "Usando solo palabras, gestos o caras, intentá hacer reír al otro en 60 segundos. Nada de cosquillas. El que ríe primero, pierde.",
      timeLimit: 60,
      winCondition: "El que aguanta más tiempo sin reír, gana.",
    },
  },
  {
    id: "ch03",
    type: "challenge",
    category: "challenge",
    title: "Mímica del recuerdo",
    description: "Actuá un momento que vivieron juntos.",
    duration: 3,
    intensity: 1,
    content: {
      kind: "challenge",
      prompt:
        "Sin hablar, actuá un momento especial que hayan vivido juntos. El otro tiene que adivinar cuál es. Luego cambien.",
      winCondition: "Si adivina en menos de 30 segundos, doble punto.",
    },
  },
  {
    id: "ch04",
    type: "challenge",
    category: "challenge",
    title: "El menú sin palabras",
    description: "Pedí algo para comer actuando, sin hablar.",
    duration: 2,
    intensity: 1,
    content: {
      kind: "challenge",
      prompt:
        "Uno actúa como si pidiera comida en un restaurante, sin decir ninguna palabra. El otro es el mozo y tiene que adivinar el plato.",
    },
  },
  {
    id: "ch05",
    type: "challenge",
    category: "challenge",
    title: "Completen la historia",
    description: "Una historia, una palabra por turno.",
    duration: 5,
    intensity: 1,
    content: {
      kind: "challenge",
      prompt:
        "Empezá una historia con una palabra. El otro agrega otra. Alternen palabra por palabra durante 2 minutos. La historia vale todo.",
    },
  },
  {
    id: "ch06",
    type: "challenge",
    category: "challenge",
    title: "El espejo",
    description: "Copiá exactamente cada movimiento del otro.",
    duration: 3,
    intensity: 2,
    content: {
      kind: "challenge",
      prompt:
        "Párate frente al otro. Por 90 segundos, uno lidera y el otro copia cada movimiento como si fuera un espejo. Luego cambien.",
      timeLimit: 90,
    },
  },
  {
    id: "ch07",
    type: "challenge",
    category: "challenge",
    title: "Opiniones rápidas",
    description: "30 segundos, la primera respuesta que te salga.",
    duration: 3,
    intensity: 1,
    content: {
      kind: "challenge",
      prompt:
        "Uno hace preguntas durante 30 segundos y el otro responde solo con la primera palabra que le venga a la cabeza. Sin pensar. Sin filtro.",
      timeLimit: 30,
    },
  },
  {
    id: "ch08",
    type: "challenge",
    category: "challenge",
    title: "La canción del momento",
    description: "Tarareen algo y que el otro adivine.",
    duration: 3,
    intensity: 1,
    content: {
      kind: "challenge",
      prompt:
        "Uno tararea una canción que recuerde de un momento juntos. El otro tiene que adivinar cuál es y de qué momento.",
    },
  },
  {
    id: "ch09",
    type: "challenge",
    category: "challenge",
    title: "¿Qué cambió?",
    description: "Salí un momento. Cuando volvés, el otro cambió 5 cosas.",
    duration: 4,
    intensity: 1,
    content: {
      kind: "challenge",
      prompt:
        "Uno sale de la habitación (o cierra los ojos). El otro cambia 5 cosas en su apariencia o en el ambiente. Cuando vuelva, tiene que encontrar las 5 diferencias.",
    },
  },
  {
    id: "ch10",
    type: "challenge",
    category: "challenge",
    title: "El poema de urgencia",
    description: "Componé un poema de 4 versos en 2 minutos.",
    duration: 5,
    intensity: 2,
    content: {
      kind: "challenge",
      prompt:
        "Cada uno escribe un poema de 4 versos sobre el otro en 2 minutos. Luego se leen en voz alta.",
      timeLimit: 120,
    },
  },
  {
    id: "ch11",
    type: "challenge",
    category: "challenge",
    title: "Cara de piedra",
    description: "El primero que se mueve, pierde.",
    duration: 2,
    intensity: 2,
    content: {
      kind: "challenge",
      prompt:
        "Mirense fijo a los ojos. Ninguno puede moverse ni hablar. El primero que sonría, parpadeé exagerado o aparte la mirada, pierde.",
      winCondition: "El que aguanta más tiempo quieto, gana.",
    },
  },
  {
    id: "ch12",
    type: "challenge",
    category: "challenge",
    title: "Completen juntos",
    description: "Digan la misma palabra al mismo tiempo.",
    duration: 5,
    intensity: 1,
    content: {
      kind: "challenge",
      prompt:
        "Uno dice una palabra. Cuentan 1-2-3 juntos y cada uno dice la primera palabra que se le ocurra relacionada. Ganan si dicen la misma. Tienen 5 intentos.",
    },
  },
  {
    id: "ch13",
    type: "challenge",
    category: "challenge",
    title: "Crítica honesta",
    description: "Una cosa que te encanta y una que cambiarías.",
    duration: 5,
    intensity: 3,
    content: {
      kind: "challenge",
      prompt:
        "Por turnos: decí honestamente una cosa que amás del otro y una cosa (pequeña) que cambiarías. Sin drama. El que recibe escucha sin responder.",
    },
  },
  {
    id: "ch14",
    type: "challenge",
    category: "challenge",
    title: "Detective de gestos",
    description: "Observá al otro e identificá su tic más repetido.",
    duration: 5,
    intensity: 1,
    content: {
      kind: "challenge",
      prompt:
        "Durante 3 minutos, charlen normalmente. Al final, cada uno dice cuál cree que es el gesto o tic más característico del otro. El que sea más certero, gana.",
    },
  },
  {
    id: "ch15",
    type: "challenge",
    category: "challenge",
    title: "Confesión en 3 palabras",
    description: "Decí algo importante en exactamente 3 palabras.",
    duration: 3,
    intensity: 2,
    content: {
      kind: "challenge",
      prompt:
        "Por turnos: digan algo que sientan o piensen del otro usando exactamente 3 palabras. Ni más, ni menos.",
    },
  },
];

// ── Secret Missions ──────────────────────────────────────────────────────────

export const MISSIONS: Experience[] = [
  {
    id: "ms01",
    type: "mission",
    category: "mission",
    title: "Misión seducción",
    description: "Cada uno recibe una misión secreta.",
    duration: 10,
    intensity: 3,
    content: {
      kind: "mission",
      introText: "Cada uno va a recibir una misión secreta. No la muestres.",
      missionA:
        "Tu misión: durante los próximos 10 minutos, cada vez que el otro te mire, miralo dos segundos más de lo necesario antes de bajar la vista.",
      missionB:
        "Tu misión: durante los próximos 10 minutos, buscá excusas para tocarle la mano o el brazo cada vez que hables.",
      revealText:
        "¿Notaron algo raro en el otro? Revelen sus misiones.",
    },
  },
  {
    id: "ms02",
    type: "mission",
    category: "mission",
    title: "El cumplido encubierto",
    description: "Misiones de halagos disfrazados.",
    duration: 8,
    intensity: 1,
    content: {
      kind: "mission",
      introText: "Cada uno recibe una misión. Nadie puede saber la del otro.",
      missionA:
        "Tu misión: durante 8 minutos, hacé tres cumplidos al otro sin que suenen a cumplidos directos. Por ejemplo, en vez de 'qué lindo sos' decí algo como 'no sé cómo hacés para que todo te quede bien'.",
      missionB:
        "Tu misión: durante 8 minutos, cada vez que el otro diga algo, respondé con 'tenés razón' o alguna variación, aunque no estés 100% de acuerdo.",
      revealText:
        "¿Notaron algo diferente? Cuenten sus misiones.",
    },
  },
  {
    id: "ms03",
    type: "mission",
    category: "mission",
    title: "El actor y el director",
    description: "Uno actúa, el otro dirige sin saberlo.",
    duration: 5,
    intensity: 2,
    content: {
      kind: "mission",
      introText: "Misiones diferentes para cada uno. No las compartan.",
      missionA:
        "Tu misión: sos el actor. Durante la próxima conversación, actuá como si estuvieras interpretando una escena romántica de película. Habla más despacio, con más intensidad.",
      missionB:
        "Tu misión: sos el director. Tu objetivo es lograr que el otro hable más seguido y en voz más baja. Usá el tono de tu voz para guiarlo sin que se dé cuenta.",
      revealText:
        "¿Quién dirigió a quién? Comparen sus experiencias.",
    },
  },
  {
    id: "ms04",
    type: "mission",
    category: "mission",
    title: "Protocolo de contacto",
    description: "Misiones de contacto físico sutil.",
    duration: 15,
    intensity: 3,
    content: {
      kind: "mission",
      introText: "Cada uno recibe instrucciones privadas. No las reveles.",
      missionA:
        "Tu misión: en los próximos 15 minutos, logra hacer que el otro te tome de la mano de forma natural, sin pedírselo.",
      missionB:
        "Tu misión: en los próximos 15 minutos, acercate físicamente al otro al menos 3 veces, siempre con una excusa distinta.",
      revealText:
        "¿Lograron sus objetivos? ¿Qué sintieron?",
    },
  },
  {
    id: "ms05",
    type: "mission",
    category: "mission",
    title: "El recuerdo favorito",
    description: "Cada uno menciona el mismo recuerdo sin coordinarse.",
    duration: 10,
    intensity: 1,
    content: {
      kind: "mission",
      introText: "Misión individual. No compartan lo que leen.",
      missionA:
        "Tu misión: en la próxima conversación, traé a la charla de forma natural tu recuerdo favorito de los dos juntos. Sin decir que es tu favorito.",
      missionB:
        "Tu misión: en la próxima conversación, mencioná tres momentos que hayan vivido juntos, eligiendo los que más te gustaron. Sin decir que los elegiste por eso.",
      revealText:
        "¿Coincidieron en algún recuerdo? ¿Cuál creen que es el favorito del otro?",
    },
  },
  {
    id: "ms06",
    type: "mission",
    category: "mission",
    title: "El espía emocional",
    description: "Observen sin que el otro note.",
    duration: 10,
    intensity: 2,
    content: {
      kind: "mission",
      introText: "Cada uno tiene una tarea secreta de observación.",
      missionA:
        "Tu misión: durante los próximos 10 minutos, observá los gestos del otro y al final decí exactamente cómo crees que se está sintiendo ahora mismo.",
      missionB:
        "Tu misión: durante los próximos 10 minutos, contá la cantidad de veces que el otro te toca (aunque sea levemente) sin que note que estás contando.",
      revealText:
        "Comparen sus observaciones. ¿Qué tan atentos estaban?",
    },
  },
  {
    id: "ms07",
    type: "mission",
    category: "mission",
    title: "La frase prohibida",
    description: "Cada uno tiene una palabra que no puede decir.",
    duration: 10,
    intensity: 1,
    content: {
      kind: "mission",
      introText: "Misiones separadas. No compartan.",
      missionA:
        "Tu misión: durante los próximos 10 minutos, no podés decir la palabra 'bien'. Buscá sinónimos, describe, lo que sea, pero no la digas.",
      missionB:
        "Tu misión: durante los próximos 10 minutos, no podés decir la palabra 'sí'. Tenés que buscar otras formas de afirmar.",
      revealText:
        "¿Notaron que el otro tenía una restricción? ¿Qué palabra les costó más evitar?",
    },
  },
  {
    id: "ms08",
    type: "mission",
    category: "mission",
    title: "Deseo encubierto",
    description: "Comunicá algo sin decirlo directamente.",
    duration: 10,
    intensity: 3,
    content: {
      kind: "mission",
      introText: "Cada uno recibe una misión de comunicación indirecta.",
      missionA:
        "Tu misión: sin decirlo con palabras, hacé saber al otro que lo encontrás atractivo ahora mismo. Usá miradas, lenguaje corporal, lo que quieras, pero sin palabras.",
      missionB:
        "Tu misión: sin decirlo directamente, hacé que el otro sienta que tenés ganas de estar más cerca de él/ella. Sin decirlo, sin gesticular exageradamente.",
      revealText:
        "¿Recibieron el mensaje? ¿Cómo lo transmitieron?",
    },
  },
];

// ── Timers ───────────────────────────────────────────────────────────────────

export const TIMERS: Experience[] = [
  {
    id: "ti01",
    type: "timer",
    category: "timer",
    title: "Silencio completo",
    description: "5 minutos mirándose sin hablar.",
    duration: 5,
    intensity: 2,
    content: {
      kind: "timer",
      durationSeconds: 300,
      label: "Silencio",
      hint: "Dejá el teléfono apoyado. Mirense.",
      completionMessage: "¿Qué les pasó por la cabeza?",
    },
  },
  {
    id: "ti02",
    type: "timer",
    category: "timer",
    title: "El abrazo de 3 minutos",
    description: "Sin apuro. Sin hablar. Solo el abrazo.",
    duration: 3,
    intensity: 1,
    content: {
      kind: "timer",
      durationSeconds: 180,
      label: "Abrazo",
      hint: "Apoyá el teléfono y abrazate. Sin pensar en nada.",
      completionMessage: "¿Cómo se sienten?",
    },
  },
  {
    id: "ti03",
    type: "timer",
    category: "timer",
    title: "Sin pantallas",
    description: "10 minutos fuera del celular, juntos.",
    duration: 10,
    intensity: 1,
    content: {
      kind: "timer",
      durationSeconds: 600,
      label: "Sin pantallas",
      hint: "Apoyá el teléfono boca abajo. Empezá el timer.",
      completionMessage: "¡Lo lograron! ¿Qué hicieron?",
    },
  },
  {
    id: "ti04",
    type: "timer",
    category: "timer",
    title: "El beso largo",
    description: "Un minuto. Un beso.",
    duration: 1,
    intensity: 3,
    content: {
      kind: "timer",
      durationSeconds: 60,
      label: "Beso",
      hint: "Un beso. Sin parar hasta que suene.",
      completionMessage: "Fin del tiempo.",
    },
  },
  {
    id: "ti05",
    type: "timer",
    category: "timer",
    title: "Masaje express",
    description: "5 minutos de masaje, luego cambian.",
    duration: 10,
    intensity: 2,
    content: {
      kind: "timer",
      durationSeconds: 300,
      label: "Masaje",
      hint: "Uno da el masaje. Cuando suene, cambian.",
      completionMessage: "¡Cambien! Ahora le toca al otro.",
    },
  },
];

// ── Activities (no-phone) ────────────────────────────────────────────────────

export const ACTIVITIES: Experience[] = [
  {
    id: "ac01",
    type: "activity",
    category: "activity",
    title: "Cena a oscuras",
    description: "Coman algo con las luces apagadas.",
    duration: 20,
    intensity: 1,
    content: {
      kind: "activity",
      noPhoneRequired: true,
      steps: [
        "Preparen algo simple para picar.",
        "Apaguen todas las luces.",
        "Coman solo con las manos, sin cubiertos.",
        "Hablen de cualquier cosa. Sin teléfono.",
      ],
    },
  },
  {
    id: "ac02",
    type: "activity",
    category: "activity",
    title: "Playlist de los dos",
    description: "Construyan juntos la playlist definitiva.",
    duration: 15,
    intensity: 1,
    content: {
      kind: "activity",
      noPhoneRequired: false,
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
    category: "activity",
    title: "Caminata sin destino",
    description: "Salgan a caminar sin plan. La primera vuelta a la derecha.",
    duration: 30,
    intensity: 1,
    content: {
      kind: "activity",
      noPhoneRequired: true,
      steps: [
        "Salgan de casa.",
        "En cada esquina, deciden juntos: ¿izquierda o derecha?",
        "Sin celular. Sin destino.",
        "Vuelvan cuando quieran.",
      ],
    },
  },
  {
    id: "ac04",
    type: "activity",
    category: "activity",
    title: "Carta sin enviar",
    description: "Escríbanse una carta a mano.",
    duration: 15,
    intensity: 2,
    content: {
      kind: "activity",
      noPhoneRequired: true,
      steps: [
        "Consigan papel y algo para escribir.",
        "Cada uno escribe una carta al otro: lo que más le gusta, un recuerdo, lo que espera.",
        "Cuando terminen, intercambien y léanlas en silencio.",
        "Guarden las cartas.",
      ],
    },
  },
  {
    id: "ac05",
    type: "activity",
    category: "activity",
    title: "Cocinen juntos",
    description: "Elijan algo simple y háganlo juntos.",
    duration: 30,
    intensity: 1,
    content: {
      kind: "activity",
      noPhoneRequired: false,
      steps: [
        "Revisen qué tienen en la heladera.",
        "Elijan algo que puedan hacer juntos en 20-30 minutos.",
        "Uno corta, el otro mezcla. Repartan las tareas.",
        "Coman lo que hicieron.",
      ],
    },
  },
  {
    id: "ac06",
    type: "activity",
    category: "activity",
    title: "El mapa de los recuerdos",
    description: "Dibujen juntos los lugares que los marcaron.",
    duration: 20,
    intensity: 1,
    content: {
      kind: "activity",
      noPhoneRequired: true,
      steps: [
        "Consigan papel y lapiceros.",
        "Dibujen un mapa inventado con los lugares importantes de su historia.",
        "Cada uno puede agregar lugares y explicar por qué.",
        "Ponganle nombre al mapa.",
      ],
    },
  },
  {
    id: "ac07",
    type: "activity",
    category: "activity",
    title: "Cine mudo en casa",
    description: "Pongan una peli sin sonido e inventen los diálogos.",
    duration: 20,
    intensity: 1,
    content: {
      kind: "activity",
      noPhoneRequired: false,
      steps: [
        "Elijan cualquier película o serie.",
        "Bájenle el volumen a cero.",
        "Inventen los diálogos en voz alta mientras la miran.",
        "No hay reglas. Puede ser dramático o absurdo.",
      ],
    },
  },
  {
    id: "ac08",
    type: "activity",
    category: "activity",
    title: "La lista de los dos",
    description: "15 cosas que quieren hacer juntos este año.",
    duration: 15,
    intensity: 1,
    content: {
      kind: "activity",
      noPhoneRequired: false,
      steps: [
        "Abran las notas del teléfono o usen papel.",
        "Por turnos, vayan agregando cosas que quieren hacer juntos este año.",
        "Pueden ser grandes (viaje) o pequeñas (probar ese restaurante).",
        "Apunten como mínimo 15. Guárdenla.",
      ],
    },
  },
];

export const ALL_EXPERIENCES: Experience[] = [
  ...CHALLENGES,
  ...MISSIONS,
  ...TIMERS,
  ...ACTIVITIES,
];

export function getExperiencesByCategory(category: ExperienceCategory): Experience[] {
  return ALL_EXPERIENCES.filter((e) => e.category === category);
}

export function getExperienceById(id: string): Experience | undefined {
  return ALL_EXPERIENCES.find((e) => e.id === id);
}
