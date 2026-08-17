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

export const EVIDENCIAS_PUZZLES: EvidenciasPuzzle[] = [ev1, ev2, ev3];
export function getEvidenciasPuzzle(id: string) {
  return EVIDENCIAS_PUZZLES.find((p) => p.id === id);
}
