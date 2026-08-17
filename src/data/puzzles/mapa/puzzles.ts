import { MapaPuzzle } from "./types";

// ─── FÁCIL-01 ─── Grid 3×3, ruta 4 habitaciones ─── Mansión ───────────────
const m1: MapaPuzzle = {
  id: "mapa-facil-01",
  category: "mapa",
  title: "La ruta del mayordomo",
  description: "Trazá el camino exacto del mayordomo según su declaración.",
  difficulty: "facil",
  estimatedMinutes: 7,
  story:
    "El mayordomo Renato declaró exactamente dónde estuvo cada minuto. Trazá su ruta en el plano para verificar si pudo llegar al estudio sin ser visto.",
  instructions:
    "Tocá las habitaciones en el orden en que las recorrió el sospechoso. La primera y la última ya están marcadas. Completá el camino del medio.",
  routeClue:
    'Renato dice: "Salí del Recibidor, pasé por el Comedor, luego por la Cocina y llegué al Jardín."',
  suspect: { name: "Renato", emoji: "🤵", role: "El mayordomo" },
  gridCols: 3,
  gridRows: 3,
  startRoomId: "recibidor",
  endRoomId: "jardin",
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
  correctRoute: [
    { roomId: "recibidor", order: 1 },
    { roomId: "comedor",   order: 2 },
    { roomId: "cocina",    order: 3 },
    { roomId: "jardin",    order: 4 },
  ],
  hints: [
    { level: 1, text: "Leé la declaración del sospechoso con atención." },
    { level: 2, text: "Las habitaciones se conectan solo con sus vecinas (arriba, abajo, izquierda, derecha)." },
    { level: 3, text: "Trazá la ruta exactamente como la describe el sospechoso, en ese orden." },
  ],
  solutionExplanation:
    "La ruta correcta sigue exactamente la declaración del sospechoso. Si pasa por la habitación de la víctima, está mintiendo.",
};

// ─── FÁCIL-02 ─── Grid 3×3, ruta 4 habitaciones ─── Teatro ────────────────
const m4: MapaPuzzle = {
  id: "mapa-facil-02",
  category: "mapa",
  title: "La actriz en el teatro",
  description: "Valentina dice que no se acercó al Camerino esa noche. Comprobalo.",
  difficulty: "facil",
  estimatedMinutes: 7,
  story:
    "La actriz Valentina Roux fue vista merodeando por el Teatro Imperial la noche del crimen. Declaró una ruta concreta. Si su camino no toca el Camerino de la víctima, podría estar diciendo la verdad.",
  instructions:
    "Trazá la ruta de Valentina según su declaración. Si la ruta pasa por el Camerino, mintió.",
  routeClue:
    'Valentina dice: "Salí de la Entrada, pasé por el Foyer, luego subí al Escenario y me quedé en el Backstage."',
  suspect: { name: "Valentina Roux", emoji: "🎭", role: "La actriz principal" },
  gridCols: 3,
  gridRows: 3,
  startRoomId: "entrada",
  endRoomId: "backstage",
  rooms: [
    { id: "entrada",   name: "Entrada",   emoji: "🚪", row: 0, col: 0 },
    { id: "foyer",     name: "Foyer",     emoji: "🎟️", row: 0, col: 1 },
    { id: "taquilla",  name: "Taquilla",  emoji: "💰", row: 0, col: 2 },
    { id: "pasillo",   name: "Pasillo",   emoji: "🚶", row: 1, col: 0 },
    { id: "escenario", name: "Escenario", emoji: "🎬", row: 1, col: 1 },
    { id: "camerino",  name: "Camerino",  emoji: "💄", row: 1, col: 2 },
    { id: "bodega",    name: "Bodega",    emoji: "📦", row: 2, col: 0 },
    { id: "utileria",  name: "Utilería",  emoji: "🎪", row: 2, col: 1 },
    { id: "backstage", name: "Backstage", emoji: "🎸", row: 2, col: 2 },
  ],
  correctRoute: [
    { roomId: "entrada",   order: 1 },
    { roomId: "foyer",     order: 2 },
    { roomId: "escenario", order: 3 },
    { roomId: "backstage", order: 4 },
  ],
  hints: [
    { level: 1, text: "Leé la declaración de Valentina con atención." },
    { level: 2, text: "Las habitaciones se conectan solo con sus vecinas (arriba, abajo, izquierda, derecha)." },
    { level: 3, text: "Foyer está en fila 0 col 1 y Escenario en fila 1 col 1: son vecinos verticales." },
  ],
  solutionExplanation:
    "La ruta de Valentina va Entrada → Foyer → Escenario → Backstage, sin tocar el Camerino. Si el Camerino era el lugar del crimen, su coartada se sostiene.",
};

