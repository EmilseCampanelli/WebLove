import { EvidenciasPuzzle } from "./types";

const ev1: EvidenciasPuzzle = {
  id: "evidencias-facil-01",
  category: "evidencias",
  title: "La sala del trono",
  description: "Clasificá las evidencias del caso y acusá al culpable.",
  difficulty: "facil",
  estimatedMinutes: 8,
  story: "El Duque Renard fue encontrado envenenado en su sala. Hay cinco evidencias sobre la mesa. Clasificalas y luego elegí al sospechoso correcto.",
  instructions: "Deslizá cada evidencia a su categoría: RELEVANTE (señala al culpable), ENGAÑOSA (parece importante pero no lo es) o IRRELEVANTE (no aporta nada). Luego acusá al sospechoso.",
  hints: [
    { level: 1, text: "El veneno estaba en la copa. ¿Quién tenía acceso exclusivo a ella?" },
    { level: 2, text: "La copa fue lavada — pero dejó un residuo. ¿Quién pudo haberla lavado antes de que llegara la policía?" },
    { level: 3, text: "Solo el sommelier sirvió la copa y tuvo tiempo de lavarla antes del descubrimiento." },
  ],
  solutionExplanation: "El sommelier Bertrand sirvió la copa del Duque y fue el único con acceso a ella sin testigos. El residuo de veneno en el anillo de la copa coincide con el arsénico encontrado en su bolsillo.",
  cards: [
    { id: "c1", emoji: "🍷", label: "Copa con residuo", description: "Residuo de arsénico en el borde interno de la copa del Duque.", correctClass: "relevante", explanation: "Confirma el método del envenenamiento y señala quién tuvo acceso a la copa." },
    { id: "c2", emoji: "🧤", label: "Guante de seda", description: "Un guante blanco encontrado detrás del sofá. No es del Duque.", correctClass: "enganosa", explanation: "Resultó ser de la visita de la semana anterior. No tiene relación con el crimen." },
    { id: "c3", emoji: "📜", label: "Carta sin firmar", description: "Una carta de amor sin destinatario sobre el escritorio del Duque.", correctClass: "irrelevante", explanation: "Personal pero no relacionada con el crimen." },
    { id: "c4", emoji: "⚗️", label: "Arsénico en el bolsillo", description: "Pequeño paquete de polvo blanco en el bolsillo del sommelier Bertrand.", correctClass: "relevante", explanation: "El mismo compuesto hallado en la copa. Vincula directamente al sommelier." },
    { id: "c5", emoji: "🕰️", label: "Reloj detenido", description: "El reloj de pared parado a las 21:17.", correctClass: "enganosa", explanation: "Se detuvo por falta de cuerda, no durante el crimen." },
  ],
  suspects: [
    { id: "bertrand", name: "Bertrand", emoji: "🍾", motive: "El Duque descubrió que robaba del cellar privado", isKiller: true },
    { id: "condesa", name: "Condesa Aria", emoji: "💄", motive: "Disputa por la herencia", isKiller: false },
    { id: "capitan", name: "Capitán Wren", emoji: "⚔️", motive: "Antigua deuda de honor", isKiller: false },
  ],
  killerId: "bertrand",
};

const ev2: EvidenciasPuzzle = {
  id: "evidencias-medio-01",
  category: "evidencias",
  title: "El club náutico",
  description: "Un cuerpo en el muelle. Seis evidencias. No todas apuntan a donde parecen.",
  difficulty: "medio",
  estimatedMinutes: 12,
  story: "El presidente del Club Náutico apareció muerto en el embarcadero privado. Cuatro sospechosos. Clasificá las evidencias antes de acusar.",
  instructions: "Clasificá las seis evidencias. Usá el resultado para acusar al culpable correcto.",
  hints: [
    { level: 1, text: "La cuerda náutica tiene un nudo especial. Solo un marinero experimentado lo hace así." },
    { level: 2, text: "El instructor de vela es el único que usa ese nudo como técnica estándar." },
    { level: 3, text: "Combiná la cuerda con las huellas en el embarcadero: ambas señalan al instructor." },
  ],
  solutionExplanation: "El instructor Pavlov ató a la víctima con el nudo de balso doble —su firma técnica— antes de ahogarla. Sus huellas en el embarcadero confirmaron su presencia. El resto de las evidencias eran señuelos.",
  cards: [
    { id: "c1", emoji: "🪢", label: "Cuerda con nudo de balso doble", description: "La cuerda que ataba al cuerpo usa un nudo especializado de marinería avanzada.", correctClass: "relevante", explanation: "Solo el instructor Pavlov usa este nudo. Es su técnica estándar de amarre." },
    { id: "c2", emoji: "👟", label: "Zapatilla deportiva", description: "Una zapatilla talle 43 flotando cerca del cuerpo.", correctClass: "enganosa", explanation: "Resultó venir de otra embarcación. No tiene relación con el crimen." },
    { id: "c3", emoji: "🔑", label: "Llaves del club", description: "El juego de llaves maestras del club, encontrado en el agua.", correctClass: "relevante", explanation: "Solo el instructor y el presidente tenían este tipo de llave. Descarta a los otros dos." },
    { id: "c4", emoji: "📱", label: "Celular sin batería", description: "El celular de la víctima, apagado y sin batería.", correctClass: "irrelevante", explanation: "La víctima simplemente no había cargado el celular. No aporta al caso." },
    { id: "c5", emoji: "🦶", label: "Huellas en el embarcadero", description: "Dos pares de huellas: de la víctima y de alguien con bota de goma talle 42.", correctClass: "relevante", explanation: "Pavlov usa botas de goma talle 42 en el club. Confirma su presencia." },
    { id: "c6", emoji: "🍺", label: "Botella de cerveza vacía", description: "Botella de cerveza artesanal local en el embarcadero.", correctClass: "irrelevante", explanation: "La marca es común en el club. No vincula a nadie específico." },
  ],
  suspects: [
    { id: "pavlov", name: "Instructor Pavlov", emoji: "⛵", motive: "La víctima iba a denunciarlo por falsificación de certificados de navegación", isKiller: true },
    { id: "socia", name: "Socia Lindberg", emoji: "💼", motive: "Disputa por la presidencia del club", isKiller: false },
    { id: "tecnico", name: "Técnico Bora", emoji: "🔧", motive: "Despido inminente", isKiller: false },
    { id: "chef", name: "Chef Mara", emoji: "🍽️", motive: "Deuda impaga", isKiller: false },
  ],
  killerId: "pavlov",
};

