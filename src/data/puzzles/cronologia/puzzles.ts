import { CronologiaPuzzle } from "./types";

const cr1: CronologiaPuzzle = {
  id: "crono-facil-01",
  category: "cronologia",
  title: "Una noche en la mansión",
  description: "Seis eventos. Uno es imposible. Ordenalos y marcá el que no pudo pasar.",
  difficulty: "facil",
  estimatedMinutes: 7,
  story: "La noche del crimen en la Mansión Aldrich. Seis fragmentos del relato policial. Ordenalos cronológicamente y encontrá el evento que contradice los demás.",
  instructions: "Arrastrá los eventos para ordenarlos. Luego tocá el que creés que es IMPOSIBLE según la lógica del caso.",
  hints: [
    { level: 1, text: "El cuerpo fue encontrado antes del amanecer. Fijate quién lo encontró y cuándo." },
    { level: 2, text: "Si el médico forense declaró la muerte a las 02:00, ¿puede alguien haber hablado con la víctima a las 03:00?" },
    { level: 3, text: 'El evento "Madame Holt habló con la víctima a las 03:00" es imposible.' },
  ],
  solutionExplanation: "El médico forense estableció la hora de la muerte entre las 01:00 y las 02:00. Madame Holt afirma haber conversado con la víctima a las 03:00 — una hora después de que el perito la declaró muerta.",
  events: [
    { id: "e1", text: "21:00 — Los invitados cenan juntos en el comedor.", correctPosition: 1 },
    { id: "e2", text: "23:30 — La víctima sube a su habitación sola.", correctPosition: 2 },
    { id: "e3", text: "01:00–02:00 — Según el forense, ocurre la muerte.", correctPosition: 3 },
    { id: "e4", text: "03:00 — Madame Holt asegura haber conversado con la víctima.", correctPosition: 4, isImpossible: true },
    { id: "e5", text: "05:30 — La mucama encuentra el cuerpo al llevar el desayuno.", correctPosition: 5 },
    { id: "e6", text: "06:00 — Llega la policía.", correctPosition: 6 },
  ],
  impossibleEventId: "e4",
  impossibleReason: "La víctima ya estaba muerta entre las 01:00 y las 02:00. No pudo hablar a las 03:00.",
};

const cr2: CronologiaPuzzle = {
  id: "crono-medio-01",
  category: "cronologia",
  title: "El tren de medianoche",
  description: "El sospechoso dice que tomó el tren. Pero el orden de los hechos lo delata.",
  difficulty: "medio",
  estimatedMinutes: 10,
  story: "Viktor Lanz asegura haber tomado el tren de las 22:00 hacia Praga y nunca haber regresado. Los investigadores reconstruyeron los eventos de esa noche. Uno no encaja.",
  instructions: "Ordená los siete eventos del caso. Luego marcá el que es lógicamente imposible.",
  hints: [
    { level: 1, text: "¿Puede alguien estar en dos lugares a la vez?" },
    { level: 2, text: "El tren de las 22:00 tarda 4 horas en llegar a Praga. ¿Cuándo llega?" },
    { level: 3, text: 'Viktor dice haber llamado desde Praga "al llegar". Pero el crimen ocurrió a las 23:30 y Praga está a 4 horas.' },
  ],
  solutionExplanation: "Viktor dice haber tomado el tren de las 22:00 y llamado desde Praga 'al llegar'. El tren llega a las 02:00. Pero la llamada fue registrada a las 23:30 — cuando el tren apenas había salido y Viktor debería estar a mitad de camino, no en Praga.",
  events: [
    { id: "e1", text: "20:00 — Viktor compra el boleto en la taquilla de la estación.", correctPosition: 1 },
    { id: "e2", text: "21:45 — Viktor es visto en el andén por un revisor.", correctPosition: 2 },
    { id: "e3", text: "22:00 — Sale el tren hacia Praga (duración: 4 horas).", correctPosition: 3 },
    { id: "e4", text: "23:30 — Viktor llama a su madre 'desde Praga, recién llegado'.", correctPosition: 4, isImpossible: true },
    { id: "e5", text: "23:30 — En la ciudad de origen, ocurre el asesinato.", correctPosition: 5 },
    { id: "e6", text: "02:00 — El tren llega a Praga.", correctPosition: 6 },
    { id: "e7", text: "02:15 — Se registra el check-in de Viktor en el hotel de Praga.", correctPosition: 7 },
  ],
  impossibleEventId: "e4",
  impossibleReason: "El tren sale a las 22:00 y llega a las 02:00. Nadie puede llamar 'desde Praga' a las 23:30.",
};

const cr3: CronologiaPuzzle = {
  id: "crono-dificil-01",
  category: "cronologia",
  title: "La herencia adelantada",
  description: "Ocho eventos, tres sospechosos, una línea de tiempo que esconde una trampa.",
  difficulty: "dificil",
  estimatedMinutes: 15,
  story: "El abogado Fontaine fue hallado muerto en su estudio. Manejaba el testamento de una familia adinerada. La cronología de esa noche tiene ocho fragmentos. Uno es imposible.",
  instructions: "Ordená los ocho eventos. Encontrá el que no pudo haber ocurrido según el resto de la línea de tiempo.",
  hints: [
    { level: 1, text: "¿Hay algo en el documento firmado que no coincide con cuándo fue redactado?" },
    { level: 2, text: "El testamento fue modificado a las 23:00. ¿Puede alguien haber firmado una copia anterior a esa hora?" },
    { level: 3, text: "La firma de Clara en el testamento nuevo dice ser de las 21:00 — dos horas antes de que el documento fuera redactado." },
  ],
  solutionExplanation: "El testamento modificado fue redactado a las 23:00. Pero Clara afirma haberlo firmado a las 21:00. Es imposible firmar un documento dos horas antes de que exista.",
  events: [
    { id: "e1", text: "18:00 — El abogado Fontaine cena solo en su oficina.", correctPosition: 1 },
    { id: "e2", text: "20:00 — Clara Voss llega a la oficina del abogado.", correctPosition: 2 },
    { id: "e3", text: "21:00 — Clara afirma haber firmado el testamento nuevo junto al abogado.", correctPosition: 3, isImpossible: true },
    { id: "e4", text: "22:00 — El abogado recibe una llamada de 40 minutos desde el exterior.", correctPosition: 4 },
    { id: "e5", text: "23:00 — Los metadatos del documento muestran que el testamento fue modificado por última vez.", correctPosition: 5 },
    { id: "e6", text: "23:45 — Un vecino escucha una discusión en la oficina.", correctPosition: 6 },
    { id: "e7", text: "00:30 — El portero ve salir a una persona con abrigo oscuro.", correctPosition: 7 },
    { id: "e8", text: "07:00 — La secretaria encuentra el cuerpo del abogado.", correctPosition: 8 },
  ],
  impossibleEventId: "e3",
  impossibleReason: "El testamento fue modificado a las 23:00. Firmarlo a las 21:00 es imposible — el documento no existía aún.",
};

export const CRONOLOGIA_PUZZLES: CronologiaPuzzle[] = [cr1, cr2, cr3];
export function getCronologiaPuzzle(id: string) {
  return CRONOLOGIA_PUZZLES.find((p) => p.id === id);
}
