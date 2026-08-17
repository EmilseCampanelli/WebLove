import { BasePuzzle } from "../types";

export interface MurdokuRoom {
  id: string;
  name: string;
  emoji: string;
  row: number;
  col: number;
  blocked?: boolean;
}

export interface MurdokuSuspect {
  id: string;
  name: string;
  role: string;
  emoji: string;
  clue: string;
  roomId: string;
}

export interface MurdokuPuzzle extends BasePuzzle {
  category: "murdoku";
  victim: { name: string; emoji: string; role: string; roomId: string };
  gridCols: number;
  gridRows: number;
  rooms: MurdokuRoom[];
  suspects: MurdokuSuspect[];
  killerId: string;
}