const ev3: EvidenciasPuzzle = {
  id: "evidencias-dificil-01",
  category: "evidencias",
  title: "El manuscrito perdido",
  description: "Un escritor muerto, un manuscrito robado y siete evidencias — algunas puestas ahí para confundirte.",
  difficulty: "dificil",
  estimatedMinutes: 18,
  story: "El novelista Arpad Voss fue hallado muerto en su estudio. Su manuscrito inédito —que revelaba secretos de personas reales— había desaparecido. Cinco sospechosos. Siete evidencias.",
  instructions: "Clasificá las siete evidencias con cuidado. Luego acusá al culpable.",
  hints: [
    { level: 1, text: "El polvo de tóner es fundamental. ¿Quién imprimió el manuscrito sin permiso?" },
    { level: 2, text: "Combiná el tóner con el testigo anónimo. ¿Quién usó la impresora a las 02:00?" },
    { level: 3, text: "La editora Camille imprimió el manuscrito de madrugada. El testigo la vio entrar. Ella es la única con motivo concreto." },
  ],
  solutionExplanation: "La editora Camille imprimió el manuscrito a las 02:00 usando la impresora del estudio —confirmado por el tóner en sus manos y el testigo anónimo. El libro revelaba que ella había plagiado a Voss en su obra más exitosa.",
  cards: [
    { id: "c1", emoji: "🖨️", label: "Polvo de tóner", description: "Residuo de tóner en las manos de la editora Camille, compatible con la impresora del estudio.", correctClass: "relevante", explanation: "Confirma que Camille usó la impresora del estudio esa noche." },
    { id: "c2", emoji: "🕵️", label: "Testigo anónimo", description: "Un vecino vio a 'una mujer con bolso grande' entrar al edificio a las 02:00.", correctClass: "relevante", explanation: "Camille fue vista entrando. Ninguna otra sospechosa fue identificada esa noche." },
    { id: "c3", emoji: "🍷", label: "Copa de vino rota", description: "Una copa de vino rota en el suelo. El vino aún estaba fresco.", correctClass: "enganosa", explanation: "El vino era de una botella abierta dos días antes. No indica la hora exacta del crimen." },
    { id: "c4", emoji: "💌", label: "Carta amenazante", description: "Una carta sin firma que dice 'Si publicás esto, lo lamentarás'.", correctClass: "relevante", explanation: "La letra coincide con la de Camille, según el perito caligráfico." },
    { id: "c5", emoji: "🗝️", label: "Llave duplicada", description: "Una llave del estudio encontrada en el cajón de la cocina.", correctClass: "enganosa", explanation: "La llave pertenece a la asistente y fue olvidada hacía meses. Sin relación." },
    { id: "c6", emoji: "📋", label: "Contrato editorial vencido", description: "Un contrato entre Voss y Camille, con una cláusula de derechos disputada.", correctClass: "relevante", explanation: "Establece el motivo: Camille perdería millones si el libro salía." },
    { id: "c7", emoji: "🧴", label: "Perfume en la escena", description: "Olor a perfume floral registrado por dos testigos en el pasillo.", correctClass: "irrelevante", explanation: "El perfume era de la vecina del piso de arriba, que pasó por el pasillo esa tarde." },
  ],
  suspects: [
    { id: "camille", name: "Editora Camille", emoji: "📚", motive: "El libro la exponía como plagiaria; perdería su carrera y millones en contratos", isKiller: true },
    { id: "exsocio", name: "Ex-socio Renato", emoji: "💼", motive: "El manuscrito revelaba fraude contable", isKiller: false },
    { id: "agente", name: "Agente Drago", emoji: "🤝", motive: "Disputa de comisiones", isKiller: false },
    { id: "asistente", name: "Asistente Paloma", emoji: "📝", motive: "Desconocido", isKiller: false },
    { id: "vecino", name: "Vecino Otto", emoji: "🏠", motive: "Ruido recurrente", isKiller: false },
  ],
  killerId: "camille",
};

