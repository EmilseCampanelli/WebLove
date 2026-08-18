import { CronologiaPuzzle } from "./types";

// ─── FÁCIL 01 ────────────────────────────────────────────────────────────────
const cr1: CronologiaPuzzle = {
  id: "crono-facil-01",
  category: "cronologia",
  title: "Una noche en la mansión",
  description: "Seis eventos. Uno es imposible. Ordenalos y marcá el que no pudo pasar.",
  difficulty: "facil",
  estimatedMinutes: 7,
  story:
    "La noche del crimen en la Mansión Aldrich. Seis fragmentos del relato policial. Ordenalos cronológicamente y encontrá el evento que contradice los demás.",
  instructions:
    "Arrastrá los eventos para ordenarlos. Luego tocá el que creés que es IMPOSIBLE según la lógica del caso.",
  hints: [
    {
      level: 1,
      text: "El cuerpo fue encontrado antes del amanecer. Fijate quién lo encontró y cuándo.",
    },
    {
      level: 2,
      text: "Si el médico forense declaró la muerte a las 02:00, ¿puede alguien haber hablado con la víctima a las 03:00?",
    },
    {
      level: 3,
      text: 'El evento "Madame Holt habló con la víctima a las 03:00" es imposible.',
    },
  ],
  solutionExplanation:
    "El médico forense estableció la hora de la muerte entre las 01:00 y las 02:00. Madame Holt afirma haber conversado con la víctima a las 03:00 — una hora después de que el perito la declaró muerta.",
  events: [
    { id: "e1", text: "21:00 — Los invitados cenan juntos en el comedor.", correctPosition: 1 },
    { id: "e2", text: "23:30 — La víctima sube a su habitación sola.", correctPosition: 2 },
    {
      id: "e3",
      text: "01:00–02:00 — Según el forense, ocurre la muerte.",
      correctPosition: 3,
    },
    {
      id: "e4",
      text: "03:00 — Madame Holt asegura haber conversado con la víctima.",
      correctPosition: 4,
      isImpossible: true,
    },
    {
      id: "e5",
      text: "05:30 — La mucama encuentra el cuerpo al llevar el desayuno.",
      correctPosition: 5,
    },
    { id: "e6", text: "06:00 — Llega la policía.", correctPosition: 6 },
  ],
  impossibleEventId: "e4",
  impossibleReason:
    "La víctima ya estaba muerta entre las 01:00 y las 02:00. No pudo hablar a las 03:00.",
};

// ─── FÁCIL 02 ────────────────────────────────────────────────────────────────
const cr4: CronologiaPuzzle = {
  id: "crono-facil-02",
  category: "cronologia",
  title: "El testigo del mercado",
  description: "Una testigo dice haber visto a la víctima comprando… horas después de que el forense la declaró muerta.",
  difficulty: "facil",
  estimatedMinutes: 6,
  story:
    "El vecino Ernesto encontró el cuerpo de Nadia Suárez en el pasillo de su edificio. El forense ya había establecido la hora de muerte. Pero entonces apareció Iris Gallardo con una declaración que no cierra.",
  instructions:
    "Ordená los seis eventos del día. Luego tocá el que es lógicamente imposible.",
  hints: [
    {
      level: 1,
      text: "Compará la hora en que el forense fija la muerte con la hora en que Iris dice haber visto a la víctima.",
    },
    {
      level: 2,
      text: "Si alguien muere entre las 07:00 y las 08:00, ¿puede estar comprando frutas a las 12:00?",
    },
    {
      level: 3,
      text: 'El evento imposible es la declaración de Iris: la víctima llevaba horas muerta cuando Iris afirma haberla visto.',
    },
  ],
  solutionExplanation:
    "El forense estableció la muerte de Nadia entre las 07:00 y las 08:00. Su cuerpo fue hallado a las 08:30 y su identidad confirmada antes del mediodía. Que Iris la vea comprando frutas a las 12:00 es físicamente imposible.",
  events: [
    {
      id: "e1",
      text: "07:00–08:00 — El forense determina que la muerte ocurrió en esta franja horaria.",
      correctPosition: 1,
    },
    {
      id: "e2",
      text: "08:30 — El vecino Ernesto encuentra el cuerpo de Nadia en el pasillo.",
      correctPosition: 2,
    },
    {
      id: "e3",
      text: "09:00 — La policía llega y acordona la escena.",
      correctPosition: 3,
    },
    {
      id: "e4",
      text: "10:00 — El forense examina el cuerpo y confirma la identidad de la víctima.",
      correctPosition: 4,
    },
    {
      id: "e5",
      text: "12:00 — Iris Gallardo declara haber visto a Nadia comprando frutas en el mercado central.",
      correctPosition: 5,
      isImpossible: true,
    },
    {
      id: "e6",
      text: "14:00 — El cuerpo es trasladado a la morgue para autopsia.",
      correctPosition: 6,
    },
  ],
  impossibleEventId: "e5",
  impossibleReason:
    "Nadia murió entre las 07:00 y las 08:00. No pudo estar en el mercado a las 12:00.",
};

