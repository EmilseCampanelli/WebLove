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
    { level: 3, text: "Bruno dice haber llegado a las 20:00. La cámara lo registra entrando a las 22:47." },
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

// ── PUZZLE 4 ─────────────────────────────────────────────────────────────────

const ca4: CoartadaPuzzle = {
  id: "coartada-facil-02",
  category: "coartada",
  title: "La fiesta de cumpleaños",
  description: "Valentina dice haber llegado a la fiesta a las 16:00. Una foto lo desmiente.",
  difficulty: "facil",
  estimatedMinutes: 5,
  story: "Valentina Roca, madrina de la nena, asegura haber estado en la fiesta de cumpleaños de su ahijada desde las 16:00. El crimen ocurrió a las 17:30, a dos cuadras de su propio domicilio.",
  instructions: "Leé los testimonios y las evidencias. Seleccioná el testimonio y la evidencia que se contradicen.",
  hints: [
    { level: 1, text: "Fijate en la hora exacta que declara Valentina para su llegada a la fiesta." },
    { level: 2, text: "Revisá los metadatos de las fotos del festejo." },
    { level: 3, text: "Valentina dice haber llegado a las 16:00, pero la primera foto donde aparece fue tomada a las 19:47." },
  ],
  solutionExplanation: "Valentina afirmó haber llegado a la fiesta a las 16:00 y haber ayudado a decorar. Pero los metadatos del álbum familiar revelan que la primera fotografía donde ella aparece fue tomada a las 19:47 — casi cuatro horas después, y dos horas después del crimen.",
  suspect: { name: "Valentina Roca", emoji: "👩", role: "La madrina" },
  items: [
    { id: "t1", kind: "testimony", label: "Valentina, sobre su llegada", content: "Llegué a lo de mi hermana a las 16:00. Ayudé a inflar globos y a poner la mesa.", contradictsWith: "e1" },
    { id: "t2", kind: "testimony", label: "Valentina, sobre la tarde", content: "Estuve todo el tiempo con los chicos en el patio. No me moví de ahí.", contradictsWith: "" },
    { id: "t3", kind: "testimony", label: "Valentina, sobre su salida", content: "Me fui cuando la nena ya estaba dormida, cerca de las 22:00.", contradictsWith: "" },
    { id: "e1", kind: "evidence", label: "Metadatos del álbum familiar", content: "Primera fotografía donde aparece Valentina Roca: 19:47:32 hs. Cámara del celular de la hermana.", contradictsWith: "t1" },
    { id: "e2", kind: "evidence", label: "Declaración de la hermana", content: "\"Valentina llegó tarde, cuando ya habíamos cantado el feliz cumpleaños y cortado la torta.\"", contradictsWith: "" },
  ],
  solutionPairIds: ["t1", "e1"],
};

// ── PUZZLE 5 ─────────────────────────────────────────────────────────────────

