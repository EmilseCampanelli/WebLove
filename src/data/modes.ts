import { QuestionCategory } from "./questions";

export interface GameMode {
  id: QuestionCategory | "sorpresa";
  label: string;
  emoji: string;
  description: string;
  questionCount: number;
  color: string;
}

export const GAME_MODES: GameMode[] = [
  {
    id: "conexion",
    label: "Conexión",
    emoji: "💕",
    description: "Preguntas para conocerse mejor y recordar momentos especiales.",
    questionCount: 20,
    color: "#C9735A",
  },
  {
    id: "coqueteo",
    label: "Coqueteo",
    emoji: "😏",
    description: "Preguntas juguetonas y de atracción.",
    questionCount: 20,
    color: "#E8956B",
  },
  {
    id: "intimo",
    label: "Más íntimo",
    emoji: "🔥",
    description: "Preguntas sobre deseos, preferencias y fantasías. Solo para adultos.",
    questionCount: 20,
    color: "#A85542",
  },
  {
    id: "diversion",
    label: "Para reírnos",
    emoji: "😂",
    description: "Preguntas absurdas, divertidas y situaciones hipotéticas.",
    questionCount: 20,
    color: "#D4A843",
  },
  {
    id: "profundo",
    label: "Profundo",
    emoji: "💭",
    description: "Sobre la relación, el futuro, emociones y experiencias.",
    questionCount: 20,
    color: "#7B4F6E",
  },
  {
    id: "sorpresa",
    label: "Sorpresa",
    emoji: "🎲",
    description: "Mezcla aleatoria de todas las categorías.",
    questionCount: 100,
    color: "#5A7B6E",
  },
];
