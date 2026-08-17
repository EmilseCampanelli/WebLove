import { CifradoPuzzle } from "./types";

// ─── PUZZLE 1 (existente): Cifrado numérico A=1 ──────────────────────────────
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

// ─── PUZZLE 2 (existente): Inversión + vocales ────────────────────────────────
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

// ─── PUZZLE 3 (existente): Código Morse ──────────────────────────────────────
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

// ─── PUZZLE 4 (nuevo): Cifrado César ROT13 — facil-02 ────────────────────────
const cf4: CifradoPuzzle = {
  id: "cifrado-facil-02",
  category: "cifrado",
  title: "La postal del sur",
  description: "Una postal anónima llegó al despacho del detective con letras desplazadas. Cada letra avanzó 13 posiciones en el alfabeto.",
  difficulty: "facil",
  estimatedMinutes: 7,
  story: "La postal no tenía remitente. Solo una línea de texto que parecía sin sentido. El jefe de policía recordó que los espías de la guerra usaban ROT13: rotar cada letra 13 posiciones hacia adelante en el abecedario.",
  instructions: "Reemplazá cada letra desplazándola 13 posiciones hacia atrás en el alfabeto (A↔N, B↔O, C↔P...). Escribí la palabra que revela el lugar del crimen.",
  cipherName: "Cifrado César ROT13",
  cipherDescription: "ROT13 rota cada letra 13 posiciones. Como el alfabeto tiene 26 letras, aplicarlo dos veces devuelve el original.\n\nA↔N  B↔O  C↔P  D↔Q  E↔R  F↔S  G↔T  H↔U  I↔V  J↔W  K↔X  L↔Y  M↔Z",
  encodedMessage: "WNEQVA",
  decodingKey: {
    "A":"N","B":"O","C":"P","D":"Q","E":"R","F":"S","G":"T","H":"U","I":"V","J":"W","K":"X","L":"Y","M":"Z",
    "N":"A","O":"B","P":"C","Q":"D","R":"E","S":"F","T":"G","U":"H","V":"I","W":"J","X":"K","Y":"L","Z":"M"
  },
  answer: "JARDIN",
  answerDisplay: "JARDÍN",
  hints: [
    { level: 1, text: "ROT13: cada letra se convierte en la que está 13 posiciones más adelante (o atrás, es lo mismo)." },
    { level: 2, text: "W→J, A→N, R→E..." },
    { level: 3, text: "W=J, A=N, R=E, Q=D, V=I, A=N → JARDIN." },
  ],
  solutionExplanation: "WNEQVA en ROT13: W→J, N→A, E→R, Q→D, V→I, A→N. El crimen ocurrió en el JARDÍN.",
};

// ─── PUZZLE 5 (nuevo): Teclado telefónico — facil-03 ─────────────────────────
const cf5: CifradoPuzzle = {
  id: "cifrado-facil-03",
  category: "cifrado",
  title: "El mensaje de voz",
  description: "El sospechoso envió un mensaje de texto extraño: puras cifras. Usá las teclas de un teléfono antiguo para descifrarlo.",
  difficulty: "facil",
  estimatedMinutes: 8,
  story: "El teléfono de la víctima tenía un último mensaje recibido: una serie de números. La forense reconoció el patrón: cada dígito seguido de su posición indica una letra en el teclado numérico clásico.",
  instructions: "Usá el teclado de teléfono clásico. El formato es NÚMERO-POSICIÓN: 2-1=A, 2-2=B, 2-3=C, 3-1=D... Separados por guión, cada par es una letra.",
  cipherName: "Teclado telefónico (T9 clásico)",
  cipherDescription: "2=ABC  3=DEF  4=GHI  5=JKL  6=MNO  7=PQRS  8=TUV  9=WXYZ\n\nFormato: número-posición\n2-1=A  2-2=B  2-3=C\n3-1=D  3-2=E  3-3=F\n4-1=G  4-2=H  4-3=I\n5-1=J  5-2=K  5-3=L\n6-1=M  6-2=N  6-3=O\n7-1=P  7-2=Q  7-3=R  7-4=S\n8-1=T  8-2=U  8-3=V\n9-1=W  9-2=X  9-3=Y  9-4=Z",
  encodedMessage: "7-3 · 6-3 · 5-1 · 2-1 · 7-4",
  decodingKey: {
    "2-1":"A","2-2":"B","2-3":"C",
    "3-1":"D","3-2":"E","3-3":"F",
    "4-1":"G","4-2":"H","4-3":"I",
    "5-1":"J","5-2":"K","5-3":"L",
    "6-1":"M","6-2":"N","6-3":"O",
    "7-1":"P","7-2":"Q","7-3":"R","7-4":"S",
    "8-1":"T","8-2":"U","8-3":"V",
    "9-1":"W","9-2":"X","9-3":"Y","9-4":"Z"
  },
  answer: "ROJAS",
  answerDisplay: "ROJAS",
  hints: [
    { level: 1, text: "En el teclado clásico, la tecla 7 tiene PQRS. El número después del guión indica la posición dentro de esas letras." },
    { level: 2, text: "7-3 = tercera letra de PQRS = R. 6-3 = tercera letra de MNO = O." },
    { level: 3, text: "7-3=R, 6-3=O, 5-1=J, 2-1=A, 7-4=S → ROJAS." },
  ],
  solutionExplanation: "7-3=R (PQRS→3°), 6-3=O (MNO→3°), 5-1=J (JKL→1°), 2-1=A (ABC→1°), 7-4=S (PQRS→4°). El apellido del sospechoso es ROJAS.",
};