const ca5: CoartadaPuzzle = {
  id: "coartada-facil-03",
  category: "coartada",
  title: "El partido suspendido",
  description: "Marcos dice haber visto el partido completo. Pero el partido no se terminó.",
  difficulty: "facil",
  estimatedMinutes: 5,
  story: "Marcos Durán, hincha fanático, asegura haber estado en el estadio viendo el partido de Racing toda la noche. El crimen ocurrió a las 21:00, a tres cuadras del estadio.",
  instructions: "Leé los testimonios y las evidencias. Seleccioná el testimonio y la evidencia que se contradicen.",
  hints: [
    { level: 1, text: "Marcos dice que vio el resultado final del partido. ¿Hubo resultado final esa noche?" },
    { level: 2, text: "Buscá si el partido se jugó normalmente hasta el final." },
    { level: 3, text: "Marcos menciona el marcador final. Ese partido fue suspendido a los 20 minutos de juego por tormenta eléctrica y nunca se reanudó." },
  ],
  solutionExplanation: "Marcos declaró que Racing ganó 2 a 1 y que se quedó hasta el pitido final. Pero el comunicado oficial de Racing Club confirma que el partido fue suspendido a los 20 minutos de juego por tormenta eléctrica y nunca se reanudó — por lo que no hubo resultado final posible.",
  suspect: { name: "Marcos Durán", emoji: "⚽", role: "El hincha" },
  items: [
    { id: "t1", kind: "testimony", label: "Marcos, sobre el partido", content: "El partido estuvo buenísimo. Ganamos 2 a 1. Me quedé hasta el pitido final.", contradictsWith: "e2" },
    { id: "t2", kind: "testimony", label: "Marcos, sobre su ubicación", content: "Estaba en la tribuna popular, sector norte, con unos amigos del club.", contradictsWith: "" },
    { id: "t3", kind: "testimony", label: "Marcos, sobre su regreso", content: "Salí del estadio a las 22:30 y me fui directo a casa en subte.", contradictsWith: "" },
    { id: "e1", kind: "evidence", label: "Ticket de entrada", content: "Marcos Durán, tribuna popular sector norte, ingreso registrado 19:58.", contradictsWith: "" },
    { id: "e2", kind: "evidence", label: "Comunicado oficial Racing Club", content: "Partido suspendido a los 20 minutos del primer tiempo por tormenta eléctrica. No se reanudó. Marcador al momento de suspensión: 0 a 0.", contradictsWith: "t1" },
  ],
  solutionPairIds: ["t1", "e2"],
};

// ── PUZZLE 6 ─────────────────────────────────────────────────────────────────

const ca6: CoartadaPuzzle = {
  id: "coartada-medio-02",
  category: "coartada",
  title: "El vuelo de negocios",
  description: "Claudia asegura estar en el aeropuerto desde las 18:30. Una compra la ubica a 38 km de ahí.",
  difficulty: "medio",
  estimatedMinutes: 9,
  story: "Claudia Paz, ejecutiva de una firma de consultoría, dice haber llegado al aeropuerto de Ezeiza a las 18:30 para tomar un vuelo a Mendoza. El crimen ocurrió a las 19:45 en Palermo.",
  instructions: "Cruzá los testimonios con las evidencias. Encontrá el par que se contradice.",
  hints: [
    { level: 1, text: "Claudia dice que estuvo en el aeropuerto desde las 18:30. Buscá registros de su ubicación real esa tarde." },
    { level: 2, text: "Revisá las transacciones de su tarjeta de crédito entre las 18:00 y las 20:30." },
    { level: 3, text: "A las 19:12 su tarjeta registró una compra en un restaurante de Palermo, a 38 km del aeropuerto." },
  ],
  solutionExplanation: "Claudia declaró haber llegado al aeropuerto a las 18:30 y no haberse movido hasta embarcar. Sin embargo, su tarjeta de crédito registró una compra a las 19:12 en el Restaurante La Esquina de Palermo — a 38 km de Ezeiza y a minutos de la escena del crimen.",
  suspect: { name: "Claudia Paz", emoji: "💼", role: "La ejecutiva" },
  items: [
    { id: "t1", kind: "testimony", label: "Claudia, sobre su llegada al aeropuerto", content: "Llegué a Ezeiza a las 18:30. Me senté a esperar en la sala de embarque internacional.", contradictsWith: "e4" },
    { id: "t2", kind: "testimony", label: "Claudia, sobre sus llamadas", content: "Llamé a mi asistente desde el aeropuerto alrededor de las 19:00 para confirmar la reunión.", contradictsWith: "" },
    { id: "t3", kind: "testimony", label: "Claudia, sobre el embarque", content: "Embarqué puntual a las 20:15 y aterricé en Mendoza a las 21:45.", contradictsWith: "" },
    { id: "t4", kind: "testimony", label: "Claudia, sobre sus movimientos", content: "No me moví del aeropuerto en ningún momento. Ni siquiera salí a fumar.", contradictsWith: "e4" },
    { id: "e1", kind: "evidence", label: "Check-in electrónico", content: "Claudia Paz, vuelo AR214 Mendoza. Check-in online realizado a las 14:20.", contradictsWith: "" },
    { id: "e2", kind: "evidence", label: "Tarjeta de embarque escaneada", content: "Registro de boarding pass: 20:17 hs, puerta 14.", contradictsWith: "" },
    { id: "e3", kind: "evidence", label: "Registro de llamada telefónica", content: "Llamada saliente desde el celular de Claudia: 19:03 hs, duración 4 minutos.", contradictsWith: "" },
    { id: "e4", kind: "evidence", label: "Compra con tarjeta de crédito", content: "Restaurante La Esquina, Thames 1482, Palermo (a 38 km del aeropuerto): $8.400 con tarjeta Visa de Claudia Paz, 19:12 hs.", contradictsWith: "t1" },
  ],
  solutionPairIds: ["t1", "e4"],
};

