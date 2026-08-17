import { ContradictionPuzzle } from "./types";

const c1: ContradictionPuzzle = {
  id: "contra-facil-01",
  category: "contradiccion",
  title: "El testigo perfecto",
  description: "El mayordomo dice recordar todo. Pero su relato esconde un error fatal.",
  difficulty: "facil",
  estimatedMinutes: 5,
  story: "Renato, el mayordomo, fue el último en ver al Conde Mirko con vida. Leyó su declaración ante la policía sin dudar un instante. Pero hay dos frases que no pueden ser verdad al mismo tiempo.",
  instructions: "Leé el relato completo. Tocá las dos frases que se contradicen entre sí.",
  hints: [
    { level: 1, text: "Prestá atención a la hora en que dice haber apagado las luces." },
    { level: 2, text: "¿Cómo pudo ver algo después de apagar las luces?" },
    { level: 3, text: 'La frase sobre el candelabro y la frase "apagué todas las luces a las 22:00" no pueden coexistir.' },
  ],
  solutionExplanation: 'Renato dice que apagó "todas las luces" a las 22:00, pero también afirma haber visto el candelabro encendido al salir del estudio a las 22:15. Si las luces ya estaban apagadas, no podría haber visto nada.',
  narrative: "",
  sentences: [
    { id: "s1", text: "Esa noche serví la cena a las 20:30 como siempre.", isPartOfContradiction: false },
    { id: "s2", text: "A las 21:45 el Conde me pidió que le llevara su coñac al estudio.", isPartOfContradiction: false },
    { id: "s3", text: "A las 22:00 apagué todas las luces de la planta baja y subí a mis aposentos.", isPartOfContradiction: true },
    { id: "s4", text: "Antes de subir escuché música proveniente del salón. Era una pieza que el Conde tocaba de memoria.", isPartOfContradiction: false },
    { id: "s5", text: "A las 22:15 bajé a buscar un libro que había olvidado.", isPartOfContradiction: false },
    { id: "s6", text: "Al pasar por el estudio vi el candelabro de plata encendido sobre el escritorio.", isPartOfContradiction: true },
    { id: "s7", text: "El Conde no estaba en el estudio. Supuse que había salido al jardín.", isPartOfContradiction: false },
    { id: "s8", text: "A la mañana siguiente encontré el cuerpo en la biblioteca.", isPartOfContradiction: false },
  ],
  contradictionIds: ["s3", "s6"],
  contradictionExplanation: 'Apagó "todas las luces" a las 22:00, pero a las 22:15 vio el candelabro encendido.',
};

const c2: ContradictionPuzzle = {
  id: "contra-medio-01",
  category: "contradiccion",
  title: "La coartada del tren",
  description: "Eleonora juró estar en Viena cuando ocurrió el crimen. Su propio relato la desmiente.",
  difficulty: "medio",
  estimatedMinutes: 8,
  story: "Eleonora Voss, sobrina del fallecido, insiste en que viajó en tren a Viena el día del crimen y no regresó hasta el día siguiente. Pero en su declaración hay una grieta.",
  instructions: "Leé la declaración de Eleonora. Encontrá las dos frases que se contradicen.",
  hints: [
    { level: 1, text: "Fijate en los detalles del viaje: horario de salida y lo que hizo en el andén." },
    { level: 2, text: "¿Cómo puede comprar algo en el andén de llegada si el tren sale de allí?" },
    { level: 3, text: 'La frase sobre el periódico comprado en el andén de Viena y la frase "tomé el tren de las 14:00 desde Viena" se contradicen con el crimen ocurrido a las 15:30.' },
  ],
  solutionExplanation: "Eleonora dice haber tomado el tren de las 14:00 desde Viena. Pero también afirma haber comprado el periódico vespertino en el andén de Viena antes de subir. Ese periódico se publica a las 16:00 — lo que significa que no pudo estar en Viena a las 14:00.",
  narrative: "",
  sentences: [
    { id: "s1", text: "El miércoles por la mañana tomé el tren de las 9:00 desde la ciudad hacia Viena.", isPartOfContradiction: false },
    { id: "s2", text: "Llegué a Viena al mediodía y almorcé en el café de la estación.", isPartOfContradiction: false },
    { id: "s3", text: "Por la tarde visité a mi modista en el distrito primero.", isPartOfContradiction: false },
    { id: "s4", text: "Para volver, tomé el tren de las 14:00 desde Viena.", isPartOfContradiction: true },
    { id: "s5", text: "En el andén de Viena, antes de subir, compré el periódico vespertino.", isPartOfContradiction: true },
    { id: "s6", text: "Durante el viaje de regreso leí las noticias y dormí un poco.", isPartOfContradiction: false },
    { id: "s7", text: "Llegué a casa pasadas las 19:00. La cocinera puede confirmarlo.", isPartOfContradiction: false },
    { id: "s8", text: "No supe del crimen hasta la mañana siguiente, cuando me llamó la policía.", isPartOfContradiction: false },
  ],
  contradictionIds: ["s4", "s5"],
  contradictionExplanation: "El tren de las 14:00 ya salió cuando el periódico vespertino (publicado a las 16:00) estaba disponible.",
};