// ── NUEVOS PUZZLES ─────────────────────────────────────────────────────────────

const ev4: EvidenciasPuzzle = {
  id: "evidencias-facil-02",
  category: "evidencias",
  title: "El café de medianoche",
  description: "El dueño del café amaneció muerto. Solo cuatro pistas. El culpable está entre dos sospechosos.",
  difficulty: "facil",
  estimatedMinutes: 7,
  story: "Don Héctor, dueño del Café Mirador, fue encontrado muerto en la trastienda al abrir el local a las 6:00. Solo había dos personas con llave: su cocinera y su sobrino.",
  instructions: "Clasificá las cuatro evidencias como RELEVANTE, ENGAÑOSA o IRRELEVANTE. Luego acusá al culpable.",
  hints: [
    { level: 1, text: "El registro de caja muestra una extracción de efectivo inusual a medianoche." },
    { level: 2, text: "¿Quién necesitaba dinero urgente y tenía acceso a la caja registradora?" },
    { level: 3, text: "El sobrino Marcos tenía deudas de juego y conocía la combinación de la caja. La cocinera no tenía acceso a ella." },
  ],
  solutionExplanation: "El sobrino Marcos entró a medianoche para robar la caja. Don Héctor lo sorprendió y Marcos lo golpeó con el cenicero de hierro. Las huellas en el cenicero y la extracción de caja confirman su culpabilidad.",
  cards: [
    { id: "c1", emoji: "💰", label: "Caja con faltante", description: "El registro de caja muestra que a las 00:14 se extrajeron $8.000 en efectivo.", correctClass: "relevante", explanation: "Solo el sobrino Marcos conocía la combinación de la caja. Confirma su presencia esa noche." },
    { id: "c2", emoji: "🪨", label: "Cenicero de hierro", description: "Cenicero pesado con sangre y huellas dactilares parciales junto al cuerpo.", correctClass: "relevante", explanation: "Las huellas coinciden con las de Marcos. Es el arma del crimen." },
    { id: "c3", emoji: "☕", label: "Taza de café fría", description: "Una taza de café a medio tomar sobre el mostrador.", correctClass: "irrelevante", explanation: "La taza era de Don Héctor, dejada la noche anterior. No aporta información útil." },
    { id: "c4", emoji: "🧣", label: "Bufanda roja", description: "Una bufanda roja encontrada en la entrada del café.", correctClass: "enganosa", explanation: "La bufanda era de un cliente habitual que la olvidó días antes. No tiene relación con el crimen." },
  ],
  suspects: [
    { id: "marcos", name: "Sobrino Marcos", emoji: "🎲", motive: "Deudas de juego urgentes; necesitaba el efectivo del café esa misma noche", isKiller: true },
    { id: "cocinera", name: "Cocinera Rosa", emoji: "👩‍🍳", motive: "Conflicto laboral por un aumento negado", isKiller: false },
  ],
  killerId: "marcos",
};

const ev5: EvidenciasPuzzle = {
  id: "evidencias-facil-03",
  category: "evidencias",
  title: "El jardín envenenado",
  description: "Una jardinera muerta entre sus plantas. Cinco pistas sencillas. Solo tres sospechosos.",
  difficulty: "facil",
  estimatedMinutes: 8,
  story: "Doña Petra, la jardinera del palacete Vásquez, fue encontrada muerta entre los rosales. El médico confirmó envenenamiento. Solo tres personas estuvieron en el jardín esa tarde.",
  instructions: "Clasificá las cinco evidencias y elegí al culpable.",
  hints: [
    { level: 1, text: "El veneno no vino de las plantas. Fue introducido desde afuera." },
    { level: 2, text: "¿Quién trajo algo de comer o beber al jardín esa tarde?" },
    { level: 3, text: "El ama de llaves llevó el té. Solo ella pudo haber agregado el veneno sin ser vista." },
  ],
  solutionExplanation: "El ama de llaves Irene envenenó el té que llevó al jardín. Petra había descubierto que Irene robaba antigüedades de la mansión y amenazó con delatarla. El frasco de belladona en el delantal de Irene confirma su culpabilidad.",
  cards: [
    { id: "c1", emoji: "🍵", label: "Taza de té con residuo", description: "La taza de Petra contiene restos de belladona, un veneno de acción lenta.", correctClass: "relevante", explanation: "El veneno fue administrado por vía oral, en el té que alguien le trajo." },
    { id: "c2", emoji: "🌿", label: "Frasco de belladona", description: "Frasco pequeño encontrado en el bolsillo del delantal del ama de llaves Irene.", correctClass: "relevante", explanation: "Irene tenía el veneno encima. Confirma que fue ella quien lo administró." },
    { id: "c3", emoji: "🌹", label: "Rosa espinosa rota", description: "Una rama de rosal rota cerca del cuerpo.", correctClass: "irrelevante", explanation: "Petra tropezó con el rosal al caer. No tiene relación con el crimen." },
    { id: "c4", emoji: "📸", label: "Foto familiar enmarcada", description: "Una foto de la familia Vásquez caída en el suelo del jardín.", correctClass: "enganosa", explanation: "La foto fue derribada por el viento esa mañana. No vincula a ningún sospechoso." },
    { id: "c5", emoji: "🧺", label: "Cesta con antigüedades", description: "Cesta con tres figuritas de porcelana de la colección de la mansión, escondida bajo el banco.", correctClass: "relevante", explanation: "Confirma el motivo de Irene: Petra la había descubierto robando y era una amenaza." },
  ],
  suspects: [
    { id: "irene", name: "Ama de llaves Irene", emoji: "🗝️", motive: "Petra descubrió que robaba antigüedades de la mansión y amenazó con delatarla", isKiller: true },
    { id: "jardinero", name: "Jardinero asistente Tomás", emoji: "🌱", motive: "Celos profesionales", isKiller: false },
    { id: "hija", name: "Hija de la dueña, Valentina", emoji: "👩", motive: "Disputa por el uso del jardín", isKiller: false },
  ],
  killerId: "irene",
};