// ─── FÁCIL 03 ────────────────────────────────────────────────────────────────
const cr5: CronologiaPuzzle = {
  id: "crono-facil-03",
  category: "cronologia",
  title: "El velero que no había llegado",
  description: "Un sospechoso dice haberse fugado en un barco. Pero ese barco no estaba allí.",
  difficulty: "facil",
  estimatedMinutes: 7,
  story:
    "El crimen ocurrió en el puerto de Cartagena. Diego Fuentes asegura haber escapado esa noche a bordo del velero 'Estrella del Sur'. Pero los registros del puerto cuentan otra historia.",
  instructions:
    "Ordená los seis eventos. Luego marcá el que es imposible según los datos del caso.",
  hints: [
    {
      level: 1,
      text: "Prestá atención a cuándo zarpó el velero y cuánto tarda el viaje.",
    },
    {
      level: 2,
      text: "Si el velero salió de Valencia a las 14:00 y el viaje dura 8 horas, ¿a qué hora puede estar en Cartagena?",
    },
    {
      level: 3,
      text: 'Diego dice haberse subido al "Estrella del Sur" a las 20:00, pero el barco llegó a Cartagena recién a las 22:00.',
    },
  ],
  solutionExplanation:
    "El 'Estrella del Sur' zarpó de Valencia a las 14:00 con un viaje de 8 horas. Llegó a Cartagena a las 22:00. Diego afirma haber abordado el barco en Cartagena a las 20:00, dos horas antes de que el barco estuviera allí.",
  events: [
    {
      id: "e1",
      text: "14:00 — El velero 'Estrella del Sur' zarpa de Valencia hacia Cartagena (travesía estimada: 8 horas).",
      correctPosition: 1,
    },
    {
      id: "e2",
      text: "19:00 — El crimen ocurre en el muelle sur de Cartagena.",
      correctPosition: 2,
    },
    {
      id: "e3",
      text: "20:00 — Diego Fuentes afirma haber abordado el 'Estrella del Sur' en Cartagena y huido por mar.",
      correctPosition: 3,
      isImpossible: true,
    },
    {
      id: "e4",
      text: "21:00 — Los guardacostas confirman que no hubo ningún velero en el puerto entre las 19:00 y las 22:00.",
      correctPosition: 4,
    },
    {
      id: "e5",
      text: "22:00 — El 'Estrella del Sur' llega al puerto de Cartagena tras 8 horas de navegación.",
      correctPosition: 5,
    },
    {
      id: "e6",
      text: "22:30 — El capitán declara que nadie abordó ni desembarcó durante la travesía.",
      correctPosition: 6,
    },
  ],
  impossibleEventId: "e3",
  impossibleReason:
    "El 'Estrella del Sur' llegó a Cartagena a las 22:00. No podía estar allí a las 20:00 para que Diego lo abordara.",
};