// ── PUZZLE 7 ─────────────────────────────────────────────────────────────────

const ca7: CoartadaPuzzle = {
  id: "coartada-medio-03",
  category: "coartada",
  title: "El velatorio interminable",
  description: "Sebastián dice no haber movido el auto en toda la noche. El registro de peaje no opina lo mismo.",
  difficulty: "medio",
  estimatedMinutes: 10,
  story: "Sebastián Torres, primo del fallecido, asegura haber estado toda la noche en el velatorio de su tío en la cochería de Flores. El crimen ocurrió a las 23:00 en Villa del Parque.",
  instructions: "Cruzá los testimonios con las evidencias. Encontrá el par que se contradice.",
  hints: [
    { level: 1, text: "Sebastián dice que no movió el auto en ningún momento. Buscá registros de tránsito esa noche." },
    { level: 2, text: "Revisá si hay algún registro de peaje o de cámaras viales que involucre su patente." },
    { level: 3, text: "El sistema de peaje registra su auto pasando por la autopista Ricchieri a las 23:08, a 25 km de la cochería." },
  ],
  solutionExplanation: "Sebastián declaró haber dejado el auto estacionado y no haberlo movido en toda la noche. Pero el sistema de peaje electrónico registró su patente a las 23:08 en el km 12 de la autopista Ricchieri, dirección sur — a 25 km de la cochería y en el horario exacto del crimen.",
  suspect: { name: "Sebastián Torres", emoji: "🧥", role: "El primo" },
  items: [
    { id: "t1", kind: "testimony", label: "Sebastián, sobre su llegada", content: "Llegué al velatorio a las 20:00 y no me fui hasta que cerraron, cerca de las 02:00.", contradictsWith: "" },
    { id: "t2", kind: "testimony", label: "Sebastián, sobre el libro de visitas", content: "Firmé el libro apenas llegué. Es mi tío, no iba a irme sin despedirme.", contradictsWith: "" },
    { id: "t3", kind: "testimony", label: "Sebastián, sobre el auto", content: "Vine en auto pero lo dejé en la calle toda la noche. No lo moví.", contradictsWith: "e4" },
    { id: "t4", kind: "testimony", label: "Sebastián, sobre la familia", content: "Estuve consolando a mi tía toda la noche. Podés preguntarle a ella.", contradictsWith: "" },
    { id: "e1", kind: "evidence", label: "Libro de visitas de la cochería", content: "Firma de Sebastián Torres registrada: 20:18 hs.", contradictsWith: "" },
    { id: "e2", kind: "evidence", label: "Declaración de la tía", content: "\"Sebastián estuvo un rato al principio. Después lo busqué y no lo encontré más. Apareció recién cerca de las 02:00.\"", contradictsWith: "" },
    { id: "e3", kind: "evidence", label: "Cámara exterior de la cochería", content: "La cámara muestra a Sebastián saliendo del local a las 22:41. No registra su reingreso hasta las 01:53.", contradictsWith: "" },
    { id: "e4", kind: "evidence", label: "Registro de peaje electrónico", content: "Patente del vehículo de Sebastián Torres: autopista Ricchieri km 12, 23:08 hs, dirección sur.", contradictsWith: "t3" },
  ],
  solutionPairIds: ["t3", "e4"],
};

