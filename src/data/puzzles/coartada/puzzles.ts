import { CoartadaPuzzle } from "./types";

const ca1: CoartadaPuzzle = {
  id: "coartada-facil-01",
  category: "coartada",
  title: "El anillo de bodas",
  description: "Bruno dice estar en casa desde las 20:00. El registro del edificio dice otra cosa.",
  difficulty: "facil",
  estimatedMinutes: 6,
  story: "Bruno Falk, vecino del fallecido, afirma haber estado toda la noche en su departamento. Hay cuatro testimonios y cuatro evidencias. Una pareja no cierra.",
  instructions: "Leé los testimonios y las evidencias. Seleccioná el testimonio y la evidencia que se contradicen.",
  hints: [
    { level: 1, text: "Buscá en qué momento dice Bruno haber entrado al edificio." },
    { level: 2, text: "Compará esa hora con el registro de la cámara de seguridad del lobby." },
    { level: 3, text: 'Bruno dice haber llegado a las 20:00. La cámara lo registra entrando a las 22:47.' },
  ],
  solutionExplanation: "Bruno declaró haber llegado a su departamento a las 20:00. Pero la cámara del lobby del edificio lo registró ingresando a las 22:47 — más de dos horas después del crimen.",
  suspect: { name: "Bruno Falk", emoji: "🧔", role: "El vecino" },
  items: [
    { id: "t1", kind: "testimony", label: "Bruno, sobre su llegada", content: "Llegué a casa a las 20:00. Me hice un sándwich y puse la tele.", contradictsWith: "e2" },
    { id: "t2", kind: "testimony", label: "Bruno, sobre la noche", content: "No salí en ningún momento. Ni al kiosco, ni a tirar basura, nada.", contradictsWith: "" },
    { id: "t3", kind: "testimony", label: "Bruno, sobre el ruido", content: "Escuché un portazo fuerte alrededor de las 21:00, pero no me asomé.", contradictsWith: "" },
    { id: "t4", kind: "testimony", label: "Bruno, sobre el crimen", content: "Me enteré del crimen a la mañana siguiente por el portero.", contradictsWith: "" },
    { id: "e1", kind: "evidence", label: "Ticket de supermercado", content: "Compra registrada a las 21:30 en el Super 24 a dos cuadras del edificio.", contradictsWith: "t2" },
    { id: "e2", kind: "evidence", label: "Cámara del lobby (22:47)", content: "Bruno Falk ingresa al edificio a las 22:47, con una bolsa de supermercado.", contradictsWith: "t1" },
    { id: "e3", kind: "evidence", label: "Registro de WiFi", content: "El celular de Bruno se conectó al WiFi del edificio recién a las 22:49.", contradictsWith: "" },
    { id: "e4", kind: "evidence", label: "Testigo: portero", content: "\"Bruno salió alrededor de las 21:00 con su mochila. Volvió tarde.\"", contradictsWith: "" },
  ],
  solutionPairIds: ["t1", "e2"],
};

const ca2: CoartadaPuzzle = {
  id: "coartada-medio-01",
  category: "coartada",
  title: "El médico de guardia",
  description: "La doctora Neira asegura haber operado toda la noche. Los registros hospitalarios no cuadran.",
  difficulty: "medio",
  estimatedMinutes: 10,
  story: "La doctora Selene Neira, cirujana del Hospital Central, afirma haber estado en quirófano desde las 20:00 hasta las 02:00. El paciente fallecido era su socio en un negocio inmobiliario complicado.",
  instructions: "Cruzá los testimonios con las evidencias. Encontrá el par que se contradice.",
  hints: [
    { level: 1, text: "Prestá atención al número de quirófano que menciona la doctora." },
    { level: 2, text: "¿Cuál quirófano estaba operativo esa noche según el registro hospitalario?" },
    { level: 3, text: "La doctora dice haber operado en el Quirófano 3. Ese quirófano estaba en reparación desde el lunes." },
  ],
  solutionExplanation: "La doctora Neira dijo específicamente que operó en el Quirófano 3. Pero el registro de mantenimiento del hospital confirma que ese quirófano estaba fuera de servicio por reparaciones de plomería desde el lunes anterior.",
  suspect: { name: "Dra. Selene Neira", emoji: "👩‍⚕️", role: "La cirujana" },
  items: [
    { id: "t1", kind: "testimony", label: "Dra. Neira, sobre la guardia", content: "Entré al hospital a las 19:45. Tuve dos cirugías consecutivas.", contradictsWith: "" },
    { id: "t2", kind: "testimony", label: "Dra. Neira, sobre el quirófano", content: "Operé en el Quirófano 3, que es donde trabajo habitualmente.", contradictsWith: "e3" },
    { id: "t3", kind: "testimony", label: "Dra. Neira, sobre el horario", content: "La segunda cirugía terminó cerca de las 02:00. Me fui a casa directamente.", contradictsWith: "" },
    { id: "t4", kind: "testimony", label: "Dra. Neira, sobre el paciente", content: "No tuve contacto con el señor Rao en años. Éramos socios en papel, nada más.", contradictsWith: "" },
    { id: "e1", kind: "evidence", label: "Registro de ingreso hospitalario", content: "Dra. Neira fichó entrada a las 19:48. No registra salida hasta las 03:10.", contradictsWith: "" },
    { id: "e2", kind: "evidence", label: "Historia clínica Paciente A", content: "Cirugía de rodilla realizada por Dra. Neira, 20:15-21:40, Quirófano 2.", contradictsWith: "" },
    { id: "e3", kind: "evidence", label: "Registro de mantenimiento", content: "Quirófano 3: fuera de servicio por reparaciones de plomería desde el lunes. Reapertura prevista el viernes.", contradictsWith: "t2" },
    { id: "e4", kind: "evidence", label: "Declaración del anestesista", content: "\"Operé con la Dra. Neira esa noche, pero no recuerdo el número de quirófano.\"", contradictsWith: "" },
  ],
  solutionPairIds: ["t2", "e3"],
};