// ─── MEDIO 01 ────────────────────────────────────────────────────────────────
const cr2: CronologiaPuzzle = {
  id: "crono-medio-01",
  category: "cronologia",
  title: "El tren de medianoche",
  description: "El sospechoso dice que tomó el tren. Pero el orden de los hechos lo delata.",
  difficulty: "medio",
  estimatedMinutes: 10,
  story:
    "Viktor Lanz asegura haber tomado el tren de las 22:00 hacia Praga y nunca haber regresado. Los investigadores reconstruyeron los eventos de esa noche. Uno no encaja.",
  instructions: "Ordená los siete eventos del caso. Luego marcá el que es lógicamente imposible.",
  hints: [
    { level: 1, text: "¿Puede alguien estar en dos lugares a la vez?" },
    {
      level: 2,
      text: "El tren de las 22:00 tarda 4 horas en llegar a Praga. ¿Cuándo llega?",
    },
    {
      level: 3,
      text: 'Viktor dice haber llamado desde Praga "al llegar". Pero el crimen ocurrió a las 23:30 y Praga está a 4 horas.',
    },
  ],
  solutionExplanation:
    "Viktor dice haber tomado el tren de las 22:00 y llamado desde Praga 'al llegar'. El tren llega a las 02:00. Pero la llamada fue registrada a las 23:30 — cuando el tren apenas había salido y Viktor debería estar a mitad de camino, no en Praga.",
  events: [
    {
      id: "e1",
      text: "20:00 — Viktor compra el boleto en la taquilla de la estación.",
      correctPosition: 1,
    },
    {
      id: "e2",
      text: "21:45 — Viktor es visto en el andén por un revisor.",
      correctPosition: 2,
    },
    {
      id: "e3",
      text: "22:00 — Sale el tren hacia Praga (duración: 4 horas).",
      correctPosition: 3,
    },
    {
      id: "e4",
      text: "23:30 — Viktor llama a su madre 'desde Praga, recién llegado'.",
      correctPosition: 4,
      isImpossible: true,
    },
    {
      id: "e5",
      text: "23:30 — En la ciudad de origen, ocurre el asesinato.",
      correctPosition: 5,
    },
    { id: "e6", text: "02:00 — El tren llega a Praga.", correctPosition: 6 },
    {
      id: "e7",
      text: "02:15 — Se registra el check-in de Viktor en el hotel de Praga.",
      correctPosition: 7,
    },
  ],
  impossibleEventId: "e4",
  impossibleReason:
    "El tren sale a las 22:00 y llega a las 02:00. Nadie puede llamar 'desde Praga' a las 23:30.",
};

