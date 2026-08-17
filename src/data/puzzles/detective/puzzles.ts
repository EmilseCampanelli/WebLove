import { DetectivePuzzle } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// PUZZLE 1 — FÁCIL 01 (original)
// ─────────────────────────────────────────────────────────────────────────────
const d1: DetectivePuzzle = {
  id: "detective-facil-01",
  category: "detective",
  title: "Muerte en el expreso",
  description: "Un pasajero muerto en un tren. Tres sospechosos. Un solo expediente para leer.",
  difficulty: "facil",
  estimatedMinutes: 10,
  story: "El señor Damas fue hallado muerto en su compartimento privado del Expreso del Norte. El tren no había hecho paradas. Tres pasajeros estaban en el mismo vagón.",
  instructions: "Leé el expediente completo. Marcá las pistas que te parecen clave. Luego acusá al culpable.",
  hints: [
    { level: 1, text: "Revisá los testimonios. ¿Alguien dice estar en un lugar que no podía estar?" },
    { level: 2, text: "El pasillo estaba húmedo solo en un tramo. ¿Quién pudo haber dejado ese rastro?" },
    { level: 3, text: "La señora Vail dice haber estado en el vagón comedor, pero el mozo no la vio. Estaba mintiendo." },
  ],
  solutionExplanation:
    "La señora Vail mintió sobre estar en el vagón comedor — el mozo no la vio en toda la noche. Sus huellas húmedas en el pasillo coinciden con el camino desde su compartimento hasta el del señor Damas. El motivo: él iba a revelar su deuda de juego.",
  victim: { name: "Sr. Damas", emoji: "🎩", role: "Banquero en retiro" },
  keyClue: "Las huellas húmedas + la ausencia en el vagón comedor",
  tabs: [
    {
      id: "informe",
      label: "Informe",
      emoji: "📋",
      content: [
        "VÍCTIMA: Sr. Damas, 67 años, banquero retirado.",
        "CAUSA DE MUERTE: Envenenamiento por ingestión.",
        "HORA ESTIMADA: Entre las 21:00 y las 22:30.",
        "LUGAR: Compartimento 7, Vagón A, Expreso del Norte.",
        "OBSERVACIONES: El pasillo entre los compartimentos 5 y 7 presentaba humedad en el piso. El tren no realizó paradas.",
      ],
    },
    {
      id: "testimonios",
      label: "Testimonios",
      emoji: "🗣️",
      content: [
        'SRA. VAIL (Comp. 5): "Cené en el vagón comedor entre las 21:00 y las 22:00. Volví directamente a mi compartimento."',
        'DR. FENWICK (Comp. 6): "Estuve en mi compartimento toda la noche. Escuché el tren pero nada inusual."',
        'CONDE LASZLO (Comp. 8): "Me dormí antes de las 21:00. Me despertó el escándalo a la medianoche."',
        'MOZO DEL VAGÓN COMEDOR: "El vagón comedor cerró a las 22:00. Esa noche solo atendí a dos personas. La señora del 5 no estaba entre ellas."',
      ],
    },
    {
      id: "evidencias",
      label: "Evidencias",
      emoji: "🔍",
      content: [
        "Huellas húmedas en el pasillo: del compartimento 5 al 7 y regreso.",
        "Copa de té con restos de digital de la víctima + otra marca no identificada.",
        "El compartimento 7 no tenía seguro activado desde adentro.",
        "Frasco de digitálico (veneno cardíaco) encontrado envuelto en ropa de la Sra. Vail.",
        "Deuda de juego de la Sra. Vail: $80.000 con el Sr. Damas como acreedor.",
      ],
    },
  ],
  suspects: [
    {
      id: "vail",
      name: "Sra. Vail",
      emoji: "💍",
      motive: "Deuda de $80.000 que el Sr. Damas iba a reclamar públicamente",
      isKiller: true,
    },
    {
      id: "fenwick",
      name: "Dr. Fenwick",
      emoji: "🩺",
      motive: "Posible rivalidad profesional — sin confirmar",
      isKiller: false,
    },
    {
      id: "laszlo",
      name: "Conde Laszlo",
      emoji: "👑",
      motive: "Desconocido",
      isKiller: false,
    },
  ],
  killerId: "vail",
};

// ─────────────────────────────────────────────────────────────────────────────
// PUZZLE 2 — MEDIO 01 (original)
// ─────────────────────────────────────────────────────────────────────────────
const d2: DetectivePuzzle = {
  id: "detective-medio-01",
  category: "detective",
  title: "El cuadro robado",
  description: "Un cuadro desaparece, el dueño aparece muerto. El expediente tiene cuatro secciones.",
  difficulty: "medio",
  estimatedMinutes: 15,
  story:
    "Galería Ferrante, medianoche. El propietario Marcus Ferrante fue hallado muerto y su obra más valiosa — 'La cazadora' de Mirabel — había desaparecido. Cuatro personas tenían acceso.",
  instructions: "Revisá el expediente completo. Marcá las pistas clave. Acusá al culpable.",
  hints: [
    { level: 1, text: "El sistema de alarma fue desactivado con el código. Solo tres personas lo conocían." },
    {
      level: 2,
      text: "El código fue ingresado a las 23:47. Cruzá eso con los testimonios de dónde estaba cada uno.",
    },
    { level: 3, text: "Solo Nora estaba sola en ese horario sin testigos. Y el cuadro reapareció en su depósito." },
  ],
  solutionExplanation:
    "Nora desactivó la alarma a las 23:47, mató a Marcus en la confrontación y se llevó el cuadro, que reapareció en su depósito personal semanas después. Era la única sin coartada en ese momento exacto.",
  victim: { name: "Marcus Ferrante", emoji: "🖼️", role: "Galerista" },
  keyClue: "Alarma desactivada a las 23:47 + cuadro en depósito de Nora",
  tabs: [
    {
      id: "informe",
      label: "Informe",
      emoji: "📋",
      content: [
        "VÍCTIMA: Marcus Ferrante, 54 años, galerista.",
        "CAUSA DE MUERTE: Golpe contundente en la cabeza.",
        "HORA ESTIMADA: Entre las 23:30 y las 00:30.",
        "LUGAR: Sala principal de la Galería Ferrante.",
        "OBRA ROBADA: 'La cazadora' de Mirabel, valuada en 2 millones.",
        "SISTEMA DE ALARMA: Desactivado a las 23:47 con el código correcto.",
      ],
    },
    {
      id: "testimonios",
      label: "Testimonios",
      emoji: "🗣️",
      content: [
        'NORA (socia de Marcus): "Estaba en casa, dormida. Me enteré a la mañana siguiente." — Sin testigos.',
        'RESTAURADOR FELIX: "Estaba en el taller hasta las 23:00. Mi asistente puede confirmarlo."',
        'COMPRADORA PETRA: "Estuve en la cena de la Asociación de Arte hasta las 01:00. Hay 40 testigos."',
        'SEGURIDAD HASSAN: "Hice mi ronda a las 22:00. Todo normal. Me retiré a las 22:30 como indica mi turno."',
      ],
    },
    {
      id: "evidencias",
      label: "Evidencias",
      emoji: "🔍",
      content: [
        "Código de alarma: conocido solo por Marcus, Nora y el restaurador Felix.",
        "Registro de acceso: alarma desactivada a las 23:47 desde el panel interior.",
        "Fibra de tela roja encontrada en el marco vacío. Nora tenía un tapado rojo ese día.",
        "El cuadro fue hallado 3 semanas después en el depósito personal de Nora.",
        "Felix fue visto saliendo del edificio a las 23:05 por la cámara exterior.",
      ],
    },
    {
      id: "cronologia",
      label: "Cronología",
      emoji: "⏱️",
      content: [
        "22:00 — Hassan completa su ronda. Todo normal.",
        "22:30 — Hassan se retira. La galería queda sola.",
        "23:05 — Felix sale del edificio (cámara exterior).",
        "23:47 — Alarma desactivada con código correcto.",
        "00:30 — Una vecina llama a la policía por ruido de vidrios rotos.",
        "00:45 — Policía llega y encuentra el cuerpo y el marco vacío.",
      ],
    },
  ],
  suspects: [
    {
      id: "nora",
      name: "Nora",
      emoji: "👠",
      motive: "Marcus iba a vender la galería sin consultarla — perdía todo lo que había construido",
      isKiller: true,
    },
    {
      id: "felix",
      name: "Restaurador Felix",
      emoji: "🎨",
      motive: "Disputa de honorarios no pagados",
      isKiller: false,
    },
    {
      id: "petra",
      name: "Compradora Petra",
      emoji: "💎",
      motive: "Marcus le vendió un cuadro falso",
      isKiller: false,
    },
    {
      id: "hassan",
      name: "Seguridad Hassan",
      emoji: "🛡️",
      motive: "Desconocido",
      isKiller: false,
    },
  ],
  killerId: "nora",
};