// ─── FÁCIL-03 ─── Grid 3×3, ruta 4 habitaciones ─── Museo ─────────────────
const m5: MapaPuzzle = {
  id: "mapa-facil-03",
  category: "mapa",
  title: "El curator en el museo",
  description: "El curator Aldous dice que no entró a la Sala de Roma. Verificalo.",
  difficulty: "facil",
  estimatedMinutes: 7,
  story:
    "El curator Aldous Venn fue el último en cerrar el Museo de Antigüedades. Declara haber seguido su rutina habitual. Si su ruta no pasa por la Sala de Roma, donde desapareció el medallón, podría ser inocente.",
  instructions:
    "Trazá la ruta de Aldous exactamente como la declaró. Si toca la Sala de Roma, mintió.",
  routeClue:
    'Aldous dice: "Fui de la Recepción a la Galería A, luego bajé al Patio Central y llegué al Laboratorio de Restauración."',
  suspect: { name: "Aldous Venn", emoji: "🏛️", role: "El curator" },
  gridCols: 3,
  gridRows: 3,
  startRoomId: "recepcion",
  endRoomId: "laboratorio",
  rooms: [
    { id: "recepcion",   name: "Recepción",    emoji: "🗝️", row: 0, col: 0 },
    { id: "galeria-a",   name: "Galería A",    emoji: "🖼️", row: 0, col: 1 },
    { id: "galeria-b",   name: "Galería B",    emoji: "🗿", row: 0, col: 2 },
    { id: "sala-egipto", name: "Sala Egipto",  emoji: "🏺", row: 1, col: 0 },
    { id: "patio",       name: "Patio Central",emoji: "🏛️", row: 1, col: 1 },
    { id: "sala-roma",   name: "Sala de Roma", emoji: "⚔️", row: 1, col: 2 },
    { id: "deposito",    name: "Depósito",     emoji: "📦", row: 2, col: 0 },
    { id: "laboratorio", name: "Laboratorio",  emoji: "🔬", row: 2, col: 1 },
    { id: "archivo",     name: "Archivo",      emoji: "🗄️", row: 2, col: 2 },
  ],
  correctRoute: [
    { roomId: "recepcion",   order: 1 },
    { roomId: "galeria-a",   order: 2 },
    { roomId: "patio",       order: 3 },
    { roomId: "laboratorio", order: 4 },
  ],
  hints: [
    { level: 1, text: "Leé la declaración de Aldous con atención." },
    { level: 2, text: "Las habitaciones se conectan solo con sus vecinas (arriba, abajo, izquierda, derecha)." },
    { level: 3, text: "Galería A (fila 0, col 1) y Patio Central (fila 1, col 1) son vecinos verticales." },
  ],
  solutionExplanation:
    "La ruta de Aldous es Recepción → Galería A → Patio Central → Laboratorio. No pasa por la Sala de Roma, así que su declaración es coherente con el plano.",
};

