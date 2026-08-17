import { MurdokuPuzzle } from "./types";

// FÁCIL — La herencia del Barón (3×3, 4 suspects)
// Grid layout (row × col):
//   [0,0] Recibidor  [0,1] Salón      [0,2] Biblioteca
//   [1,0] Cocina     [1,1] Comedor    [1,2] Estudio  ← victim here
//   [2,0] Jardín     [2,1] Sótano     [2,2] Garaje
// Killer: Notaria Blum → Estudio. Clue: "al este del Comedor" (col+1 from Comedor at r1,c1)

const heredero: MurdokuPuzzle = {
  id: "murdoku-facil-01",
  category: "murdoku",
  title: "La herencia del Barón",
  description: "Alguien envenenó al Barón Escarlata en su propia mansión. Cuatro sospechosos. Una sola habitación con el cuerpo.",
  difficulty: "facil",
  estimatedMinutes: 8,
  story: "El Barón Escarlata apareció muerto en su estudio la mañana del lunes. Su testamento —que cambia todo— iba a leerse esa tarde. Cuatro personas estaban en la mansión esa noche. Ubicá a cada uno según las pistas y encontrá quién compartió la habitación con él.",
  instructions: "Seleccioná un sospechoso y luego tocá la habitación donde estaba. Usá las pistas de cada personaje. El asesino es quien estaba en la misma habitación que la víctima.",
  hints: [
    { level: 1, text: "Arcadio nunca sale de la zona de servicios. La cocina es su territorio." },
    { level: 2, text: "Vera llegó corriendo desde el ala este del piso superior cuando escuchó el grito. Eso la ubica lejos del estudio." },
    { level: 3, text: "La Notaria tenía que firmar documentos esa noche. Los documentos estaban en el estudio." },
  ],
  solutionExplanation: "La Notaria Blum estaba en el Estudio con el Barón. Su pista decía que estaba al este del Comedor —eso es exactamente el Estudio. Tenía motivo: el testamento la dejaba fuera de la herencia.",
  victim: { name: "Barón Escarlata", emoji: "🎩", role: "El anfitrión", roomId: "estudio" },
  gridCols: 3,
  gridRows: 3,
  rooms: [
    { id: "recibidor",  name: "Recibidor",  emoji: "🚪", row: 0, col: 0 },
    { id: "salon",      name: "Salón",      emoji: "🛋️", row: 0, col: 1 },
    { id: "biblioteca", name: "Biblioteca", emoji: "📚", row: 0, col: 2 },
    { id: "cocina",     name: "Cocina",     emoji: "🍳", row: 1, col: 0 },
    { id: "comedor",    name: "Comedor",    emoji: "🍽️", row: 1, col: 1 },
    { id: "estudio",    name: "Estudio",    emoji: "🖋️", row: 1, col: 2 },
    { id: "jardin",     name: "Jardín",     emoji: "🌿", row: 2, col: 0 },
    { id: "sotano",     name: "Sótano",     emoji: "🔦", row: 2, col: 1 },
    { id: "garaje",     name: "Garaje",     emoji: "🚗", row: 2, col: 2 },
  ],
  suspects: [
    {
      id: "blum",
      name: "Notaria Blum",
      role: "La abogada",
      emoji: "💼",
      clue: "Estaba en la habitación al este del Comedor.",
      roomId: "estudio",
    },
    {
      id: "arcadio",
      name: "Arcadio",
      role: "El chef",
      emoji: "👨‍🍳",
      clue: "Nunca abandona su puesto. Estaba en la habitación al norte del Jardín.",
      roomId: "cocina",
    },
    {
      id: "oscar",
      name: "Óscar",
      role: "El sirviente",
      emoji: "🤵",
      clue: "Estaba aireando las plantas en el exterior de la mansión.",
      roomId: "jardin",
    },
    {
      id: "vera",
      name: "Vera",
      role: "La sobrina",
      emoji: "💃",
      clue: "Estaba leyendo en el ala este del piso superior, la habitación más alejada del Recibidor.",
      roomId: "biblioteca",
    },
  ],
  killerId: "blum",
};

// MEDIO — El hotel Pavone (4×3, 6 suspects)
// Grid layout:
//   [0,0] Lobby        [0,1] Bar         [0,2] Restaurante  [0,3] Terraza
//   [1,0] Recepción    [1,1] Escalera    [1,2] Suite Pavone [1,3] Balcón
//   [2,0] Lavandería   [2,1] Bodega      [2,2] Sala Técnica [2,3] Garaje
// Killer: Inspector Mora → Suite Pavone (r1,c2). Clue: "no fue al lobby ni a la terraza, fue adonde la víctima lo citó"