// ─────────────────────────────────────────────────────────────────────────────
// PUZZLE 3 — DIFÍCIL 01 (original)
// ─────────────────────────────────────────────────────────────────────────────
const d3: DetectivePuzzle = {
  id: "detective-dificil-01",
  category: "detective",
  title: "La cumbre del embajador",
  description:
    "Un cuerpo en una cumbre diplomática. Cinco sospechosos con acceso. Un solo expediente con cuatro secciones.",
  difficulty: "dificil",
  estimatedMinutes: 20,
  story:
    "El embajador Volkov fue hallado muerto en su habitación durante una cumbre diplomática. El hotel estaba con acceso restringido. Cinco personas tenían credenciales activas esa noche.",
  instructions: "Leé todo el expediente. Cruzá testimonios, evidencias y cronología. Acusá al culpable.",
  hints: [
    {
      level: 1,
      text: "La llave magnética registra cada acceso. Revisá quién entró a la habitación y cuándo.",
    },
    {
      level: 2,
      text: "El registro muestra una entrada a las 23:15 con la credencial de alguien que dice estar en otro piso.",
    },
    {
      level: 3,
      text: "La credencial de la intérprete Anya fue usada para entrar a la habitación 412 a las 23:15. Ella dice estar en la terraza.",
    },
  ],
  solutionExplanation:
    "La intérprete Anya usó su credencial para entrar a la habitación del embajador a las 23:15. Ella era agente doble y el embajador había descubierto su identidad real. El registro de la llave magnética la delata con precisión.",
  victim: { name: "Embajador Volkov", emoji: "🎖️", role: "Embajador" },
  keyClue: "Registro de llave magnética 23:15 + credencial de Anya",
  tabs: [
    {
      id: "informe",
      label: "Informe",
      emoji: "📋",
      content: [
        "VÍCTIMA: Embajador Volkov, 61 años.",
        "CAUSA DE MUERTE: Asfixia mecánica.",
        "HORA ESTIMADA: Entre las 23:00 y las 23:45.",
        "LUGAR: Habitación 412, Hotel Grand Palais.",
        "ACCESO: Restringido. Solo personal acreditado podía circular esa noche.",
        "CREDENCIALES ACTIVAS: 5 personas con acceso al piso 4.",
      ],
    },
    {
      id: "testimonios",
      label: "Testimonios",
      emoji: "🗣️",
      content: [
        'INTÉRPRETE ANYA: "Estuve en la terraza del piso 6 desde las 22:30 hasta medianoche. Hay otros en la foto grupal." — La foto tiene timestamp: 22:55.',
        'ASESOR BRENNAN: "En mi habitación (piso 3) toda la noche. Pedí room service a las 23:00."',
        'TRADUCTORA MILA: "En la reunión informal del salón B hasta las 23:30. Hay 8 testigos."',
        'JEFE DE SEGURIDAD RUBEN: "Haciendo rondas. Tengo registro GPS de mi credencial."',
        'ASISTENTE IGOR: "Dormido desde las 22:00. Tomé un somnífero."',
      ],
    },
    {
      id: "evidencias",
      label: "Evidencias",
      emoji: "🔍",
      content: [
        "Registro llave magnética hab. 412: entrada a las 23:15 con credencial de ANYA KOVAL.",
        "La foto grupal en la terraza tiene timestamp 22:55 — pero no cubre las 23:15.",
        "Fibra de tela azul marino en la ventana de la habitación (Anya vestía azul marino).",
        "Credencial de Anya: registro GPS muestra movimiento hacia el piso 4 a las 23:10.",
        "El embajador tenía en su cámara fotos de documentos que comprometían a un agente doble.",
      ],
    },
    {
      id: "cronologia",
      label: "Cronología",
      emoji: "⏱️",
      content: [
        "22:30 — Anya llega a la terraza del piso 6.",
        "22:55 — Foto grupal en la terraza (timestamp confirmado).",
        "23:10 — GPS de credencial de Anya: movimiento hacia piso 4.",
        "23:15 — Llave magnética: entrada a hab. 412 con credencial de Anya.",
        "23:45 — Camarero encuentra la puerta entreabierta, llama a seguridad.",
        "23:50 — Se descubre el cuerpo del embajador.",
      ],
    },
  ],
  suspects: [
    {
      id: "anya",
      name: "Intérprete Anya",
      emoji: "🌐",
      motive: "El embajador descubrió que era agente doble — su carrera y libertad dependían de silenciarlo",
      isKiller: true,
    },
    {
      id: "brennan",
      name: "Asesor Brennan",
      emoji: "💼",
      motive: "Disputa de territorios diplomáticos",
      isKiller: false,
    },
    {
      id: "mila",
      name: "Traductora Mila",
      emoji: "📖",
      motive: "Desconocido",
      isKiller: false,
    },
    {
      id: "ruben",
      name: "Jefe de Seg. Ruben",
      emoji: "🛡️",
      motive: "Desconocido",
      isKiller: false,
    },
    {
      id: "igor",
      name: "Asistente Igor",
      emoji: "🗂️",
      motive: "Desconocido",
      isKiller: false,
    },
  ],
  killerId: "anya",
};