// ─── MEDIO 02 ────────────────────────────────────────────────────────────────
const cr6: CronologiaPuzzle = {
  id: "crono-medio-02",
  category: "cronologia",
  title: "La coartada de Carla",
  description: "Carla dice haber compartido un taxi con la víctima. El forense dice que eso es imposible.",
  difficulty: "medio",
  estimatedMinutes: 10,
  story:
    "El cuerpo de René Mora fue hallado en el parque Ribeirinha. Carla Brás asegura haberlo acompañado en taxi a la estación a las 21:00. Pero el forense ya había establecido cuándo murió René.",
  instructions:
    "Ordená los siete eventos. Luego identificá cuál es lógicamente imposible.",
  hints: [
    {
      level: 1,
      text: "Fijate en la ventana de muerte que establece el forense y comparala con el horario de la coartada de Carla.",
    },
    {
      level: 2,
      text: "El forense determina que René murió entre las 19:00 y las 20:00. ¿Puede Carla haber viajado con él a las 21:00?",
    },
    {
      level: 3,
      text: 'La declaración de Carla es el evento imposible: René ya llevaba al menos una hora muerto cuando ella dice haber tomado el taxi con él.',
    },
  ],
  solutionExplanation:
    "El forense estableció la muerte de René entre las 19:00 y las 20:00, dato luego confirmado. Carla afirma haber tomado un taxi con René a las 21:00, una hora después del límite superior de la ventana de muerte. Un muerto no puede subirse a un taxi.",
  events: [
    {
      id: "e1",
      text: "18:00 — René Mora es visto por última vez en el bar 'Dois Irmãos'.",
      correctPosition: 1,
    },
    {
      id: "e2",
      text: "18:30 — René envía su último mensaje de texto desde su teléfono.",
      correctPosition: 2,
    },
    {
      id: "e3",
      text: "19:00–20:00 — El forense establece esta franja como ventana de muerte (temperatura corporal y rigidez).",
      correctPosition: 3,
    },
    {
      id: "e4",
      text: "21:00 — Carla Brás declara haber tomado un taxi junto a René hasta la estación central.",
      correctPosition: 4,
      isImpossible: true,
    },
    {
      id: "e5",
      text: "22:00 — El cuerpo de René es encontrado en el parque Ribeirinha.",
      correctPosition: 5,
    },
    {
      id: "e6",
      text: "23:00 — El forense confirma oficialmente: René murió entre las 19:00 y las 20:00.",
      correctPosition: 6,
    },
    {
      id: "e7",
      text: "00:00 — Carla Brás es citada a declarar como principal sospechosa.",
      correctPosition: 7,
    },
  ],
  impossibleEventId: "e4",
  impossibleReason:
    "René murió entre las 19:00 y las 20:00. No pudo compartir un taxi con Carla a las 21:00.",
};

// ─── MEDIO 03 ────────────────────────────────────────────────────────────────
const cr7: CronologiaPuzzle = {
  id: "crono-medio-03",
  category: "cronologia",
  title: "El sobre del martes",
  description: "Un sobrino afirma que su tío le entregó un sobre el lunes. El matasello dice otra cosa.",
  difficulty: "medio",
  estimatedMinutes: 11,
  story:
    "Don Aurelio murió el lunes de un infarto. Al día siguiente, en la notaría apareció un testamento modificado a su favor. El sobrino Emilio tiene una explicación. Los peritos tienen otra.",
  instructions:
    "Ordená los ocho eventos. Luego marcá el que no pudo haber ocurrido.",
  hints: [
    {
      level: 1,
      text: "Prestá atención a cuándo murió Don Aurelio y cuándo dice Emilio que se vieron.",
    },
    {
      level: 2,
      text: "El sobre llegó por correo con matasello del martes. Don Aurelio murió el lunes. ¿Quién lo mandó?",
    },
    {
      level: 3,
      text: "Emilio afirma que Don Aurelio le entregó el sobre 'personalmente el lunes por la tarde'. Pero el matasello es del martes, 18 horas después de la muerte.",
    },
  ],
  solutionExplanation:
    "Don Aurelio falleció el lunes a las 14:00. El sobre llegó a la notaría el martes con matasello auténtico del martes a las 08:30. Emilio asegura que Aurelio se lo entregó en persona el lunes por la tarde — pero el sobre fue sellado en correos el martes, cuando Aurelio ya llevaba horas muerto.",
  events: [
    {
      id: "e1",
      text: "Lunes 10:00 — Don Aurelio sufre un infarto y es trasladado de urgencia al hospital.",
      correctPosition: 1,
    },
    {
      id: "e2",
      text: "Lunes 14:00 — Don Aurelio fallece. El médico firma el acta de defunción.",
      correctPosition: 2,
    },
    {
      id: "e3",
      text: "Lunes 15:00 — Los familiares son notificados del fallecimiento.",
      correctPosition: 3,
    },
    {
      id: "e4",
      text: "Lunes 17:00 — Emilio declara que Don Aurelio le entregó personalmente el sobre con el testamento ese mismo lunes por la tarde.",
      correctPosition: 4,
      isImpossible: true,
    },
    {
      id: "e5",
      text: "Martes 08:30 — El sobre es sellado en la oficina de correos (matasello auténtico del martes).",
      correctPosition: 5,
    },
    {
      id: "e6",
      text: "Martes 09:00 — El sobre llega a la notaría con el testamento modificado a favor de Emilio.",
      correctPosition: 6,
    },
    {
      id: "e7",
      text: "Martes 14:00 — El perito forense confirma que el matasello es auténtico: el sobre fue sellado 18 horas después de la muerte de Aurelio.",
      correctPosition: 7,
    },
    {
      id: "e8",
      text: "Miércoles — Emilio es imputado por falsificación de documento público.",
      correctPosition: 8,
    },
  ],
  impossibleEventId: "e4",
  impossibleReason:
    "Don Aurelio murió el lunes a las 14:00. El sobre fue sellado en correos el martes a las 08:30. Nadie puede entregar en mano un sobre que no existe todavía, ni enviar correo después de morir.",
};

