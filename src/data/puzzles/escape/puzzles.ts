import { EscapePuzzle } from "./types";

// ─── FÁCIL ────────────────────────────────────────────────────────────────────

const e1: EscapePuzzle = {
  id: "escape-facil-01",
  category: "escape",
  title: "La cámara del Barón",
  description: "Tres cerrojos. Tres pistas. Un asesino esperando del otro lado.",
  difficulty: "facil",
  estimatedMinutes: 12,
  story: "Están encerrados en la cámara secreta de la mansión. El asesino volvió. Para escapar, necesitan abrir tres cerrojos en orden. Cada pista conduce al siguiente.",
  instructions: "Resuelvan cada paso en orden. Escriban el código para avanzar al siguiente. No pueden saltar pasos.",
  location: "Cámara secreta — Mansión Aldrich",
  steps: [
    {
      id: "s1",
      title: "El cuadro del ancestro",
      description: "En la pared hay un cuadro del Barón fundador. Detrás hay una placa grabada con este mensaje:",
      type: "riddle",
      prompt: "\"El año en que murió mi fundador es la clave. Nació en 1842. Vivió exactamente 67 años.\"",
      answer: "1909",
      answerDisplay: "1909",
      successText: "El primer cerrojo cede. Al costado aparece una caja con un papel.",
      failText: "El cerrojo no cede. Revisá el cálculo.",
    },
    {
      id: "s2",
      title: "El papel en la caja",
      description: "El papel tiene un mensaje cifrado: las palabras están en orden inverso.",
      type: "riddle",
      prompt: "\"ABIERT LA PUERTA / ROJA ES / LA COMBINACION\"  \n→ Invertí cada par de palabras. ¿Qué color es la combinación?",
      answer: "ROJA",
      answerDisplay: "ROJA",
      successText: "Hay una caja roja en el rincón. La abrís y encontrás un disco numerado.",
      failText: "El sistema no responde. Revisen el mensaje invertido.",
    },
    {
      id: "s3",
      title: "El disco numerado",
      description: "El disco tiene 8 números. La combinación correcta son los números primos del 1 al 10, en orden.",
      type: "sequence",
      prompt: "Escribí los números primos del 1 al 10 pegados, sin espacios.",
      answer: "2357",
      answerDisplay: "2357",
      successText: "¡La puerta se abre! Escaparon. Y en el piso, una nota: 'Ya sé quién sos — Gregor'.",
      failText: "El disco gira en falso. Revisen cuáles son los primos.",
    },
  ],
  finalReveal:
    "El asesino sabía que estaban investigando. La nota los confirma como próximos objetivos — pero ahora tienen su nombre: Gregor.",
  hints: [
    { level: 1, text: "El primer cerrojo: buscá en el cuadro del ancestro. Calculá el año de muerte." },
    { level: 2, text: "El segundo cerrojo: invertí las palabras del mensaje." },
    { level: 3, text: "Tercer cerrojo: los números primos del 1 al 10 son 2, 3, 5 y 7." },
  ],
  solutionExplanation:
    "Los tres cerrojos: 1909 (año de muerte) → ROJA (texto invertido) → 2357 (primos del 1 al 10). El nombre del asesino era Gregor.",
};

const e_facil02: EscapePuzzle = {
  id: "escape-facil-02",
  category: "escape",
  title: "El laberinto de libros",
  description: "Atrapados entre estantes. El asesino del bibliotecario anda suelto.",
  difficulty: "facil",
  estimatedMinutes: 12,
  story:
    "Están en la Biblioteca del Instituto Valdés cuando alguien cierra la puerta desde afuera con llave. El bibliotecario apareció muerto esta mañana y el culpable sigue en el edificio. Tres cerrojos separan la salida.",
  instructions: "Resuelvan cada paso en orden. La respuesta de uno lleva al siguiente.",
  location: "Biblioteca — Instituto Valdés",
  steps: [
    {
      id: "s1",
      title: "La ficha de catálogo",
      description:
        "En el escritorio del bibliotecario hay una ficha de catálogo con un mensaje subrayado en rojo:",
      type: "riddle",
      prompt:
        "\"El primer cerrojo se abre con el número de vocales en el nombre de este lugar.\"\n→ ¿Cuántas vocales tiene la palabra BIBLIOTECA?",
      answer: "5",
      answerDisplay: "5",
      successText:
        "El primer cerrojo cede. Al lado aparece una hilera de cajones numerados.",
      failText: "El cerrojo no responde. Contá las vocales con cuidado.",
    },
    {
      id: "s2",
      title: "El cajón número 5",
      description:
        "El cajón 5 está abierto. Dentro hay una nota con una ecuación incompleta:",
      type: "combination",
      prompt:
        "\"El siguiente código es: estantes de la sala (8) + años que lleva abierta la biblioteca (12) − mesas en la sala (3) = ?\"\n→ Calculá el resultado.",
      answer: "17",
      answerDisplay: "17",
      successText:
        "Una palanca cede. En el rincón aparece un armario metálico con teclado numérico.",
      failText: "El mecanismo no reacciona. Revisá la suma y la resta.",
    },
    {
      id: "s3",
      title: "El armario de seguridad",
      description:
        "El armario pide una secuencia de 4 dígitos. En la puerta hay un adhesivo amarillento con letra del bibliotecario:",
      type: "sequence",
      prompt:
        "\"La clave es la sucesión de Fibonacci que empieza en 1, 1, 2, 3… Escribí los primeros cuatro términos seguidos, sin espacios.\"",
      answer: "1123",
      answerDisplay: "1123",
      successText:
        "¡El armario abre! Dentro están las llaves y un diario personal. La salida está a la vista.",
      failText: "La secuencia no es correcta. La sucesión empieza en 1, 1, 2, 3…",
    },
  ],
  finalReveal:
    "El diario del bibliotecario revela todo: descubrió documentos falsificados sobre el origen del Instituto. La Directora Voss contrató a alguien para silenciarlo antes de que pudiera hablar.",
  hints: [
    { level: 1, text: "Paso 1: contá las vocales (I, O, E, A…) en BIBLIOTECA." },
    { level: 2, text: "Paso 2: hacé la operación 8 + 12 − 3." },
    { level: 3, text: "Paso 3: la sucesión de Fibonacci comienza 1, 1, 2, 3. Los cuatro primeros números seguidos son 1123." },
  ],
  solutionExplanation:
    "Tres pasos: 5 (vocales en BIBLIOTECA) → 17 (8+12−3) → 1123 (Fibonacci). La asesina era la Directora Voss.",
};