// ─── MEDIO-01 ─── Grid 4×3, ruta 5 habitaciones ─── Hotel ──────────────────
const m2: MapaPuzzle = {
  id: "mapa-medio-01",
  category: "mapa",
  title: "El inspector en el hotel",
  description: "El Inspector Mora dice que su ruta lo llevó lejos de la Suite. Verificalo.",
  difficulty: "medio",
  estimatedMinutes: 12,
  story:
    "El Inspector Mora declaró una ruta específica por el hotel esa noche. Si su ruta no pasa por la Suite Pavone, está en lo correcto. Si pasa, miente.",
  instructions:
    "Trazá la ruta del Inspector según su declaración. Si la ruta correcta pasa por la Suite, el Inspector mintió.",
  routeClue:
    'Mora dice: "Fui del Lobby al Bar, luego a la Escalera, después al Balcón y bajé a la Bodega."',
  suspect: { name: "Inspector Mora", emoji: "🕵️", role: "El detective retirado" },
  gridCols: 4,
  gridRows: 3,
  startRoomId: "lobby",
  endRoomId: "bodega",
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
  correctRoute: [
    { roomId: "lobby",    order: 1 },
    { roomId: "bar",      order: 2 },
    { roomId: "escalera", order: 3 },
    { roomId: "balcon",   order: 4 },
    { roomId: "bodega",   order: 5 },
  ],
  hints: [
    { level: 1, text: "Leé la declaración del sospechoso con atención." },
    { level: 2, text: "Las habitaciones se conectan solo con sus vecinas (arriba, abajo, izquierda, derecha)." },
    { level: 3, text: "Trazá la ruta exactamente como la describe el sospechoso, en ese orden." },
  ],
  solutionExplanation:
    "La ruta correcta sigue exactamente la declaración del sospechoso. Si pasa por la habitación de la víctima, está mintiendo.",
};

// ─── MEDIO-02 ─── Grid 4×3, ruta 5 habitaciones ─── Universidad ────────────
const m6: MapaPuzzle = {
  id: "mapa-medio-02",
  category: "mapa",
  title: "El profesor en la universidad",
  description: "El profesor Esteban dice que nunca entró al Decanato esa tarde. Verificalo.",
  difficulty: "medio",
  estimatedMinutes: 12,
  story:
    "El profesor Esteban Oriz fue visto en el campus la tarde en que desapareció el expediente confidencial. Declara haber seguido su ruta habitual. Si su camino no pasa por el Decanato, tal vez no fue él.",
  instructions:
    "Trazá la ruta del profesor Esteban tal como la describió. Si toca el Decanato, mintió.",
  routeClue:
    'Esteban dice: "Fui de la Entrada al Pasillo Norte, luego a la Cafetería, después a la Sala de Profesores y terminé en la Biblioteca."',
  suspect: { name: "Prof. Esteban Oriz", emoji: "📐", role: "El profesor de lógica" },
  gridCols: 4,
  gridRows: 3,
  startRoomId: "entrada",
  endRoomId: "biblioteca",
  rooms: [
    { id: "entrada",    name: "Entrada",          emoji: "🚪", row: 0, col: 0 },
    { id: "pasillo-n",  name: "Pasillo Norte",    emoji: "🚶", row: 0, col: 1 },
    { id: "aula-magna", name: "Aula Magna",       emoji: "🎓", row: 0, col: 2 },
    { id: "laborat",    name: "Laboratorio",      emoji: "🔬", row: 0, col: 3 },
    { id: "biblioteca", name: "Biblioteca",       emoji: "📚", row: 1, col: 0 },
    { id: "cafeteria",  name: "Cafetería",        emoji: "☕", row: 1, col: 1 },
    { id: "sala-prof",  name: "Sala Profesores",  emoji: "🖋️", row: 1, col: 2 },
    { id: "decanato",   name: "Decanato",         emoji: "🏛️", row: 1, col: 3 },
    { id: "archivos",   name: "Archivos",         emoji: "🗄️", row: 2, col: 0 },
    { id: "deposito",   name: "Depósito",         emoji: "📦", row: 2, col: 1 },
    { id: "conserje",   name: "Conserjería",      emoji: "🔑", row: 2, col: 2 },
    { id: "salida",     name: "Salida",           emoji: "🚗", row: 2, col: 3 },
  ],
  correctRoute: [
    { roomId: "entrada",    order: 1 },
    { roomId: "pasillo-n",  order: 2 },
    { roomId: "cafeteria",  order: 3 },
    { roomId: "sala-prof",  order: 4 },
    { roomId: "biblioteca", order: 5 },
  ],
  hints: [
    { level: 1, text: "Leé la declaración del profesor con atención." },
    { level: 2, text: "Las habitaciones se conectan solo con sus vecinas (arriba, abajo, izquierda, derecha)." },
    { level: 3, text: "La Biblioteca (fila 1, col 0) y la Sala de Profesores (fila 1, col 2) no son vecinas directas. Pensá en el camino intermedio." },
  ],
  solutionExplanation:
    "La ruta del profesor es Entrada → Pasillo Norte → Cafetería → Sala de Profesores → Biblioteca. El último paso requiere ir hacia la izquierda desde Sala de Profesores hasta Cafetería, y de allí bajar a Biblioteca.",
};