const ca3: CoartadaPuzzle = {
  id: "coartada-dificil-01",
  category: "coartada",
  title: "La velada en el casino",
  description: "Maximiliano juró estar en el casino desde las 19:00. Pero su historia tiene un agujero de una hora.",
  difficulty: "dificil",
  estimatedMinutes: 14,
  story: "Maximiliano Cross, hombre de negocios, asegura haber pasado toda la noche del viernes en el Casino Dorado. El crimen ocurrió a las 21:30, a quince minutos en auto del casino.",
  instructions: "Hay cuatro testimonios y cuatro evidencias. Encontrá el par que deja a Maximiliano sin coartada.",
  hints: [
    { level: 1, text: "Analizá los registros del casino: ¿hay algún período sin actividad?" },
    { level: 2, text: "Las fichas de póker tienen timestamp. Buscá la brecha entre transacciones." },
    { level: 3, text: "Maximiliano dice haber jugado sin parar. Las fichas muestran una brecha de 90 minutos entre las 20:45 y las 22:15." },
  ],
  solutionExplanation: "Maximiliano afirmó haber jugado poker 'toda la noche sin parar'. Pero el registro de fichas del casino muestra que no realizó ninguna transacción entre las 20:45 y las 22:15 — una ventana de 90 minutos que coincide exactamente con el crimen.",
  suspect: { name: "Maximiliano Cross", emoji: "🎩", role: "El empresario" },
  items: [
    { id: "t1", kind: "testimony", label: "Maximiliano, sobre la llegada", content: "Llegué al Casino Dorado a las 19:00 y me fui después de las 23:00.", contradictsWith: "" },
    { id: "t2", kind: "testimony", label: "Maximiliano, sobre el juego", content: "Estuve toda la noche en la mesa de póker. No me levanté ni para cenar.", contradictsWith: "e2" },
    { id: "t3", kind: "testimony", label: "Maximiliano, sobre testigos", content: "El croupier Marcos puede confirmar que estuve toda la noche.", contradictsWith: "" },
    { id: "t4", kind: "testimony", label: "Maximiliano, sobre la víctima", content: "Hacía meses que no hablaba con Renata. Nuestra sociedad terminó bien.", contradictsWith: "" },
    { id: "e1", kind: "evidence", label: "Registro de entrada al casino", content: "Maximiliano Cross: ingreso 19:03, egreso 23:18. Sin salidas registradas.", contradictsWith: "" },
    { id: "e2", kind: "evidence", label: "Historial de fichas (póker)", content: "Última transacción antes de la brecha: 20:47. Próxima transacción: 22:16. Brecha de 89 minutos sin actividad.", contradictsWith: "t2" },
    { id: "e3", kind: "evidence", label: "Declaración del croupier Marcos", content: "\"Jugó en mi mesa al principio y al final de la noche. En el medio no lo vi.\"", contradictsWith: "" },
    { id: "e4", kind: "evidence", label: "Cámara de estacionamiento", content: "El auto de Maximiliano no se movió del estacionamiento del casino en toda la noche.", contradictsWith: "" },
  ],
  solutionPairIds: ["t2", "e2"],
};

export const COARTADA_PUZZLES: CoartadaPuzzle[] = [ca1, ca2, ca3];
export function getCoartadaPuzzle(id: string) {
  return COARTADA_PUZZLES.find((p) => p.id === id);
}
