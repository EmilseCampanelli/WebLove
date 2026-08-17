export type PuzzleDifficulty = "facil" | "medio" | "dificil" | "experto";

export type PuzzleCategory =
  | "murdoku"
  | "detective"
  | "coartada"
  | "cronologia"
  | "cifrado"
  | "mapa"
  | "contradiccion"
  | "evidencias"
  | "escape"
  | "interrogatorio";

export interface HintLevel {
  level: 1 | 2 | 3;
  text: string;
}

export interface BasePuzzle {
  id: string;
  category: PuzzleCategory;
  title: string;
  description: string;
  difficulty: PuzzleDifficulty;
  estimatedMinutes: number;
  story: string;
  instructions: string;
  hints: HintLevel[];
  solutionExplanation: string;
}