const e_facil03: EscapePuzzle = {
  id: "escape-facil-03",
  category: "escape",
  title: "El error del alquimista",
  description: "Encerrados en el laboratorio. El asesino conoce la química mejor que nadie.",
  difficulty: "facil",
  estimatedMinutes: 13,
  story:
    "La puerta del Laboratorio Thorn se cerró de golpe y el seguro cayó. La colaboradora del Dr. Thorn fue hallada envenenada esta mañana. El Dr. Thorn tiene coartada, pero algo no cierra. Tres pasos para salir.",
  instructions: "Cada paso da un número que abre el siguiente. Calculen con cuidado.",
  location: "Laboratorio — Instituto Thorn",
  steps: [
    {
      id: "s1",
      title: "La pizarra de geometría",
      description:
        "En la pizarra hay un diagrama con dos figuras y una instrucción subrayada:",
      type: "riddle",
      prompt:
        "\"La clave del primer gabinete es: número de lados de un hexágono × número de patas de un insecto.\"\n→ ¿Cuánto es?",
      answer: "36",
      answerDisplay: "36",
      successText:
        "El gabinete 36 se abre. Dentro hay un frasco etiquetado y una hoja de instrucciones.",
      failText: "El código no abre nada. Pensá bien en las figuras: ¿cuántos lados tiene un hexágono?",
    },
    {
      id: "s2",
      title: "Las instrucciones del gabinete",
      description:
        "La hoja de instrucciones del gabinete 36 dice en letra apurada:",
      type: "combination",
      prompt:
        "\"El código de la esclusa de ventilación es: el número de este gabinete dividido entre 4, más 5.\"\n→ Usá el número del gabinete anterior para calcularlo.",
      answer: "14",
      answerDisplay: "14",
      successText:
        "La esclusa se desbloquea. Hay un panel de control al fondo con una pantalla que pide una fecha.",
      failText: "La esclusa no responde. Revisá el cálculo: 36 ÷ 4 + 5.",
    },
    {
      id: "s3",
      title: "El panel de control",
      description:
        "El panel pide un año de 4 dígitos. Una placa conmemorativa en la pared dice:",
      type: "combination",
      prompt:
        "\"En honor al primer Premio Nobel de Marie Curie (1903). El código de evacuación es ese año menos el resultado que obtuvieron en el paso anterior.\"\n→ 1903 − __ = ?",
      answer: "1889",
      answerDisplay: "1889",
      successText:
        "¡Las puertas se abren! Escaparon. El panel imprime un registro automático de quién accedió al gabinete 36 esta mañana.",
      failText: "El año no es correcto. Restá el número del paso 2 a 1903.",
    },
  ],
  finalReveal:
    "El registro del panel es contundente: el Dr. Arno Thorn accedió al gabinete 36 a las 7:14 AM, antes de que llegara su colaboradora. El compuesto del frasco era el veneno. Lo hizo para quedarse con el crédito del descubrimiento de ambos.",
  hints: [
    { level: 1, text: "Paso 1: hexágono tiene 6 lados, un insecto tiene 6 patas. 6 × 6 = 36." },
    { level: 2, text: "Paso 2: 36 ÷ 4 = 9, y 9 + 5 = 14." },
    { level: 3, text: "Paso 3: el primer Nobel de Curie fue en 1903. 1903 − 14 = 1889." },
  ],
  solutionExplanation:
    "Tres pasos: 36 (6×6) → 14 (36÷4+5) → 1889 (1903−14). El asesino era el Dr. Arno Thorn.",
};

// ─── MEDIO ────────────────────────────────────────────────────────────────────