// ─── MEDIO-03 ─── Grid 4×3, ruta 5 habitaciones ─── Comisaría ──────────────
const m7: MapaPuzzle = {
  id: "mapa-medio-03",
  category: "mapa",
  title: "El sargento en la comisaría",
  description: "El sargento Brito jura que no fue al Archivo esa noche. Trazá su ruta.",
  difficulty: "medio",
  estimatedMinutes: 12,
  story:
    "La comisaría fue escenario de una filtración de datos. El sargento Brito declara haber patrullado su ruta habitual. Si su camino no toca el Archivo donde estaban los expedientes, podría no ser el culpable.",
  instructions:
    "Trazá la ruta del sargento Brito según su declaración. Si la ruta pasa por el Archivo, mintió.",
  routeClue:
    'Brito dice: "Salí de la Guardia, fui a la Recepción, luego a la Sala de Espera, después al Calabozo y llegué a la Salida de Emergencia."',
  suspect: { name: "Sargento Brito", emoji: "👮", role: "El sargento de guardia" },
  gridCols: 4,
  gridRows: 3,
  startRoomId: "guardia",
  endRoomId: "salida-emerg",
  rooms: [
    { id: "guardia",      name: "Guardia",            emoji: "🛡️", row: 0, col: 0 },
    { id: "recepcion",    name: "Recepción",          emoji: "📋", row: 0, col: 1 },
    { id: "sala-esp",     name: "Sala de Espera",     emoji: "🪑", row: 0, col: 2 },
    { id: "despacho",     name: "Despacho",           emoji: "🖥️", row: 0, col: 3 },
    { id: "celda-a",      name: "Celda A",            emoji: "🔒", row: 1, col: 0 },
    { id: "pasillo",      name: "Pasillo",            emoji: "🚶", row: 1, col: 1 },
    { id: "archivo",      name: "Archivo",            emoji: "🗄️", row: 1, col: 2 },
    { id: "oficina-jefe", name: "Oficina del Jefe",   emoji: "⭐", row: 1, col: 3 },
    { id: "celda-b",      name: "Celda B",            emoji: "⛓️", row: 2, col: 0 },
    { id: "armeria",      name: "Armería",            emoji: "🔫", row: 2, col: 1 },
    { id: "calabozo",     name: "Calabozo",           emoji: "🪝", row: 2, col: 2 },
    { id: "salida-emerg", name: "Salida Emergencia",  emoji: "🚨", row: 2, col: 3 },
  ],
  correctRoute: [
    { roomId: "guardia",      order: 1 },
    { roomId: "recepcion",    order: 2 },
    { roomId: "sala-esp",     order: 3 },
    { roomId: "calabozo",     order: 4 },
    { roomId: "salida-emerg", order: 5 },
  ],
  hints: [
    { level: 1, text: "Leé la declaración del sargento con atención." },
    { level: 2, text: "Las habitaciones se conectan solo con sus vecinas (arriba, abajo, izquierda, derecha)." },
    { level: 3, text: "Sala de Espera (fila 0, col 2) y Calabozo (fila 2, col 2) no son vecinas directas — revisá si hay un paso intermedio." },
  ],
  solutionExplanation:
    "La ruta declarada por Brito pasa por Guardia → Recepción → Sala de Espera → Calabozo → Salida de Emergencia. El paso de Sala de Espera a Calabozo requiere bajar dos filas en la misma columna, lo cual no es posible sin pasar por Archivo (fila 1, col 2). Brito mintió.",
};