// ─── DIFÍCIL 01 ──────────────────────────────────────────────────────────────
const cr3: CronologiaPuzzle = {
  id: "crono-dificil-01",
  category: "cronologia",
  title: "La herencia adelantada",
  description: "Ocho eventos, tres sospechosos, una línea de tiempo que esconde una trampa.",
  difficulty: "dificil",
  estimatedMinutes: 15,
  story:
    "El abogado Fontaine fue hallado muerto en su estudio. Manejaba el testamento de una familia adinerada. La cronología de esa noche tiene ocho fragmentos. Uno es imposible.",
  instructions:
    "Ordená los ocho eventos. Encontrá el que no pudo haber ocurrido según el resto de la línea de tiempo.",
  hints: [
    {
      level: 1,
      text: "¿Hay algo en el documento firmado que no coincide con cuándo fue redactado?",
    },
    {
      level: 2,
      text: "El testamento fue modificado a las 23:00. ¿Puede alguien haber firmado una copia anterior a esa hora?",
    },
    {
      level: 3,
      text: "La firma de Clara en el testamento nuevo dice ser de las 21:00 — dos horas antes de que el documento fuera redactado.",
    },
  ],
  solutionExplanation:
    "El testamento modificado fue redactado a las 23:00. Pero Clara afirma haberlo firmado a las 21:00. Es imposible firmar un documento dos horas antes de que exista.",
  events: [
    {
      id: "e1",
      text: "18:00 — El abogado Fontaine cena solo en su oficina.",
      correctPosition: 1,
    },
    {
      id: "e2",
      text: "20:00 — Clara Voss llega a la oficina del abogado.",
      correctPosition: 2,
    },
    {
      id: "e3",
      text: "21:00 — Clara afirma haber firmado el testamento nuevo junto al abogado.",
      correctPosition: 3,
      isImpossible: true,
    },
    {
      id: "e4",
      text: "22:00 — El abogado recibe una llamada de 40 minutos desde el exterior.",
      correctPosition: 4,
    },
    {
      id: "e5",
      text: "23:00 — Los metadatos del documento muestran que el testamento fue modificado por última vez.",
      correctPosition: 5,
    },
    {
      id: "e6",
      text: "23:45 — Un vecino escucha una discusión en la oficina.",
      correctPosition: 6,
    },
    {
      id: "e7",
      text: "00:30 — El portero ve salir a una persona con abrigo oscuro.",
      correctPosition: 7,
    },
    {
      id: "e8",
      text: "07:00 — La secretaria encuentra el cuerpo del abogado.",
      correctPosition: 8,
    },
  ],
  impossibleEventId: "e3",
  impossibleReason:
    "El testamento fue modificado a las 23:00. Firmarlo a las 21:00 es imposible — el documento no existía aún.",
};