const e2: EscapePuzzle = {
  id: "escape-medio-01",
  category: "escape",
  title: "El sótano del hotel",
  description: "Cuatro pasos para salir del sótano antes de que vuelva el asesino.",
  difficulty: "medio",
  estimatedMinutes: 18,
  story:
    "Investigando el Hotel Pavone quedaron encerrados en el sótano. El asesino los vio entrar. Tienen cuatro pasos para salir antes de que regrese.",
  instructions: "Cada paso los acerca a la salida. Lean bien las pistas y no desperdicien tiempo.",
  location: "Sótano — Hotel Pavone",
  steps: [
    {
      id: "s1",
      title: "El panel eléctrico",
      description: "El panel tiene 4 cables: rojo, azul, verde, amarillo. Un cartel dice:",
      type: "sequence",
      prompt:
        "\"Nunca cortés el que da luz. El azul está frío. El verde va después del rojo. El amarillo es la trampa.\"\n→ ¿Cuál es el orden correcto de los dos cables a conectar para abrir la puerta? (rojo, verde, azul o amarillo)",
      answer: "ROJO VERDE",
      answerDisplay: "ROJO VERDE",
      successText: "La luz se enciende y escuchan un clic en la puerta norte.",
      failText: "Una chispa. Algo se cortó. Reintenten con el orden correcto.",
    },
    {
      id: "s2",
      title: "El armario con candado",
      description: "El armario norte tiene un candado de 3 letras. En la puerta hay un mensaje:",
      type: "riddle",
      prompt: "\"Soy la palabra que todos dicen cuando no saben nada.\" — 3 letras.",
      answer: "SOS",
      answerDisplay: "SOS",
      successText: "El armario abre. Dentro hay una linterna y un mapa del sótano.",
      failText: "El candado no abre. Pista: es un grito de socorro.",
    },
    {
      id: "s3",
      title: "El mapa del sótano",
      description: "El mapa marca una X con un número. La bodega está marcada como salida.",
      type: "combination",
      prompt:
        "El mapa tiene anotado: 'La bodega = habitación cuyo número es: (habitaciones totales × 2) - 6'. El sótano tiene 8 habitaciones.",
      answer: "10",
      answerDisplay: "10",
      successText: "Encuentran la habitación 10 — la bodega. Hay una salida hacia el jardín.",
      failText: "No encuentran la habitación. Revisen la operación.",
    },
    {
      id: "s4",
      title: "La salida de la bodega",
      description:
        "La puerta de la bodega tiene un cierre digital de 4 dígitos. Una botella de vino tiene una etiqueta con el año de la cosecha y esta nota:",
      type: "combination",
      prompt: "\"El código es el año de esta cosecha al revés.\" La etiqueta dice: Cosecha 1968.",
      answer: "8691",
      answerDisplay: "8691",
      successText:
        "¡Libres! Salen al jardín. Escuchan pasos volver hacia el sótano. Justo a tiempo.",
      failText: "El código no funciona. Reversen el año.",
    },
  ],
  finalReveal:
    "Escaparon por segundos. Desde el jardín vieron al Inspector Mora entrar al sótano. Era él todo el tiempo.",
  hints: [
    {
      level: 1,
      text: "Paso 1: el cable que da luz no se corta. El azul está frío = no es luz. El amarillo es trampa.",
    },
    { level: 2, text: "Paso 2: la palabra de 3 letras que se dice cuando no sabés nada es SOS." },
    { level: 3, text: "Paso 4: 1968 al revés es 8691." },
  ],
  solutionExplanation:
    "Rojo→Verde, SOS, habitación 10, código 8691. El asesino era el Inspector Mora.",
};

const e_medio02: EscapePuzzle = {
  id: "escape-medio-02",
  category: "escape",
  title: "El observatorio silencioso",
  description: "El astrónomo apareció muerto. Cuatro pasos para escapar antes del amanecer.",
  difficulty: "medio",
  estimatedMinutes: 20,
  story:
    "Llegaron al Observatorio Monte Renfield para investigar la muerte del astrónomo Mora. Alguien los encerró en la sala del telescopio. Tienen cuatro pasos para salir antes de que el asesino regrese con las llaves maestras.",
  instructions: "Cada paso desbloquea el siguiente. Los cálculos son clave — no improvisen.",
  location: "Observatorio — Monte Renfield",
  steps: [
    {
      id: "s1",
      title: "El panel del telescopio",
      description:
        "El panel de control del telescopio principal está bloqueado con un código numérico de 2 dígitos. Una placa de calibración en la carcasa dice:",
      type: "combination",
      prompt:
        "\"Código de desbloqueo: planetas del sistema solar × lunas de Marte.\"\n→ El sistema solar tiene 8 planetas. Marte tiene 2 lunas.",
      answer: "16",
      answerDisplay: "16",
      successText:
        "El panel se activa. Una gaveta lateral se abre automáticamente con un disco de observación adentro.",
      failText: "El panel no responde. Multiplicá los planetas por las lunas de Marte.",
    },
    {
      id: "s2",
      title: "El disco de observación",
      description:
        "El disco tiene grabadas constelaciones del zodíaco. Una de ellas está marcada con una flecha roja y una instrucción:",
      type: "riddle",
      prompt:
        "\"La constelación marcada es la del toro. Escribí su nombre en español para activar la siguiente cerradura.\"",
      answer: "TAURO",
      answerDisplay: "TAURO",
      successText:
        "Una caja de metal se desbloquea. Adentro hay tablas de posiciones estelares con anotaciones a mano.",
      failText: "El nombre no coincide. La constelación del toro en español se llama de una sola forma.",
    },
    {
      id: "s3",
      title: "Las tablas estelares",
      description:
        "Las anotaciones del astrónomo dicen: 'El código del archivo reservado es la suma de posiciones en el alfabeto de cada letra en TAURO (A=1, B=2… Z=26).'",
      type: "combination",
      prompt:
        "Sumá las posiciones de T, A, U, R y O en el alfabeto:\nT=20, A=1, U=21, R=18, O=15\n→ ¿Cuánto da la suma?",
      answer: "75",
      answerDisplay: "75",
      successText:
        "El archivo reservado se abre. Contiene fotografías, informes falsificados y un nombre repetido.",
      failText: "El código es incorrecto. Sumá 20+1+21+18+15.",
    },
    {
      id: "s4",
      title: "La puerta de salida",
      description:
        "La puerta trasera del observatorio tiene una cerradura con un acertijo grabado en latín debajo de la manija. La traducción al margen dice:",
      type: "riddle",
      prompt:
        "\"Viajo a 300.000 kilómetros por segundo. Soy lo primero que llega del espacio. Sin mí no ves nada. ¿Qué soy?\"\n→ Una sola palabra en español.",
      answer: "LUZ",
      answerDisplay: "LUZ",
      successText:
        "¡La puerta cede! Escaparon al exterior del observatorio. El cielo comienza a aclarar.",
      failText: "La cerradura no responde. ¿Qué es lo que viaja a esa velocidad y permite ver?",
    },
  ],
  finalReveal:
    "Las fotografías del archivo reservado lo confirman: el Astrónomo Renfield falsificó los datos del descubrimiento de un exoplaneta que en realidad había registrado su asistente Mora. Cuando Mora amenazó con publicar la verdad, Renfield lo silenció para siempre.",
  hints: [
    { level: 1, text: "Paso 1: 8 planetas × 2 lunas de Marte = 16." },
    { level: 2, text: "Paso 2: la constelación del toro en español es TAURO." },
    { level: 3, text: "Paso 3: T=20, A=1, U=21, R=18, O=15. La suma es 75." },
  ],
  solutionExplanation:
    "Cuatro pasos: 16 (8×2) → TAURO → 75 (suma de posiciones) → LUZ. El culpable era el Astrónomo Renfield.",
};