// ─── DIFÍCIL-01 ─── Grid 5×3, 2 blocked, ruta 5 habitaciones ─── Crucero ───
const m3: MapaPuzzle = {
  id: "mapa-dificil-01",
  category: "mapa",
  title: "El sommelier en el crucero",
  description: "Kranz dice que nunca pasó por Cabina B. Trazá su ruta para comprobarlo.",
  difficulty: "dificil",
  estimatedMinutes: 18,
  story:
    "El Sommelier Kranz declaró una ruta específica por el Crucero Belladonna. Trazala para ver si realmente evitó Cabina B — o si mintió.",
  instructions:
    "Trazá la ruta de Kranz exactamente como la declaró. Si la ruta pasa por Cabina B, está mintiendo.",
  routeClue:
    'Kranz dice: "Fui de la Bodega a la Lavandería, luego a la Cocina, después a la Sala de Juegos y terminé en la Sala de Conferencias."',
  suspect: { name: "Sommelier Kranz", emoji: "🍾", role: "El sommelier" },
  gridCols: 5,
  gridRows: 3,
  startRoomId: "bodega",
  endRoomId: "sala-conf",
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
  correctRoute: [
    { roomId: "bodega",      order: 1 },
    { roomId: "lavanderia",  order: 2 },
    { roomId: "cocina",      order: 3 },
    { roomId: "sala-juegos", order: 4 },
    { roomId: "sala-conf",   order: 5 },
  ],
  hints: [
    { level: 1, text: "Leé la declaración del sospechoso con atención." },
    { level: 2, text: "Las habitaciones se conectan solo con sus vecinas (arriba, abajo, izquierda, derecha)." },
    { level: 3, text: "Trazá la ruta exactamente como la describe el sospechoso, en ese orden." },
  ],
  solutionExplanation:
    "La ruta correcta sigue exactamente la declaración del sospechoso. Si pasa por la habitación de la víctima, está mintiendo.",
};