// ── PUZZLE 8 ─────────────────────────────────────────────────────────────────

const ca8: CoartadaPuzzle = {
  id: "coartada-dificil-02",
  category: "coartada",
  title: "La noche de jazz",
  description: "Ramiro asegura haber tocado tres sets hasta medianoche. El local cerró mucho antes.",
  difficulty: "dificil",
  estimatedMinutes: 13,
  story: "Ramiro Gutiérrez, músico de jazz, dice haber actuado con su banda en el Club Riviera toda la noche del sábado. El crimen ocurrió a las 23:30, a diez minutos del club.",
  instructions: "Hay cuatro testimonios y cuatro evidencias. Encontrá el par que destruye la coartada de Ramiro.",
  hints: [
    { level: 1, text: "Ramiro menciona cuántos sets tocaron y a qué hora fue el último. Verificá si eso fue posible." },
    { level: 2, text: "Buscá si hubo algún incidente esa noche que haya afectado el horario del local." },
    { level: 3, text: "Una denuncia por ruidos hizo cerrar el local a las 23:10. El tercer set que menciona Ramiro habría sido después de esa hora." },
  ],
  solutionExplanation: "Ramiro afirmó haber tocado un tercer set 'cerca de medianoche'. Pero el registro policial muestra que el Club Riviera recibió una denuncia por ruidos a las 22:50 y fue obligado a cerrar a las 23:10 — lo que hace imposible cualquier presentación posterior.",
  suspect: { name: "Ramiro Gutiérrez", emoji: "🎷", role: "El músico" },
  items: [
    { id: "t1", kind: "testimony", label: "Ramiro, sobre la actuación", content: "Tocamos en el Club Riviera toda la noche. Fue una noche excelente, local lleno.", contradictsWith: "" },
    { id: "t2", kind: "testimony", label: "Ramiro, sobre los sets", content: "Hicimos tres sets: el primero a las 21:00, el segundo a las 22:15, y el tercero arrancó cerca de medianoche.", contradictsWith: "e4" },
    { id: "t3", kind: "testimony", label: "Ramiro, sobre el cierre", content: "Después del último set nos quedamos guardando el equipo hasta la 01:00.", contradictsWith: "" },
    { id: "t4", kind: "testimony", label: "Ramiro, sobre la víctima", content: "No conozco a ningún Leandro Páez. Nunca crucé una palabra con esa persona.", contradictsWith: "" },
    { id: "e1", kind: "evidence", label: "Flyer del evento", content: "Club de Jazz Riviera presenta: Ramiro & The Band. Sábado desde las 21:00 hs.", contradictsWith: "" },
    { id: "e2", kind: "evidence", label: "Declaración del barman", content: "\"Tocaron los primeros dos sets. Después llegó la policía por la denuncia de los vecinos.\"", contradictsWith: "" },
    { id: "e3", kind: "evidence", label: "Publicación en redes del club", content: "\"Lamentablemente debemos cerrar esta noche antes de lo previsto. Disculpen las molestias.\" Publicada a las 23:05.", contradictsWith: "" },
    { id: "e4", kind: "evidence", label: "Registro policial – Comisaría 14ª", content: "Denuncia por ruidos molestos: Club Riviera, 22:50 hs. Inspección en el lugar: 23:05 hs. Orden de cierre inmediato ejecutada a las 23:10 hs.", contradictsWith: "t2" },
  ],
  solutionPairIds: ["t2", "e4"],
};

// ── PUZZLE 9 ─────────────────────────────────────────────────────────────────