const e_medio03: EscapePuzzle = {
  id: "escape-medio-03",
  category: "escape",
  title: "El último telón",
  description: "El director fue envenenado en el escenario. Cuatro pasos para salir del teatro.",
  difficulty: "medio",
  estimatedMinutes: 20,
  story:
    "El Director Anatole Dupré cayó muerto durante el ensayo general del Teatro Crimson. El cuerpo todavía está en el escenario y alguien bloqueó todas las salidas desde los paneles de control. Cuatro pasos para escapar.",
  instructions: "Sigan las pistas en orden. Cada respuesta desbloquea algo nuevo.",
  location: "Teatro Crimson — Sala Principal",
  steps: [
    {
      id: "s1",
      title: "El programa del espectáculo",
      description:
        "En la butaca del director hay un programa del espectáculo con una nota manuscrita pegada:",
      type: "riddle",
      prompt:
        "\"La primera clave es el número de actos de una obra clásica de Shakespeare.\"\n→ ¿Cuántos actos tiene una obra clásica de Shakespeare?",
      answer: "5",
      answerDisplay: "5",
      successText:
        "Un compartimento bajo el asiento del director se abre. Contiene planos del teatro.",
      failText: "El número no es correcto. Pensá en la estructura clásica del teatro isabelino.",
    },
    {
      id: "s2",
      title: "Los planos del teatro",
      description:
        "Los planos tienen marcadas distintas zonas. Una instrucción en el margen dice:",
      type: "combination",
      prompt:
        "\"El código del panel técnico es: filas del anfiteatro (8) + palcos laterales (7).\"\n→ ¿Cuánto es?",
      answer: "15",
      answerDisplay: "15",
      successText:
        "El panel técnico cede. Se escucha un mecanismo activarse en los camerinos.",
      failText: "El panel no responde. Sumá 8 + 7.",
    },
    {
      id: "s3",
      title: "El camerino número 15",
      description:
        "El camerino 15 está abierto. Sobre el tocador hay un espejo y una nota con cálculos a medio terminar:",
      type: "combination",
      prompt:
        "\"El código del guardarropa es: año del primer estreno de este teatro (1987) menos el total de actores en el elenco (23).\"\n→ ¿Cuánto es?",
      answer: "1964",
      answerDisplay: "1964",
      successText:
        "El guardarropa se abre. Detrás de los trajes hay una puerta angosta que lleva a los fondos del teatro.",
      failText: "El código no funciona. Calculá 1987 − 23.",
    },
    {
      id: "s4",
      title: "El acertijo del director",
      description:
        "La puerta angosta tiene una última cerradura con un acertijo grabado en una placa de bronce:",
      type: "riddle",
      prompt:
        "\"Soy lo que el actor sostiene en la mano pero el público nunca puede tocar. Sin mí no hay personaje ni historia. ¿Qué soy?\"\n→ Una sola palabra.",
      answer: "GUION",
      answerDisplay: "GUION",
      successText:
        "¡La puerta se abre! Escaparon por los fondos al callejón trasero. En el guardarropa dejaron las pruebas.",
      failText: "La cerradura no responde. ¿Qué tiene el actor en la mano antes de aprenderse el papel?",
    },
  ],
  finalReveal:
    "En el guardarropa encontraron el guion del camerino 15 con anotaciones en el margen de la mano de la actriz principal, Vera Strand. Había planificado el envenenamiento escena por escena. Quería robarle el crédito del texto al director Dupré y quedarse con los derechos de la obra.",
  hints: [
    { level: 1, text: "Paso 1: las obras de Shakespeare tienen 5 actos." },
    { level: 2, text: "Paso 2: 8 filas + 7 palcos = 15." },
    { level: 3, text: "Paso 3: 1987 − 23 = 1964." },
  ],
  solutionExplanation:
    "Cuatro pasos: 5 (actos de Shakespeare) → 15 (8+7) → 1964 (1987−23) → GUION. La asesina era Vera Strand.",
};

