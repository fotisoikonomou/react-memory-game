import React, { useEffect, useMemo, useState } from "react";
import "./styles/App.css";
import GameCard from "./components/GameCard";
import { type Card } from "./types";
import { BEST_KEY, TOTAL_PAIRS } from "./game/constants";
import { makeDeck } from "./game/deck";
import { useTimer } from "./hooks/userTimer";

const App: React.FC = () => {

  const [deck, setDeck] = useState<Card[]>(() => makeDeck());
  const [firstId, setFirstId] = useState<number | null>(null);
  const [secondId, setSecondId] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [bestMoves, setBestMoves] = useState<number | null>(() => {
    const raw = localStorage.getItem(BEST_KEY);
    return raw ? Number(raw) : null;
  });

  // Check how many pairs are matched
  const matchedPairs = useMemo(
    () => deck.filter((c) => c.matched).length / 2,
    [deck]
  );
  const isWin = matchedPairs === TOTAL_PAIRS;

  const { seconds, reset: resetTimer } = useTimer(!isWin);

  // Handle card comparison
  useEffect(() => {
    if (firstId == null || secondId == null) return;

    setLocked(true);
    setMoves((m) => m + 1);

    const first = deck.find((c) => c.id === firstId)!;
    const second = deck.find((c) => c.id === secondId)!;
    const samePair = first.pairId === second.pairId;

    const t = window.setTimeout(() => {
      setDeck((prev) =>
        prev.map((c) => {
          if (c.id === firstId || c.id === secondId) {
            return samePair ? { ...c, matched: true } : { ...c, flipped: false };
          }
          return c;
        })
      );
      setFirstId(null);
      setSecondId(null);
      setLocked(false);
    }, 700);

    return () => window.clearTimeout(t);

  }, [firstId, secondId]);

  // Update best score
  useEffect(() => {
    if (isWin) {
      if (bestMoves === null || moves < bestMoves) {
        setBestMoves(moves);
        localStorage.setItem(BEST_KEY, String(moves));
      }
    }
  }, [isWin, moves, bestMoves]);

  function handleCardClick(id: number) {
    if (locked) return;

    setDeck((prev) => {
      const card = prev.find((c) => c.id === id);
      if (!card || card.flipped || card.matched) return prev;

      const next = prev.map((c) => (c.id === id ? { ...c, flipped: true } : c));

      if (firstId == null) setFirstId(id);
      else if (secondId == null) setSecondId(id);

      return next;
    });
  }

  function resetGame() {
    setDeck(makeDeck());
    setFirstId(null);
    setSecondId(null);
    setLocked(false);
    setMoves(0);
    resetTimer();
  }

  return (
    <div className="app-root">
      <header className="hud">
        <h1>Memory Match</h1>
        <div className="stats">
          <div className="stat">
            <span className="label">Moves</span>
            <span className="value">{moves}</span>
          </div>
          <div className="stat">
            <span className="label">Time Passed</span>
            <span className="value">{seconds}s</span>
          </div>
          <div className="stat">
            <span className="label">Pairs</span>
            <span className="value">{matchedPairs}/{TOTAL_PAIRS}</span>
          </div>
          <button className="btn" onClick={resetGame}>Νέο παιχνίδι</button>
        </div>
        {bestMoves !== null && (
          <p className="best">
            Best Score: <strong>{bestMoves} moves</strong>
          </p>
        )}
      </header>

      <main>
        <div className="grid">
          {deck.map((card) => (
            <GameCard
              key={card.id}
              card={card}
              disabled={locked}
              onClick={handleCardClick}
            />
          ))}
        </div>

        {isWin && (
          <div className="win">
            🎉 Congratulations! You won in <strong>{moves}</strong> moves and <strong>{seconds}s</strong>.
            <button className="btn inline" onClick={resetGame}>Play Again</button>
          </div>
        )}
      </main>


    </div>
  );
};

export default App;
