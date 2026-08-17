import { BasePuzzle } from "../types";

export interface CronologiaEvent {
  id: string;
  text: string;
  correctPosition: number;
  isImpossible?: boolean;
}

export interface CronologiaPuzzle extends BasePuzzle {
  category: "cronologia";
  events: CronologiaEvent[];
  impossibleEventId: string;
  impossibleReason: string;
}