// ─── DIFÍCIL ──────────────────────────────────────────────────────────────────

const e3: EscapePuzzle = {
  id: "escape-dificil-01",
  category: "escape",
  title: "El camarote del crucero",
  description: "Cinco pasos. El barco ancla en 25 minutos. Después de eso, quedan atrapados.",
  difficulty: "dificil",
  estimatedMinutes: 25,
  story:
    "Quedaron encerrados en el camarote de Madame Loretta. El barco va a anclar en un puerto sin extradición. Tienen que salir antes de eso.",
  instructions: "Cinco pasos en orden. El último revela al asesino. No salten pasos.",
  location: "Camarote B — Crucero Belladonna",
  steps: [
    {
      id: "s1",
      title: "La caja fuerte",
      description: "La caja fuerte tiene 4 dígitos. Sobre la cama hay una nota de Madame Loretta:",
      type: "combination",
      prompt:
        "\"El código es el año en que me casé. Me casé 20 años antes de morir. Este año es 2024.\"",
      answer: "2004",
      answerDisplay: "2004",
      successText: "La caja abre. Dentro hay un sobre con documentos y una llave pequeña.",
      failText: "El código no es correcto. Revisá el año de casamiento.",
    },
    {
      id: "s2",
      title: "El sobre de documentos",
      description: "Los documentos son facturas en código. Cada número representa una letra (Z=1, Y=2... A=26).",
      type: "riddle",
      prompt: "Decodificá: 26-18-26-14-25 = ?\n(Z=1, Y=2, X=3... A=26)",
      answer: "KRANZ",
      answerDisplay: "KRANZ",
      successText: "El nombre del culpable está en los documentos. Ahora necesitan llegar al puente.",
      failText: "La decodificación no cierra. Recordá: Z=1, Y=2, X=3, W=4... A=26.",
    },
    {
      id: "s3",
      title: "La llave pequeña",
      description: "La llave abre un cajón con un walkie-talkie bloqueado. El PIN es la respuesta a este acertijo:",
      type: "riddle",
      prompt:
        "\"Tengo ciudades pero no casas. Tengo montañas pero no árboles. Tengo agua pero no peces. ¿Qué soy?\" — Respondé en español, una palabra.",
      answer: "MAPA",
      answerDisplay: "MAPA",
      successText:
        "El walkie-talkie se activa. Pero está en modo silencio — necesitan un código para transmitir.",
      failText:
        "El PIN no funciona. La respuesta es algo que tiene todo eso pero en representación.",
    },
    {
      id: "s4",
      title: "El código de transmisión",
      description: "El manual del walkie-talkie tiene tachado todo excepto:",
      type: "combination",
      prompt:
        "\"Canal de emergencia: número de letras en BELLADONNA elevado al número de sospechosos arrestados en este viaje hasta ahora (0).\"",
      answer: "1",
      answerDisplay: "1",
      successText:
        "Transmiten en el canal 1. Una voz responde: '¿Quién habla?' Ahora deben identificar al culpable.",
      failText: "La transmisión falla. Cualquier número elevado a 0 es siempre lo mismo.",
    },
    {
      id: "s5",
      title: "La llamada de auxilio",
      description: "La voz del radio les pide el nombre del sospechoso antes de enviar ayuda.",
      type: "riddle",
      prompt: "Ya lo descubrieron en el paso 2. ¿Cuál es el apellido del culpable?",
      answer: "KRANZ",
      answerDisplay: "KRANZ",
      successText:
        "\"Entendido. Procedemos a detener a Sommelier Kranz. Envíen auxilio.\" El barco frena antes de anclar.",
      failText: "La voz no reconoce el nombre. Volvé al paso 2.",
    },
  ],
  finalReveal:
    "La guardia costera abordó el Belladonna. El Sommelier Kranz fue detenido intentando abandonar el barco en un bote salvavidas. Los documentos en la caja fuerte eran la prueba definitiva.",
  hints: [
    { level: 1, text: "Paso 1: 2024 - 20 = 2004." },
    { level: 2, text: "Paso 2: el cifrado Z=1, Y=2... A=26. K=11→K, R=9→R..." },
    { level: 3, text: "Paso 4: cualquier número elevado a 0 es 1." },
  ],
  solutionExplanation:
    "Caja: 2004. Cifrado: KRANZ. Acertijo: MAPA. Canal: 1. Culpable: KRANZ.",
};