// ─── DIFÍCIL-02 ─── Grid 5×3, 2 blocked, ruta 6 habitaciones ─── Castillo ──
const m8: MapaPuzzle = {
  id: "mapa-dificil-02",
  category: "mapa",
  title: "El heraldo en el castillo",
  description: "El heraldo Osvaldo afirma que no visitó la Capilla esa noche. Verificalo.",
  difficulty: "dificil",
  estimatedMinutes: 18,
  story:
    "El heraldo Osvaldo Drax transitó el Castillo Morrigan la noche en que desapareció el sello real. Declara una ruta que evita la Capilla donde se guardaba el sello. Comprobá si su camino es coherente con el plano.",
  instructions:
    "Trazá la ruta de Osvaldo según su declaración. Hay zonas bloqueadas que no se pueden atravesar. Si la ruta toca la Capilla, mintió.",
  routeClue:
    'Osvaldo dice: "Fui de la Torre Norte al Puente Levadizo, luego al Patio de Armas, después al Salón del Trono, a la Biblioteca Real y terminé en la Armería."',
  suspect: { name: "Osvaldo Drax", emoji: "📯", role: "El heraldo real" },
  gridCols: 5,
  gridRows: 3,
  startRoomId: "torre-norte",
  endRoomId: "armeria",
  rooms: [
    { id: "torre-norte", name: "Torre Norte",     emoji: "🗼", row: 0, col: 0 },
    { id: "puente",      name: "Puente Levadizo", emoji: "⛓️", row: 0, col: 1 },
    { id: "blocked-02",  name: "",                emoji: "",   row: 0, col: 2, blocked: true },
    { id: "armeria",     name: "Armería",         emoji: "⚔️", row: 0, col: 3 },
    { id: "torre-sur",   name: "Torre Sur",       emoji: "🏰", row: 0, col: 4 },
    { id: "mazmorra",    name: "Mazmorra",        emoji: "⛓️", row: 1, col: 0 },
    { id: "patio",       name: "Patio de Armas",  emoji: "🛡️", row: 1, col: 1 },
    { id: "trono",       name: "Salón del Trono", emoji: "👑", row: 1, col: 2 },
    { id: "biblioteca",  name: "Biblioteca Real", emoji: "📜", row: 1, col: 3 },
    { id: "capilla",     name: "Capilla",         emoji: "🕯️", row: 1, col: 4 },
    { id: "blocked-20",  name: "",                emoji: "",   row: 2, col: 0, blocked: true },
    { id: "cocina-c",    name: "Cocina del Castillo", emoji: "🍖", row: 2, col: 1 },
    { id: "bodega-c",    name: "Bodega",          emoji: "🍷", row: 2, col: 2 },
    { id: "establos",    name: "Establos",        emoji: "🐴", row: 2, col: 3 },
    { id: "jardin-c",    name: "Jardín",          emoji: "🌹", row: 2, col: 4 },
  ],
  correctRoute: [
    { roomId: "torre-norte", order: 1 },
    { roomId: "puente",      order: 2 },
    { roomId: "patio",       order: 3 },
    { roomId: "trono",       order: 4 },
    { roomId: "biblioteca",  order: 5 },
    { roomId: "armeria",     order: 6 },
  ],
  hints: [
    { level: 1, text: "Hay zonas bloqueadas en el plano — no se pueden atravesar." },
    { level: 2, text: "Las habitaciones se conectan solo con sus vecinas (arriba, abajo, izquierda, derecha), y nunca a través de zonas bloqueadas." },
    { level: 3, text: "La Biblioteca Real (fila 1, col 3) y la Armería (fila 0, col 3) son vecinas verticales." },
  ],
  solutionExplanation:
    "La ruta de Osvaldo es Torre Norte → Puente Levadizo → Patio de Armas → Salón del Trono → Biblioteca Real → Armería. No pasa por la Capilla, así que su coartada es coherente con el mapa.",
};