const ev6: EvidenciasPuzzle = {
  id: "evidencias-medio-02",
  category: "evidencias",
  title: "La galería de arte",
  description: "Una crítica de arte muerta y un cuadro robado. Siete evidencias, no todas son lo que parecen.",
  difficulty: "medio",
  estimatedMinutes: 13,
  story: "La crítica de arte Nora Blum fue hallada muerta en la Galería Axel durante el vernissage. Además, el cuadro más valioso de la muestra desapareció. Cuatro sospechosos estuvieron en la galería esa noche.",
  instructions: "Clasificá las siete evidencias y acusá al culpable.",
  hints: [
    { level: 1, text: "El cuadro fue sacado por la puerta trasera. ¿Quién tenía la llave?" },
    { level: 2, text: "La fibra de terciopelo azul vincula a alguien con la funda del cuadro." },
    { level: 3, text: "Solo el galerista Axel tenía llave de la puerta trasera y usaba su saco de terciopelo azul esa noche." },
  ],
  solutionExplanation: "El galerista Axel mató a Nora para silenciarla: ella había descubierto que el cuadro era una falsificación y planeaba publicarlo. Luego huyó con el cuadro por la puerta trasera. La fibra de terciopelo azul de su saco y la llave maestra lo confirman.",
  cards: [
    { id: "c1", emoji: "🔑", label: "Llave maestra de la galería", description: "Llave que da acceso a todos los ambientes, incluida la puerta trasera. Solo la tiene el galerista.", correctClass: "relevante", explanation: "El cuadro fue sacado por la puerta trasera. Solo Axel tenía esa llave." },
    { id: "c2", emoji: "🧵", label: "Fibra de terciopelo azul", description: "Fibra azul encontrada en la manija de la puerta trasera y en el marco vacío.", correctClass: "relevante", explanation: "Axel llevaba un saco de terciopelo azul esa noche. La fibra lo ubica en la escena del robo." },
    { id: "c3", emoji: "🥂", label: "Copa de champagne rota", description: "Copa rota cerca del cuerpo con restos de champagne rosado.", correctClass: "enganosa", explanation: "Se cayó durante el forcejeo, pero todos bebían champagne esa noche. No señala a nadie en particular." },
    { id: "c4", emoji: "📝", label: "Borrador de reseña", description: "Un borrador de reseña de Nora que describe el cuadro como 'una falsificación obvia'.", correctClass: "relevante", explanation: "Confirma el motivo de Axel: si la reseña se publicaba, su carrera y la galería quedarían destruidas." },
    { id: "c5", emoji: "👜", label: "Cartera de Nora", description: "La cartera de la víctima abierta y con el efectivo intacto.", correctClass: "enganosa", explanation: "No fue un robo a Nora. El ladrón no tocó sus pertenencias." },
    { id: "c6", emoji: "🎨", label: "Pincel con pintura fresca", description: "Un pincel con pintura acrílica fresca encontrado en el baño de la galería.", correctClass: "irrelevante", explanation: "Pertenecía a un artista que retoció una obra esa tarde. No tiene relación con el crimen." },
    { id: "c7", emoji: "📷", label: "Cámara de seguridad desconectada", description: "La cámara que apunta a la puerta trasera fue desconectada dos horas antes del crimen.", correctClass: "relevante", explanation: "Axel conocía el sistema de seguridad y la desconectó para sacar el cuadro sin dejar registro." },
  ],
  suspects: [
    { id: "axel", name: "Galerista Axel", emoji: "🖼️", motive: "Nora iba a publicar que el cuadro estrella era una falsificación, lo que destruiría su reputación", isKiller: true },
    { id: "artista", name: "Artista Petra V.", emoji: "🎨", motive: "Nora había destruido su carrera con críticas negativas", isKiller: false },
    { id: "coleccionista", name: "Coleccionista Ruiz", emoji: "💎", motive: "Quería el cuadro a cualquier precio", isKiller: false },
    { id: "asistente", name: "Asistente de galería Lena", emoji: "📋", motive: "Despido inminente", isKiller: false },
  ],
  killerId: "axel",
};

