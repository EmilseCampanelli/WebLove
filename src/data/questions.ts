export type QuestionCategory =
  | "conexion"
  | "coqueteo"
  | "intimo"
  | "diversion"
  | "profundo";

export interface Question {
  id: string;
  text: string;
  category: QuestionCategory;
  intensity?: 1 | 2 | 3;
}

export type SpecialCard = {
  type: "beso" | "mimo" | "sorpresa";
  text: string;
  emoji: string;
};

export const SPECIAL_CARDS: SpecialCard[] = [
  {
    type: "beso",
    text: "Esta pregunta se responde con un beso.",
    emoji: "💋",
  },
  {
    type: "mimo",
    text: "Dejá la pregunta de lado. Durante un minuto, solo mimos.",
    emoji: "🫶",
  },
  {
    type: "sorpresa",
    text: "¡Carta sorpresa! Elegí vos la próxima pregunta.",
    emoji: "🎲",
  },
];

export const QUESTIONS: Question[] = [
  // ─── CONEXIÓN (20) ───────────────────────────────────────
  {
    id: "c01",
    text: "¿Qué fue lo primero que te atrajo de mí?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c02",
    text: "¿Cuál es tu recuerdo favorito de nosotros?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c03",
    text: "¿Qué cosa mía te sigue pareciendo adorable?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c04",
    text: "¿En qué momento sentiste que nuestra relación se volvió especial?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c05",
    text: "¿Qué pequeño gesto mío te hace sentir querido/a?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c06",
    text: "¿Hay algo que hacemos juntos y que te parece mágico, aunque parezca simple?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c07",
    text: "Si pudieras revivir un día con migo, ¿cuál elegiría?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c08",
    text: "¿Qué parte de tu vida cambió desde que estamos juntos?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c09",
    text: "¿Cuándo fue la primera vez que pensaste 'esto es algo real'?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c10",
    text: "¿Cuál es la canción que más nos representa?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c11",
    text: "¿Qué cosa mía te sorprendió gratamente cuando me conociste?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c12",
    text: "¿Hay algún lugar que sientas que es 'nuestro'?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c13",
    text: "¿Qué es lo que más extrañas cuando no estamos juntos?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c14",
    text: "¿Qué cosa tuya siento que conozco y vos no sabés que noto?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c15",
    text: "¿Cuál es el momento en que más orgulloso/a me sentí de vos?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c16",
    text: "Si tuvieras que describir nuestra relación con una sola imagen, ¿cuál sería?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c17",
    text: "¿Qué cosa que hacemos juntos te hace reír siempre?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c18",
    text: "¿Qué frase mía repetís (o te quedó grabada) sin que yo lo sepa?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c19",
    text: "¿Hay algo que te gustaría que hiciéramos más seguido?",
    category: "conexion",
    intensity: 1,
  },
  {
    id: "c20",
    text: "¿En qué momento del día pensás más en mí?",
    category: "conexion",
    intensity: 1,
  },

  // ─── COQUETEO (20) ───────────────────────────────────────
  {
    id: "q01",
    text: "¿Qué gesto mío te resulta irresistible?",
    category: "coqueteo",
    intensity: 1,
  },
  {
    id: "q02",
    text: "¿Qué outfit mío te encanta?",
    category: "coqueteo",
    intensity: 1,
  },
  {
    id: "q03",
    text: "¿Qué tipo de beso mío te gusta más?",
    category: "coqueteo",
    intensity: 2,
  },
  {
    id: "q04",
    text: "¿Alguna vez me miraste haciendo algo cotidiano y pensaste 'qué ganas de besarlo/a'?",
    category: "coqueteo",
    intensity: 1,
  },
  {
    id: "q05",
    text: "¿Qué podría hacer más seguido para seducirte?",
    category: "coqueteo",
    intensity: 2,
  },
  {
    id: "q06",
    text: "¿Qué parte de mi cuerpo te parece la más atractiva?",
    category: "coqueteo",
    intensity: 2,
  },
  {
    id: "q07",
    text: "¿Cuál fue el momento en que más te costó contenerte de besarme?",
    category: "coqueteo",
    intensity: 2,
  },
  {
    id: "q08",
    text: "¿Qué cosa que digo o hago te resulta especialmente tentadora?",
    category: "coqueteo",
    intensity: 2,
  },
  {
    id: "q09",
    text: "¿Te gusta más cuando tomo la iniciativa o cuando la tomás vos?",
    category: "coqueteo",
    intensity: 2,
  },
  {
    id: "q10",
    text: "¿Qué haría que una noche juntos fuera perfecta?",
    category: "coqueteo",
    intensity: 2,
  },
  {
    id: "q11",
    text: "¿Cuál es tu lugar favorito para que te dé un beso?",
    category: "coqueteo",
    intensity: 2,
  },
  {
    id: "q12",
    text: "¿Hay algo que haga con las manos que te llame la atención?",
    category: "coqueteo",
    intensity: 1,
  },
  {
    id: "q13",
    text: "¿Qué perfume o fragancia mía te gusta más?",
    category: "coqueteo",
    intensity: 1,
  },
  {
    id: "q14",
    text: "Si me pidieras que me vistiera para sorprenderte, ¿qué me pedirías?",
    category: "coqueteo",
    intensity: 2,
  },
  {
    id: "q15",
    text: "¿Cuándo fue la última vez que te volví loco/a con algo sin darme cuenta?",
    category: "coqueteo",
    intensity: 2,
  },
  {
    id: "q16",
    text: "¿Qué canción te pone en modo romántico automáticamente?",
    category: "coqueteo",
    intensity: 1,
  },
  {
    id: "q17",
    text: "¿Cuál es tu tipo de abrazo favorito?",
    category: "coqueteo",
    intensity: 1,
  },
  {
    id: "q18",
    text: "¿Qué parte del proceso de seducción disfrutás más?",
    category: "coqueteo",
    intensity: 2,
  },
  {
    id: "q19",
    text: "¿Preferís las demostraciones de afecto en público o en privado?",
    category: "coqueteo",
    intensity: 1,
  },
  {
    id: "q20",
    text: "¿Qué es lo primero que notás de mí cuando entro a un lugar?",
    category: "coqueteo",
    intensity: 1,
  },

  // ─── ÍNTIMO (20) ─────────────────────────────────────────
  {
    id: "i01",
    text: "¿Hay algo que te dé curiosidad probar conmigo?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i02",
    text: "¿Qué te hace sentir más deseado/a?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i03",
    text: "¿Preferís que te sorprendan o saber de antemano lo que va a pasar?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i04",
    text: "¿Qué tipo de anticipación te resulta más atractiva?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i05",
    text: "¿Hay algún deseo que nunca hayas encontrado el momento de contarme?",
    category: "intimo",
    intensity: 3,
  },
  {
    id: "i06",
    text: "¿Qué es lo que más disfrutás de nuestra intimidad?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i07",
    text: "¿Hay algo que siempre quise preguntarte pero no supe cómo?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i08",
    text: "¿Cuándo te sentís más conectado/a conmigo?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i09",
    text: "¿Qué es lo que te hace sentir más vulnerable conmigo, en el buen sentido?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i10",
    text: "¿Hay algo que me gustaría hacer más seguido que a vos también te gustaría?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i11",
    text: "¿Qué ambiente o situación te pone más de humor?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i12",
    text: "¿Cuál es tu fantasía favorita que involucre algo cotidiano y romántico?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i13",
    text: "¿Hay algo que nunca probaste pero que te generaría curiosidad si yo te lo propusiera?",
    category: "intimo",
    intensity: 3,
  },
  {
    id: "i14",
    text: "¿Cuándo fue la última vez que te sentiste completamente presente conmigo?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i15",
    text: "¿Preferís la conexión lenta y gradual o la intensidad inmediata?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i16",
    text: "¿Hay palabras que te gustaría escuchar más de mi parte?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i17",
    text: "¿Qué detalle mío te lleva de cero a querer besarme en cuestión de segundos?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i18",
    text: "¿Te gusta más la noche o la madrugada cuando estamos juntos?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i19",
    text: "¿Qué hace que una noche contigo sea diferente a todas las demás?",
    category: "intimo",
    intensity: 2,
  },
  {
    id: "i20",
    text: "¿Cuál es la cosa más pequeña que hago y que te resulta más íntima?",
    category: "intimo",
    intensity: 2,
  },

  // ─── DIVERSIÓN (20) ──────────────────────────────────────
  {
    id: "d01",
    text: "Si nuestra relación fuera una película, ¿qué género sería?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d02",
    text: "¿Cuál de los dos sobreviviría mejor a un apocalipsis zombie?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d03",
    text: "¿Qué hábito mío usarías para imitarme?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d04",
    text: "Si intercambiáramos cuerpos durante un día, ¿qué harías primero?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d05",
    text: "¿Cuál es nuestra discusión más absurda?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d06",
    text: "Si fuéramos personajes de un videojuego, ¿qué clases seríamos?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d07",
    text: "¿Cuál de los dos cocinaría mejor si viviera solo en una isla desierta?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d08",
    text: "Si tuvieras que describir nuestra relación con un meme, ¿cuál elegirías?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d09",
    text: "¿Cuál es el plan más ridículo que hemos tenido juntos?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d10",
    text: "Si tuviéramos un reality show, ¿qué capítulo sería el más visto?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d11",
    text: "¿En qué situación crees que me ganarías sin dudas y en cuál perdería?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d12",
    text: "Si tuvieras que elegir un superpoder para mejorar nuestra relación, ¿cuál sería?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d13",
    text: "¿Cuál es la cosa más rara que hiciste cuando vivías solo/a?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d14",
    text: "Si tuvieras que elegir una canción para que suene en nuestra entrada triunfal a una reunión, ¿cuál sería?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d15",
    text: "¿Cuál es el peor chiste que me hayas dicho y me hizo gracia igual?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d16",
    text: "Si pudiéramos tener una mascota completamente absurda, ¿cuál elegirías?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d17",
    text: "¿Qué harías si un día me despertara hablando otro idioma?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d18",
    text: "¿Cuál es la frase que más repito que te parece graciosa?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d19",
    text: "Si fuéramos un dúo de baile, ¿qué estilo elegiríamos?",
    category: "diversion",
    intensity: 1,
  },
  {
    id: "d20",
    text: "¿Qué programa de televisión crees que somos sin darnos cuenta?",
    category: "diversion",
    intensity: 1,
  },

  // ─── PROFUNDO (20) ───────────────────────────────────────
  {
    id: "p01",
    text: "¿Qué sentís que aprendiste sobre el amor desde que estamos juntos?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p02",
    text: "¿Qué te gustaría que nunca perdiéramos como pareja?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p03",
    text: "¿Qué sueño te gustaría que construyéramos juntos?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p04",
    text: "¿Qué parte de vos sentís que todavía quiero conocer mejor?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p05",
    text: "¿Cómo imaginás nuestra relación dentro de unos años?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p06",
    text: "¿Hay algo que te dé miedo de nosotros que nunca hayas dicho en voz alta?",
    category: "profundo",
    intensity: 3,
  },
  {
    id: "p07",
    text: "¿Qué necesitás de mí que creés que no siempre te doy?",
    category: "profundo",
    intensity: 3,
  },
  {
    id: "p08",
    text: "¿Cuál es el mejor consejo que te daría tu yo del futuro sobre nuestra relación?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p09",
    text: "¿Qué valor o creencia mía admiras más?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p10",
    text: "¿Qué parte de tu pasado crees que me falta entender mejor?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p11",
    text: "¿Cuál es la emoción que más te cuesta mostrarme?",
    category: "profundo",
    intensity: 3,
  },
  {
    id: "p12",
    text: "¿Hay algo que sientas que cambió en vos desde que estamos juntos, para bien?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p13",
    text: "¿Qué te gustaría que supiéramos el uno del otro que todavía no hablamos?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p14",
    text: "¿Qué es lo que más te da seguridad en nuestra relación?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p15",
    text: "Si pudieras cambiar algo de cómo empezamos, ¿cambiarías algo?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p16",
    text: "¿Cuándo fue la última vez que sentiste que estábamos completamente en sintonía?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p17",
    text: "¿Qué momento difícil que pasamos juntos sientes que nos fortaleció?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p18",
    text: "¿Hay algo que hayas guardado para contarme cuando 'sea el momento'?",
    category: "profundo",
    intensity: 3,
  },
  {
    id: "p19",
    text: "¿Qué es lo que más te hace querer quedarte?",
    category: "profundo",
    intensity: 2,
  },
  {
    id: "p20",
    text: "¿Qué palabras querrías escuchar de mí más seguido?",
    category: "profundo",
    intensity: 2,
  },
];

export const getQuestionsByCategory = (
  category: QuestionCategory
): Question[] => QUESTIONS.filter((q) => q.category === category);

export const getAllQuestions = (): Question[] => [...QUESTIONS];
