import { CifradoPuzzle } from "./types";

const cf1: CifradoPuzzle = {
  id: "cifrado-facil-01",
  category: "cifrado",
  title: "El mensaje del cuaderno",
  description: "La víctima dejó un mensaje oculto. Cada número corresponde a una letra del abecedario.",
  difficulty: "facil",
  estimatedMinutes: 6,
  story: "En el cajón de la víctima encontraron un cuaderno con una página arrancada parcialmente. Solo quedó visible una línea de números. El detective cree que es el nombre del asesino.",
  instructions: "Usá la clave A=1, B=2, C=3... para descifrar el mensaje. Escribí la respuesta en mayúsculas.",
  cipherName: "Cifrado numérico A=1",
  cipherDescription: "Cada número representa la posición de una letra en el alfabeto.\nA=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9, J=10, K=11, L=12, M=13, N=14, O=15, P=16, Q=17, R=18, S=19, T=20, U=21, V=22, W=23, X=24, Y=25, Z=26",
  encodedMessage: "13 · 15 · 18 · 1 · 12 · 5 19",
  decodingKey: { "1":"A","2":"B","3":"C","4":"D","5":"E","6":"F","7":"G","8":"H","9":"I","10":"J","11":"K","12":"L","13":"M","14":"N","15":"O","16":"P","17":"Q","18":"R","19":"S","20":"T","21":"U","22":"V","23":"W","24":"X","25":"Y","26":"Z" },
  answer: "MORALES",
  answerDisplay: "MORALES",
  hints: [
    { level: 1, text: "Convertí cada número en su letra del abecedario (A=1)." },
    { level: 2, text: "13=M, 15=O, 18=R..." },
    { level: 3, text: "13·15·18·1·12·5 = MORALE, y 19=S." },
  ],
  solutionExplanation: "M=13, O=15, R=18, A=1, L=12, E=5, S=19. El nombre del asesino era Morales.",
};

const cf2: CifradoPuzzle = {
  id: "cifrado-medio-01",
  category: "cifrado",
  title: "La nota del espejo",
  description: "El asesino escribió al revés y cambió vocales. Decodificá el mensaje para saber el lugar.",
  difficulty: "medio",
  estimatedMinutes: 10,
  story: "Sobre el espejo del baño, escrito con lápiz labial: un mensaje invertido con las vocales reemplazadas por símbolos. La víctima pudo haberlo dejado para quien llegara primero.",
  instructions: "Paso 1: invertí el orden de las letras. Paso 2: reemplazá los símbolos por vocales (@=A, 3=E, 1=I, 0=O, ∪=U). El resultado es el lugar donde está la evidencia clave.",
  cipherName: "Inversión + sustitución de vocales",
  cipherDescription: "Primero invertí el texto de derecha a izquierda.\nLuego reemplazá: @ → A  |  3 → E  |  1 → I  |  0 → O  |  ∪ → U",
  encodedMessage: "0T∪RB3D 3L N3 @N3C0C",
  decodingKey: { "@": "A", "3": "E", "1": "I", "0": "O", "∪": "U" },
  answer: "COCENA NE LEDRETUBO",
  answerDisplay: "COCINA DE LA BODEGA",
  hints: [
    { level: 1, text: "Primero invertí todo el texto de derecha a izquierda." },
    { level: 2, text: "Después de invertir, reemplazá los símbolos por vocales." },
    { level: 3, text: "Invertido: OCONAELB AL NE 3BURTOC → reemplazando vocales → COCINA DE LA BODEGA." },
  ],
  solutionExplanation: "Invertido y con vocales restauradas: COCINA DE LA BODEGA. Ahí estaba escondida la evidencia clave.",
};

const cf3: CifradoPuzzle = {
  id: "cifrado-dificil-01",
  category: "cifrado",
  title: "El telégrafo del Barón",
  description: "Un mensaje en código Morse encontrado en el bolsillo de la víctima. ¿Qué dice?",
  difficulty: "dificil",
  estimatedMinutes: 16,
  story: "La víctima tenía en el bolsillo interior una pequeña tarjeta con puntos y rayas. El detective cree que es el nombre del único testigo presencial del crimen.",
  instructions: "Decodificá el mensaje Morse usando la tabla. Escribí el nombre completo del testigo.",
  cipherName: "Código Morse",
  cipherDescription: "A ·−  B −···  C −·−·  D −··  E ·  F ··−·  G −−·  H ····  I ··  J ·−−−  K −·−  L ·−··  M −−  N −·  O −−−  P ·−−·  Q −−·−  R ·−·  S ···  T −  U ··−  V ···−  W ·−−  X −··−  Y −·−−  Z −−··",
  encodedMessage: "·−·· ··− ·· ··· ·−  /  −·− −·· ·− −·",
  decodingKey: {},
  answer: "LUISA KDAN",
  answerDisplay: "LUISA KDAN",
  hints: [
    { level: 1, text: "L=·−··, U=··−, I=··, S=···, A=·−" },
    { level: 2, text: "La segunda palabra: K=−·−, D=−··, A=·−, N=−·" },
    { level: 3, text: "LUISA / KDAN — la única testigo presencial del crimen." },
  ],
  solutionExplanation: "En código Morse: ·−·· ··− ·· ··· ·−  = LUISA  |  −·− −·· ·− −·  = KDAN. El testigo era Luisa Kdan.",
};

export const CIFRADO_PUZZLES: CifradoPuzzle[] = [cf1, cf2, cf3];
export function getCifradoPuzzle(id: string) {
  return CIFRADO_PUZZLES.find((p) => p.id === id);
}