// ─── DIFÍCIL-03 ─── Grid 5×3, 1 blocked, ruta 6 habitaciones ─── Mansión ───
const m9: MapaPuzzle = {
  id: "mapa-dificil-03",
  category: "mapa",
  title: "La ama de llaves en la mansión",
  description: "Doris dice que no bajó al Sótano esa noche. Comprobá su recorrido.",
  difficulty: "dificil",
  estimatedMinutes: 18,
  story:
    "La ama de llaves Doris Lemaire conoce cada rincón de la Mansión Harwood. La noche del robo afirma haber seguido su ronda habitual sin acercarse al Sótano donde estaba la caja fuerte. Trazá su ruta y verificá si miente.",
  instructions:
    "Trazá la ruta de Doris según su declaración. Hay una zona inhabilitada. Si la ruta pasa por el Sótano, mintió.",
  routeClue:
    'Doris dice: "Salí de la Entrada, fui al Salón Principal, luego al Comedor, después a la Bodega, pasé por la Lavandería y llegué al Estudio."',
  suspect: { name: "Doris Lemaire", emoji: "🗝️", role: "La ama de llaves" },
  gridCols: 5,
  gridRows: 3,
  startRoomId: "entrada",
  endRoomId: "estudio",
  rooms: [
    { id: "entrada",    name: "Entrada",          emoji: "🚪", row: 0, col: 0 },
    { id: "salon",      name: "Salón Principal",  emoji: "🛋️", row: 0, col: 1 },
    { id: "galeria",    name: "Galería",          emoji: "🖼️", row: 0, col: 2 },
    { id: "terraza",    name: "Terraza",          emoji: "🌅", row: 0, col: 3 },
    { id: "torre",      name: "Torre",            emoji: "🗼", row: 0, col: 4 },
    { id: "cocina",     name: "Cocina",           emoji: "🍳", row: 1, col: 0 },
    { id: "comedor",    name: "Comedor",          emoji: "🍽️", row: 1, col: 1 },
    { id: "estudio",    name: "Estudio",          emoji: "🖋️", row: 1, col: 2 },
    { id: "biblioteca", name: "Biblioteca",       emoji: "📚", row: 1, col: 3 },
    { id: "blocked-14", name: "",                 emoji: "",   row: 1, col: 4, blocked: true },
    { id: "sotano",     name: "Sótano",           emoji: "🔦", row: 2, col: 0 },
    { id: "bodega",     name: "Bodega",           emoji: "🍷", row: 2, col: 1 },
    { id: "lavanderia", name: "Lavandería",       emoji: "🧺", row: 2, col: 2 },
    { id: "garaje",     name: "Garaje",           emoji: "🚗", row: 2, col: 3 },
    { id: "jardin",     name: "Jardín",           emoji: "🌿", row: 2, col: 4 },
  ],
  correctRoute: [
    { roomId: "entrada",    order: 1 },
    { roomId: "salon",      order: 2 },
    { roomId: "comedor",    order: 3 },
    { roomId: "bodega",     order: 4 },
    { roomId: "lavanderia", order: 5 },
    { roomId: "estudio",    order: 6 },
  ],
  hints: [
    { level: 1, text: "Hay una zona bloqueada en la planta alta derecha — no se puede atravesar." },
    { level: 2, text: "Las habitaciones se conectan solo con sus vecinas (arriba, abajo, izquierda, derecha)." },
    { level: 3, text: "Lavandería (fila 2, col 2) y Estudio (fila 1, col 2) son vecinas verticales." },
  ],
  solutionExplanation:
    "La ruta de Doris es Entrada → Salón → Comedor → Bodega → Lavandería → Estudio. No toca el Sótano, por lo que su declaración es consistente con el plano.",
};

