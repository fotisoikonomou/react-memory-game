import { type Card } from "../types";
import { EMOJIS } from "./constants";

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function makeDeck(): Card[] {
  let id = 0;
  const pairs = EMOJIS.flatMap((emoji, idx) => ([
    { id: id++, pairId: idx, symbol: emoji, flipped: false, matched: false },
    { id: id++, pairId: idx, symbol: emoji, flipped: false, matched: false },
  ]));
  return shuffle(pairs);
}