// ─────────────────────────────────────────────────────────────────────────────
// PUZZLE 4 — FÁCIL 02  /  Hotel Palermo
// ─────────────────────────────────────────────────────────────────────────────
const d4: DetectivePuzzle = {
  id: "detective-facil-02",
  category: "detective",
  title: "Noche de hotel",
  description: "Un huésped muerto en su habitación. El ascensor no miente.",
  difficulty: "facil",
  estimatedMinutes: 10,
  story:
    "Don Celestino Prado, dueño de un emporio textil, fue encontrado muerto en la suite 302 del Hotel Palermo justo antes del desayuno. Solo tres personas lo visitaron esa noche y el registro del ascensor lo registró todo.",
  instructions: "Leé el expediente, cruzá los horarios del ascensor con los testimonios y acusá al culpable.",
  hints: [
    {
      level: 1,
      text: "El ascensor registra cada viaje con hora y piso. Compará eso con lo que dice cada sospechoso.",
    },
    {
      level: 2,
      text: "Alguien dice no haber subido al tercer piso esa noche, pero el ascensor lo desmiente.",
    },
    {
      level: 3,
      text: "El ascensor llevó a Rodrigo al piso 3 a las 23:40. Él dijo que nunca subió esa noche.",
    },
  ],
  solutionExplanation:
    "Rodrigo Salinas afirmó haber estado en el bar del hotel hasta la medianoche, pero el registro del ascensor lo ubica en el piso 3 a las 23:40. Don Celestino iba a echarlo de la empresa por malversación de fondos. Rodrigo le ofreció una copa envenenada como 'disculpa'.",
  victim: { name: "Don Celestino Prado", emoji: "🧵", role: "Industrial textil" },
  keyClue: "Registro del ascensor: piso 3 a las 23:40 con Rodrigo",
  tabs: [
    {
      id: "informe",
      label: "Informe",
      emoji: "📋",
      content: [
        "VÍCTIMA: Celestino Prado, 71 años, industrial.",
        "CAUSA DE MUERTE: Intoxicación por arsénico.",
        "HORA ESTIMADA: Entre las 23:30 y las 00:15.",
        "LUGAR: Suite 302, Hotel Palermo, Buenos Aires.",
        "HALLAZGO: La camarera encontró el cuerpo a las 07:15 al llevar el desayuno.",
        "COPA: Una copa de coñac con restos de arsénico sobre la mesa de noche.",
      ],
    },
    {
      id: "testimonios",
      label: "Testimonios",
      emoji: "🗣️",
      content: [
        'RODRIGO SALINAS (socio): "Estuve en el bar del hotel hasta medianoche. Luego fui directo a mi habitación en el piso 1. Nunca subí al tercer piso."',
        'BEATRIZ PRADO (hija): "Visité a papá a las 21:00 para darle las buenas noches. A las 21:30 me retiré a mi habitación."',
        'CAMARERO DEL BAR: "El señor Salinas estuvo en el bar, sí, pero se fue cerca de las 23:20, no a medianoche."',
        'RECEPCIONISTA: "No tengo registro de visitas a la suite 302 después de las 22:00. El ascensor sí registra todo automáticamente."',
      ],
    },
    {
      id: "evidencias",
      label: "Evidencias",
      emoji: "🔍",
      content: [
        "Registro del ascensor: piso 3 a las 21:05 (Beatriz), piso 3 a las 23:40 (tarjeta de Rodrigo Salinas).",
        "Copa de coñac con arsénico: marca de labios masculina no perteneciente a la víctima.",
        "Documento hallado en la caja fuerte: carta de despido firmada para Rodrigo Salinas por 'irregularidades contables'.",
        "Análisis de la tarjeta de habitación de Rodrigo: acceso al piso 3 a las 23:38.",
        "El bar del hotel cierra a las 23:30. No a medianoche como dijo Rodrigo.",
      ],
    },
  ],
  suspects: [
    {
      id: "rodrigo",
      name: "Rodrigo Salinas",
      emoji: "📊",
      motive: "Don Celestino iba a despedirlo por malversación de fondos",
      isKiller: true,
    },
    {
      id: "beatriz",
      name: "Beatriz Prado",
      emoji: "👩",
      motive: "Discutían por la herencia desde hace meses",
      isKiller: false,
    },
    {
      id: "camarero",
      name: "Camarero del bar",
      emoji: "🍸",
      motive: "Desconocido",
      isKiller: false,
    },
  ],
  killerId: "rodrigo",
};

// ─────────────────────────────────────────────────────────────────────────────
// PUZZLE 5 — FÁCIL 03  /  Museo de Historia Natural
// ─────────────────────────────────────────────────────────────────────────────
const d5: DetectivePuzzle = {
  id: "detective-facil-03",
  category: "detective",
  title: "El guardián del museo",
  description: "El director del museo muerto entre sus propias vitrinas. Un guante lo dice todo.",
  difficulty: "facil",
  estimatedMinutes: 10,
  story:
    "El director del Museo de Historia Natural, Ernesto Quijada, fue hallado muerto entre las salas de arqueología. El edificio estaba cerrado al público. Solo tres personas tenían llave de acceso esa noche.",
  instructions: "Leé el expediente. El guante es la pista central. Acusá al culpable.",
  hints: [
    {
      level: 1,
      text: "Se encontró un guante de cuero en la sala de arqueología. ¿A quién le pertenece?",
    },
    {
      level: 2,
      text: "Solo una persona usa guantes de cuero marrón en todo el personal del museo.",
    },
    {
      level: 3,
      text: "El guante es de la restauradora Carmen. Sus llaves también marcaron la entrada a las 22:15.",
    },
  ],
  solutionExplanation:
    "Carmen Aldao entró al museo a las 22:15 usando su llave. Perdió uno de sus guantes característicos de cuero marrón en la lucha con Ernesto. El motivo: él descubrió que ella había falsificado la procedencia de varias piezas arqueológicas para vendérselas a coleccionistas privados.",
  victim: { name: "Ernesto Quijada", emoji: "🏛️", role: "Director del museo" },
  keyClue: "Guante de cuero marrón + registro de llaves 22:15",
  tabs: [
    {
      id: "informe",
      label: "Informe",
      emoji: "📋",
      content: [
        "VÍCTIMA: Ernesto Quijada, 58 años, director del Museo de Historia Natural.",
        "CAUSA DE MUERTE: Traumatismo craneoencefálico por objeto contundente.",
        "HORA ESTIMADA: Entre las 22:00 y las 23:00.",
        "LUGAR: Sala de Arqueología Precolombina, Nivel 2.",
        "OBJETO DEL CRIMEN: Probable objeto de la propia sala (pieza de mármol sin identificar).",
        "HALLAZGO: El vigilante nocturno lo encontró a las 23:30 durante su ronda.",
      ],
    },
    {
      id: "testimonios",
      label: "Testimonios",
      emoji: "🗣️",
      content: [
        'CARMEN ALDAO (restauradora): "Terminé mi jornada a las 19:00 y me fui. No volví al museo."',
        'PROF. DARÍO MENA (curador): "Estuve en casa toda la noche. Tengo una videollamada grabada de las 21:00 a las 23:00."',
        'VIGILANTE NOCTURNO OMAR: "Comencé mi guardia a las 22:00. Revisé el nivel 2 a las 22:30 y estaba vacío... o eso creí."',
        'ASISTENTE LUCÍA: "Salí con Carmen a las 19:00. Fuimos juntas hasta la estación Palermo y nos separamos."',
      ],
    },
    {
      id: "evidencias",
      label: "Evidencias",
      emoji: "🔍",
      content: [
        "Guante de cuero marrón talle M hallado junto al cuerpo — modelo exclusivo de la marca 'Estancia'.",
        "Registro electrónico de llaves: llave de Carmen Aldao registró entrada a las 22:15.",
        "Cuaderno de notas de Ernesto: 'hablar con Carmen sobre los certificados falsos — mañana a primera hora'.",
        "Cámara de seguridad exterior: una figura con tapado oscuro entra a las 22:13 por la puerta lateral.",
        "Carmen usa guantes de cuero marrón a diario — lo confirman tres colegas.",
      ],
    },
  ],
  suspects: [
    {
      id: "carmen",
      name: "Carmen Aldao",
      emoji: "🧤",
      motive: "Ernesto descubrió que falsificaba la procedencia de piezas arqueológicas para venderlas",
      isKiller: true,
    },
    {
      id: "dario",
      name: "Prof. Darío Mena",
      emoji: "🔭",
      motive: "Disputas por el presupuesto del área de arqueología",
      isKiller: false,
    },
    {
      id: "omar",
      name: "Vigilante Omar",
      emoji: "🔦",
      motive: "Desconocido",
      isKiller: false,
    },
  ],
  killerId: "carmen",
};