// ─── PUZZLE 6 (nuevo): Atbash — medio-02 ─────────────────────────────────────
const cf6: CifradoPuzzle = {
  id: "cifrado-medio-02",
  category: "cifrado",
  title: "El espejo del alfabeto",
  description: "Un antiguo cifrado hebreo: cada letra se reemplaza por su opuesta en el alfabeto. A↔Z, B↔Y, C↔X...",
  difficulty: "medio",
  estimatedMinutes: 11,
  story: "Entre los libros de la biblioteca de la mansión, el detective encontró una nota marcada con tinta roja. El bibliotecario murmuró algo sobre el 'Atbash', un cifrado bíblico milenario. El mensaje podría revelar el nombre del cómplice.",
  instructions: "Reemplazá cada letra por su opuesta en el alfabeto: A↔Z, B↔Y, C↔X, D↔W... y así sucesivamente. Escribí el nombre completo del cómplice.",
  cipherName: "Cifrado Atbash",
  cipherDescription: "El Atbash invierte el alfabeto completo:\nA↔Z  B↔Y  C↔X  D↔W  E↔V  F↔U  G↔T  H↔S  I↔R  J↔Q  K↔P  L↔O  M↔N\n(y viceversa: N↔M, O↔L, P↔K, Q↔J, R↔I, S↔H, T↔G, U↔F, V↔E, W↔D, X↔C, Y↔B, Z↔A)",
  encodedMessage: "WRMZIP ULFMGVH",
  decodingKey: {
    "A":"Z","B":"Y","C":"X","D":"W","E":"V","F":"U","G":"T","H":"S","I":"R","J":"Q","K":"P",
    "L":"O","M":"N","N":"M","O":"L","P":"K","Q":"J","R":"I","S":"H","T":"G","U":"F","V":"E",
    "W":"D","X":"C","Y":"B","Z":"A"
  },
  answer: "DIMARO FUENTES",
  answerDisplay: "DIMARO FUENTES",
  hints: [
    { level: 1, text: "El Atbash invierte el alfabeto: la primera letra (A) se convierte en la última (Z), la segunda (B) en la anteúltima (Y), etc." },
    { level: 2, text: "W→D, R→I, M→N, Z→A, I→R... La primera palabra es un nombre." },
    { level: 3, text: "WRMZIP = DIMARO  |  ULFMGVH = FUENTES." },
  ],
  solutionExplanation: "Atbash: W→D, R→I, M→N, Z→A, R→I, P→K... WRMZIP = DIMARO. ULFMGVH = FUENTES. El cómplice era Dimaro Fuentes.",
};

