import { useState, useCallback, useRef } from "react";
import {
  Question,
  QuestionCategory,
  QUESTIONS,
  SPECIAL_CARDS,
  SpecialCard,
} from "../data/questions";
import { addToHistory } from "../storage/storage";

type GameModeId = QuestionCategory | "sorpresa";

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Insert special cards roughly every N regular cards
const SPECIAL_CARD_INTERVAL = 7;

function buildDeck(modeId: GameModeId): (Question | SpecialCard)[] {
  const filtered =
    modeId === "sorpresa"
      ? QUESTIONS
      : QUESTIONS.filter((q) => q.category === modeId);

  const shuffled = shuffle(filtered);
  const deck: (Question | SpecialCard)[] = [];
  const specialPool = shuffle([...SPECIAL_CARDS]);
  let specialIdx = 0;

  shuffled.forEach((q, i) => {
    deck.push(q);
    if ((i + 1) % SPECIAL_CARD_INTERVAL === 0 && specialPool.length > 0) {
      deck.push(specialPool[specialIdx % specialPool.length]);
      specialIdx++;
    }
  });

  return deck;
}

export type DeckCard =
  | { kind: "question"; data: Question }
  | { kind: "special"; data: SpecialCard };

export type UseQuestionDeckResult = {
  currentCard: DeckCard | null;
  currentIndex: number;
  totalQuestions: number;
  questionsAnswered: number;
  isLastCard: boolean;
  advance: () => void;
  restart: () => void;
  setMode: (mode: GameModeId) => void;
  activeMode: GameModeId | null;
};

export function useQuestionDeck(): UseQuestionDeckResult {
  const [activeMode, setActiveModeState] = useState<GameModeId | null>(null);
  const deckRef = useRef<(Question | SpecialCard)[]>([]);
  const [index, setIndex] = useState(0);

  const questionCount = deckRef.current.filter(
    (c): c is Question => "id" in c
  ).length;

  const questionsAnswered = deckRef.current
    .slice(0, index)
    .filter((c): c is Question => "id" in c).length;

  const toCard = (item: Question | SpecialCard | undefined): DeckCard | null => {
    if (!item) return null;
    if ("id" in item) return { kind: "question", data: item };
    return { kind: "special", data: item };
  };

  const currentCard = toCard(deckRef.current[index]);

  const advance = useCallback(() => {
    const deck = deckRef.current;
    if (index >= deck.length - 1) {
      // Rebuild deck when exhausted
      deckRef.current = buildDeck(activeMode!);
      setIndex(0);
      return;
    }

    const next = index + 1;
    setIndex(next);

    const nextItem = deck[next];
    if (nextItem && "id" in nextItem) {
      void addToHistory({
        questionId: nextItem.id,
        questionText: nextItem.text,
        category: nextItem.category,
        timestamp: Date.now(),
      });
    }
  }, [index, activeMode]);

  const restart = useCallback(() => {
    if (activeMode) {
      deckRef.current = buildDeck(activeMode);
    }
    setIndex(0);
  }, [activeMode]);

  const setMode = useCallback((mode: GameModeId) => {
    deckRef.current = buildDeck(mode);
    setActiveModeState(mode);
    setIndex(0);

    const first = deckRef.current[0];
    if (first && "id" in first) {
      void addToHistory({
        questionId: first.id,
        questionText: first.text,
        category: first.category,
        timestamp: Date.now(),
      });
    }
  }, []);

  return {
    currentCard,
    currentIndex: index,
    totalQuestions: questionCount,
    questionsAnswered,
    isLastCard: index >= deckRef.current.length - 1,
    advance,
    restart,
    setMode,
    activeMode,
  };
}