// ─────────────────────────────────────────────────────────────────────────────
// PUZZLE 6 — MEDIO 02  /  Crucero Austral
// ─────────────────────────────────────────────────────────────────────────────
const d6: DetectivePuzzle = {
  id: "detective-medio-02",
  category: "detective",
  title: "Crucero sin retorno",
  description: "Un magnate muerto en altamar. Cuatro sospechosos, ninguna salida del barco.",
  difficulty: "medio",
  estimatedMinutes: 15,
  story:
    "El magnate naviero Horacio Wendt apareció muerto en su camarote de lujo a bordo del crucero Austral a mitad de su travesía por el Canal de Beagle. El barco no había atracado. Solo cuatro personas tenían acceso a la cubierta VIP.",
  instructions:
    "Revisá el expediente. Cruzá los registros de acceso a cubierta VIP con los testimonios. Acusá al culpable.",
  hints: [
    {
      level: 1,
      text: "El acceso a cubierta VIP requiere tarjeta especial. Solo cuatro personas la tenían.",
    },
    {
      level: 2,
      text: "Una de las tarjetas registró acceso al camarote de Wendt entre las 02:00 y las 02:30. Cruzalo con los testimonios.",
    },
    {
      level: 3,
      text: "La tarjeta de Valeria Wendt registró acceso al camarote a las 02:12. Ella dice que dormía desde las 22:00.",
    },
  ],
  solutionExplanation:
    "Valeria Wendt, esposa de la víctima, entró al camarote a las 02:12 con su tarjeta VIP. El testamento de Horacio la excluía de la herencia a favor de su hijo del primer matrimonio — ella lo sabía porque encontró el documento en su maletín. La autopsia confirmó que el sedante hallado en el whisky no dejó marcas visibles de lucha.",
  victim: { name: "Horacio Wendt", emoji: "⚓", role: "Magnate naviero" },
  keyClue: "Tarjeta VIP de Valeria: acceso al camarote a las 02:12",
  tabs: [
    {
      id: "informe",
      label: "Informe",
      emoji: "📋",
      content: [
        "VÍCTIMA: Horacio Wendt, 68 años, empresario naviero.",
        "CAUSA DE MUERTE: Paro cardíaco inducido por sobredosis de triazolam (sedante).",
        "HORA ESTIMADA: Entre las 02:00 y las 03:00.",
        "LUGAR: Camarote Presidencial, Cubierta VIP, MS Austral.",
        "CONDICIÓN: El barco navegaba a 40 km de la costa, sin escala programada hasta las 09:00.",
        "TARJETAS VIP: Emitidas a 4 personas — la víctima, su esposa, su asistente y el jefe de a bordo.",
      ],
    },
    {
      id: "testimonios",
      label: "Testimonios",
      emoji: "🗣️",
      content: [
        'VALERIA WENDT (esposa): "Me fui a dormir a las 22:00. No salí de mi camarote hasta las 08:00. Tengo pastillas para dormir — no escucho nada."',
        'TOMAS KRAL (asistente): "Estuve en el bar de cubierta hasta las 01:30. Luego fui a mi camarote. Hay cámara en el bar."',
        'CAP. BURGOS (jefe de a bordo): "Estuve en el puente de mando de las 00:00 a las 06:00. El oficial Reyes puede confirmarlo."',
        'MOZO NOCTURNO PABLO: "Serví una última copa al señor Wendt a las 01:15 en su camarote. Estaba solo y de buen humor."',
      ],
    },
    {
      id: "evidencias",
      label: "Evidencias",
      emoji: "🔍",
      content: [
        "Registro tarjetas VIP: camarote presidencial — acceso 01:15 (mozo Pablo, autorizado) y 02:12 (tarjeta de Valeria Wendt).",
        "Vaso de whisky: triazolam en concentración 4 veces la dosis terapéutica.",
        "Cámara del bar: Tomas Kral sale a las 01:28. Entra a su propio camarote a las 01:31 (cámara del pasillo).",
        "Testamento encontrado en el maletín de Horacio: Valeria excluida. Todo para Máximo Wendt (hijo).",
        "Burbuja de fármaco de triazolam vacía hallada en el tacho de basura del camarote de Valeria.",
      ],
    },
    {
      id: "cronologia",
      label: "Cronología",
      emoji: "⏱️",
      content: [
        "22:00 — Valeria dice retirarse a dormir.",
        "01:15 — Mozo Pablo lleva última copa a Horacio (confirmado por tarjeta y cámara).",
        "01:28 — Tomas Kral sale del bar (cámara del bar).",
        "01:31 — Tomas entra a su camarote (cámara del pasillo).",
        "02:12 — Tarjeta de Valeria: acceso al camarote presidencial.",
        "08:00 — Tripulante descubre el cuerpo al llevar el desayuno.",
      ],
    },
  ],
  suspects: [
    {
      id: "valeria",
      name: "Valeria Wendt",
      emoji: "💄",
      motive: "El testamento la excluía de la herencia millonaria a favor del hijo",
      isKiller: true,
    },
    {
      id: "tomas",
      name: "Tomas Kral",
      emoji: "💼",
      motive: "Horacio iba a reemplazarlo como asistente personal",
      isKiller: false,
    },
    {
      id: "burgos",
      name: "Capitán Burgos",
      emoji: "🚢",
      motive: "Desconocido",
      isKiller: false,
    },
    {
      id: "pablo",
      name: "Mozo Pablo",
      emoji: "🍷",
      motive: "Desconocido",
      isKiller: false,
    },
  ],
  killerId: "valeria",
};

