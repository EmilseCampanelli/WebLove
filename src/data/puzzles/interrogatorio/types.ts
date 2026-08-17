import { BasePuzzle } from "../types";

export interface InterrogatorioQuestion {
  id: string;
  text: string;
  revealText: string;
  creditCost: number;
  isKeyQuestion: boolean;
}

export interface InterrogatorioSuspect {
  id: string;
  name: string;
  emoji: string;
  role: string;
  motive: string;
  isKiller: boolean;
  questions: InterrogatorioQuestion[];
}

export interface InterrogatorioPuzzle extends BasePuzzle {
  category: "interrogatorio";
  victim: { name: string; emoji: string; role: string };
  totalCredits: number;
  suspects: InterrogatorioSuspect[];
  killerId: string;
}
