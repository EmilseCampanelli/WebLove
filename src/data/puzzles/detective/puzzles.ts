import { DetectivePuzzle } from "./types";

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
  solutionExplanation: "La señora Vail mintió sobre estar en el vagón comedor — el mozo no la vio en toda la noche. Sus huellas húmedas en el pasillo coinciden con el camino desde su compartimento hasta el del señor Damas. El motivo: él iba a revelar su deuda de juego.",
  victim: { name: "Sr. Damas", emoji: "🎩", role: "Banquero en retiro" },
  keyClue: "Las huellas húmedas + la ausencia en el vagón comedor",
  tabs: [
    {
      id: "informe", label: "Informe", emoji: "📋",
      content: [
        "VÍCTIMA: Sr. Damas, 67 años, banquero retirado.",
        "CAUSA DE MUERTE: Envenenamiento por ingestión.",
        "HORA ESTIMADA: Entre las 21:00 y las 22:30.",
        "LUGAR: Compartimento 7, Vagón A, Expreso del Norte.",
        "OBSERVACIONES: El pasillo entre los compartimentos 5 y 7 presentaba humedad en el piso. El tren no realizó paradas.",
      ],
    },
    {
      id: "testimonios", label: "Testimonios", emoji: "🗣️",
      content: [
        'SRA. VAIL (Comp. 5): "Cené en el vagón comedor entre las 21:00 y las 22:00. Volví directamente a mi compartimento."',
        'DR. FENWICK (Comp. 6): "Estuve en mi compartimento toda la noche. Escuché el tren pero nada inusual."',
        'CONDE LASZLO (Comp. 8): "Me dormí antes de las 21:00. Me despertó el escándalo a la medianoche."',
        'MOZO DEL VAGÓN COMEDOR: "El vagón comedor cerró a las 22:00. Esa noche solo atendí a dos personas. La señora del 5 no estaba entre ellas."',
      ],
    },
    {
      id: "evidencias", label: "Evidencias", emoji: "🔍",
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
    { id: "vail", name: "Sra. Vail", emoji: "💍", motive: "Deuda de $80.000 que el Sr. Damas iba a reclamar públicamente", isKiller: true },
    { id: "fenwick", name: "Dr. Fenwick", emoji: "🩺", motive: "Posible rivalidad profesional — sin confirmar", isKiller: false },
    { id: "laszlo", name: "Conde Laszlo", emoji: "👑", motive: "Desconocido", isKiller: false },
  ],
  killerId: "vail",
};