// ─────────────────────────────────────────────────────────────────────────────
// PUZZLE 7 — MEDIO 03  /  Universidad
// ─────────────────────────────────────────────────────────────────────────────
const d7: DetectivePuzzle = {
  id: "detective-medio-03",
  category: "detective",
  title: "El decano y el veneno",
  description: "El decano de la facultad muerto en su despacho. La clave está en los correos.",
  difficulty: "medio",
  estimatedMinutes: 15,
  story:
    "El decano de la Facultad de Ciencias Exactas, Federico Molnar, fue encontrado muerto en su despacho un martes por la noche. El edificio administrativo cerraba a las 21:00. Cuatro personas tenían llave maestra.",
  instructions: "Revisá el expediente completo. Prestá atención a los correos internos. Acusá al culpable.",
  hints: [
    {
      level: 1,
      text: "Los correos internos de Molnar revelan conflictos con varios colegas. Buscá el más reciente.",
    },
    {
      level: 2,
      text: "El correo más explosivo es del lunes por la noche. Cruzalo con el acceso de las cámaras del martes.",
    },
    {
      level: 3,
      text: "El correo amenazante del lunes lo mandó la Prof. Garín desde su cuenta institucional. La cámara la muestra entrando al edificio a las 20:15 el martes.",
    },
  ],
  solutionExplanation:
    "La profesora Garín envió el lunes un correo furioso amenazando a Molnar con 'arrepentirse'. El martes entró al edificio a las 20:15, antes del cierre. Molnar había firmado su baja del cargo docente sin aviso. El veneno (ricina disuelta en el café) fue identificado en la taza — y Garín tiene conocimientos de bioquímica avanzada.",
  victim: { name: "Federico Molnar", emoji: "🎓", role: "Decano de Exactas" },
  keyClue: "Correo amenazante del lunes + cámara del martes 20:15",
  tabs: [
    {
      id: "informe",
      label: "Informe",
      emoji: "📋",
      content: [
        "VÍCTIMA: Federico Molnar, 62 años, decano.",
        "CAUSA DE MUERTE: Envenenamiento por ricina.",
        "HORA ESTIMADA: Entre las 20:00 y las 21:30.",
        "LUGAR: Despacho del Decano, Piso 3, Edificio Administrativo.",
        "HALLAZGO: El personal de limpieza lo encontró a las 22:00.",
        "TAZA DE CAFÉ: Ricina disuelta en concentración letal. Parcialmente bebido.",
      ],
    },
    {
      id: "testimonios",
      label: "Testimonios",
      emoji: "🗣️",
      content: [
        'PROF. GARÍN (bioquímica): "Ese lunes estaba enojada, sí, pero el martes estaba en casa corrigiendo parciales. Nadie puede confirmarlo."',
        'PROF. ESTEVES (física): "Salí del edificio a las 19:30. Vi a Molnar en su despacho, vivo y tomando café."',
        'SECRETARIA ROSA: "Me fui a las 18:45. El decano me pidió que dejara el café preparado antes de irme."',
        'BEDEL RAMIRO: "Hice el cierre a las 21:00. El edificio estaba solo. La puerta del despacho estaba cerrada."',
      ],
    },
    {
      id: "evidencias",
      label: "Evidencias",
      emoji: "🔍",
      content: [
        "Correo institucional enviado el lunes 23:47 desde cuenta de Prof. Garín: 'Molnar, te vas a arrepentir de haberme hecho esto.'",
        "Cámara exterior del edificio: Prof. Garín entra a las 20:15 el martes con llave maestra.",
        "Taza de café con ricina. La ricina es un derivado del ricino — especialidad de la cátedra de Garín.",
        "Resolución firmada por Molnar: baja de la Prof. Garín de su cargo con efecto inmediato.",
        "Laboratorio de Garín: frasco de aceite de ricino abierto, con trazas recientes de extracción.",
      ],
    },
    {
      id: "cronologia",
      label: "Cronología",
      emoji: "⏱️",
      content: [
        "Lunes 23:47 — Correo amenazante de Garín a Molnar.",
        "Martes 18:45 — Secretaria Rosa se retira, deja café preparado.",
        "Martes 19:30 — Prof. Esteves sale. Molnar está vivo.",
        "Martes 20:15 — Cámara exterior: Garín entra al edificio.",
        "Martes 21:00 — Bedel Ramiro hace el cierre. Ve el despacho cerrado.",
        "Martes 22:00 — Personal de limpieza encuentra el cuerpo.",
      ],
    },
  ],
  suspects: [
    {
      id: "garin",
      name: "Prof. Garín",
      emoji: "⚗️",
      motive: "Molnar la dio de baja de su cargo docente sin previo aviso",
      isKiller: true,
    },
    {
      id: "esteves",
      name: "Prof. Esteves",
      emoji: "📐",
      motive: "Disputa por la dirección del departamento",
      isKiller: false,
    },
    {
      id: "rosa",
      name: "Secretaria Rosa",
      emoji: "📎",
      motive: "Molnar la amenazó con no renovarle el contrato",
      isKiller: false,
    },
    {
      id: "ramiro",
      name: "Bedel Ramiro",
      emoji: "🔑",
      motive: "Desconocido",
      isKiller: false,
    },
  ],
  killerId: "garin",
};