const hotelpavone: MurdokuPuzzle = {
  id: "murdoku-medio-01",
  category: "murdoku",
  title: "El hotel Pavone",
  description: "La dueña del hotel apareció muerta en su propia suite. Seis personas en el edificio. El asesino estaba en la misma habitación.",
  difficulty: "medio",
  estimatedMinutes: 14,
  story: "Señorita Pavone, heredera y directora del Hotel Pavone, fue hallada sin vida en su suite privada. La noche anterior había enviado notas a varios huéspedes y empleados. Alguien respondió a esa cita... y no salió con las manos limpias.",
  instructions: "Seleccioná un sospechoso y luego tocá la habitación donde estaba. Cruzá las pistas. El asesino compartió la habitación con la víctima.",
  hints: [
    { level: 1, text: "Dino nunca abandona la recepción. Es parte de su contrato." },
    { level: 2, text: "Matteo declaró que estuvo en la misma columna que la suite, pero en el piso de los clientes, no en el de servicio." },
    { level: 3, text: "El Inspector recibió una nota manuscrita de la Señorita pidiéndole que subiera. Él obedeció." },
  ],
  solutionExplanation: "El Inspector Mora subió a la Suite Pavone respondiendo a la nota de la víctima. Su pista eliminaba el lobby y la terraza, y lo situaba donde ella lo había citado. Tenía un expediente comprometedor que ella amenazaba con publicar.",
  victim: { name: "Señorita Pavone", emoji: "🌹", role: "La anfitriona", roomId: "suite-pavone" },
  gridCols: 4,
  gridRows: 3,
  rooms: [
    { id: "lobby",        name: "Lobby",        emoji: "🏨", row: 0, col: 0 },
    { id: "bar",          name: "Bar",          emoji: "🍸", row: 0, col: 1 },
    { id: "restaurante",  name: "Restaurante",  emoji: "🍝", row: 0, col: 2 },
    { id: "terraza",      name: "Terraza",      emoji: "🌇", row: 0, col: 3 },
    { id: "recepcion",    name: "Recepción",    emoji: "🗝️", row: 1, col: 0 },
    { id: "escalera",     name: "Escalera",     emoji: "🪜", row: 1, col: 1 },
    { id: "suite-pavone", name: "Suite Pavone", emoji: "👑", row: 1, col: 2 },
    { id: "balcon",       name: "Balcón",       emoji: "🌙", row: 1, col: 3 },
    { id: "lavanderia",   name: "Lavandería",   emoji: "🧺", row: 2, col: 0 },
    { id: "bodega",       name: "Bodega",       emoji: "🍷", row: 2, col: 1 },
    { id: "sala-tecnica", name: "Sala Técnica", emoji: "🔧", row: 2, col: 2 },
    { id: "garaje",       name: "Garaje",       emoji: "🚗", row: 2, col: 3 },
  ],
  suspects: [
    {
      id: "mora",
      name: "Inspector Mora",
      role: "El detective retirado",
      emoji: "🕵️",
      clue: "Recibió una nota de la víctima. No estaba en el lobby ni en la terraza. Fue adonde ella lo citó.",
      roomId: "suite-pavone",
    },
    {
      id: "dino",
      name: "Dino",
      role: "El recepcionista",
      emoji: "🧑‍💼",
      clue: "Nunca abandona su puesto en el piso de entrada, extremo oeste.",
      roomId: "recepcion",
    },
    {
      id: "matteo",
      name: "Matteo",
      role: "El chef",
      emoji: "👨‍🍳",
      clue: "Estaba en el piso superior de huéspedes, en la misma columna que la Suite, pero en la fila de los clientes. No bajo al servicio.",
      roomId: "restaurante",
    },
    {
      id: "sol",
      name: "Sol",
      role: "La camarera",
      emoji: "🧹",
      clue: "Estaba en la planta baja de servicio, en el extremo oeste.",
      roomId: "lavanderia",
    },
    {
      id: "nadia",
      name: "Nadia",
      role: "La bartender",
      emoji: "🍹",
      clue: "Estaba en el piso superior de huéspedes, al oeste del Restaurante.",
      roomId: "bar",
    },
    {
      id: "klaus",
      name: "Klaus",
      role: "El mecánico",
      emoji: "🔩",
      clue: "Estaba en la planta baja de servicio, en el extremo este, lo más alejado posible del Lobby.",
      roomId: "garaje",
    },
  ],
  killerId: "mora",
};

// DIFÍCIL — El crucero Belladonna (5×3, con 2 celdas bloqueadas, 7 suspects)
// Grid layout:
//   [0,0] Cubierta   [0,1] Proa     [0,2] BLOCKED    [0,3] Popa     [0,4] Antena
//   [1,0] Cabina A   [1,1] Comedor  [1,2] Cocina      [1,3] Sala Juegos  [1,4] Cabina B  ← victim
//   [2,0] Sala Máq.  [2,1] Bodega   [2,2] Lavandería  [2,3] Sala Conf.  [2,4] BLOCKED
// Killer: Sommelier Kranz → Cabina B. Clue: "no en cubierta, extremo este, sin acceso a equipos de navegación"