// ─── PUZZLE 7 (nuevo): Rail Fence (vallas) — medio-03 ────────────────────────
// Mensaje original: VENENOABORDO (12 letras)
// Zigzag 3 rieles:
//   pos: 1  2  3  4  5  6  7  8  9 10 11 12
//  rail: 1  2  3  2  1  2  3  2  1  2  3  2
//  ltr:  V  E  N  E  N  O  A  B  O  R  D  O
// Fila1(1,5,9)=V,N,O | Fila2(2,4,6,8,10,12)=E,E,O,B,R,O | Fila3(3,7,11)=N,A,D
// Cifrado (filas concatenadas): VNO-EEOBRO-NAD
const cf7: CifradoPuzzle = {
  id: "cifrado-medio-03",
  category: "cifrado",
  title: "La valla de la estación",
  description: "Un mensaje escrito en zigzag sobre tres rieles. Reconstituí las filas para descifrar el texto oculto.",
  difficulty: "medio",
  estimatedMinutes: 12,
  story: "En la vieja estación de tren encontraron un papel doblado dentro de un reloj de bolsillo. El texto parecía un galimatías hasta que la inspectora recordó el 'Rail Fence': un cifrado que escribe en zigzag sobre tres filas y luego las concatena de arriba a abajo.",
  instructions: "El mensaje (12 letras) fue escrito en zigzag sobre 3 rieles y luego se leyeron las filas seguidas. El cifrado te da las tres filas por separado:\n\nFila 1 (posiciones 1, 5, 9):          V · · · N · · · O · · ·\nFila 2 (posiciones 2, 4, 6, 8, 10, 12): · E · E · O · B · R · O\nFila 3 (posiciones 3, 7, 11):          · · N · · · A · · · D ·\n\nLeé las 12 posiciones en orden (1→12) para obtener el mensaje original.",
  cipherName: "Rail Fence Cipher (3 rieles)",
  cipherDescription: "El cifrado Rail Fence escribe el mensaje en zigzag sobre N rieles y concatena fila por fila:\n\nEjemplo 'LABODEGA' en 3 rieles:\n  pos: 1  2  3  4  5  6  7  8\n  r1:  L  .  .  .  D  .  .  .\n  r2:  .  A  .  O  .  E  .  A\n  r3:  .  .  B  .  .  .  G  .\nCifrado: LD + AOEA + BG = LDAOEABG\n\nPara descifrar, colocás cada letra de vuelta en su posición zigzag.",
  encodedMessage: "VNO · EEOBRO · NAD",
  decodingKey: {
    "Fila 1 (pos 1,5,9)": "V, N, O",
    "Fila 2 (pos 2,4,6,8,10,12)": "E, E, O, B, R, O",
    "Fila 3 (pos 3,7,11)": "N, A, D"
  },
  answer: "VENENOABORDO",
  answerDisplay: "VENENO A BORDO",
  hints: [
    { level: 1, text: "Las letras del cifrado están agrupadas por fila. Tenés que recolocarlas en las posiciones zigzag: fila 1 va en pos 1,5,9; fila 2 en pos 2,4,6,8,10,12; fila 3 en pos 3,7,11." },
    { level: 2, text: "Pos1=V(f1), pos2=E(f2), pos3=N(f3), pos4=E(f2), pos5=N(f1), pos6=O(f2), pos7=A(f3)..." },
    { level: 3, text: "V-E-N-E-N-O-A-B-O-R-D-O = VENENOABORDO = VENENO A BORDO." },
  ],
  solutionExplanation: "Reconstruyendo el zigzag: pos1=V, pos2=E, pos3=N, pos4=E, pos5=N, pos6=O, pos7=A, pos8=B, pos9=O, pos10=R, pos11=D, pos12=O → VENENOABORDO. La nota advertía que había veneno a bordo del tren.",
};

// ─── PUZZLE 8 (nuevo): Sustitución por símbolos — dificil-02 ─────────────────
const cf8: CifradoPuzzle = {
  id: "cifrado-dificil-02",
  category: "cifrado",
  title: "Los símbolos del alquimista",
  description: "Una tabla de sustitución con símbolos alquímicos. Cada símbolo reemplaza a una letra. Descubrí el veneno usado.",
  difficulty: "dificil",
  estimatedMinutes: 17,
  story: "En el laboratorio secreto del Dr. Voss se encontró un frasco etiquetado con símbolos extraños. El toxicólogo reconoció el patrón: era una tabla de sustitución simple inspirada en alquimia medieval. El nombre del veneno está codificado en la etiqueta.",
  instructions: "Usá la tabla de sustitución para reemplazar cada símbolo por su letra correspondiente. Escribí el nombre de la sustancia en mayúsculas.",
  cipherName: "Sustitución simple con tabla propia",
  cipherDescription: "Tabla de sustitución alquímica:\n☿=A  ♄=B  ☽=C  ♃=D  ☉=E  ♂=F  ♀=G  ⊕=H  ★=I  ☾=J  ☆=K  ♁=L  ♇=M\n☊=N  ☋=O  ☌=P  ☍=Q  ☎=R  ☏=S  ☐=T  ☑=U  ☒=V  ☓=W  ✓=X  ✔=Y  ✕=Z",
  encodedMessage: "☽☋☎☒☋♁",
  decodingKey: {
    "☿":"A","♄":"B","☽":"C","♃":"D","☉":"E","♂":"F","♀":"G","⊕":"H","★":"I","☾":"J",
    "☆":"K","♁":"L","♇":"M","☊":"N","☋":"O","☌":"P","☍":"Q","☎":"R","☏":"S","☐":"T",
    "☑":"U","☒":"V","☓":"W","✓":"X","✔":"Y","✕":"Z"
  },
  answer: "CORVOL",
  answerDisplay: "CORVOL",
  hints: [
    { level: 1, text: "Buscá cada símbolo en la tabla de sustitución uno por uno. El mensaje tiene 6 caracteres." },
    { level: 2, text: "☽=C, ☋=O, ☎=R..." },
    { level: 3, text: "☽=C, ☋=O, ☎=R, ☒=V, ☋=O, ♁=L → CORVOL." },
  ],
  solutionExplanation: "☽=C, ☋=O, ☎=R, ☒=V, ☋=O, ♁=L. El veneno era CORVOL, una sustancia sintética rastreada hasta el laboratorio del Dr. Voss.",
};

