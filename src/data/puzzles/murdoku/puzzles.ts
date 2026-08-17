import { MurdokuPuzzle } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// FÁCIL 01 — La herencia del Barón (3×3, 4 suspects)
// Grid layout (row × col):
//   [0,0] Recibidor  [0,1] Salón      [0,2] Biblioteca
//   [1,0] Cocina     [1,1] Comedor    [1,2] Estudio  ← victim
//   [2,0] Jardín     [2,1] Sótano     [2,2] Garaje
// Killer: Notaria Blum → Estudio (r1,c2)
// ─────────────────────────────────────────────────────────────────────────────
const heredero: MurdokuPuzzle = {
  id: "murdoku-facil-01",
  category: "murdoku",
  title: "La herencia del Barón",
  description:
    "Alguien envenenó al Barón Escarlata en su propia mansión. Cuatro sospechosos. Una sola habitación con el cuerpo.",
  difficulty: "facil",
  estimatedMinutes: 8,
  story:
    "El Barón Escarlata apareció muerto en su estudio la mañana del lunes. Su testamento —que cambia todo— iba a leerse esa tarde. Cuatro personas estaban en la mansión esa noche. Ubicá a cada uno según las pistas y encontrá quién compartió la habitación con él.",
  instructions:
    "Seleccioná un sospechoso y luego tocá la habitación donde estaba. Usá las pistas de cada personaje. El asesino es quien estaba en la misma habitación que la víctima.",
  hints: [
    {
      level: 1,
      text: "Arcadio nunca sale de la zona de servicios. La cocina es su territorio.",
    },
    {
      level: 2,
      text: "Vera llegó corriendo desde el ala este del piso superior cuando escuchó el grito. Eso la ubica lejos del estudio.",
    },
    {
      level: 3,
      text: "La Notaria tenía que firmar documentos esa noche. Los documentos estaban en el estudio.",
    },
  ],
  solutionExplanation:
    "La Notaria Blum estaba en el Estudio con el Barón. Su pista decía que estaba al este del Comedor —eso es exactamente el Estudio. Tenía motivo: el testamento la dejaba fuera de la herencia.",
  victim: {
    name: "Barón Escarlata",
    emoji: "🎩",
    role: "El anfitrión",
    roomId: "estudio",
  },
  gridCols: 3,
  gridRows: 3,
  rooms: [
    { id: "recibidor", name: "Recibidor", emoji: "🚪", row: 0, col: 0 },
    { id: "salon", name: "Salón", emoji: "🛋️", row: 0, col: 1 },
    { id: "biblioteca", name: "Biblioteca", emoji: "📚", row: 0, col: 2 },
    { id: "cocina", name: "Cocina", emoji: "🍳", row: 1, col: 0 },
    { id: "comedor", name: "Comedor", emoji: "🍽️", row: 1, col: 1 },
    { id: "estudio", name: "Estudio", emoji: "🖋️", row: 1, col: 2 },
    { id: "jardin", name: "Jardín", emoji: "🌿", row: 2, col: 0 },
    { id: "sotano", name: "Sótano", emoji: "🔦", row: 2, col: 1 },
    { id: "garaje", name: "Garaje", emoji: "🚗", row: 2, col: 2 },
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

// ─────────────────────────────────────────────────────────────────────────────
// FÁCIL 02 — El tren de medianoche (3×3, 4 suspects)
// Grid layout:
//   [0,0] Vagón 1    [0,1] Vagón 2    [0,2] Vagón 3
//   [1,0] Comedor    [1,1] Bar        [1,2] Camarote A  ← victim
//   [2,0] Camarote B [2,1] Baño       [2,2] Locomotora
// Killer: Giulia → Camarote A (r1,c2)
// ─────────────────────────────────────────────────────────────────────────────
const trenmedianoche: MurdokuPuzzle = {
  id: "murdoku-facil-02",
  category: "murdoku",
  title: "El tren de medianoche",
  description:
    "El Conde Ferretti apareció muerto en su camarote mientras el tren cruzaba la pampa. Cuatro pasajeros. Una sola culpable.",
  difficulty: "facil",
  estimatedMinutes: 8,
  story:
    "El Expreso del Sur avanzaba en la oscuridad cuando el revisor encontró al Conde Ferretti sin vida en el Camarote A. El tren no había hecho ninguna parada. Los cuatro pasajeros estaban a bordo toda la noche. Uno de ellos nunca salió de ese camarote.",
  instructions:
    "Seleccioná un sospechoso y luego tocá la habitación donde estaba. Usá las pistas de cada personaje. El asesino es quien estaba en la misma habitación que la víctima.",
  hints: [
    {
      level: 1,
      text: "Petra era la maquinista. Solo ella podía estar en la Locomotora.",
    },
    {
      level: 2,
      text: "Raúl declaró que cenó solo en el extremo oeste de la fila central. El Comedor queda justo ahí.",
    },
    {
      level: 3,
      text: "Giulia dijo que fue a llevarle el vino al Conde. El Camarote A es el extremo este de la fila central.",
    },
  ],
  solutionExplanation:
    "Giulia estaba en el Camarote A con el Conde Ferretti. Llevó el vino envenenado y no volvió a salir hasta que el Conde murió. Su pista la ubicaba en el extremo este de la fila central, que es exactamente el Camarote A.",
  victim: {
    name: "Conde Ferretti",
    emoji: "🎩",
    role: "El pasajero distinguido",
    roomId: "camarote-a",
  },
  gridCols: 3,
  gridRows: 3,
  rooms: [
    { id: "vagon-1", name: "Vagón 1", emoji: "🚃", row: 0, col: 0 },
    { id: "vagon-2", name: "Vagón 2", emoji: "🚃", row: 0, col: 1 },
    { id: "vagon-3", name: "Vagón 3", emoji: "🚃", row: 0, col: 2 },
    { id: "comedor", name: "Comedor", emoji: "🍽️", row: 1, col: 0 },
    { id: "bar", name: "Bar", emoji: "🍸", row: 1, col: 1 },
    { id: "camarote-a", name: "Camarote A", emoji: "🛏️", row: 1, col: 2 },
    { id: "camarote-b", name: "Camarote B", emoji: "🛏️", row: 2, col: 0 },
    { id: "bano", name: "Baño", emoji: "🚿", row: 2, col: 1 },
    { id: "locomotora", name: "Locomotora", emoji: "🚂", row: 2, col: 2 },
  ],
  suspects: [
    {
      id: "giulia",
      name: "Giulia",
      role: "La acompañante",
      emoji: "🌹",
      clue: "Llevaba el vino al Conde. Estaba en el extremo este de la fila central del tren.",
      roomId: "camarote-a",
    },
    {
      id: "raul",
      name: "Raúl",
      role: "El viajante de comercio",
      emoji: "💼",
      clue: "Cenó solo en la fila central, extremo oeste, toda la noche.",
      roomId: "comedor",
    },
    {
      id: "petra",
      name: "Petra",
      role: "La maquinista",
      emoji: "🦺",
      clue: "Conducía el tren. Nunca abandonó el extremo sureste del convoy.",
      roomId: "locomotora",
    },
    {
      id: "nando",
      name: "Nando",
      role: "El revisor",
      emoji: "🎫",
      clue: "Pasó toda la noche revisando los vagones superiores. Empezó por el extremo noroeste.",
      roomId: "vagon-1",
    },
  ],
  killerId: "giulia",
};

// ─────────────────────────────────────────────────────────────────────────────
// FÁCIL 03 — La hacienda San Marcos (3×3, 3 suspects)
// Grid layout:
//   [0,0] Entrada    [0,1] Patio      [0,2] Capilla
//   [1,0] Cocina     [1,1] Sala       [1,2] Dormitorio  ← victim
//   [2,0] Galería    [2,1] Establo    [2,2] Pozo
// Killer: Cocinera Luisa → Dormitorio (r1,c2)
// ─────────────────────────────────────────────────────────────────────────────
const hacienda: MurdokuPuzzle = {
  id: "murdoku-facil-03",
  category: "murdoku",
  title: "La hacienda San Marcos",
  description:
    "Don Marcos apareció muerto en su dormitorio. Solo había tres personas en la hacienda esa noche. ¿Quién entró al cuarto?",
  difficulty: "facil",
  estimatedMinutes: 7,
  story:
    "La hacienda San Marcos amaneció en silencio. Don Marcos, el viejo terrateniente, fue encontrado muerto en su cama. Tres personas vivían en la propiedad: la cocinera, el gaucho y el padre del pueblo. Uno de ellos no durmió solo esa noche.",
  instructions:
    "Seleccioná un sospechoso y luego tocá la habitación donde estaba. Solo hay tres sospechosos. El asesino es quien estaba en la misma habitación que la víctima.",
  hints: [
    {
      level: 1,
      text: "El Padre Anselmo no duerme en la hacienda. Pasa las noches en la Capilla.",
    },
    {
      level: 2,
      text: "El Gaucho Ignacio cuida los caballos de noche. Nunca abandona el Establo.",
    },
    {
      level: 3,
      text: "La cocinera Luisa llevaba la cena al patrón cada noche. El Dormitorio queda al este de la Sala.",
    },
  ],
  solutionExplanation:
    "La Cocinera Luisa estaba en el Dormitorio con Don Marcos. Padre Anselmo estaba en la Capilla y el Gaucho en el Establo. Luisa había sido despedida ese mismo día y fue a 'llevar la última cena'. Mezcló veneno en la comida.",
  victim: {
    name: "Don Marcos",
    emoji: "👴",
    role: "El terrateniente",
    roomId: "dormitorio",
  },
  gridCols: 3,
  gridRows: 3,
  rooms: [
    { id: "entrada", name: "Entrada", emoji: "🚪", row: 0, col: 0 },
    { id: "patio", name: "Patio", emoji: "🌿", row: 0, col: 1 },
    { id: "capilla", name: "Capilla", emoji: "⛪", row: 0, col: 2 },
    { id: "cocina", name: "Cocina", emoji: "🍳", row: 1, col: 0 },
    { id: "sala", name: "Sala", emoji: "🛋️", row: 1, col: 1 },
    { id: "dormitorio", name: "Dormitorio", emoji: "🛏️", row: 1, col: 2 },
    { id: "galeria", name: "Galería", emoji: "🖼️", row: 2, col: 0 },
    { id: "establo", name: "Establo", emoji: "🐎", row: 2, col: 1 },
    { id: "pozo", name: "Pozo", emoji: "🪣", row: 2, col: 2 },
  ],
  suspects: [
    {
      id: "luisa",
      name: "Cocinera Luisa",
      role: "La cocinera",
      emoji: "👩‍🍳",
      clue: "Llevaba la cena al patrón. Estaba al este de la Sala, en la fila central.",
      roomId: "dormitorio",
    },
    {
      id: "anselmo",
      name: "Padre Anselmo",
      role: "El cura",
      emoji: "✝️",
      clue: "Rezaba toda la noche en el extremo noreste de la hacienda.",
      roomId: "capilla",
    },
    {
      id: "ignacio",
      name: "Gaucho Ignacio",
      role: "El capataz",
      emoji: "🤠",
      clue: "Cuidaba los caballos en el centro de la fila sur.",
      roomId: "establo",
    },
  ],
  killerId: "luisa",
};

// ─────────────────────────────────────────────────────────────────────────────
// MEDIO 01 — El hotel Pavone (4×3, 6 suspects)
// Grid layout:
//   [0,0] Lobby        [0,1] Bar         [0,2] Restaurante  [0,3] Terraza
//   [1,0] Recepción    [1,1] Escalera    [1,2] Suite Pavone [1,3] Balcón
//   [2,0] Lavandería   [2,1] Bodega      [2,2] Sala Técnica [2,3] Garaje
// Killer: Inspector Mora → Suite Pavone (r1,c2)
// ─────────────────────────────────────────────────────────────────────────────
const hotelpavone: MurdokuPuzzle = {
  id: "murdoku-medio-01",
  category: "murdoku",
  title: "El hotel Pavone",
  description:
    "La dueña del hotel apareció muerta en su propia suite. Seis personas en el edificio. El asesino estaba en la misma habitación.",
  difficulty: "medio",
  estimatedMinutes: 14,
  story:
    "Señorita Pavone, heredera y directora del Hotel Pavone, fue hallada sin vida en su suite privada. La noche anterior había enviado notas a varios huéspedes y empleados. Alguien respondió a esa cita... y no salió con las manos limpias.",
  instructions:
    "Seleccioná un sospechoso y luego tocá la habitación donde estaba. Cruzá las pistas. El asesino compartió la habitación con la víctima.",
  hints: [
    {
      level: 1,
      text: "Dino nunca abandona la recepción. Es parte de su contrato.",
    },
    {
      level: 2,
      text: "Matteo declaró que estuvo en la misma columna que la suite, pero en el piso de los clientes, no en el de servicio.",
    },
    {
      level: 3,
      text: "El Inspector recibió una nota manuscrita de la Señorita pidiéndole que subiera. Él obedeció.",
    },
  ],
  solutionExplanation:
    "El Inspector Mora subió a la Suite Pavone respondiendo a la nota de la víctima. Su pista eliminaba el lobby y la terraza, y lo situaba donde ella lo había citado. Tenía un expediente comprometedor que ella amenazaba con publicar.",
  victim: {
    name: "Señorita Pavone",
    emoji: "🌹",
    role: "La anfitriona",
    roomId: "suite-pavone",
  },
  gridCols: 4,
  gridRows: 3,
  rooms: [
    { id: "lobby", name: "Lobby", emoji: "🏨", row: 0, col: 0 },
    { id: "bar", name: "Bar", emoji: "🍸", row: 0, col: 1 },
    { id: "restaurante", name: "Restaurante", emoji: "🍝", row: 0, col: 2 },
    { id: "terraza", name: "Terraza", emoji: "🌇", row: 0, col: 3 },
    { id: "recepcion", name: "Recepción", emoji: "🗝️", row: 1, col: 0 },
    { id: "escalera", name: "Escalera", emoji: "🪜", row: 1, col: 1 },
    { id: "suite-pavone", name: "Suite Pavone", emoji: "👑", row: 1, col: 2 },
    { id: "balcon", name: "Balcón", emoji: "🌙", row: 1, col: 3 },
    { id: "lavanderia", name: "Lavandería", emoji: "🧺", row: 2, col: 0 },
    { id: "bodega", name: "Bodega", emoji: "🍷", row: 2, col: 1 },
    { id: "sala-tecnica", name: "Sala Técnica", emoji: "🔧", row: 2, col: 2 },
    { id: "garaje", name: "Garaje", emoji: "🚗", row: 2, col: 3 },
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
      clue: "Estaba en el piso superior de huéspedes, en la misma columna que la Suite, pero en la fila de los clientes. No bajó al servicio.",
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

// ─────────────────────────────────────────────────────────────────────────────
// MEDIO 02 — El castillo de los Vega (4×3, 6 suspects)
// Grid layout:
//   [0,0] Torre Norte  [0,1] Almenas    [0,2] Capilla    [0,3] Torre Sur
//   [1,0] Salón Trono  [1,1] Sala Armas [1,2] Mazmorra   [1,3] Bodega
//   [2,0] Cocina       [2,1] Cuadras    [2,2] Foso       [2,3] Armería
// Killer: El Herrero → Mazmorra (r1,c2)
// ─────────────────────────────────────────────────────────────────────────────
const castillovega: MurdokuPuzzle = {
  id: "murdoku-medio-02",
  category: "murdoku",
  title: "El castillo de los Vega",
  description:
    "Lord Vega fue encontrado muerto en la mazmorra de su propio castillo. Seis sospechosos. Solo uno bajó allí esa noche.",
  difficulty: "medio",
  estimatedMinutes: 14,
  story:
    "La noche del solsticio, Lord Vega convocó a sus vasallos al castillo para leer el nuevo mapa de tierras. Antes del amanecer, fue hallado sin vida en la Mazmorra —un lugar al que solo ciertos empleados tenían acceso. Las pistas apuntan a alguien que conocía los pasajes secretos.",
  instructions:
    "Seleccioná un sospechoso y luego tocá la habitación donde estaba. Cruzá las pistas de los seis sospechosos. El asesino compartió la mazmorra con la víctima.",
  hints: [
    {
      level: 1,
      text: "La Condesa jamás baja de las torres. Esa noche estaba en el extremo noroeste del castillo.",
    },
    {
      level: 2,
      text: "El Escudero custodiaba las reservas de vino en la fila central, al este de la Mazmorra.",
    },
    {
      level: 3,
      text: "El Herrero era el único con llave a la Mazmorra. Su pista lo ubica en la fila central, segunda columna desde la derecha.",
    },
  ],
  solutionExplanation:
    "El Herrero estaba en la Mazmorra con Lord Vega. Era el único que tenía acceso a ese nivel del castillo. El nuevo mapa de tierras lo dejaba sin su taller, y decidió actuar antes de que se firmara el documento.",
  victim: {
    name: "Lord Vega",
    emoji: "⚜️",
    role: "El señor feudal",
    roomId: "mazmorra",
  },
  gridCols: 4,
  gridRows: 3,
  rooms: [
    { id: "torre-norte", name: "Torre Norte", emoji: "🗼", row: 0, col: 0 },
    { id: "almenas", name: "Almenas", emoji: "🏰", row: 0, col: 1 },
    { id: "capilla", name: "Capilla", emoji: "⛪", row: 0, col: 2 },
    { id: "torre-sur", name: "Torre Sur", emoji: "🗼", row: 0, col: 3 },
    { id: "salon-trono", name: "Salón del Trono", emoji: "👑", row: 1, col: 0 },
    { id: "sala-armas", name: "Sala de Armas", emoji: "⚔️", row: 1, col: 1 },
    { id: "mazmorra", name: "Mazmorra", emoji: "🔒", row: 1, col: 2 },
    { id: "bodega", name: "Bodega", emoji: "🍷", row: 1, col: 3 },
    { id: "cocina", name: "Cocina", emoji: "🍳", row: 2, col: 0 },
    { id: "cuadras", name: "Cuadras", emoji: "🐎", row: 2, col: 1 },
    { id: "foso", name: "Foso", emoji: "🌊", row: 2, col: 2 },
    { id: "armeria", name: "Armería", emoji: "🛡️", row: 2, col: 3 },
  ],
  suspects: [
    {
      id: "herrero",
      name: "El Herrero",
      role: "El artesano",
      emoji: "🔨",
      clue: "Tenía llave a los pisos inferiores. Estaba en la fila central, segunda columna desde la derecha.",
      roomId: "mazmorra",
    },
    {
      id: "condesa",
      name: "La Condesa",
      role: "La noble",
      emoji: "👸",
      clue: "Jamás baja al nivel de los sirvientes. Estaba en el extremo noroeste del castillo.",
      roomId: "torre-norte",
    },
    {
      id: "bufon",
      name: "El Bufón",
      role: "El juglar",
      emoji: "🃏",
      clue: "Entretenía en la fila superior del castillo, segunda columna desde el oeste.",
      roomId: "almenas",
    },
    {
      id: "sor-beatriz",
      name: "Sor Beatriz",
      role: "La monja",
      emoji: "✝️",
      clue: "Oraba en la fila superior, tercera columna desde el oeste.",
      roomId: "capilla",
    },
    {
      id: "escudero",
      name: "El Escudero",
      role: "El guardián",
      emoji: "🗡️",
      clue: "Custodiaba las reservas en la fila central, extremo este.",
      roomId: "bodega",
    },
    {
      id: "cocinero",
      name: "El Cocinero",
      role: "El maestro de cocina",
      emoji: "👨‍🍳",
      clue: "Preparaba el festín en el extremo suroeste del castillo.",
      roomId: "cocina",
    },
  ],
  killerId: "herrero",
};

// ─────────────────────────────────────────────────────────────────────────────
// MEDIO 03 — El teatro Arlequín (4×3, 5 suspects)
// Grid layout:
//   [0,0] Foyer       [0,1] Platea      [0,2] Palco      [0,3] Galería
//   [1,0] Camerino A  [1,1] Escenario   [1,2] Bambalinas [1,3] Camerino B
//   [2,0] Foso        [2,1] Depósito    [2,2] Sala Téc.  [2,3] Salida Emerg.
// Killer: El Director → Bambalinas (r1,c2)
// ─────────────────────────────────────────────────────────────────────────────
const teatroarlequin: MurdokuPuzzle = {
  id: "murdoku-medio-03",
  category: "murdoku",
  title: "El teatro Arlequín",
  description:
    "La Prima Donna fue hallada muerta entre bambalinas antes del estreno. Cinco personas en el teatro. El asesino estaba con ella.",
  difficulty: "medio",
  estimatedMinutes: 13,
  story:
    "La noche del gran estreno, la Prima Donna Valentina fue encontrada sin vida detrás del escenario. La función nunca comenzó. Había cinco personas en el teatro a esa hora. Alguien apagó su voz para siempre antes de que se abriera el telón.",
  instructions:
    "Seleccioná un sospechoso y luego tocá la habitación donde estaba. El asesino compartía el espacio detrás del escenario con la Prima Donna.",
  hints: [
    {
      level: 1,
      text: "El Violinista nunca abandona el Foso de orquesta antes de la función.",
    },
    {
      level: 2,
      text: "La Maquilladora declaró que estaba en el extremo oeste de la fila central cuando escuchó el grito.",
    },
    {
      level: 3,
      text: "El Director siempre revisa las bambalinas antes del estreno. Estaba al este del Escenario, en la fila central.",
    },
  ],
  solutionExplanation:
    "El Director Leandro estaba en Bambalinas con Valentina. Ella había amenazado con revelar que él falsificaba reseñas de la crítica para mantener la obra en cartelera. Antes del estreno, él fue a 'hacer un último ajuste' y nunca salió solo.",
  victim: {
    name: "Valentina",
    emoji: "🎤",
    role: "La Prima Donna",
    roomId: "bambalinas",
  },
  gridCols: 4,
  gridRows: 3,
  rooms: [
    { id: "foyer", name: "Foyer", emoji: "🎭", row: 0, col: 0 },
    { id: "platea", name: "Platea", emoji: "🪑", row: 0, col: 1 },
    { id: "palco", name: "Palco", emoji: "🎪", row: 0, col: 2 },
    { id: "galeria", name: "Galería", emoji: "🖼️", row: 0, col: 3 },
    { id: "camerino-a", name: "Camerino A", emoji: "💄", row: 1, col: 0 },
    { id: "escenario", name: "Escenario", emoji: "🎬", row: 1, col: 1 },
    { id: "bambalinas", name: "Bambalinas", emoji: "🎭", row: 1, col: 2 },
    { id: "camerino-b", name: "Camerino B", emoji: "🪞", row: 1, col: 3 },
    { id: "foso", name: "Foso", emoji: "🎵", row: 2, col: 0 },
    { id: "deposito", name: "Depósito", emoji: "📦", row: 2, col: 1 },
    { id: "sala-tec", name: "Sala Técnica", emoji: "🔧", row: 2, col: 2 },
    {
      id: "salida-emerg",
      name: "Salida Emerg.",
      emoji: "🚨",
      row: 2,
      col: 3,
    },
  ],
  suspects: [
    {
      id: "director",
      name: "Director Leandro",
      role: "El director de escena",
      emoji: "🎩",
      clue: "Siempre revisa las bambalinas antes del estreno. Estaba al este del Escenario en la fila central.",
      roomId: "bambalinas",
    },
    {
      id: "violinista",
      name: "El Violinista",
      role: "El músico principal",
      emoji: "🎻",
      clue: "Nunca abandona el Foso antes de la función. Estaba en el extremo suroeste del teatro.",
      roomId: "foso",
    },
    {
      id: "maquilladora",
      name: "La Maquilladora",
      role: "La estilista",
      emoji: "💅",
      clue: "Estaba en el extremo oeste de la fila central cuando escuchó el grito.",
      roomId: "camerino-a",
    },
    {
      id: "apuntador",
      name: "El Apuntador",
      role: "El prompter",
      emoji: "📖",
      clue: "Seguía el libreto desde la sala de butacas, en la fila superior, segunda columna.",
      roomId: "platea",
    },
    {
      id: "tecnico",
      name: "El Técnico",
      role: "El iluminador",
      emoji: "💡",
      clue: "Manejaba las luces desde la planta baja, tercera columna desde el oeste.",
      roomId: "sala-tec",
    },
  ],
  killerId: "director",
};

// ─────────────────────────────────────────────────────────────────────────────
// DIFÍCIL 01 — El crucero Belladonna (5×3, 2 celdas bloqueadas, 7 suspects)
// Grid layout:
//   [0,0] Cubierta   [0,1] Proa     [0,2] BLOCKED    [0,3] Popa     [0,4] Antena
//   [1,0] Cabina A   [1,1] Comedor  [1,2] Cocina      [1,3] Sala Juegos [1,4] Cabina B ← victim
//   [2,0] Sala Máq.  [2,1] Bodega   [2,2] Lavandería  [2,3] Sala Conf. [2,4] BLOCKED
// Killer: Sommelier Kranz → Cabina B (r1,c4)
// ─────────────────────────────────────────────────────────────────────────────
const belladonna: MurdokuPuzzle = {
  id: "murdoku-dificil-01",
  category: "murdoku",
  title: "El crucero Belladonna",
  description:
    "En alta mar, nadie puede escapar. Madame Loretta apareció muerta en su camarote. Siete sospechosos. Un solo culpable.",
  difficulty: "dificil",
  estimatedMinutes: 20,
  story:
    "El crucero Belladonna navegaba en aguas internacionales cuando Madame Loretta fue hallada sin vida en su Cabina B. El barco quedó sin comunicaciones. Entre los siete pasajeros y tripulantes a bordo hay un asesino. Las pistas están en sus propias declaraciones.",
  instructions:
    "Seleccioná un sospechoso y tocá la habitación donde estaba. Dos celdas del barco están fuera de servicio (bloqueadas). El asesino estaba en la misma cabina que la víctima.",
  hints: [
    {
      level: 1,
      text: "Roig declaró que estaba monitoreando las antenas de comunicación. Hay una sola antena en el barco.",
    },
    {
      level: 2,
      text: "Kranz dijo que no estaba en cubierta y que no tenía acceso a los equipos de navegación. Solo la Sala de Máquinas tiene esos equipos. Estaba en el extremo este.",
    },
    {
      level: 3,
      text: "En el extremo este del barco, en la fila del medio, hay una sola habitación operativa. La celda [1,4] es Cabina B.",
    },
  ],
  solutionExplanation:
    "El Sommelier Kranz estaba en Cabina B con Madame Loretta. Su pista lo excluía de Cubierta (fila 0), de la Sala de Máquinas (r2,c0) y lo situaba en el extremo este. La única celda operativa al este en la fila del medio es Cabina B (r1,c4). Kranz había sido contratado por la víctima y descubierto robando del cellar privado.",
  victim: {
    name: "Madame Loretta",
    emoji: "💎",
    role: "La dueña del crucero",
    roomId: "cabina-b",
  },
  gridCols: 5,
  gridRows: 3,
  rooms: [
    { id: "cubierta", name: "Cubierta", emoji: "⚓", row: 0, col: 0 },
    { id: "proa", name: "Proa", emoji: "🚢", row: 0, col: 1 },
    { id: "blocked-02", name: "", emoji: "", row: 0, col: 2, blocked: true },
    { id: "popa", name: "Popa", emoji: "🌊", row: 0, col: 3 },
    { id: "antena", name: "Antena", emoji: "📡", row: 0, col: 4 },
    { id: "cabina-a", name: "Cabina A", emoji: "🛏️", row: 1, col: 0 },
    { id: "comedor", name: "Comedor", emoji: "🍽️", row: 1, col: 1 },
    { id: "cocina", name: "Cocina", emoji: "🍳", row: 1, col: 2 },
    { id: "sala-juegos", name: "Sala Juegos", emoji: "🎲", row: 1, col: 3 },
    { id: "cabina-b", name: "Cabina B", emoji: "🔒", row: 1, col: 4 },
    { id: "sala-maq", name: "Sala Máq.", emoji: "⚙️", row: 2, col: 0 },
    { id: "bodega", name: "Bodega", emoji: "🍷", row: 2, col: 1 },
    { id: "lavanderia", name: "Lavandería", emoji: "🧺", row: 2, col: 2 },
    { id: "sala-conf", name: "Sala Conf.", emoji: "📋", row: 2, col: 3 },
    { id: "blocked-24", name: "", emoji: "", row: 2, col: 4, blocked: true },
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

// ─────────────────────────────────────────────────────────────────────────────
// DIFÍCIL 02 — El museo Fénix (5×3, 2 celdas bloqueadas, 7 suspects)
// Grid layout:
//   [0,0] Entrada     [0,1] Sala Greco  [0,2] BLOCKED    [0,3] Sala Egipcia [0,4] Terraza
//   [1,0] Recepción   [1,1] Sala Mod.   [1,2] Sala Cent. [1,3] Sala Clás.   [1,4] Sala Priv.  ← victim
//   [2,0] Depósito    [2,1] Laboratorio [2,2] Archivo    [2,3] Sala Rest.   [2,4] BLOCKED
// Killer: La Curadora → Sala Privada (r1,c4)
// ─────────────────────────────────────────────────────────────────────────────
const museofenix: MurdokuPuzzle = {
  id: "murdoku-dificil-02",
  category: "murdoku",
  title: "El museo Fénix",
  description:
    "El Dr. Fénix fue encontrado muerto en la sala privada del museo. Siete sospechosos. Dos zonas clausuradas. Un solo culpable.",
  difficulty: "dificil",
  estimatedMinutes: 22,
  story:
    "El Dr. Fénix, director del Museo Fénix, fue hallado sin vida en la Sala Privada —restringida al personal de confianza. Esa noche había una exhibición especial. Las dos alas clausuradas por refacciones limitaron los movimientos del personal. Alguien usó ese caos para actuar.",
  instructions:
    "Seleccioná un sospechoso y tocá la habitación donde estaba. Dos celdas están bloqueadas (en refacción). El asesino compartía la Sala Privada con el Dr. Fénix.",
  hints: [
    {
      level: 1,
      text: "El Guardia declaró que vigiló la entrada principal toda la noche. Solo existe una entrada al museo.",
    },
    {
      level: 2,
      text: "La Fotógrafa estaba sacando fotos de la ciudad. La única vista exterior disponible está en el extremo noreste.",
    },
    {
      level: 3,
      text: "La Curadora tenía acceso exclusivo a la Sala Privada. Su tarjeta magnética fue usada a las 23:47. Estaba en el extremo este de la fila central.",
    },
  ],
  solutionExplanation:
    "La Curadora Renata estaba en la Sala Privada con el Dr. Fénix. Solo ella tenía acceso a esa sala. El director había descubierto que ella vendía piezas originales reemplazándolas por réplicas. Antes de que pudiera reportarlo, ella actuó.",
  victim: {
    name: "Dr. Fénix",
    emoji: "🏛️",
    role: "El director del museo",
    roomId: "sala-priv",
  },
  gridCols: 5,
  gridRows: 3,
  rooms: [
    { id: "entrada", name: "Entrada", emoji: "🚪", row: 0, col: 0 },
    { id: "sala-greco", name: "Sala Greco", emoji: "🖼️", row: 0, col: 1 },
    {
      id: "blocked-02",
      name: "",
      emoji: "",
      row: 0,
      col: 2,
      blocked: true,
    },
    { id: "sala-egipcia", name: "Sala Egipcia", emoji: "🏺", row: 0, col: 3 },
    { id: "terraza", name: "Terraza", emoji: "🌆", row: 0, col: 4 },
    { id: "recepcion", name: "Recepción", emoji: "🗝️", row: 1, col: 0 },
    { id: "sala-moderna", name: "Sala Moderna", emoji: "🎨", row: 1, col: 1 },
    { id: "sala-central", name: "Sala Central", emoji: "🏛️", row: 1, col: 2 },
    { id: "sala-clasica", name: "Sala Clásica", emoji: "🗿", row: 1, col: 3 },
    { id: "sala-priv", name: "Sala Privada", emoji: "🔒", row: 1, col: 4 },
    { id: "deposito", name: "Depósito", emoji: "📦", row: 2, col: 0 },
    {
      id: "laboratorio",
      name: "Laboratorio",
      emoji: "🔬",
      row: 2,
      col: 1,
    },
    { id: "archivo", name: "Archivo", emoji: "📁", row: 2, col: 2 },
    {
      id: "sala-rest",
      name: "Sala Restauración",
      emoji: "🖌️",
      row: 2,
      col: 3,
    },
    {
      id: "blocked-24",
      name: "",
      emoji: "",
      row: 2,
      col: 4,
      blocked: true,
    },
  ],
  suspects: [
    {
      id: "curadora",
      name: "Curadora Renata",
      role: "La curadora jefe",
      emoji: "🎓",
      clue: "Tenía acceso exclusivo a la Sala Privada. Estaba en el extremo este de la fila central del museo.",
      roomId: "sala-priv",
    },
    {
      id: "guardia",
      name: "El Guardia",
      role: "El vigilante",
      emoji: "💂",
      clue: "Vigiló la entrada principal toda la noche. Está en el extremo noroeste del museo.",
      roomId: "entrada",
    },
    {
      id: "restauradora",
      name: "La Restauradora",
      role: "La especialista",
      emoji: "🖌️",
      clue: "Trabajaba en la planta baja, en la cuarta columna desde el oeste.",
      roomId: "sala-rest",
    },
    {
      id: "arqueologo",
      name: "El Arqueólogo",
      role: "El investigador",
      emoji: "🪨",
      clue: "Estudiaba piezas en la fila superior, cuarta columna desde el oeste.",
      roomId: "sala-egipcia",
    },
    {
      id: "becario",
      name: "El Becario",
      role: "El asistente",
      emoji: "🧑‍🎓",
      clue: "Analizaba muestras en la planta baja, segunda columna desde el oeste.",
      roomId: "laboratorio",
    },
    {
      id: "fotografa",
      name: "La Fotógrafa",
      role: "La fotógrafa oficial",
      emoji: "📷",
      clue: "Fotografiaba la ciudad desde el extremo noreste del museo.",
      roomId: "terraza",
    },
    {
      id: "vigilante-noc",
      name: "Vigilante Nocturno",
      role: "El guardia nocturno",
      emoji: "🔦",
      clue: "Verificaba el inventario en la planta baja, tercera columna desde el oeste.",
      roomId: "archivo",
    },
  ],
  killerId: "curadora",
};

// ─────────────────────────────────────────────────────────────────────────────
// DIFÍCIL 03 — El chalet de la sierra (5×3, 2 celdas bloqueadas, 6 suspects)
// Grid layout:
//   [0,0] Mirador     [0,1] Terraza     [0,2] BLOCKED    [0,3] Sala Estar  [0,4] Chimenea
//   [1,0] Dormit. 1   [1,1] Baño        [1,2] Pasillo     [1,3] Dormit. 2  [1,4] Estudio   ← victim
//   [2,0] Bodega      [2,1] BLOCKED     [2,2] Cocina      [2,3] Comedor    [2,4] Garaje
// Killer: La Enfermera → Estudio (r1,c4)
// ─────────────────────────────────────────────────────────────────────────────
const chaletserra: MurdokuPuzzle = {
  id: "murdoku-dificil-03",
  category: "murdoku",
  title: "El chalet de la sierra",
  description:
    "El Conde Olavide murió en su estudio durante una tormenta. Seis sospechosos atrapados por la nieve. Un solo culpable.",
  difficulty: "dificil",
  estimatedMinutes: 21,
  story:
    "Una tormenta de nieve aisló el chalet de montaña del Conde Olavide. Sin posibilidad de escapar ni de llamar ayuda, el Conde fue hallado muerto en su Estudio. Seis personas quedaron atrapadas con él. Dos zonas del chalet eran inaccesibles por las obras de refacción. El asesino estaba entre ellos.",
  instructions:
    "Seleccioná un sospechoso y tocá la habitación donde estaba. Dos celdas están bloqueadas (en obras). El asesino estaba en el Estudio con el Conde.",
  hints: [
    {
      level: 1,
      text: "El Guía de montaña declaró que pasó la noche observando la tormenta. Solo el Mirador tiene vista panorámica desde el exterior.",
    },
    {
      level: 2,
      text: "El Chofer estaba con el vehículo. El Garaje es el único lugar donde se guarda el auto, en el extremo sureste.",
    },
    {
      level: 3,
      text: "La Enfermera dijo que 'atendía al paciente'. El Estudio es el extremo este de la fila central, adonde el Conde se retiró esa noche.",
    },
  ],
  solutionExplanation:
    "La Enfermera Mirta estaba en el Estudio con el Conde Olavide. Había falsificado su historial médico para conseguir el empleo y el Conde acababa de descubrirlo. Aprovechó la tormenta y su acceso directo al paciente para actuar.",
  victim: {
    name: "Conde Olavide",
    emoji: "🏔️",
    role: "El anfitrión",
    roomId: "estudio",
  },
  gridCols: 5,
  gridRows: 3,
  rooms: [
    { id: "mirador", name: "Mirador", emoji: "🔭", row: 0, col: 0 },
    { id: "terraza", name: "Terraza", emoji: "❄️", row: 0, col: 1 },
    {
      id: "blocked-02",
      name: "",
      emoji: "",
      row: 0,
      col: 2,
      blocked: true,
    },
    { id: "sala-estar", name: "Sala de Estar", emoji: "🛋️", row: 0, col: 3 },
    { id: "chimenea", name: "Chimenea", emoji: "🔥", row: 0, col: 4 },
    { id: "dormitorio-1", name: "Dormitorio 1", emoji: "🛏️", row: 1, col: 0 },
    { id: "bano", name: "Baño", emoji: "🚿", row: 1, col: 1 },
    { id: "pasillo", name: "Pasillo", emoji: "🚪", row: 1, col: 2 },
    { id: "dormitorio-2", name: "Dormitorio 2", emoji: "🛏️", row: 1, col: 3 },
    { id: "estudio", name: "Estudio", emoji: "📚", row: 1, col: 4 },
    { id: "bodega", name: "Bodega", emoji: "🍷", row: 2, col: 0 },
    {
      id: "blocked-21",
      name: "",
      emoji: "",
      row: 2,
      col: 1,
      blocked: true,
    },
    { id: "cocina", name: "Cocina", emoji: "🍳", row: 2, col: 2 },
    { id: "comedor", name: "Comedor", emoji: "🍽️", row: 2, col: 3 },
    { id: "garaje", name: "Garaje", emoji: "🚗", row: 2, col: 4 },
  ],
  suspects: [
    {
      id: "enfermera",
      name: "Enfermera Mirta",
      role: "La enfermera personal",
      emoji: "👩‍⚕️",
      clue: "Atendía al paciente. Estaba en el extremo este de la fila central del chalet.",
      roomId: "estudio",
    },
    {
      id: "guia",
      name: "El Guía",
      role: "El guía de montaña",
      emoji: "🧗",
      clue: "Observaba la tormenta desde el extremo noroeste, con vista a las cumbres.",
      roomId: "mirador",
    },
    {
      id: "cocinero",
      name: "El Cocinero",
      role: "El chef de montaña",
      emoji: "👨‍🍳",
      clue: "Preparaba la cena en la planta baja, tercera columna desde el oeste.",
      roomId: "cocina",
    },
    {
      id: "secretaria",
      name: "La Secretaria",
      role: "La asistente personal",
      emoji: "📋",
      clue: "Ordenaba documentos en el ala norte, cuarta columna desde el oeste.",
      roomId: "sala-estar",
    },
    {
      id: "chofer",
      name: "El Chofer",
      role: "El conductor",
      emoji: "🚘",
      clue: "Limpiaba la nieve del auto. Estaba en el extremo sureste del chalet.",
      roomId: "garaje",
    },
    {
      id: "ama-llaves",
      name: "El Ama de Llaves",
      role: "La administradora",
      emoji: "🗝️",
      clue: "Guardaba vino en el extremo suroeste, lejos del ruido del chalet.",
      roomId: "bodega",
    },
  ],
  killerId: "enfermera",
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPERTO 01 — El transatlántico Aldebarán (5×4, 3 celdas bloqueadas, 9 suspects)
// Grid layout:
//   [0,0] Cubierta Sol [0,1] Piscina    [0,2] BLOCKED    [0,3] Bar Atlántico [0,4] Mirador
//   [1,0] Cab. Capitán [1,1] Salón Real [1,2] Sala Cartas [1,3] Sala Música  [1,4] Cab. Deluxe
//   [2,0] Cocina       [2,1] Comedor    [2,2] BLOCKED     [2,3] Sala Conf.   [2,4] Enfermería
//   [3,0] Sala Máq.    [3,1] Bodega     [3,2] Lavandería  [3,3] BLOCKED      [3,4] Sala Control
// Victim: Almirante Ruiz en Sala de Música (r1,c3)
// Killer: El Pianista → Sala de Música (r1,c3)
// ─────────────────────────────────────────────────────────────────────────────
const aldebaranexperto: MurdokuPuzzle = {
  id: "murdoku-experto-01",
  category: "murdoku",
  title: "El transatlántico Aldebarán",
  description:
    "El Almirante Ruiz murió durante un concierto privado a bordo. Nueve sospechosos. Tres zonas clausuradas. Un solo asesino.",
  difficulty: "experto",
  estimatedMinutes: 30,
  story:
    "El transatlántico Aldebarán cruzaba el Atlántico cuando el Almirante Ruiz fue hallado muerto en la Sala de Música. Había pedido un concierto privado esa noche. Entre la tripulación y los pasajeros de primera clase había nueve personas. Tres secciones del barco estaban cerradas por mantenimiento, lo que restringió los movimientos de todos.",
  instructions:
    "Seleccioná un sospechoso y tocá la habitación donde estaba. Tres celdas están bloqueadas. Cruzá todas las pistas para determinar quién estaba con el Almirante en la Sala de Música.",
  hints: [
    {
      level: 1,
      text: "El Capitán jamás abandona su cabina de mando durante la navegación nocturna. Su cabina es la primera del ala de oficiales.",
    },
    {
      level: 2,
      text: "La Médica declaró que no se movió de la Enfermería. Está en el extremo este del tercer piso del barco.",
    },
    {
      level: 3,
      text: "El Pianista fue el único convocado a la Sala de Música esa noche. Estaba al este de la Sala de Cartas, en la fila de cabinas de primera clase.",
    },
  ],
  solutionExplanation:
    "El Pianista Dorian estaba en la Sala de Música con el Almirante Ruiz. Fue el único convocado esa noche. El Almirante poseía pruebas de que Dorian había robado partituras de un compositor fallecido y las publicaba como propias. Antes de que llegaran al puerto —donde la justicia lo esperaba— Dorian aprovechó la intimidad del concierto para actuar.",
  victim: {
    name: "Almirante Ruiz",
    emoji: "⚓",
    role: "El pasajero de honor",
    roomId: "sala-musica",
  },
  gridCols: 5,
  gridRows: 4,
  rooms: [
    { id: "cubierta-sol", name: "Cubierta Sol", emoji: "☀️", row: 0, col: 0 },
    { id: "piscina", name: "Piscina", emoji: "🏊", row: 0, col: 1 },
    {
      id: "blocked-02",
      name: "",
      emoji: "",
      row: 0,
      col: 2,
      blocked: true,
    },
    {
      id: "bar-atlantico",
      name: "Bar Atlántico",
      emoji: "🍸",
      row: 0,
      col: 3,
    },
    { id: "mirador", name: "Mirador", emoji: "🔭", row: 0, col: 4 },
    {
      id: "cab-capitan",
      name: "Cab. Capitán",
      emoji: "🎖️",
      row: 1,
      col: 0,
    },
    { id: "salon-real", name: "Salón Real", emoji: "👑", row: 1, col: 1 },
    { id: "sala-cartas", name: "Sala de Cartas", emoji: "🃏", row: 1, col: 2 },
    { id: "sala-musica", name: "Sala de Música", emoji: "🎵", row: 1, col: 3 },
    { id: "cab-deluxe", name: "Cab. Deluxe", emoji: "🛏️", row: 1, col: 4 },
    { id: "cocina", name: "Cocina", emoji: "🍳", row: 2, col: 0 },
    { id: "comedor", name: "Comedor", emoji: "🍽️", row: 2, col: 1 },
    {
      id: "blocked-22",
      name: "",
      emoji: "",
      row: 2,
      col: 2,
      blocked: true,
    },
    { id: "sala-conf", name: "Sala de Conf.", emoji: "📋", row: 2, col: 3 },
    { id: "enfermeria", name: "Enfermería", emoji: "🏥", row: 2, col: 4 },
    { id: "sala-maq", name: "Sala de Máq.", emoji: "⚙️", row: 3, col: 0 },
    { id: "bodega", name: "Bodega", emoji: "🍷", row: 3, col: 1 },
    { id: "lavanderia", name: "Lavandería", emoji: "🧺", row: 3, col: 2 },
    {
      id: "blocked-33",
      name: "",
      emoji: "",
      row: 3,
      col: 3,
      blocked: true,
    },
    {
      id: "sala-control",
      name: "Sala de Control",
      emoji: "🖥️",
      row: 3,
      col: 4,
    },
  ],
  suspects: [
    {
      id: "pianista",
      name: "Pianista Dorian",
      role: "El músico",
      emoji: "🎹",
      clue: "Fue convocado para el concierto privado. Estaba al este de la Sala de Cartas, en la fila de cabinas de primera clase.",
      roomId: "sala-musica",
    },
    {
      id: "capitan",
      name: "El Capitán",
      role: "El comandante",
      emoji: "🚢",
      clue: "Nunca abandona su puesto durante la navegación nocturna. Estaba en el extremo oeste de la fila de cabinas de oficiales.",
      roomId: "cab-capitan",
    },
    {
      id: "chef",
      name: "La Chef",
      role: "La cocinera principal",
      emoji: "👩‍🍳",
      clue: "Preparaba el menú de medianoche en el extremo oeste del tercer piso de servicios.",
      roomId: "cocina",
    },
    {
      id: "mayordomo",
      name: "El Mayordomo",
      role: "El jefe de servicio",
      emoji: "🤵",
      clue: "Servía en la fila de cabinas, segunda posición desde el oeste, al este del Capitán.",
      roomId: "salon-real",
    },
    {
      id: "medica",
      name: "La Médica",
      role: "La médica de abordo",
      emoji: "👩‍⚕️",
      clue: "Nunca se movió de la Enfermería. Está en el extremo este del tercer piso de servicios.",
      roomId: "enfermeria",
    },
    {
      id: "maquinista",
      name: "El Maquinista",
      role: "El jefe de máquinas",
      emoji: "⚙️",
      clue: "Supervisaba los motores en el extremo suroeste del barco.",
      roomId: "sala-maq",
    },
    {
      id: "sommelier",
      name: "La Sommelier",
      role: "La sommelier",
      emoji: "🍾",
      clue: "Seleccionaba botellas en la planta inferior, segunda columna desde el oeste.",
      roomId: "bodega",
    },
    {
      id: "barista",
      name: "El Barista",
      role: "El bartender",
      emoji: "🍹",
      clue: "Preparaba cócteles en la cubierta superior, cuarta columna desde el oeste.",
      roomId: "bar-atlantico",
    },
    {
      id: "asistente",
      name: "La Asistente",
      role: "La oficial de sistemas",
      emoji: "💻",
      clue: "Monitoreaba los sistemas de navegación en el extremo sureste del barco.",
      roomId: "sala-control",
    },
  ],
  killerId: "pianista",
};

export const MURDOKU_PUZZLES: MurdokuPuzzle[] = [
  heredero,
  trenmedianoche,
  hacienda,
  hotelpavone,
  castillovega,
  teatroarlequin,
  belladonna,
  museofenix,
  chaletserra,
  aldebaranexperto,
];

export function getMurdokuPuzzle(id: string): MurdokuPuzzle | undefined {
  return MURDOKU_PUZZLES.find((p) => p.id === id);
}
