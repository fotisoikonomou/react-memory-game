import React from "react";
import { type Card as CardT } from "../types";

type Props = {
  card: CardT;
  disabled: boolean;
  onClick: (id: number) => void;
};

const GameCard: React.FC<Props> = ({ card, disabled, onClick }) => {
  const flipped = card.flipped || card.matched;

  return (
    <button
      className={`card ${flipped ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
      onClick={() => onClick(card.id)}
      disabled={disabled || card.flipped || card.matched}
      aria-label={flipped ? card.symbol : "Κρυφή κάρτα"}
      aria-pressed={flipped}
    >
      <div className="card-inner">
        <div className="card-face card-front">?</div>
        <div className="card-face card-back">{card.symbol}</div>
      </div>
    </button>
  );
};

export default GameCard;