const ev7: EvidenciasPuzzle = {
  id: "evidencias-medio-03",
  category: "evidencias",
  title: "El tren nocturno",
  description: "Un pasajero muerto en el compartimento 7. Seis evidencias entre las que se esconde la verdad.",
  difficulty: "medio",
  estimatedMinutes: 14,
  story: "El banquero Gerold Haas fue estrangulado en su compartimento durante el tren nocturno de Viena a Salzburgo. Cuatro pasajeros ocupaban el vagón esa noche. El tren no hizo paradas.",
  instructions: "Clasificá las seis evidencias y señalá al culpable entre los cuatro pasajeros.",
  hints: [
    { level: 1, text: "El cordón de seda fue el arma. No todos los pasajeros llevaban uno." },
    { level: 2, text: "Buscá quién tenía un cordón similar y acceso al compartimento." },
    { level: 3, text: "La condesa era la única con un cordón de seda idéntico al arma. Su cortada se cae cuando comprobás los horarios." },
  ],
  solutionExplanation: "La Condesa Mirabel estranguló a Haas con el cordón de seda de su bata. Haas había embargado su mansión familiar tras una deuda impaga. La fibra del cordón, su mentira sobre el horario y los papeles del embargo la delatan.",
  cards: [
    { id: "c1", emoji: "🧶", label: "Cordón de seda dorada", description: "Cordón de seda encontrado alrededor del cuello de la víctima. Fibra idéntica a la bata de la Condesa Mirabel.", correctClass: "relevante", explanation: "El arma del crimen coincide con las prendas de la Condesa. La seda tiene un patrón de tejido único." },
    { id: "c2", emoji: "📄", label: "Documentos de embargo", description: "Papeles en el maletín de Haas que ordenan el embargo de la mansión de la Condesa Mirabel.", correctClass: "relevante", explanation: "Establece el motivo concreto: la Condesa perdería su hogar por culpa de Haas." },
    { id: "c3", emoji: "🍷", label: "Botella de vino abierta", description: "Botella de Borgoña 2018 en el compartimento de la víctima, medio vacía.", correctClass: "irrelevante", explanation: "Haas bebía solo esa noche. No vincula a ningún sospechoso." },
    { id: "c4", emoji: "🎫", label: "Ticket de tren con otro nombre", description: "Un ticket a nombre de 'H. Brenner' encontrado en el pasillo.", correctClass: "enganosa", explanation: "Era de un pasajero de otro vagón que se equivocó de asiento. No tiene relación con el crimen." },
    { id: "c5", emoji: "⌚", label: "Reloj de la víctima", description: "El reloj de Haas marca las 02:43, detenido durante el forcejeo.", correctClass: "relevante", explanation: "A las 02:43, la Condesa dijo estar en el vagón comedor. Los registros muestran que el comedor cerró a las 02:00." },
    { id: "c6", emoji: "🧳", label: "Maleta sin abrir", description: "La maleta de la víctima, cerrada y sin signos de registro.", correctClass: "irrelevante", explanation: "No fue un robo. La maleta no fue tocada, lo que confirma que el motivo era personal." },
  ],
  suspects: [
    { id: "condesa", name: "Condesa Mirabel", emoji: "👑", motive: "Haas embargaba su mansión familiar por una deuda impaga de su difunto esposo", isKiller: true },
    { id: "medico", name: "Dr. Franz Ott", emoji: "🩺", motive: "Haas financiaba a su rival médico", isKiller: false },
    { id: "secretaria", name: "Secretaria Hilde", emoji: "💼", motive: "Despido reciente del banco de Haas", isKiller: false },
    { id: "comerciante", name: "Comerciante Gruber", emoji: "🏪", motive: "Deuda comercial con el banco", isKiller: false },
  ],
  killerId: "condesa",
};