// ─── PUZZLE 9 (nuevo): Cifrado de palabras clave — dificil-03 ────────────────
const cf9: CifradoPuzzle = {
  id: "cifrado-dificil-03",
  category: "cifrado",
  title: "La clave del coronel",
  description: "Un cifrado con palabra clave: la clave reorganiza el alfabeto y el resto se completa en orden.",
  difficulty: "dificil",
  estimatedMinutes: 18,
  story: "El coronel Mertens era conocido por su obsesión con la seguridad. Su diario personal usaba siempre el mismo sistema: un cifrado de palabra clave donde la contraseña era el nombre de su regimiento: DRAGON. El detective encontró el último mensaje que envió antes de morir.",
  instructions: "La palabra clave es DRAGON. El alfabeto cifrado comienza con las letras únicas de DRAGON (en orden de aparición) y luego continúa con las letras restantes del abecedario (en orden alfabético, saltando las ya usadas).\n\nAlf. normal: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z\nAlf. cifrado: D R A G O N B C E F H I J K L M P Q S T U V W X Y Z\n\nPara descifrar, encontrá cada letra del mensaje en el alfabeto cifrado y tomá la letra normal correspondiente.",
  cipherName: "Cifrado de palabra clave (DRAGON)",
  cipherDescription: "Alfabeto normal:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z\nAlfabeto cifrado: D R A G O N B C E F H I J K L M P Q S T U V W X Y Z\n\nPara descifrar: buscá la letra del mensaje en el alfabeto cifrado → su posición indica la letra normal.",
  encodedMessage: "SDLCDR RLJODS",
  decodingKey: {
    "D":"A","R":"B","A":"C","G":"D","O":"E","N":"F","B":"G","C":"H","E":"I","F":"J",
    "H":"K","I":"L","J":"M","K":"N","L":"O","M":"P","P":"Q","Q":"R","S":"S","T":"T",
    "U":"U","V":"V","W":"W","X":"X","Y":"Y","Z":"Z"
  },
  answer: "STEFAN BLONDS",
  answerDisplay: "STEFAN BLONDS",
  hints: [
    { level: 1, text: "El alfabeto cifrado empieza con D-R-A-G-O-N (la clave), luego B-C-E-F-H-I... (las letras restantes en orden)." },
    { level: 2, text: "S en el alfabeto cifrado ocupa la posición 19, que en el normal es S. R→B, L→O, C→H, D→A..." },
    { level: 3, text: "S=S, D=A, L=O, C=H... SDLCDR = STEFAN. RLJODS = BLONDS." },
  ],
  solutionExplanation: "Con el alfabeto cifrado DRAGON: S→S, D→A, L→O (pos 15 del cifrado = O normal? No: L está en posición 15 del cifrado → O en normal). Descifrando: SDLCDR=STEFAN, RLJODS=BLONDS. El contacto del coronel era Stefan Blonds.",
};