const e_dificil02: EscapePuzzle = {
  id: "escape-dificil-02",
  category: "escape",
  title: "Presión crítica",
  description: "El submarino desciende. El saboteador todavía está a bordo. Cinco pasos.",
  difficulty: "dificil",
  estimatedMinutes: 28,
  story:
    "Están atrapados en la sala de mandos del NRS Poseidón después de que alguien saboteara los sistemas de navegación. El submarino sigue descendiendo. Tienen cinco pasos para restablecer el control y atrapar al traidor antes de que escape.",
  instructions: "Cada paso activa el siguiente sistema. El paso 2 revela al culpable — recuérdalo para el final.",
  location: "Sala de Mandos — Submarino NRS Poseidón",
  steps: [
    {
      id: "s1",
      title: "La escotilla de emergencia",
      description:
        "La escotilla de emergencia está bloqueada por protocolo de profundidad. El sonar emite un pitido y muestra datos en pantalla:",
      type: "combination",
      prompt:
        "\"PROTOCOLO: código de desbloqueo = profundidad actual en metros ÷ 3.\"\nEl sonar indica: profundidad actual — 150 metros.\n→ ¿Cuál es el código?",
      answer: "50",
      answerDisplay: "50",
      successText:
        "La escotilla de emergencia se abre. Dentro hay una carpeta de documentos clasificados.",
      failText: "La escotilla no cede. Dividí la profundidad entre 3.",
    },
    {
      id: "s2",
      title: "Los documentos clasificados",
      description:
        "Los documentos tienen el nombre del saboteador cifrado. El cifrado desplaza cada letra 3 posiciones hacia adelante en el alfabeto (A→D, B→E… Z→C).",
      type: "riddle",
      prompt:
        "El nombre cifrado es: Y H J D\n→ Para decodificar, retrocedé 3 posiciones en el alfabeto por cada letra.\n¿Cuál es el apellido real del saboteador?",
      answer: "VEGA",
      answerDisplay: "VEGA",
      successText:
        "El apellido del saboteador queda expuesto. Guardá ese nombre — lo necesitarán al final. Ahora activen la sala de máquinas.",
      failText: "El descifrado no es correcto. Y−3=V, H−3=E, J−3=G, D−3=A.",
    },
    {
      id: "s3",
      title: "La sala de máquinas",
      description:
        "La sala de máquinas requiere el código internacional de emergencia. En la pared hay una tabla morse de referencia:",
      type: "combination",
      prompt:
        "El SOS en morse es: ·  ·  ·  −  −  −  ·  ·  ·\n→ Contá los puntos (·) y las rayas (−) en esa señal.\n→ La clave de la sala de máquinas es: puntos × rayas.",
      answer: "18",
      answerDisplay: "18",
      successText:
        "Los motores vuelven a la vida. El reactor necesita una cámara de aislamiento desbloqueada.",
      failText: "Los motores no arrancan. Hay 6 puntos y 3 rayas en el SOS. ¿Cuánto es 6 × 3?",
    },
    {
      id: "s4",
      title: "La cámara del reactor",
      description:
        "El reactor tiene varias cámaras de aislamiento numeradas. El panel de control dice:",
      type: "combination",
      prompt:
        "\"CÁMARA DE SABOTAJE: número de la cámara = código anterior ÷ 2.\"\n→ Usá el resultado del paso 3 para calcularlo.",
      answer: "9",
      answerDisplay: "9",
      successText:
        "La cámara 9 se abre. El registro digital muestra quién entró último. El nombre en pantalla confirma todo.",
      failText: "El panel no acepta ese número. Dividí el resultado del paso 3 entre 2.",
    },
    {
      id: "s5",
      title: "El registro de acceso",
      description:
        "La pantalla de la cámara 9 pide confirmar el apellido del último operador que accedió, para emitir la orden de arresto automática al comandante.",
      type: "riddle",
      prompt:
        "Ya descubrieron el apellido del saboteador en el paso 2.\n→ ¿Cuál es el apellido del traidor?",
      answer: "VEGA",
      answerDisplay: "VEGA",
      successText:
        "\"ALERTA: orden de arresto emitida para Operador VEGA. El submarino estabiliza. Ascenso iniciado.\"",
      failText: "El sistema no reconoce ese nombre. Volvé al paso 2 para recordar el apellido.",
    },
  ],
  finalReveal:
    "El Operador de Sonar Vega había recibido sobornos de la corporación rival Hydra Corp para sabotear la misión del Poseidón. Su plan era provocar un accidente y destruir los datos de exploración submarina que el submarino había recopilado. Fue arrestado intentando borrar el registro de la cámara 9.",
  hints: [
    { level: 1, text: "Paso 1: 150 ÷ 3 = 50." },
    { level: 2, text: "Paso 2: restá 3 a cada letra. Y(25)→V(22), H(8)→E(5), J(10)→G(7), D(4)→A(1)." },
    { level: 3, text: "Paso 3: el SOS tiene 6 puntos y 3 rayas. 6 × 3 = 18." },
  ],
  solutionExplanation:
    "Cinco pasos: 50 (150÷3) → VEGA (cifrado −3) → 18 (6×3 morse) → 9 (18÷2) → VEGA. El traidor era el Operador Vega.",
};

