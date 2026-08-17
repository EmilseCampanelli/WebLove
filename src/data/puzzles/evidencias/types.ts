import { BasePuzzle } from "../types";

export type EvidenceClass = "relevante" | "enganosa" | "irrelevante";

export interface EvidenceCard {
  id: string;
  emoji: string;
  label: string;
  description: string;
  correctClass: EvidenceClass;
  explanation: string;
}

export interface EvidenciasSuspect {
  id: string;
  name: string;
  emoji: string;
  motive: string;
  isKiller: boolean;
}

export interface EvidenciasPuzzle extends BasePuzzle {
  category: "evidencias";
  cards: EvidenceCard[];
  suspects: EvidenciasSuspect[];
  killerId: string;
}