// ─── EXPERTO-01 ─── Grid 5×4, 4 blocked, ruta 7 habitaciones ─── Hotel lujo ─
const m10: MapaPuzzle = {
  id: "mapa-experto-01",
  category: "mapa",
  title: "El conserje en el gran hotel",
  description: "El conserje Félix afirma no haber subido a la Suite VIP. Trazá su largo recorrido.",
  difficulty: "experto",
  estimatedMinutes: 25,
  story:
    "El Gran Hotel Belmont fue escenario de un robo en la Suite VIP. El conserje Félix Arnaud declara haber seguido una ruta de servicio que nunca se acercó a ese piso. Con zonas en remodelación que bloquean varios accesos, el plano es complicado. Verificá si su ruta es posible.",
  instructions:
    "Trazá la ruta de Félix según su declaración. Las zonas en remodelación están bloqueadas. Si la ruta toca la Suite VIP, mintió.",
  routeClue:
    'Félix dice: "Fui de la Recepción al Lobby, luego al Gimnasio, después al Spa, a la Piscina, a la Sala de Conferencias y terminé en la Sala Técnica."',
  suspect: { name: "Félix Arnaud", emoji: "🛎️", role: "El conserje jefe" },
  gridCols: 5,
  gridRows: 4,
  startRoomId: "recepcion",
  endRoomId: "sala-tec",
  rooms: [
    { id: "recepcion",  name: "Recepción",         emoji: "🏨", row: 0, col: 0 },
    { id: "bar",        name: "Bar",               emoji: "🍸", row: 0, col: 1 },
    { id: "restaurante",name: "Restaurante",       emoji: "🍝", row: 0, col: 2 },
    { id: "blocked-03", name: "",                  emoji: "",   row: 0, col: 3, blocked: true },
    { id: "terraza",    name: "Terraza",           emoji: "🌇", row: 0, col: 4 },
    { id: "lobby",      name: "Lobby",             emoji: "🛋️", row: 1, col: 0 },
    { id: "ascensor",   name: "Ascensor",          emoji: "🔼", row: 1, col: 1 },
    { id: "blocked-12", name: "",                  emoji: "",   row: 1, col: 2, blocked: true },
    { id: "suite-vip",  name: "Suite VIP",         emoji: "👑", row: 1, col: 3 },
    { id: "balcon",     name: "Balcón",            emoji: "🌙", row: 1, col: 4 },
    { id: "gimnasio",   name: "Gimnasio",          emoji: "🏋️", row: 2, col: 0 },
    { id: "spa",        name: "Spa",               emoji: "💆", row: 2, col: 1 },
    { id: "piscina",    name: "Piscina",           emoji: "🏊", row: 2, col: 2 },
    { id: "sala-conf",  name: "Sala Conferencias", emoji: "📋", row: 2, col: 3 },
    { id: "blocked-24", name: "",                  emoji: "",   row: 2, col: 4, blocked: true },
    { id: "blocked-30", name: "",                  emoji: "",   row: 3, col: 0, blocked: true },
    { id: "bodega",     name: "Bodega",            emoji: "🍷", row: 3, col: 1 },
    { id: "lavanderia", name: "Lavandería",        emoji: "🧺", row: 3, col: 2 },
    { id: "sala-tec",   name: "Sala Técnica",      emoji: "🔧", row: 3, col: 3 },
    { id: "garaje",     name: "Garaje",            emoji: "🚗", row: 3, col: 4 },
  ],
  correctRoute: [
    { roomId: "recepcion", order: 1 },
    { roomId: "lobby",     order: 2 },
    { roomId: "gimnasio",  order: 3 },
    { roomId: "spa",       order: 4 },
    { roomId: "piscina",   order: 5 },
    { roomId: "sala-conf", order: 6 },
    { roomId: "sala-tec",  order: 7 },
  ],
  hints: [
    { level: 1, text: "Hay cuatro zonas en remodelación bloqueadas. Identificalas antes de trazar la ruta." },
    { level: 2, text: "Las habitaciones se conectan solo con sus vecinas (arriba, abajo, izquierda, derecha), nunca a través de zonas bloqueadas." },
    { level: 3, text: "La ruta desciende por la columna izquierda (Recepción → Lobby → Gimnasio) y luego avanza hacia la derecha por la fila del medio (Spa → Piscina → Sala de Conferencias) antes de bajar a la Sala Técnica." },
  ],
  solutionExplanation:
    "La ruta de Félix baja por la columna 0 (Recepción → Lobby → Gimnasio), cruza la fila 2 hacia la derecha (Spa → Piscina → Sala de Conferencias) y baja a la Sala Técnica. La Suite VIP queda en fila 1 col 3, completamente fuera de este camino. La declaración de Félix es coherente con el plano.",
};

export const MAPA_PUZZLES: MapaPuzzle[] = [
  m1,  // mapa-facil-01
  m4,  // mapa-facil-02
  m5,  // mapa-facil-03
  m2,  // mapa-medio-01
  m6,  // mapa-medio-02
  m7,  // mapa-medio-03
  m3,  // mapa-dificil-01
  m8,  // mapa-dificil-02
  m9,  // mapa-dificil-03
  m10, // mapa-experto-01
];

export function getMapaPuzzle(id: string) {
  return MAPA_PUZZLES.find((p) => p.id === id);
}