// ─────────────────────────────────────────────────────────────────────────────
// PUZZLE 8 — DIFÍCIL 02  /  Chalet de montaña
// ─────────────────────────────────────────────────────────────────────────────
const d8: DetectivePuzzle = {
  id: "detective-dificil-02",
  category: "detective",
  title: "La nieve no borra todo",
  description: "Un cuerpo en un chalet nevado. Cinco sospechosos. Las huellas en la nieve mienten.",
  difficulty: "dificil",
  estimatedMinutes: 20,
  story:
    "El coleccionista de arte Reinaldo Voss fue hallado muerto en la biblioteca de su chalet en Bariloche durante una tormenta de nieve. El camino de acceso era intransitable. Solo los cinco huéspedes del fin de semana podían ser el asesino.",
  instructions:
    "Leé el expediente completo. Analizá las huellas en la nieve, los testimonios y las evidencias forenses. Acusá al culpable.",
  hints: [
    {
      level: 1,
      text: "Las huellas en la nieve parecen indicar que alguien salió al jardín. Pero podría ser una pista falsa.",
    },
    {
      level: 2,
      text: "El forense dice que la muerte ocurrió entre las 23:00 y las 00:00. Las huellas se formaron antes de las 22:30 según el ritmo de nevadas.",
    },
    {
      level: 3,
      text: "Gonzalo dejó las huellas deliberadamente antes de matar — para crear una coartada falsa apuntando hacia afuera. Él estuvo dentro todo el tiempo.",
    },
  ],
  solutionExplanation:
    "Gonzalo Ibarren creó las huellas en la nieve deliberadamente antes de las 22:30 para simular que alguien había entrado desde afuera. Pero la tormenta se intensificó a las 22:45 y cubrió parcialmente esas huellas — lo que significa que fueron hechas antes del crimen. Gonzalo nunca salió: mató a Reinaldo dentro del chalet entre las 23:00 y las 00:00. El motivo: Reinaldo había descubierto que los Ibarren le habían vendido 12 cuadros apócrifos por dos millones de dólares.",
  victim: { name: "Reinaldo Voss", emoji: "🏔️", role: "Coleccionista de arte" },
  keyClue: "Huellas cubiertas antes del crimen + Gonzalo sin coartada interna verificable",
  tabs: [
    {
      id: "informe",
      label: "Informe",
      emoji: "📋",
      content: [
        "VÍCTIMA: Reinaldo Voss, 66 años, coleccionista de arte.",
        "CAUSA DE MUERTE: Estrangulamiento manual.",
        "HORA ESTIMADA: Entre las 23:00 y las 00:00.",
        "LUGAR: Biblioteca del Chalet Voss, Bariloche.",
        "CONDICIÓN CLIMÁTICA: Tormenta de nieve. Camino de acceso bloqueado desde las 20:00.",
        "HUÉSPEDES PRESENTES: 5 personas además de la víctima.",
      ],
    },
    {
      id: "testimonios",
      label: "Testimonios",
      emoji: "🗣️",
      content: [
        'GONZALO IBARREN (marchante de arte): "Estuve en mi cuarto desde las 22:00. Escuché la tormenta pero no salí."',
        'PATRICIA VOSS (hermana): "Tomé algo caliente en la cocina hasta las 23:30. Nadie más estaba allí."',
        'DR. LUCIO SANZ (médico de Voss): "Jugué al ajedrez con el señor Alderete en el salón hasta las 00:30."',
        'ALDERETE (asesor financiero): "Confirmo lo del ajedrez. El Dr. Sanz me ganó dos partidas."',
        'COCINERA NILDA: "Me retiré a las 22:00. Mi cuarto está en el ala de servicio, no escuché nada."',
      ],
    },
    {
      id: "evidencias",
      label: "Evidencias",
      emoji: "🔍",
      content: [
        "Huellas en la nieve del jardín: parcialmente cubiertas por la nevada de las 22:45 — datan de antes de las 22:30.",
        "Forense: la muerte ocurrió entre las 23:00 y las 00:00 — posterior a las huellas.",
        "Marcas de estrangulamiento: compatibles con manos grandes (talle L). Gonzalo usa guantes talle L.",
        "Carta encontrada en el escritorio de Reinaldo: borrador de denuncia por fraude artístico contra la galería Ibarren.",
        "Análisis de huellas: el patrón corresponde a las botas de Gonzalo Ibarren (talle 44, marca Patagonia).",
      ],
    },
    {
      id: "cronologia",
      label: "Cronología",
      emoji: "⏱️",
      content: [
        "20:00 — Tormenta bloquea el camino de acceso. Nadie puede entrar ni salir.",
        "22:00 — Gonzalo dice retirarse a su cuarto. Cocinera Nilda también.",
        "22:30 — Estimación máxima de formación de las huellas en la nieve (según ritmo de nevada).",
        "22:45 — Segunda oleada de nieve cubre parcialmente las huellas.",
        "23:00 — Inicio estimado de la muerte según forense.",
        "00:00 — Patricia escucha un golpe desde la biblioteca y va a ver. Encuentra el cuerpo.",
      ],
    },
    {
      id: "fotografias",
      label: "Fotografías",
      emoji: "📷",
      content: [
        "FOTO 01 — Vista general de la biblioteca: el cuerpo de Voss junto al sillón de lectura.",
        "FOTO 02 — Huellas en la nieve del jardín: patrón de ida y vuelta, parcialmente sepultadas.",
        "FOTO 03 — Detalle de las huellas: taco y suela compatibles con bota Patagonia talle 44.",
        "FOTO 04 — Borrador de denuncia en el escritorio: menciona '12 obras apócrifas' y 'galería Ibarren'.",
        "FOTO 05 — Cuello de la víctima: marcas de estrangulamiento simétricas, manos grandes.",
      ],
    },
  ],
  suspects: [
    {
      id: "gonzalo",
      name: "Gonzalo Ibarren",
      emoji: "🖼️",
      motive: "Reinaldo iba a denunciarlo por venderle 12 cuadros apócrifos por 2 millones de dólares",
      isKiller: true,
    },
    {
      id: "patricia",
      name: "Patricia Voss",
      emoji: "👩‍🦳",
      motive: "Disputas familiares por la herencia",
      isKiller: false,
    },
    {
      id: "sanz",
      name: "Dr. Lucio Sanz",
      emoji: "💊",
      motive: "Desconocido",
      isKiller: false,
    },
    {
      id: "alderete",
      name: "Alderete",
      emoji: "📈",
      motive: "Reinaldo descubrió irregularidades en su gestión financiera",
      isKiller: false,
    },
    {
      id: "nilda",
      name: "Cocinera Nilda",
      emoji: "🍲",
      motive: "Desconocido",
      isKiller: false,
    },
  ],
  killerId: "gonzalo",
};