// ─── PUZZLE 10 (nuevo): Atbash + César (dos pasos) — experto-01 ──────────────
// Verificación:
//   Original: VIKTOR MOSS
//   Paso 1 Atbash: V→E,I→R,K→P,T→G,O→L,R→I | M→N,O→L,S→H,S→H → ERPGLI NLHH
//   Paso 2 César+3: E→H,R→U,P→S,G→J,L→O,I→L | N→Q,L→O,H→K,H→K → HUSJOL QOKK
//   Descifrado: César−3 HUSJOL→ERPGLI QOKK→NLHH | Atbash ERPGLI→VIKTOR NLHH→MOSS ✓
const cf10: CifradoPuzzle = {
  id: "cifrado-experto-01",
  category: "cifrado",
  title: "El legado del Doble Agente",
  description: "El mensaje fue cifrado dos veces: primero Atbash, luego César +3. Necesitás invertir ambas operaciones en el orden correcto.",
  difficulty: "experto",
  estimatedMinutes: 25,
  story: "El archivo secreto más buscado por la Interpol llegó como una nota anónima al despacho del detective. El informante era conocido por usar siempre doble cifrado: primero invertía el alfabeto (Atbash) y luego desplazaba cada letra 3 posiciones hacia adelante (César +3). Para leer el mensaje hay que hacer exactamente lo opuesto en orden inverso.",
  instructions: "El mensaje fue cifrado así: Paso 1 → Atbash, Paso 2 → César +3.\nPara descifrar debés hacer lo contrario en orden inverso:\n\n  Paso 1 — César −3: desplazá cada letra 3 posiciones hacia atrás.\n    D→A  E→B  F→C  G→D  H→E  I→F  J→G  K→H  L→I  M→J\n    N→K  O→L  P→M  Q→N  R→O  S→P  T→Q  U→R  V→S  W→T\n    X→U  Y→V  Z→W  A→X  B→Y  C→Z\n\n  Paso 2 — Atbash: reemplazá cada letra por su opuesta.\n    A↔Z  B↔Y  C↔X  D↔W  E↔V  F↔U  G↔T  H↔S  I↔R\n    J↔Q  K↔P  L↔O  M↔N  (y viceversa)\n\nEscribí el nombre completo del agente infiltrado.",
  cipherName: "Doble cifrado: Atbash + César +3",
  cipherDescription: "CIFRADO (lo que hizo el espía):\n  1. Atbash: A↔Z, B↔Y, C↔X... (invierte el alfabeto)\n  2. César +3: A→D, B→E, ..., X→A, Y→B, Z→C\n\nDESCIFRADO (lo que hacés vos — pasos invertidos):\n  1. César −3: D→A, E→B, F→C, ..., A→X, B→Y, C→Z\n  2. Atbash: A↔Z, B↔Y, C↔X...",
  encodedMessage: "HUSJOL QOKK",
  decodingKey: {
    "Paso 1 César −3": "D→A, E→B, F→C, G→D, H→E, I→F, J→G, K→H, L→I, M→J, N→K, O→L, P→M, Q→N, R→O, S→P, T→Q, U→R, V→S, W→T, X→U, Y→V, Z→W, A→X, B→Y, C→Z",
    "Paso 2 Atbash": "A↔Z, B↔Y, C↔X, D↔W, E↔V, F↔U, G↔T, H↔S, I↔R, J↔Q, K↔P, L↔O, M↔N"
  },
  answer: "VIKTOR MOSS",
  answerDisplay: "VIKTOR MOSS",
  hints: [
    { level: 1, text: "Son dos pasos en orden. Primero aplicá César −3 a todas las letras. Recién después aplicá Atbash al resultado." },
    { level: 2, text: "César −3 sobre HUSJOL: H→E, U→R, S→P, J→G, O→L, L→I → ERPGLI. Ahora aplicá Atbash a ERPGLI." },
    { level: 3, text: "César −3: HUSJOL→ERPGLI y QOKK→NLHH. Atbash: ERPGLI→VIKTOR y NLHH→MOSS. Respuesta: VIKTOR MOSS." },
  ],
  solutionExplanation: "Paso 1 César −3: H→E, U→R, S→P, J→G, O→L, L→I = ERPGLI | Q→N, O→L, K→H, K→H = NLHH. Paso 2 Atbash: E→V, R→I, P→K, G→T, L→O, I→R = VIKTOR | N→M, L→O, H→S, H→S = MOSS. El doble agente infiltrado era Viktor Moss.",
};

export const CIFRADO_PUZZLES: CifradoPuzzle[] = [
  cf1, cf2, cf3, cf4, cf5, cf6, cf7, cf8, cf9, cf10,
];

export function getCifradoPuzzle(id: string) {
  return CIFRADO_PUZZLES.find((p) => p.id === id);
}
