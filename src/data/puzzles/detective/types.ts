import { BasePuzzle } from "../types";

export interface DetectiveTab {
  id: string;
  label: string;
  emoji: string;
  content: string[];
}

export interface DetectiveSuspect {
  id: string;
  name: string;
  emoji: string;
  motive: string;
  isKiller: boolean;
}

export interface DetectivePuzzle extends BasePuzzle {
  category: "detective";
  victim: { name: string; emoji: string; role: string };
  tabs: DetectiveTab[];
  suspects: DetectiveSuspect[];
  killerId: string;
  keyClue: string;
}