// ─────────────────────────────────────────────────────────────────────────────
// PUZZLE 9 — DIFÍCIL 03  /  Tren de lujo
// ─────────────────────────────────────────────────────────────────────────────
const d9: DetectivePuzzle = {
  id: "detective-dificil-03",
  category: "detective",
  title: "El último andén",
  description: "Un senador muerto en el tren de lujo Buenos Aires–Mendoza. Cinco sospechosos en distintos vagones.",
  difficulty: "dificil",
  estimatedMinutes: 22,
  story:
    "El senador Ernaldo Ruche fue hallado muerto en su suite del Tren Dorado en algún punto entre Rosario y Córdoba. El tren estaba en movimiento. Cinco personas fueron vistas en el vagón privado esa noche.",
  instructions:
    "Leé el expediente. Cruzá los testimonios con los registros del tren y el análisis forense. Acusá al culpable.",
  hints: [
    {
      level: 1,
      text: "El tren tiene cámaras en los pasillos de los vagones. Revisá quién circuló por el vagón privado.",
    },
    {
      level: 2,
      text: "Una cámara captó a alguien a las 01:20 entrando a la suite del senador. Compará la ropa con los testimonios.",
    },
    {
      level: 3,
      text: "La cámara del pasillo captó a una persona con bufanda verde a las 01:20. Solo Mirta llevaba bufanda verde esa noche.",
    },
  ],
  solutionExplanation:
    "Mirta Colón, asesora política del senador, entró a su suite a las 01:20. La cámara del pasillo la captó por su distintiva bufanda verde. Ella sabía que Ruche iba a entregarla a la justicia por su rol en una red de sobreprecios en licitaciones públicas. La administración de un fármaco en el cognac dejó al senador sin capacidad de resistir.",
  victim: { name: "Senador Ernaldo Ruche", emoji: "🏛️", role: "Senador de la Nación" },
  keyClue: "Cámara del pasillo 01:20 + bufanda verde de Mirta",
  tabs: [
    {
      id: "informe",
      label: "Informe",
      emoji: "📋",
      content: [
        "VÍCTIMA: Ernaldo Ruche, 59 años, senador de la Nación.",
        "CAUSA DE MUERTE: Asfixia por oclusión de vías aéreas (almohada). Previo al hecho: sedante en sangre.",
        "HORA ESTIMADA: Entre las 01:15 y las 02:00.",
        "LUGAR: Suite privada, Vagón 1, Tren Dorado Buenos Aires–Mendoza.",
        "UBICACIÓN DEL TREN: En trayecto entre Rosario y Córdoba al momento estimado del crimen.",
        "CÁMARAS: Cobertura total en pasillos. Las suites no tienen cámara interior.",
      ],
    },
    {
      id: "testimonios",
      label: "Testimonios",
      emoji: "🗣️",
      content: [
        'MIRTA COLÓN (asesora política): "Estuve en mi compartimento desde las 23:00. No salí hasta las 07:00 cuando el tren llegó a Córdoba."',
        'DIPUTADO FERNÉS: "Cené con el senador hasta las 22:30 en el vagón restaurante. Luego fui al bar hasta la 01:00."',
        'EDECÁN TAMARA: "Dejé los documentos al senador a las 23:15 y me retiré. Dormí en el vagón 2."',
        'EMPRESARIO BRACCO: "Soy amigo personal de Ruche. Me fui a dormir antes de las 23:00. Tomo pastillas para el insomnio."',
        'MOZO DEL VAGÓN 1, EZEQUIEL: "Serví un cognac al senador a las 00:30. Estaba solo. Se lo traje de la barra como siempre."',
      ],
    },
    {
      id: "evidencias",
      label: "Evidencias",
      emoji: "🔍",
      content: [
        "Cámara pasillo vagón 1: persona con bufanda verde entra a suite del senador a las 01:20 y sale a las 01:47.",
        "Análisis de sangre: clonazepam en concentración sedante (no letal por sí solo).",
        "Copa de cognac con restos de clonazepam — la trajo Ezequiel de la barra a las 00:30.",
        "Archivo en notebook del senador: 'entregar a fiscalía — MC — sobreprecios licitación ruta 7' (MC = Mirta Colón).",
        "Mirta Colón llevaba bufanda verde esa noche — confirmado por el diputado Fernés en la cena de las 20:00.",
      ],
    },
    {
      id: "cronologia",
      label: "Cronología",
      emoji: "⏱️",
      content: [
        "20:00 — Cena en vagón restaurante. Mirta y el senador se muestran tensos.",
        "22:30 — Fernés y el senador terminan de cenar.",
        "23:15 — Tamara entrega documentos al senador en su suite.",
        "00:30 — Mozo Ezequiel lleva cognac al senador (con clonazepam, sin saberlo).",
        "01:20 — Cámara: persona con bufanda verde entra a la suite del senador.",
        "01:47 — Cámara: la misma persona sale de la suite.",
        "07:00 — El tren llega a Córdoba. Personal encuentra el cuerpo.",
      ],
    },
    {
      id: "fotografias",
      label: "Fotografías",
      emoji: "📷",
      content: [
        "FOTO 01 — Suite del senador: cuerpo hallado en la cama, almohada junto al cuerpo.",
        "FOTO 02 — Captura de cámara del pasillo 01:20: figura de espaldas, bufanda verde visible.",
        "FOTO 03 — Copa de cognac: rastros de polvo blanco en el fondo.",
        "FOTO 04 — Pantalla del notebook: archivo 'MC_fiscalía_ruta7.doc' abierto.",
        "FOTO 05 — Foto de la cena de las 20:00: Mirta Colón con bufanda verde puesta.",
      ],
    },
  ],
  suspects: [
    {
      id: "mirta",
      name: "Mirta Colón",
      emoji: "🟢",
      motive: "El senador iba a entregarla a la fiscalía por sobreprecios en licitaciones públicas",
      isKiller: true,
    },
    {
      id: "fernes",
      name: "Diputado Fernés",
      emoji: "🎙️",
      motive: "Rivalidad política — Ruche bloqueaba su candidatura",
      isKiller: false,
    },
    {
      id: "tamara",
      name: "Edecán Tamara",
      emoji: "📁",
      motive: "Desconocido",
      isKiller: false,
    },
    {
      id: "bracco",
      name: "Empresario Bracco",
      emoji: "🏗️",
      motive: "Ruche canceló un contrato millonario de obra pública",
      isKiller: false,
    },
    {
      id: "ezequiel",
      name: "Mozo Ezequiel",
      emoji: "🥃",
      motive: "Desconocido",
      isKiller: false,
    },
  ],
  killerId: "mirta",
};