const ca9: CoartadaPuzzle = {
  id: "coartada-dificil-03",
  category: "coartada",
  title: "El retiro espiritual",
  description: "Inés dice haber estado sin señal en las sierras todo el fin de semana. Su teléfono estuvo en Buenos Aires.",
  difficulty: "dificil",
  estimatedMinutes: 15,
  story: "Inés Montero, empresaria del rubro textil, asegura haber participado de un retiro espiritual en las sierras de Córdoba desde el viernes al mediodía hasta el domingo. El crimen ocurrió el sábado a la noche en Palermo.",
  instructions: "Hay cuatro testimonios y cuatro evidencias. Encontrá el par que derrumba la coartada de Inés.",
  hints: [
    { level: 1, text: "Inés dice que no tenía señal en las sierras. Buscá si su celular tuvo alguna actividad ese fin de semana." },
    { level: 2, text: "Los operadores de telefonía registran a qué torre se conecta cada teléfono. Verificá esa información." },
    { level: 3, text: "Su celular se conectó a una antena de Palermo (Buenos Aires) el sábado a las 22:47, mientras ella supuestamente estaba en Córdoba sin señal." },
  ],
  solutionExplanation: "Inés declaró que en el retiro no había señal de celular ni WiFi y que estuvo completamente desconectada. Sin embargo, el registro de la compañía telefónica ubica su dispositivo conectado a una antena de Palermo, Buenos Aires, el sábado a las 22:47 — en el horario del crimen y a 700 km del lugar donde supuestamente se encontraba.",
  suspect: { name: "Inés Montero", emoji: "🧘", role: "La empresaria" },
  items: [
    { id: "t1", kind: "testimony", label: "Inés, sobre el retiro", content: "Salí el viernes al mediodía hacia las sierras de Punilla. No bajé a la ciudad hasta el domingo a la tarde.", contradictsWith: "" },
    { id: "t2", kind: "testimony", label: "Inés, sobre la comunicación", content: "No había señal de celular ni WiFi en el lugar. Estuve completamente desconectada todo el fin de semana.", contradictsWith: "e3" },
    { id: "t3", kind: "testimony", label: "Inés, sobre su compañera de cuarto", content: "Compartí habitación con Daniela Ruiz durante todo el retiro. Puede confirmarlo.", contradictsWith: "" },
    { id: "t4", kind: "testimony", label: "Inés, sobre el registro", content: "El retiro lleva registro de asistencia. Mi nombre tiene que aparecer los dos días.", contradictsWith: "" },
    { id: "e1", kind: "evidence", label: "Registro del retiro espiritual", content: "Inés Montero: check-in viernes 14:30. Asistencia al taller de meditación del sábado por la mañana: confirmada.", contradictsWith: "" },
    { id: "e2", kind: "evidence", label: "Declaración de Daniela Ruiz", content: "\"Compartimos el cuarto. El sábado a la noche me desperté a las 02:00 y la cama de Inés estaba vacía. Apareció a la mañana siguiente.\"", contradictsWith: "" },
    { id: "e3", kind: "evidence", label: "Registro de torre celular (Movistar)", content: "Dispositivo IMEI asociado a Inés Montero: conexión a antena Palermo Sur, Buenos Aires, sábado 22:47 hs. Duración de conexión: 38 minutos.", contradictsWith: "t2" },
    { id: "e4", kind: "evidence", label: "Registro de peaje – Autopista Panamericana", content: "Vehículo a nombre de Inés Montero: sábado 20:15 hs, dirección Buenos Aires.", contradictsWith: "" },
  ],
  solutionPairIds: ["t2", "e3"],
};

// ── PUZZLE 10 ────────────────────────────────────────────────────────────────

