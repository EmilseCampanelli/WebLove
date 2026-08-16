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
    emoji: "❤️",
    description: "Para volver a encontrarnos.",
    questionCount: 20,
    color: "#C9735A",
  },
  {
    id: "coqueteo",
    label: "Coqueteo",
    emoji: "😉",
    description: "Para volver a mirarnos distinto.",
    questionCount: 20,
    color: "#E8956B",
  },
  {
    id: "intimo",
    label: "Más íntimo",
    emoji: "🔥",
    description: "Para hablar de lo que nos da curiosidad.",
    questionCount: 20,
    color: "#A85542",
  },
  {
    id: "diversion",
    label: "Para reírnos",
    emoji: "😄",
    description: "Porque juntos también somos un desastre.",
    questionCount: 20,
    color: "#D4A843",
  },
  {
    id: "profundo",
    label: "Profundo",
    emoji: "💭",
    description: "Para esas conversaciones que quedan.",
    questionCount: 20,
    color: "#7B4F6E",
  },
  {
    id: "previas",
    label: "Previas",
    emoji: "🥂",
    description: "Para arrancar la noche bien.",
    questionCount: 40,
    color: "#7A8B5E",
  },
  {
    id: "sorpresa",
    label: "Sorpresa",
    emoji: "🎲",
    description: "No sabemos qué va a salir.",
    questionCount: 100,
    color: "#5A7B6E",
  },
];
