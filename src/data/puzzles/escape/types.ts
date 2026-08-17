import { BasePuzzle } from "../types";

export interface EscapeStep {
  id: string;
  title: string;
  description: string;
  type: "combination" | "riddle" | "sequence";
  prompt: string;
  answer: string;
  answerDisplay: string;
  successText: string;
  failText: string;
}

export interface EscapePuzzle extends BasePuzzle {
  category: "escape";
  location: string;
  steps: EscapeStep[];
  finalReveal: string;
}