const ca10: CoartadaPuzzle = {
  id: "coartada-experto-01",
  category: "coartada",
  title: "El anticuario",
  description: "Lorenzo dice haber encendido la calefacción a las 21:30. El termostato inteligente registró otra cosa.",
  difficulty: "experto",
  estimatedMinutes: 20,
  story: "Lorenzo Vidal, anticuario y tasador de manuscritos, asegura haber estado en su librería toda la noche catalogando adquisiciones. La víctima era su mayor competidor en la subasta de un manuscrito del siglo XIX.",
  instructions: "Hay cinco testimonios y cinco evidencias. Uno de los detalles que Lorenzo menciona es técnicamente imposible según los registros del local. Encontrá ese par.",
  hints: [
    { level: 1, text: "Lorenzo menciona un detalle sobre la temperatura del local esa noche. Buscá evidencia que registre el comportamiento de la calefacción." },
    { level: 2, text: "El termostato inteligente registra no solo temperatura sino también presencia de movimiento. Analizá ese log con atención." },
    { level: 3, text: "Lorenzo dice haber prendido la calefacción a las 21:30, pero el termostato se apagó automáticamente a las 20:58 por ausencia de movimiento — y el próximo encendido registrado fue a las 23:41." },
  ],
  solutionExplanation: "Lorenzo afirmó que a las 21:30 prendió la calefacción porque refrescó. Pero el log del termostato inteligente Nest revela que el sistema se apagó automáticamente a las 20:58 al detectar ausencia de movimiento en el local — lo que significa que el lugar estaba vacío. El siguiente encendido registrado fue a las 23:41. Si Lorenzo hubiera estado presente a las 21:30, el sensor de presencia habría mantenido el sistema activo.",
  suspect: { name: "Lorenzo Vidal", emoji: "📚", role: "El anticuario" },
  items: [
    { id: "t1", kind: "testimony", label: "Lorenzo, sobre la noche", content: "Estuve en la librería hasta la medianoche catalogando unas adquisiciones nuevas que llegaron esa tarde.", contradictsWith: "" },
    { id: "t2", kind: "testimony", label: "Lorenzo, sobre la calefacción", content: "A eso de las 21:30 prendí la calefacción porque empezó a refrescar bastante. Siempre lo hago desde el panel central.", contradictsWith: "e5" },
    { id: "t3", kind: "testimony", label: "Lorenzo, sobre la comida", content: "Pedí delivery a las 20:00. El muchacho llegó alrededor de las 20:40 y firmé el recibo.", contradictsWith: "" },
    { id: "t4", kind: "testimony", label: "Lorenzo, sobre la víctima", content: "Hace meses que no veía a Gerardo. Competimos en la subasta pero no hay rencor personal.", contradictsWith: "" },
    { id: "t5", kind: "testimony", label: "Lorenzo, sobre el cierre", content: "Me fui cerca de las 00:15, cerré con llave y activé la alarma como siempre.", contradictsWith: "" },
    { id: "e1", kind: "evidence", label: "Registro de delivery (PedidosYa)", content: "Pedido #448821 a nombre de Librería Vidal: confirmado 19:58 hs, entrega confirmada por el repartidor 20:37 hs.", contradictsWith: "" },
    { id: "e2", kind: "evidence", label: "Sistema de alarma del local", content: "Alarma activada (cierre): 00:22 hs. Sin disparos ni interrupciones durante la noche.", contradictsWith: "" },
    { id: "e3", kind: "evidence", label: "Cámara exterior de la librería", content: "Lorenzo Vidal ingresa al local: 17:28 hs. No se registra salida hasta las 00:20 hs.", contradictsWith: "" },
    { id: "e4", kind: "evidence", label: "Declaración del vecino del local", content: "\"Vi luz adentro hasta tarde. Pasé cerca de las 23:00 y había luz en el fondo.\"", contradictsWith: "" },
    { id: "e5", kind: "evidence", label: "Log del termostato inteligente (Nest)", content: "18:00 – Calefacción ON (manual). 20:58 – Calefacción OFF automático: sensor de presencia sin movimiento detectado. 23:41 – Calefacción ON (manual). El sistema no registra actividad entre 20:58 y 23:41.", contradictsWith: "t2" },
  ],
  solutionPairIds: ["t2", "e5"],
};

export const COARTADA_PUZZLES: CoartadaPuzzle[] = [
  ca1,
  ca2,
  ca3,
  ca4,
  ca5,
  ca6,
  ca7,
  ca8,
  ca9,
  ca10,
];

export function getCoartadaPuzzle(id: string) {
  return COARTADA_PUZZLES.find((p) => p.id === id);
}