const belladonna: MurdokuPuzzle = {
  id: "murdoku-dificil-01",
  category: "murdoku",
  title: "El crucero Belladonna",
  description: "En alta mar, nadie puede escapar. Madame Loretta apareció muerta en su camarote. Siete sospechosos. Un solo culpable.",
  difficulty: "dificil",
  estimatedMinutes: 20,
  story: "El crucero Belladonna navegaba en aguas internacionales cuando Madame Loretta fue hallada sin vida en su Cabina B. El barco quedó sin comunicaciones. Entre los siete pasajeros y tripulantes a bordo hay un asesino. Las pistas están en sus propias declaraciones.",
  instructions: "Seleccioná un sospechoso y tocá la habitación donde estaba. Dos celdas del barco están fuera de servicio (bloqueadas). El asesino estaba en la misma cabina que la víctima.",
  hints: [
    { level: 1, text: "Roig declaró que estaba monitoreando las antenas de comunicación. Hay una sola antena en el barco." },
    { level: 2, text: "Kranz dijo que no estaba en cubierta y que no tenía acceso a los equipos de navegación. Solo la Sala de Máquinas tiene esos equipos. Estaba en el extremo este." },
    { level: 3, text: "En el extremo este del barco, en la fila del medio, hay una sola habitación operativa. La celda [1,4] es Cabina B." },
  ],
  solutionExplanation: "El Sommelier Kranz estaba en Cabina B con Madame Loretta. Su pista lo excluía de Cubierta (fila 0), de la Sala de Máquinas (r2,c0) y lo situaba en el extremo este. La única celda operativa al este en la fila del medio es Cabina B (r1,c4). Kranz había sido contratado por la víctima y descubierto robando del cellar privado.",
  victim: { name: "Madame Loretta", emoji: "💎", role: "La dueña del crucero", roomId: "cabina-b" },
  gridCols: 5,
  gridRows: 3,
  rooms: [
    { id: "cubierta",    name: "Cubierta",    emoji: "⚓", row: 0, col: 0 },
    { id: "proa",        name: "Proa",        emoji: "🚢", row: 0, col: 1 },
    { id: "blocked-02",  name: "",            emoji: "",  row: 0, col: 2, blocked: true },
    { id: "popa",        name: "Popa",        emoji: "🌊", row: 0, col: 3 },
    { id: "antena",      name: "Antena",      emoji: "📡", row: 0, col: 4 },
    { id: "cabina-a",    name: "Cabina A",    emoji: "🛏️", row: 1, col: 0 },
    { id: "comedor",     name: "Comedor",     emoji: "🍽️", row: 1, col: 1 },
    { id: "cocina",      name: "Cocina",      emoji: "🍳", row: 1, col: 2 },
    { id: "sala-juegos", name: "Sala Juegos", emoji: "🎲", row: 1, col: 3 },
    { id: "cabina-b",    name: "Cabina B",    emoji: "🔒", row: 1, col: 4 },
    { id: "sala-maq",    name: "Sala Máq.",   emoji: "⚙️", row: 2, col: 0 },
    { id: "bodega",      name: "Bodega",      emoji: "🍷", row: 2, col: 1 },
    { id: "lavanderia",  name: "Lavandería",  emoji: "🧺", row: 2, col: 2 },
    { id: "sala-conf",   name: "Sala Conf.",  emoji: "📋", row: 2, col: 3 },
    { id: "blocked-24",  name: "",            emoji: "",  row: 2, col: 4, blocked: true },
  ],
  suspects: [
    {
      id: "kranz",
      name: "Sommelier Kranz",
      role: "El sommelier",
      emoji: "🍾",
      clue: "No estaba en cubierta. Estaba en el extremo este del barco. No tenía acceso a los equipos de navegación.",
      roomId: "cabina-b",
    },
    {
      id: "roig",
      name: "Roig",
      role: "El técnico",
      emoji: "👷",
      clue: "Estaba monitoreando las comunicaciones satelitales en el punto más alto y este del barco.",
      roomId: "antena",
    },
    {
      id: "baba",
      name: "Babá",
      role: "El cocinero",
      emoji: "👨‍🍳",
      clue: "Estaba en el centro exacto de la fila del medio del barco.",
      roomId: "cocina",
    },
    {
      id: "filo",
      name: "Filo",
      role: "El animador",
      emoji: "🎭",
      clue: "Estaba al este de la Cocina, en la misma fila, organizando actividades.",
      roomId: "sala-juegos",
    },
    {
      id: "turco",
      name: "El Turco",
      role: "El pasajero misterioso",
      emoji: "🎩",
      clue: "Estaba en cubierta, en el extremo oeste, exactamente enfrente de la Antena.",
      roomId: "cubierta",
    },
    {
      id: "inge",
      name: "Inge",
      role: "La asistente",
      emoji: "📁",
      clue: "Estaba en la planta de servicio, en el extremo este —la última celda operativa de esa fila.",
      roomId: "sala-conf",
    },
    {
      id: "sven",
      name: "Sven",
      role: "El mecánico",
      emoji: "🔧",
      clue: "Estaba en la planta de servicio, en el extremo oeste, con los motores.",
      roomId: "sala-maq",
    },
  ],
  killerId: "kranz",
};

export const MURDOKU_PUZZLES: MurdokuPuzzle[] = [heredero, hotelpavone, belladonna];

export function getMurdokuPuzzle(id: string): MurdokuPuzzle | undefined {
  return MURDOKU_PUZZLES.find((p) => p.id === id);
}
