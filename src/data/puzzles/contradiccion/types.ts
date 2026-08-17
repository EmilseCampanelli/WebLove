import { BasePuzzle } from "../types";

export interface ContradictionSentence {
  id: string;
  text: string;
  isPartOfContradiction: boolean;
}

export interface ContradictionPuzzle extends BasePuzzle {
  category: "contradiccion";
  narrative: string;
  sentences: ContradictionSentence[];
  contradictionIds: [string, string];
  contradictionExplanation: string;
}