// ─────────────────────────────────────────────────────────────────────────────
// PUZZLE 10 — EXPERTO 01  /  Mansión / Gala benéfica
// ─────────────────────────────────────────────────────────────────────────────
const d10: DetectivePuzzle = {
  id: "detective-experto-01",
  category: "detective",
  title: "Gala de cenizas",
  description:
    "Una gala benéfica, seis sospechosos, un muerto y un expediente lleno de contradicciones. Solo un experto puede resolverlo.",
  difficulty: "experto",
  estimatedMinutes: 30,
  story:
    "La baronesa Elsa Drumond fue hallada muerta en la biblioteca privada de la Mansión Alvear durante su propia gala benéfica anual. Más de cien invitados llenaban los salones, pero solo seis personas tenían acceso a la biblioteca. El asesino estuvo delante de todos — y nadie lo vio.",
  instructions:
    "Leé todo el expediente con atención. Este caso requiere cruzar testimonios, cronología, análisis forenses y fotografías. Hay señuelos deliberados. Acusá al culpable con prueba concreta.",
  hints: [
    {
      level: 1,
      text: "La biblioteca tiene una sola entrada. La cámara del pasillo registra todos los movimientos. Construí una línea de tiempo por persona.",
    },
    {
      level: 2,
      text: "Dos personas entraron a la biblioteca en el período crítico. Uno tiene coartada verificada por el discurso público. El otro no.",
    },
    {
      level: 3,
      text: "Ramiro Castex entró a la biblioteca a las 22:48 y salió a las 23:09. La baronesa murió en ese intervalo. Su discurso de las 23:00 fue grabado — pero él no aparece en cámara durante el minuto crucial de las 22:55 a las 23:05.",
    },
  ],
  solutionExplanation:
    "Ramiro Castex, abogado de la baronesa y albacea del testamento, envenenó el champagne de Elsa entre las 22:48 y las 23:09 mientras estaba en la biblioteca. Salió antes de que ella colapsara y apareció en el salón justo cuando arrancaba el discurso, creando la ilusión de una coartada. Pero las cámaras muestran que entre las 22:55 y las 23:05 no está en el salón principal — está en la biblioteca. El móvil: el nuevo testamento de Elsa lo excluía de la herencia y lo nombraba responsable de irregularidades en la administración del fideicomiso.",
  victim: { name: "Baronesa Elsa Drumond", emoji: "💎", role: "Filántropa y mecenas" },
  keyClue: "Cámara biblioteca 22:48–23:09 + ausencia de Castex en el salón 22:55–23:05",
  tabs: [
    {
      id: "informe",
      label: "Informe",
      emoji: "📋",
      content: [
        "VÍCTIMA: Elsa Drumond, 74 años, baronesa, filántropa y mecenas de las artes.",
        "CAUSA DE MUERTE: Envenenamiento por cianuro de potasio disuelto en champagne.",
        "HORA ESTIMADA: Entre las 22:50 y las 23:10.",
        "LUGAR: Biblioteca privada, ala oeste, Mansión Alvear.",
        "ACCESO A LA BIBLIOTECA: Restringido a 6 personas con llave codificada.",
        "EVENTO: Gala Benéfica Anual Drumond. Más de 100 invitados en los salones principales.",
        "COPA DE CHAMPAGNE: Encontrada junto al sillón de lectura. Positivo para cianuro de potasio.",
      ],
    },
    {
      id: "testimonios",
      label: "Testimonios",
      emoji: "🗣️",
      content: [
        'RAMIRO CASTEX (abogado y albacea): "Estuve en el salón principal toda la noche. Di el discurso de bienvenida a las 23:00. Hay grabación."',
        'CONDESA VIERA (amiga íntima): "Estuve con Elsa hasta las 22:40 en la biblioteca. Luego la dejé sola porque ella prefería entrar a la gala más tarde."',
        'MAYORDOMO TOMÁS: "Serví champagne a la baronesa a las 22:30 en la biblioteca. Luego cerré las cortinas a pedido suyo."',
        'NIETA CAMILA DRUMOND: "Estaba en el salón todo el tiempo. Muchos me vieron. No entré a la biblioteca en toda la noche."',
        'SEC. PERSONAL ÁNGELA: "Acompañé a la baronesa hasta las 22:35 con documentos para firmar. Luego fui al salón."',
        'ARCH. BEATONS (donante): "Entré a la biblioteca a las 23:15 a buscar un libro que la baronesa me prometió. La encontré desplomada."',
      ],
    },
    {
      id: "evidencias",
      label: "Evidencias",
      emoji: "🔍",
      content: [
        "Cámara pasillo biblioteca: registros de entrada y salida — Condesa Viera (entra 22:10 / sale 22:41), Ángela (entra 22:30 / sale 22:37), Ramiro Castex (entra 22:48 / sale 23:09), Beatons (entra 23:15).",
        "Grabación del discurso de Castex: empieza a las 23:00 pero él no aparece en cámara del salón entre las 22:55 y las 23:05.",
        "Copa de champagne: cianuro de potasio. La copa tiene dos marcas de labios — una de la víctima y otra sin identificar.",
        "Nuevo testamento de Elsa (borrador firmado el viernes): excluye a Castex y lo menciona por 'mal manejo del fideicomiso Drumond'.",
        "Correo enviado por Castex el viernes al mediodía: 'Elsa, si firmás ese documento estás cometiendo un error grave. Hablemos antes de la gala.'",
        "Huella dactilar parcial en la botella de champagne abierta en la biblioteca: compatible con Castex (no concluyente por fragmentación).",
      ],
    },
    {
      id: "cronologia",
      label: "Cronología",
      emoji: "⏱️",
      content: [
        "22:10 — Condesa Viera entra a la biblioteca.",
        "22:30 — Mayordomo Tomás sirve champagne a la baronesa en la biblioteca.",
        "22:30 — Ángela entra a la biblioteca con documentos.",
        "22:37 — Ángela sale de la biblioteca.",
        "22:40 — Condesa Viera se despide de Elsa y sale (sale cámara: 22:41).",
        "22:48 — Ramiro Castex entra a la biblioteca.",
        "22:50–23:10 — Ventana estimada de la muerte según forense.",
        "23:00 — Discurso de bienvenida en el salón. Castex NO aparece en cámara del salón 22:55–23:05.",
        "23:09 — Castex sale de la biblioteca (cámara pasillo).",
        "23:15 — Beatons entra a la biblioteca y encuentra el cuerpo.",
        "23:18 — Se llama a la policía.",
      ],
    },
    {
      id: "fotografias",
      label: "Fotografías",
      emoji: "📷",
      content: [
        "FOTO 01 — Biblioteca: sillón de lectura, copa de champagne volcada, cuerpo de la baronesa en el suelo.",
        "FOTO 02 — Captura cámara pasillo 22:48: Ramiro Castex entra a la biblioteca con llave codificada.",
        "FOTO 03 — Captura cámara salón principal 22:55 a 23:05: ausencia de Castex en el cuadro.",
        "FOTO 04 — Copa de champagne: dos marcas de labios visibles bajo luz ultravioleta.",
        "FOTO 05 — Borrador de testamento: cláusula que excluye a Castex marcada con resaltador.",
        "FOTO 06 — Botella de champagne abierta: huella dactilar parcial en el cuello de la botella.",
      ],
    },
  ],
  suspects: [
    {
      id: "castex",
      name: "Ramiro Castex",
      emoji: "⚖️",
      motive: "El nuevo testamento lo excluía de la herencia y lo señalaba por mal manejo del fideicomiso",
      isKiller: true,
    },
    {
      id: "viera",
      name: "Condesa Viera",
      emoji: "🌹",
      motive: "Disputa de muchos años por una donación artística que Elsa retiró",
      isKiller: false,
    },
    {
      id: "tomas",
      name: "Mayordomo Tomás",
      emoji: "🫗",
      motive: "Elsa iba a jubilarlo a la fuerza tras 20 años de servicio",
      isKiller: false,
    },
    {
      id: "camila",
      name: "Camila Drumond",
      emoji: "👑",
      motive: "Conflicto con la abuela por el control de la fundación",
      isKiller: false,
    },
    {
      id: "angela",
      name: "Secretaria Ángela",
      emoji: "📋",
      motive: "Desconocido",
      isKiller: false,
    },
    {
      id: "beatons",
      name: "Arch. Beatons",
      emoji: "🏛️",
      motive: "Elsa canceló un encargo arquitectónico millonario",
      isKiller: false,
    },
  ],
  killerId: "castex",
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────
export const DETECTIVE_PUZZLES: DetectivePuzzle[] = [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10];

export function getDetectivePuzzle(id: string): DetectivePuzzle | undefined {
  return DETECTIVE_PUZZLES.find((p) => p.id === id);
}