// ─── DIFÍCIL 02 ──────────────────────────────────────────────────────────────
const cr8: CronologiaPuzzle = {
  id: "crono-dificil-02",
  category: "cronologia",
  title: "La playa de las mareas",
  description: "Un testigo dice haber visto a la víctima cruzando una playa. Las tablas de mareas lo hacen imposible.",
  difficulty: "dificil",
  estimatedMinutes: 14,
  story:
    "El cuerpo de Lena Voss fue encontrado en la Playa Las Rocas. Marco Rial afirma haberla visto cruzar esa playa a pie a las 10:00. Pero esa mañana el mar tenía otra opinión.",
  instructions:
    "Ordená los ocho eventos. Prestá atención a la tabla de mareas y determiná cuál evento es imposible.",
  hints: [
    {
      level: 1,
      text: "Fijate en la tabla de mareas del primer evento. ¿Cuándo queda accesible la Playa Las Rocas?",
    },
    {
      level: 2,
      text: "La Playa Las Rocas solo es accesible a pie durante la bajamar. La bajamar ocurre a las 12:30. ¿Puede alguien caminar por allí a las 10:00?",
    },
    {
      level: 3,
      text: "La declaración de Marco es el evento imposible. A las 10:00 la playa seguía inundada — la primera bajamar del día no llegó hasta las 12:30.",
    },
  ],
  solutionExplanation:
    "La tabla de mareas oficial muestra pleamar a las 06:15 y bajamar a las 12:30. La Playa Las Rocas solo es transitable a pie durante la bajamar. A las 10:00, dos horas y media antes de la bajamar, la playa seguía sumergida. Marco no pudo haber visto a Lena cruzarla caminando.",
  events: [
    {
      id: "e1",
      text: "06:00 — Tabla de mareas oficial: pleamar 06:15 (Playa Las Rocas inaccesible), bajamar 12:30 (acceso a pie habilitado), pleamar 18:45.",
      correctPosition: 1,
    },
    {
      id: "e2",
      text: "09:00 — Lena Voss es vista por última vez en el faro norte, caminando hacia el sur.",
      correctPosition: 2,
    },
    {
      id: "e3",
      text: "10:00 — Marco Rial declara haber visto a Lena cruzar a pie la Playa Las Rocas en dirección al acantilado.",
      correctPosition: 3,
      isImpossible: true,
    },
    {
      id: "e4",
      text: "12:30 — La marea baja: por primera vez en el día, la Playa Las Rocas queda accesible caminando.",
      correctPosition: 4,
    },
    {
      id: "e5",
      text: "14:00 — Un pescador descubre el cuerpo de Lena en la Playa Las Rocas.",
      correctPosition: 5,
    },
    {
      id: "e6",
      text: "15:00 — El forense establece que Lena murió entre las 09:00 y las 11:00.",
      correctPosition: 6,
    },
    {
      id: "e7",
      text: "16:00 — La policía reconstruye que Lena cayó desde el acantilado norte hacia la playa.",
      correctPosition: 7,
    },
    {
      id: "e8",
      text: "17:00 — Marco es identificado como el único testigo que la vio en la zona costera.",
      correctPosition: 8,
    },
  ],
  impossibleEventId: "e3",
  impossibleReason:
    "A las 10:00 la Playa Las Rocas estaba inundada — la bajamar que la hace accesible a pie no ocurrió hasta las 12:30. Nadie pudo caminar por allí a las 10:00.",
};