const ev8: EvidenciasPuzzle = {
  id: "evidencias-dificil-02",
  category: "evidencias",
  title: "La bodega de los secretos",
  description: "Un enólogo muerto entre barriles añejos. Ocho evidencias, varias puestas para desviar la investigación.",
  difficulty: "dificil",
  estimatedMinutes: 20,
  story: "El maestro enólogo Domènec Puig fue hallado muerto en la bodega subterránea del Château Mirall. Cinco personas tenían acceso a la bodega esa noche. El móvil es económico, pero las pistas están mezcladas con señuelos.",
  instructions: "Clasificá las ocho evidencias con precisión. Una clasificación errónea puede señalar al inocente. Luego acusá al culpable.",
  hints: [
    { level: 1, text: "El muerto guardaba un secreto sobre la añada estrella. ¿Quién perdería más si ese secreto salía a la luz?" },
    { level: 2, text: "Buscá quién combinó acceso físico con motivo económico concreto. La firma del seguro es clave." },
    { level: 3, text: "La dueña Sylvie firmó un seguro de $2M sobre Domènec apenas un mes antes. El análisis de la cerradura la ubica en la bodega esa noche." },
  ],
  solutionExplanation: "La dueña Sylvie envenenó a Domènec con metanol en su copa de degustación. Domènec había descubierto que la añada 2019, vendida como premium, era en realidad una mezcla adulterada. Para silenciarlo y cobrar el seguro, Sylvie actuó esa noche. El seguro reciente y el análisis de su tarjeta de acceso la delatan.",
  cards: [
    { id: "c1", emoji: "🍷", label: "Copa con metanol", description: "La copa de degustación de Domènec contiene una concentración letal de metanol.", correctClass: "relevante", explanation: "El metanol es el veneno. Alguien lo introdujo en la copa de degustación antes de la sesión." },
    { id: "c2", emoji: "📋", label: "Análisis de la cerradura", description: "El registro electrónico de la bodega muestra que la tarjeta de Sylvie fue usada a las 23:47.", correctClass: "relevante", explanation: "Sylvie entró a la bodega casi a medianoche. Su coartada de 'estar en casa' es falsa." },
    { id: "c3", emoji: "📑", label: "Seguro de vida reciente", description: "Un seguro de $2.000.000 sobre Domènec, firmado por Sylvie hace apenas 31 días.", correctClass: "relevante", explanation: "El seguro reciente establece un motivo económico directo para Sylvie." },
    { id: "c4", emoji: "🧪", label: "Análisis de la añada 2019", description: "Un informe privado de Domènec: la añada estrella contiene hasta un 40% de vino de otras regiones.", correctClass: "relevante", explanation: "Domènec sabía la verdad sobre el fraude. Si lo publicaba, el château quebraría." },
    { id: "c5", emoji: "🧤", label: "Guantes de látex usados", description: "Guantes de látex encontrados en el basurero de la bodega.", correctClass: "enganosa", explanation: "Los guantes son los que usa el enólogo asistente para las degustaciones. No señalan al culpable." },
    { id: "c6", emoji: "📱", label: "Mensaje de texto de Domènec", description: "Un mensaje enviado la tarde del crimen que dice: 'Necesito hablar con vos esta noche. Urgente.'", correctClass: "enganosa", explanation: "El mensaje fue enviado a su esposa para hablar de temas familiares. No está relacionado con el crimen." },
    { id: "c7", emoji: "🔦", label: "Linterna rota", description: "Una linterna con la batería agotada en el suelo de la bodega.", correctClass: "irrelevante", explanation: "La linterna era de Domènec y llevaba semanas sin batería. No aporta al caso." },
    { id: "c8", emoji: "🏷️", label: "Etiqueta de vino falsificada", description: "Una etiqueta de la añada 2019 encontrada en la impresora del despacho.", correctClass: "enganosa", explanation: "Las etiquetas las imprimía el diseñador del château para reemplazos normales. No señala al asesino." },
  ],
  suspects: [
    { id: "sylvie", name: "Dueña Sylvie", emoji: "🏰", motive: "Silenciar el fraude de la añada y cobrar el seguro de vida sobre Domènec", isKiller: true },
    { id: "asistente", name: "Enólogo asistente Marc", emoji: "🍇", motive: "Quería el puesto de maestro enólogo", isKiller: false },
    { id: "distribuidor", name: "Distribuidor Henk", emoji: "🚚", motive: "Disputa por comisiones atrasadas", isKiller: false },
    { id: "contador", name: "Contador Brais", emoji: "📊", motive: "Sabía del fraude y podría ser cómplice", isKiller: false },
    { id: "sommelier", name: "Sommelier Inés", emoji: "🥂", motive: "Despedida injustamente por Domènec", isKiller: false },
  ],
  killerId: "sylvie",
};