const d2: DetectivePuzzle = {
  id: "detective-medio-01",
  category: "detective",
  title: "El cuadro robado",
  description: "Un cuadro desaparece, el dueño aparece muerto. El expediente tiene cuatro secciones.",
  difficulty: "medio",
  estimatedMinutes: 15,
  story: "Galería Ferrante, medianoche. El propietario Marcus Ferrante fue hallado muerto y su obra más valiosa — 'La cazadora' de Mirabel — había desaparecido. Cuatro personas tenían acceso.",
  instructions: "Revisá el expediente completo. Marcá las pistas clave. Acusá al culpable.",
  hints: [
    { level: 1, text: "El sistema de alarma fue desactivado con el código. Solo tres personas lo conocían." },
    { level: 2, text: "El código fue ingresado a las 23:47. Cruzá eso con los testimonios de dónde estaba cada uno." },
    { level: 3, text: "Solo Nora estaba sola en ese horario sin testigos. Y el cuadro reapareció en su depósito." },
  ],
  solutionExplanation: "Nora desactivó la alarma a las 23:47, mató a Marcus en la confrontación y se llevó el cuadro, que reapareció en su depósito personal semanas después. Era la única sin coartada en ese momento exacto.",
  victim: { name: "Marcus Ferrante", emoji: "🖼️", role: "Galerista" },
  keyClue: "Alarma desactivada a las 23:47 + cuadro en depósito de Nora",
  tabs: [
    {
      id: "informe", label: "Informe", emoji: "📋",
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
      id: "testimonios", label: "Testimonios", emoji: "🗣️",
      content: [
        'NORA (socia de Marcus): "Estaba en casa, dormida. Me enteré a la mañana siguiente." — Sin testigos.',
        'RESTAURADOR FELIX: "Estaba en el taller hasta las 23:00. Mi asistente puede confirmarlo."',
        'COMPRADORA PETRA: "Estuve en la cena de la Asociación de Arte hasta las 01:00. Hay 40 testigos."',
        'SEGURIDAD HASSAN: "Hice mi ronda a las 22:00. Todo normal. Me retiré a las 22:30 como indica mi turno."',
      ],
    },
    {
      id: "evidencias", label: "Evidencias", emoji: "🔍",
      content: [
        "Código de alarma: conocido solo por Marcus, Nora y el restaurador Felix.",
        "Registro de acceso: alarma desactivada a las 23:47 desde el panel interior.",
        "Fibra de tela roja encontrada en el marco vacío. Nora tenía un tapado rojo ese día.",
        "El cuadro fue hallado 3 semanas después en el depósito personal de Nora.",
        "Felix fue visto saliendo del edificio a las 23:05 por la cámara exterior.",
      ],
    },
    {
      id: "cronologia", label: "Cronología", emoji: "⏱️",
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
    { id: "nora", name: "Nora", emoji: "👠", motive: "Marcus iba a vender la galería sin consultarla — perdía todo lo que había construido", isKiller: true },
    { id: "felix", name: "Restaurador Felix", emoji: "🎨", motive: "Disputa de honorarios no pagados", isKiller: false },
    { id: "petra", name: "Compradora Petra", emoji: "💎", motive: "Marcus le vendió un cuadro falso", isKiller: false },
    { id: "hassan", name: "Seguridad Hassan", emoji: "🛡️", motive: "Desconocido", isKiller: false },
  ],
  killerId: "nora",
};

const d3: DetectivePuzzle = {
  id: "detective-dificil-01",
  category: "detective",
  title: "La cumbre del embajador",
  description: "Un cuerpo en una cumbre diplomática. Cinco sospechosos con acceso. Un solo expediente con cuatro secciones.",
  difficulty: "dificil",
  estimatedMinutes: 20,
  story: "El embajador Volkov fue hallado muerto en su habitación durante una cumbre diplomática. El hotel estaba con acceso restringido. Cinco personas tenían credenciales activas esa noche.",
  instructions: "Leé todo el expediente. Cruzá testimonios, evidencias y cronología. Acusá al culpable.",
  hints: [
    { level: 1, text: "La llave magnética registra cada acceso. Revisá quién entró a la habitación y cuándo." },
    { level: 2, text: "El registro muestra una entrada a las 23:15 con la credencial de alguien que dice estar en otro piso." },
    { level: 3, text: "La credencial de la intérprete Anya fue usada para entrar a la habitación 412 a las 23:15. Ella dice estar en la terraza." },
  ],
  solutionExplanation: "La intérprete Anya usó su credencial para entrar a la habitación del embajador a las 23:15. Ella era agente doble y el embajador había descubierto su identidad real. El registro de la llave magnética la delata con precisión.",
  victim: { name: "Embajador Volkov", emoji: "🎖️", role: "Embajador" },
  keyClue: "Registro de llave magnética 23:15 + credencial de Anya",
  tabs: [
    {
      id: "informe", label: "Informe", emoji: "📋",
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
      id: "testimonios", label: "Testimonios", emoji: "🗣️",
      content: [
        'INTÉRPRETE ANYA: "Estuve en la terraza del piso 6 desde las 22:30 hasta medianoche. Hay otros en la foto grupal." — La foto tiene timestamp: 22:55.',
        'ASESOR BRENNAN: "En mi habitación (piso 3) toda la noche. Pedí room service a las 23:00."',
        'TRADUCTORA MILA: "En la reunión informal del salón B hasta las 23:30. Hay 8 testigos."',
        'JEFE DE SEGURIDAD RUBEN: "Haciendo rondas. Tengo registro GPS de mi credencial."',
        'ASISTENTE IGOR: "Dormido desde las 22:00. Tomé un somnífero."',
      ],
    },
    {
      id: "evidencias", label: "Evidencias", emoji: "🔍",
      content: [
        "Registro llave magnética hab. 412: entrada a las 23:15 con credencial de ANYA KOVAL.",
        "La foto grupal en la terraza tiene timestamp 22:55 — pero no cubre las 23:15.",
        "Fibra de tela azul marino en la ventana de la habitación (Anya vestía azul marino).",
        "Credencial de Anya: registro GPS muestra movimiento hacia el piso 4 a las 23:10.",
        "El embajador tenía en su cámara fotos de documentos que comprometían a un agente doble.",
      ],
    },
    {
      id: "cronologia", label: "Cronología", emoji: "⏱️",
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
    { id: "anya", name: "Intérprete Anya", emoji: "🌐", motive: "El embajador descubrió que era agente doble — su carrera y libertad dependían de silenciarlo", isKiller: true },
    { id: "brennan", name: "Asesor Brennan", emoji: "💼", motive: "Disputa de territorios diplomáticos", isKiller: false },
    { id: "mila", name: "Traductora Mila", emoji: "📖", motive: "Desconocido", isKiller: false },
    { id: "ruben", name: "Jefe de Seg. Ruben", emoji: "🛡️", motive: "Desconocido", isKiller: false },
    { id: "igor", name: "Asistente Igor", emoji: "🗂️", motive: "Desconocido", isKiller: false },
  ],
  killerId: "anya",
};

export const DETECTIVE_PUZZLES: DetectivePuzzle[] = [d1, d2, d3];
export function getDetectivePuzzle(id: string) {
  return DETECTIVE_PUZZLES.find((p) => p.id === id);
}