// ─── DIFÍCIL 03 ──────────────────────────────────────────────────────────────
const cr9: CronologiaPuzzle = {
  id: "crono-dificil-03",
  category: "cronologia",
  title: "La reunión de las cuatro",
  description: "Un colega afirma haber tenido una reunión con alguien que, según el forense, ya estaba incapacitada.",
  difficulty: "dificil",
  estimatedMinutes: 15,
  story:
    "Patricia Anaya fue encontrada inconsciente en el garaje del edificio donde trabajaba. Su colega Héctor afirma haber tenido una reunión con ella a las 16:00. El registro del edificio y el forense dicen otra cosa.",
  instructions:
    "Ordená los nueve eventos. Identificá el que no pudo haber ocurrido.",
  hints: [
    {
      level: 1,
      text: "Buscá la hora en que el forense establece el colapso de Patricia y comparala con la hora de la reunión que alega Héctor.",
    },
    {
      level: 2,
      text: "Patricia colapsó entre las 15:00 y las 15:30. ¿Puede alguien reunirse con ella a las 16:00 si ya estaba inconsciente en el garaje?",
    },
    {
      level: 3,
      text: "La reunión de Héctor a las 16:00 es imposible. Patricia ya había colapsado antes de esa hora y fue encontrada inconsciente a las 16:30.",
    },
  ],
  solutionExplanation:
    "Un compañero vio a Patricia salir corriendo hacia el garaje a las 15:00. El forense estableció que el colapso ocurrió entre las 15:00 y las 15:30. El guardia la encontró inconsciente a las 16:30. Héctor asegura haber tenido una reunión de trabajo con ella a las 16:00 — cuando Patricia llevaba al menos media hora incapacitada en el garaje.",
  events: [
    {
      id: "e1",
      text: "09:00 — Patricia Anaya ficha su entrada en recepción (registro digital del edificio).",
      correctPosition: 1,
    },
    {
      id: "e2",
      text: "11:00 — Patricia envía el último informe del día desde su computadora de trabajo.",
      correctPosition: 2,
    },
    {
      id: "e3",
      text: "13:00 — Patricia sale del edificio para almorzar (cámaras del lobby).",
      correctPosition: 3,
    },
    {
      id: "e4",
      text: "14:30 — Patricia regresa y ficha nuevamente en recepción.",
      correctPosition: 4,
    },
    {
      id: "e5",
      text: "15:00 — Un compañero la ve salir corriendo del piso hacia el garaje, visiblemente alterada.",
      correctPosition: 5,
    },
    {
      id: "e6",
      text: "15:00–15:30 — El médico forense establece posteriormente que Patricia sufrió el colapso en esta franja.",
      correctPosition: 6,
    },
    {
      id: "e7",
      text: "16:00 — Héctor Mena declara haber tenido una reunión de trabajo con Patricia en la sala de conferencias del piso 8.",
      correctPosition: 7,
      isImpossible: true,
    },
    {
      id: "e8",
      text: "16:30 — El guardia de seguridad encuentra a Patricia inconsciente en el garaje subterráneo.",
      correctPosition: 8,
    },
    {
      id: "e9",
      text: "17:00 — Patricia es trasladada al hospital en estado crítico.",
      correctPosition: 9,
    },
  ],
  impossibleEventId: "e7",
  impossibleReason:
    "Patricia colapsó entre las 15:00 y las 15:30 y fue hallada inconsciente a las 16:30. No pudo reunirse con Héctor a las 16:00.",
};