const ev9: EvidenciasPuzzle = {
  id: "evidencias-dificil-03",
  category: "evidencias",
  title: "El laboratorio del profesor",
  description: "Un científico muerto y una fórmula robada. Nueve evidencias, cuatro engañosas. Concentrá cada detalle.",
  difficulty: "dificil",
  estimatedMinutes: 22,
  story: "El profesor Ivars Ozols fue encontrado muerto en su laboratorio universitario. Su fórmula para un antibiótico revolucionario había desaparecido. Cinco sospechosos, todos con acceso al edificio esa noche.",
  instructions: "Clasificá las nueve evidencias. Cuidado: cuatro son engañosas o irrelevantes. Luego acusá al culpable.",
  hints: [
    { level: 1, text: "La fórmula fue fotografiada, no robada físicamente. Buscá quién tenía cámara esa noche." },
    { level: 2, text: "El historial del servidor muestra una descarga no autorizada desde una IP concreta. ¿De quién es?" },
    { level: 3, text: "La IP pertenece a la laptop de la becaria Sonia. Además, fue vista en el laboratorio a las 23:00 por la cámara del pasillo." },
  ],
  solutionExplanation: "La becaria Sonia fotografió la fórmula con su laptop y la vendió a un laboratorio competidor. Cuando el profesor la descubrió esa noche, la situación escaló y ella lo empujó, provocando su muerte. El registro del servidor y la cámara del pasillo la ubican en la escena del crimen.",
  cards: [
    { id: "c1", emoji: "💻", label: "Log del servidor universitario", description: "Registro de acceso que muestra una descarga del archivo 'formula_v7.pdf' a las 22:58 desde la IP de la laptop de Sonia.", correctClass: "relevante", explanation: "Sonia descargó la fórmula desde su laptop. Es prueba directa del robo." },
    { id: "c2", emoji: "📹", label: "Grabación del pasillo", description: "La cámara del pasillo muestra a Sonia entrando al laboratorio a las 22:55 y saliendo a las 23:12.", correctClass: "relevante", explanation: "Ubica a Sonia en el laboratorio en el momento del crimen." },
    { id: "c3", emoji: "📧", label: "Email encriptado", description: "Un email encriptado en la laptop de Sonia enviado a 'contacto@pharmacorp.net' la semana anterior.", correctClass: "relevante", explanation: "Establece que Sonia ya había establecido contacto con el laboratorio competidor." },
    { id: "c4", emoji: "🧬", label: "Borrador de patente", description: "Un borrador de patente con el nombre del prof. Ozols y de su colega rival, el Dr. Kern.", correctClass: "enganosa", explanation: "La disputa de autoría era real, pero el Dr. Kern estaba en un congreso en Berlín esa noche." },
    { id: "c5", emoji: "🩺", label: "Informe toxicológico vacío", description: "El análisis toxicológico no detectó veneno. La muerte fue por traumatismo craneal al caer.", correctClass: "relevante", explanation: "Fue un empujón, no un veneno. Esto confirma que fue un acto impulsivo, no premeditado." },
    { id: "c6", emoji: "📚", label: "Libro de fórmulas abierto", description: "El cuaderno del profesor abierto en la página de la fórmula, con notas al margen.", correctClass: "irrelevante", explanation: "El cuaderno siempre estaba abierto en el laboratorio. No aporta al caso." },
    { id: "c7", emoji: "☕", label: "Taza de café del prof.", description: "Taza de café del profesor, aún tibia al momento del descubrimiento.", correctClass: "enganosa", explanation: "Indica que el crimen ocurrió pocas horas antes, pero no señala a ningún sospechoso en particular." },
    { id: "c8", emoji: "🔐", label: "Candado del archivo forzado", description: "El candado del archivo físico de investigaciones aparece forzado.", correctClass: "enganosa", explanation: "Lo forzó el técnico de mantenimiento tres días antes para recuperar una llave olvidada. Sin relación." },
    { id: "c9", emoji: "🧪", label: "Vial de muestra roto", description: "Un vial de muestra biológica roto en el suelo, cerca del cuerpo.", correctClass: "irrelevante", explanation: "Cayó durante el forcejeo. Era una muestra de un experimento anterior, sin relevancia para el caso." },
  ],
  suspects: [
    { id: "sonia", name: "Becaria Sonia", emoji: "🎓", motive: "Vendió la fórmula a un laboratorio competidor; el profesor la descubrió in fraganti", isKiller: true },
    { id: "kern", name: "Dr. Kern (colega rival)", emoji: "🔬", motive: "Disputa de autoría sobre la fórmula", isKiller: false },
    { id: "decano", name: "Decano Walters", emoji: "🏛️", motive: "El proyecto era una amenaza para sus fondos de investigación", isKiller: false },
    { id: "tecnico", name: "Técnico de laboratorio Rudi", emoji: "🛠️", motive: "Conflicto salarial recurrente", isKiller: false },
    { id: "secretaria", name: "Secretaria del dpto. Marta", emoji: "📋", motive: "Desconocido", isKiller: false },
  ],
  killerId: "sonia",
};

