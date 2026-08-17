import { BasePuzzle } from "../types";

export interface CifradoPuzzle extends BasePuzzle {
  category: "cifrado";
  cipherName: string;
  cipherDescription: string;
  encodedMessage: string;
  decodingKey: Record<string, string>;
  answer: string;
  answerDisplay: string;
}
