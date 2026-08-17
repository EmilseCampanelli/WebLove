import { BasePuzzle } from "../types";

export interface CoartadaItem {
  id: string;
  kind: "testimony" | "evidence";
  label: string;
  content: string;
  contradictsWith: string;
}

export interface CoartadaPuzzle extends BasePuzzle {
  category: "coartada";
  suspect: { name: string; emoji: string; role: string };
  items: CoartadaItem[];
  solutionPairIds: [string, string];
}