const ev10: EvidenciasPuzzle = {
  id: "evidencias-experto-01",
  category: "evidencias",
  title: "La ópera del último acto",
  description: "Un director de orquesta muerto durante el intermedio. Diez evidencias, cinco son trampas. Solo un experto puede ordenar el caos.",
  difficulty: "experto",
  estimatedMinutes: 28,
  story: "El aclamado director Maximilian Verne cayó muerto en su camerino durante el intermedio de la ópera. El teatro estaba lleno, pero solo cinco personas tenían acceso al camerino sin pasar por el control de seguridad. Las evidencias están mezcladas con señuelos deliberados.",
  instructions: "Clasificá las diez evidencias. Cinco son relevantes, tres engañosas y dos irrelevantes. Una clasificación precisa es la única forma de llegar al culpable. Luego acusá al asesino.",
  hints: [
    { level: 1, text: "El veneno fue administrado entre el final del primer acto y el intermedio. ¿Quién estuvo en el camerino en ese lapso?" },
    { level: 2, text: "El frasco de digitoxina y el historial médico son la clave del método. ¿Quién tenía acceso a ese medicamento?" },
    { level: 3, text: "La violinista solista Hana tenía digitoxina recetada para su cardiopatía, acceso sin control al camerino como artista principal, y perdería su carrera si Verne publicaba su relación con el fraude de audiciones." },
  ],
  solutionExplanation: "La violinista Hana mezcló digitoxina —su medicación cardíaca— en el té de camerino de Verne. La sobredosis indujo una arritmia fatal que pareció un infarto. Verne había descubierto que Hana había sobornado al jurado de la audición que la puso en el escenario. El frasco sin una dosis, el análisis toxicológico positivo, el registro de acceso al camerino y el email de chantaje de Verne la delatan sin lugar a dudas.",
  cards: [
    { id: "c1", emoji: "💊", label: "Frasco de digitoxina", description: "El frasco personal de Hana, con una dosis faltante respecto de lo esperado según su prescripción.", correctClass: "relevante", explanation: "La dosis faltante coincide con la cantidad letal encontrada en el cuerpo de Verne." },
    { id: "c2", emoji: "🧪", label: "Análisis toxicológico", description: "El análisis de sangre de Verne revela digitoxina en concentración cuatro veces superior al rango terapéutico.", correctClass: "relevante", explanation: "Confirma el método: envenenamiento con digitoxina. No fue un infarto natural." },
    { id: "c3", emoji: "🚪", label: "Registro de acceso al camerino", description: "El sistema de acceso registra a Hana entrando al camerino de Verne a las 21:04, durante el intermedio.", correctClass: "relevante", explanation: "Hana estuvo en el camerino exactamente cuando el veneno fue administrado." },
    { id: "c4", emoji: "📧", label: "Email de Verne a Hana", description: "Un email enviado tres días antes: 'Sé lo que hiciste en la audición. Hablamos el domingo o hablo yo primero.'", correctClass: "relevante", explanation: "Establece que Verne la chantajeaba o amenazaba con exponerla. Es el detonante del crimen." },
    { id: "c5", emoji: "🎻", label: "Arco de violín con resina", description: "El arco de Hana con resina fresca, dejado en el camerino de Verne.", correctClass: "relevante", explanation: "Hana dejó su arco como pretexto para entrar al camerino. Confirma que su visita fue premeditada." },
    { id: "c6", emoji: "🌹", label: "Ramo de flores marchitas", description: "Un ramo de rosas rojas enviado al camerino de Verne sin tarjeta identificatoria.", correctClass: "enganosa", explanation: "El ramo fue enviado por una admiradora del público. No tiene relación con el crimen." },
    { id: "c7", emoji: "🗒️", label: "Partitura con anotaciones furiosas", description: "Una partitura del primer violín llena de correcciones agresivas en rojo, firmadas por Verne.", correctClass: "enganosa", explanation: "Verne corregía así a todos los músicos. Apunta a un conflicto artístico, no al crimen real." },
    { id: "c8", emoji: "🎩", label: "Sombrero de frac ajeno", description: "Un sombrero de frac talle M encontrado detrás del sofá del camerino. No es de Verne.", correctClass: "enganosa", explanation: "Pertenecía al director asistente, que había probado el camerino para el ensayo de la semana anterior." },
    { id: "c9", emoji: "📰", label: "Artículo de prensa recortado", description: "Un recorte sobre escándalos de fraude en audiciones de orquestas europeas, sin marcas.", correctClass: "irrelevante", explanation: "Verne coleccionaba artículos de su rubro. Este recorte es de hace ocho meses. No apunta a nadie." },
    { id: "c10", emoji: "🕯️", label: "Vela aromática apagada", description: "Una vela de lavanda apagada sobre el tocador del camerino.", correctClass: "irrelevante", explanation: "Verne siempre tenía velas en su camerino por ritual personal. No tiene relevancia para el caso." },
  ],
  suspects: [
    { id: "hana", name: "Violinista solista Hana", emoji: "🎻", motive: "Verne descubrió que sobornó al jurado de la audición que la llevó al escenario; una denuncia la destruiría", isKiller: true },
    { id: "asistente", name: "Director asistente Félix", emoji: "🎼", motive: "Lleva años esperando el puesto de Verne", isKiller: false },
    { id: "productora", name: "Productora Ingrid", emoji: "🎭", motive: "Conflicto contractual por la gira europea", isKiller: false },
    { id: "mecenas", name: "Mecenas Sr. Albrecht", emoji: "💰", motive: "Verne rechazó su candidato para la orquesta", isKiller: false },
    { id: "tramoyista", name: "Jefe de tramoya Borko", emoji: "🔧", motive: "Accidente laboral encubierto por Verne", isKiller: false },
  ],
  killerId: "hana",
};

export const EVIDENCIAS_PUZZLES: EvidenciasPuzzle[] = [
  ev1, ev4, ev5, ev2, ev6, ev7, ev3, ev8, ev9, ev10,
];

export function getEvidenciasPuzzle(id: string) {
  return EVIDENCIAS_PUZZLES.find((p) => p.id === id);
}