const c3: ContradictionPuzzle = {
  id: "contra-dificil-01",
  category: "contradiccion",
  title: "Retrato de familia",
  description: "Tres hermanos, una herencia, y un relato que no cierra. Una sola frase delata al mentiroso.",
  difficulty: "dificil",
  estimatedMinutes: 12,
  story: "Augusto Crane, el mediano de tres hermanos, asegura haber estado en casa de su madre toda la tarde. Hay ocho afirmaciones en su declaración. Dos de ellas son lógicamente imposibles al mismo tiempo.",
  instructions: "Este relato tiene ocho fragmentos. Dos son incompatibles. Encontralos.",
  hints: [
    { level: 1, text: "Prestá atención a los detalles físicos: qué estaba mirando y desde dónde." },
    { level: 2, text: "¿Desde qué ventana dice haber visto llegar a su hermana? ¿Qué orientación tiene esa ventana?" },
    { level: 3, text: 'La habitación donde estaba da al jardín trasero. Pero dice haber visto el auto de su hermana llegar por la entrada delantera.' },
  ],
  solutionExplanation: "Augusto dice que estaba en el cuarto de costura —que da al jardín trasero— pero también que vio el auto de su hermana entrar por el portón delantero. Desde el cuarto de costura es físicamente imposible ver la entrada delantera.",
  narrative: "",
  sentences: [
    { id: "s1", text: "Llegué a la casa de mi madre a las 15:00, como acordamos.", isPartOfContradiction: false },
    { id: "s2", text: "Mi madre estaba descansando, así que esperé en el cuarto de costura.", isPartOfContradiction: true },
    { id: "s3", text: "El cuarto de costura está en el ala norte, con ventanas que dan al jardín trasero.", isPartOfContradiction: false },
    { id: "s4", text: "Estuve allí cerca de dos horas, leyendo una revista de modas de mi madre.", isPartOfContradiction: false },
    { id: "s5", text: "Alrededor de las 17:00 vi por la ventana el auto de mi hermana Cecilia entrar por el portón delantero.", isPartOfContradiction: true },
    { id: "s6", text: "Bajé a saludarla. Estuvimos los tres juntos en el salón hasta las 19:00.", isPartOfContradiction: false },
    { id: "s7", text: "Antes de irme, mi madre nos leyó el testamento en voz alta.", isPartOfContradiction: false },
    { id: "s8", text: "Salí a las 19:30 y no supe nada del accidente hasta recibir el llamado.", isPartOfContradiction: false },
  ],
  contradictionIds: ["s2", "s5"],
  contradictionExplanation: "El cuarto de costura da al jardín trasero (norte). El portón delantero está en el sur. Imposible verlo desde allí.",
};

export const CONTRADICCION_PUZZLES: ContradictionPuzzle[] = [c1, c2, c3];
export function getContradictionPuzzle(id: string) {
  return CONTRADICCION_PUZZLES.find((p) => p.id === id);
}