const e_dificil03: EscapePuzzle = {
  id: "escape-dificil-03",
  category: "escape",
  title: "Expediente Rojo",
  description: "Un agente doble. Cinco pasos entre ustedes y la verdad clasificada.",
  difficulty: "dificil",
  estimatedMinutes: 30,
  story:
    "Quedaron encerrados en el Archivo Secreto de la Agencia Central después de descubrir que alguien filtró información clasificada durante décadas. Cinco pasos para acceder al expediente definitivo y exponer al agente doble.",
  instructions:
    "El paso 2 revela el nombre del agente encubierto. El paso 5 lo confirma — no lo olviden.",
  location: "Archivo Secreto — Agencia Central",
  steps: [
    {
      id: "s1",
      title: "La cámara de acceso",
      description:
        "La cámara de acceso al archivo tiene un panel con un año de 4 dígitos. Una placa de bronce en la pared dice:",
      type: "combination",
      prompt:
        "\"Fundada 50 años antes de la caída del Muro de Berlín (1989).\"\n→ ¿En qué año fue fundada la Agencia?",
      answer: "1939",
      answerDisplay: "1939",
      successText:
        "La cámara se abre. Las paredes están cubiertas de estantes con carpetas numeradas.",
      failText: "El código no es correcto. Restá 50 al año de la caída del Muro.",
    },
    {
      id: "s2",
      title: "Los párrafos del informe",
      description:
        "Dentro de la cámara hay un informe de cinco párrafos. Una nota adhesiva dice: 'El nombre del agente encubierto está oculto en la primera letra de cada párrafo, en orden.'",
      type: "riddle",
      prompt:
        "Los cinco párrafos comienzan con las palabras:\n1. Operación...\n2. Sierra...\n3. Cero...\n4. Ángel...\n5. Romeo...\n→ ¿Qué nombre forman las iniciales en orden?",
      answer: "OSCAR",
      answerDisplay: "OSCAR",
      successText:
        "El alias del agente doble es OSCAR. Ahora necesitan encontrar su número de expediente.",
      failText: "Las iniciales no coinciden. Tomá la primera letra de cada párrafo en orden.",
    },
    {
      id: "s3",
      title: "El número de expediente",
      description:
        "Una ficha en el estante central dice que el número de expediente del agente OSCAR se calcula así:",
      type: "combination",
      prompt:
        "\"Número de caso = año en que fue activo por última vez (año de fundación + 35) − año de fundación de la Agencia.\"\n→ El año de fundación ya lo calcularon. El agente fue activo 35 años después de esa fecha.\n→ ¿Cuál es el número de expediente?",
      answer: "35",
      answerDisplay: "35",
      successText:
        "El expediente 35 está en el estante indicado. Está protegido con un código adicional.",
      failText: "El número no coincide. El resultado de (año_fundación + 35) − año_fundación es siempre 35.",
    },
    {
      id: "s4",
      title: "El expediente 35",
      description:
        "El expediente 35 tiene un sello de seguridad con una cerradura de secuencia numérica. Una nota adjunta dice:",
      type: "sequence",
      prompt:
        "\"La secuencia de acceso son los números impares del 1 al 7, escritos seguidos sin espacios.\"",
      answer: "1357",
      answerDisplay: "1357",
      successText:
        "El expediente se abre. Contiene fotos, transcripciones y el alias operativo real del agente doble.",
      failText: "La cerradura no cede. Los impares del 1 al 7 son 1, 3, 5 y 7.",
    },
    {
      id: "s5",
      title: "El alias operativo",
      description:
        "El expediente revela que el agente doble operaba bajo el alias de un planeta. La última página dice:",
      type: "riddle",
      prompt:
        "\"Alias operativo: el cuarto planeta del sistema solar en orden de distancia al Sol.\"\n→ ¿Cuál es ese planeta? (en español)",
      answer: "MARTE",
      answerDisplay: "MARTE",
      successText:
        "\"ALIAS MARTE — DIRECTOR ADJUNTO SANDOVAL.\" El expediente completo está en sus manos. La salida de emergencia se activa.",
      failText: "El alias no es correcto. Mercurio, Venus, Tierra… ¿cuál es el siguiente?",
    },
  ],
  finalReveal:
    "El agente doble era el Director Adjunto Sandoval, quien operó bajo el alias MARTE durante más de tres décadas. El expediente 35 contenía pruebas de cientos de filtraciones. Sandoval fue detenido esa misma noche mientras intentaba destruir los archivos físicos.",
  hints: [
    { level: 1, text: "Paso 1: 1989 − 50 = 1939." },
    { level: 2, text: "Paso 2: Operación, Sierra, Cero, Ángel, Romeo → O, S, C, A, R = OSCAR." },
    { level: 3, text: "Paso 4: los impares del 1 al 7 son 1, 3, 5, 7 → secuencia 1357." },
  ],
  solutionExplanation:
    "Cinco pasos: 1939 (fundación) → OSCAR (iniciales) → 35 (número de caso) → 1357 (impares) → MARTE (cuarto planeta). El agente doble era el Director Adjunto Sandoval.",
};

// ─── EXPERTO ─────────────────────────────────────────────────────────────────