// ─── EXPERTO 01 ──────────────────────────────────────────────────────────────
const cr10: CronologiaPuzzle = {
  id: "crono-experto-01",
  category: "cronologia",
  title: "El último almuerzo del directorio",
  description: "Un asesinato en una sala de reuniones. La coartada depende de cuándo comió la víctima. El forense tiene los números.",
  difficulty: "experto",
  estimatedMinutes: 20,
  story:
    "Okafor Mendes, director financiero, fue hallado muerto en su oficina. Su asistente Ivana asegura que Okafor salió a almorzar durante la reunión del directorio. Las actas certificadas y la autopsia cuentan una historia diferente. Hay diez fragmentos. Uno es imposible.",
  instructions:
    "Ordená los diez eventos con cuidado. Para encontrar el imposible necesitarás cruzar la información del forense con el registro de la reunión.",
  hints: [
    {
      level: 1,
      text: "Verificá durante cuánto tiempo estuvo Okafor en la reunión del directorio según las actas y los testigos.",
    },
    {
      level: 2,
      text: "El forense dice que Okafor comió entre 2,5 y 3,5 horas antes de morir. Si murió entre las 13:30 y las 14:00, ¿a qué hora comió?",
    },
    {
      level: 3,
      text: "Okafor comió entre las 10:00 y las 11:30 — antes de la reunión, no durante. La declaración de Ivana de que salió a almorzar a las 12:00 es imposible: estaba en la reunión y, además, ya había comido horas antes.",
    },
  ],
  solutionExplanation:
    "La reunión del directorio certificó la presencia continua de Okafor de 11:00 a 13:30 (actas, asistente, firma del acta final). El forense estableció la muerte entre las 13:30 y las 14:00. El contenido gástrico indica una comida abundante ingerida 2,5 a 3,5 horas antes de la muerte, es decir, entre las 10:00 y las 11:30. Ivana afirma que Okafor salió al restaurante a las 12:00 durante la reunión, pero a las 12:00 Okafor estaba sentado en la sala de directorio — y además ya había comido, como mínimo, media hora antes de que empezara la reunión.",
  events: [
    {
      id: "e1",
      text: "11:00 — Se inicia la reunión del directorio. Las actas certificadas registran la presencia de Okafor Mendes desde el inicio.",
      correctPosition: 1,
    },
    {
      id: "e2",
      text: "11:30 — El asistente de Okafor le lleva documentos urgentes a la sala de reuniones y lo ve sentado en su lugar.",
      correctPosition: 2,
    },
    {
      id: "e3",
      text: "12:00 — Ivana Kraus, asistente ejecutiva, declara que Okafor interrumpió la reunión para almorzar en el restaurante del edificio y regresó a las 12:45.",
      correctPosition: 3,
      isImpossible: true,
    },
    {
      id: "e4",
      text: "13:30 — Las actas certifican el cierre de la reunión. Okafor firma el acta final junto a los demás directores.",
      correctPosition: 4,
    },
    {
      id: "e5",
      text: "13:35 — Las cámaras del ascensor graban a Okafor subiendo solo al piso 12.",
      correctPosition: 5,
    },
    {
      id: "e6",
      text: "14:00 — La limpiadora encuentra a Okafor muerto en su oficina.",
      correctPosition: 6,
    },
    {
      id: "e7",
      text: "14:30 — Llega el médico forense al piso 12.",
      correctPosition: 7,
    },
    {
      id: "e8",
      text: "15:00 — El forense establece la hora de muerte entre las 13:30 y las 14:00.",
      correctPosition: 8,
    },
    {
      id: "e9",
      text: "15:30 — El análisis del contenido gástrico indica que Okafor ingirió una comida abundante entre 2,5 y 3,5 horas antes de la muerte (franja: 10:00–11:30).",
      correctPosition: 9,
    },
    {
      id: "e10",
      text: "16:00 — El perito confirma que el contenido gástrico corresponde al menú estándar del restaurante del edificio, idéntico al servido ese día.",
      correctPosition: 10,
    },
  ],
  impossibleEventId: "e3",
  impossibleReason:
    "Las actas certificadas y el propio asistente confirman que Okafor estuvo en la reunión de 11:00 a 13:30 sin interrupciones. Además, el forense establece que comió entre las 10:00 y las 11:30 — antes de la reunión. Salir a almorzar a las 12:00 es doblemente imposible.",
};

export const CRONOLOGIA_PUZZLES: CronologiaPuzzle[] = [
  cr1,
  cr4,
  cr5,
  cr2,
  cr6,
  cr7,
  cr3,
  cr8,
  cr9,
  cr10,
];

export function getCronologiaPuzzle(id: string) {
  return CRONOLOGIA_PUZZLES.find((p) => p.id === id);
}