const e_experto01: EscapePuzzle = {
  id: "escape-experto-01",
  category: "escape",
  title: "La mansión de las sombras",
  description:
    "Seis pasos. El último requiere recordar lo que descubrieron al principio. Solo los más atentos escapan.",
  difficulty: "experto",
  estimatedMinutes: 40,
  story:
    "Están atrapados en Hawthorn Hall, una mansión victoriana sellada desde hace décadas. El heredero fue encontrado muerto esta mañana. Alguien cierra cada pasillo detrás de ustedes. Seis pasos para llegar a la cámara del testamento — y al culpable.",
  instructions:
    "Seis pasos en orden. IMPORTANTE: el nombre descubierto en el paso 2 y el número del paso 5 se necesitan juntos para completar el paso 6. No los olviden.",
  location: "Mansión Victoriana — Hawthorn Hall",
  steps: [
    {
      id: "s1",
      title: "El retrato del patriarca",
      description:
        "En el hall de entrada hay un retrato enorme del Patriarca Hawthorn. Una placa de cobre debajo dice:",
      type: "combination",
      prompt:
        "\"Cornelius Hawthorn. Nacido en 1798. Vivió 84 años.\"\n→ ¿En qué año murió el Patriarca Hawthorn?",
      answer: "1882",
      answerDisplay: "1882",
      successText:
        "El marco del retrato gira sobre un pivote. Detrás hay una sala oculta con estantes de libros.",
      failText: "El marco no se mueve. Sumá el año de nacimiento y los años vividos.",
    },
    {
      id: "s2",
      title: "Los cinco libros en clave",
      description:
        "Los estantes tienen cientos de libros, pero cinco están marcados con una cinta roja. Una nota dice: 'El nombre del responsable está oculto. La primera letra del apellido de cada autor forma el nombre, en orden.'",
      type: "riddle",
      prompt:
        "Los cinco libros marcados son, en orden:\n1. 'Sinfonías' — autor: Haydn\n2. 'Middlemarch' — autora: Eliot\n3. 'Principia' — autor: Newton\n4. 'El Contrato Social' — autor: Rousseau\n5. 'Conversaciones' — autor: York\n→ ¿Qué nombre forman las iniciales de los apellidos?",
      answer: "HENRY",
      answerDisplay: "HENRY",
      successText:
        "HENRY. El nombre del sospechoso queda grabado en su memoria. Recuérdenlo: lo necesitarán al final. Una escalera secreta lleva al piso superior.",
      failText: "Las iniciales no coinciden. Tomá la primera letra de cada apellido en orden.",
    },
    {
      id: "s3",
      title: "El cofre del piso superior",
      description:
        "El piso superior tiene un cofre de hierro con tres ruedas giratorias. Una nota adjunta dice:",
      type: "combination",
      prompt:
        "\"El código del cofre: habitaciones de la mansión (12) × pisos del edificio (3) − sirvientes permanentes (4) = ?\"\n→ Calculá el resultado.",
      answer: "32",
      answerDisplay: "32",
      successText:
        "El cofre abre. Dentro hay un mecanismo musical y una partitura con instrucciones.",
      failText: "Las ruedas no encajan. Calculá 12 × 3 = 36, luego 36 − 4.",
    },
    {
      id: "s4",
      title: "El mecanismo musical",
      description:
        "La partitura del cofre tiene cuatro notas con una instrucción: 'Las notas DO-RE-MI-FA equivalen a 1-2-3-4. La melodía grabada en el cilindro es: DO-FA-RE-MI.'",
      type: "sequence",
      prompt:
        "DO=1, RE=2, MI=3, FA=4\nMelodia: DO − FA − RE − MI\n→ Escribí la secuencia numérica correspondiente.",
      answer: "1432",
      answerDisplay: "1432",
      successText:
        "El mecanismo musical toca y una pared giratoria revela la galería de espejos.",
      failText: "El cilindro no gira. Reemplazá cada nota por su número: DO=1, FA=4, RE=2, MI=3.",
    },
    {
      id: "s5",
      title: "La galería de espejos",
      description:
        "La galería tiene espejos numerados. Frente a la puerta de la cámara del testamento hay una instrucción grabada en el suelo:",
      type: "combination",
      prompt:
        "\"El espejo que revela la verdad lleva el número formado por los dos últimos dígitos del año de muerte del Patriarca.\"\n→ Usá el año que calcularon en el paso 1.",
      answer: "82",
      answerDisplay: "82",
      successText:
        "El espejo 82 gira sobre su eje. Detrás hay la cámara del testamento. La puerta tiene un último cerrojo.",
      failText: "Ningún espejo reacciona. ¿Cuáles son los dos últimos dígitos del año del paso 1?",
    },
    {
      id: "s6",
      title: "El cerrojo del testamento",
      description:
        "El cerrojo final es alfanumérico. Una nota pegada en la puerta dice: 'Solo quien recuerda el nombre y el número puede abrir esta puerta.'",
      type: "combination",
      prompt:
        "\"El código es: el nombre descubierto en el paso 2, seguido inmediatamente del número del espejo del paso 5.\"\n→ Sin espacios. (Ejemplo de formato: NOMBRE##)",
      answer: "HENRY82",
      answerDisplay: "HENRY82",
      successText:
        "¡La cámara se abre! El testamento original está intacto. Y detrás del escritorio, acorralado, está Lord Henry Hawthorn.",
      failText: "El cerrojo no cede. Combiná el nombre del paso 2 con el número del paso 5, sin espacios.",
    },
  ],
  finalReveal:
    "Lord Henry Hawthorn había asesinado a su hermano para heredar la mansión antes de que el testamento original pudiera ser leído. Ese testamento dejaba Hawthorn Hall a una fundación benéfica, dejando a Henry sin nada. La cámara secreta lo tenía todo: el testamento verdadero, las cartas de amenaza y el frasco con el veneno que usó. La mansión de las sombras finalmente reveló sus secretos.",
  hints: [
    { level: 1, text: "Paso 1: 1798 + 84 = 1882. Paso 2: las iniciales de Haydn, Eliot, Newton, Rousseau, York forman HENRY." },
    {
      level: 2,
      text: "Paso 3: 12 × 3 − 4 = 32. Paso 4: DO=1, FA=4, RE=2, MI=3 → 1432.",
    },
    {
      level: 3,
      text: "Paso 5: los dos últimos dígitos de 1882 son 82. Paso 6: el código es HENRY82 (nombre del paso 2 + número del paso 5).",
    },
  ],
  solutionExplanation:
    "Seis pasos: 1882 (1798+84) → HENRY (iniciales) → 32 (12×3−4) → 1432 (melodía) → 82 (últimos dígitos de 1882) → HENRY82 (combinación de pasos 2 y 5). El asesino era Lord Henry Hawthorn.",
};

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export const ESCAPE_PUZZLES: EscapePuzzle[] = [
  e1,
  e_facil02,
  e_facil03,
  e2,
  e_medio02,
  e_medio03,
  e3,
  e_dificil02,
  e_dificil03,
  e_experto01,
];

export function getEscapePuzzle(id: string) {
  return ESCAPE_PUZZLES.find((p) => p.id === id);
}
