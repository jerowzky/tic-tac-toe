"use client";

import { useRef, type KeyboardEvent } from "react";

import type { Board, GameResult, Player } from "@/lib/game";
import { GameCell } from "@/components/game-cell";

interface GameBoardProps {
  board: Board;
  nextPlayer: Player;
  result: GameResult | null;
  onSelect: (index: number) => void;
}

const ARROW_OFFSETS: Record<string, [number, number]> = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

export function GameBoard({ board, nextPlayer, result, onSelect }: GameBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const winningLine = result?.kind === "win" ? result.line : null;

  // Arrow keys move focus between cells; Enter/Space activate the focused cell.
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const offset = ARROW_OFFSETS[event.key];
    if (!offset) return;
    const current = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-index]",
    );
    if (!current) return;
    event.preventDefault();

    const index = Number(current.dataset.index);
    const row = Math.floor(index / 3) + offset[0];
    const col = (index % 3) + offset[1];
    if (row < 0 || row > 2 || col < 0 || col > 2) return;

    boardRef.current
      ?.querySelector<HTMLElement>(`[data-index="${row * 3 + col}"]`)
      ?.focus();
  }

  return (
    <div
      ref={boardRef}
      role="group"
      aria-label="Tic-Tac-Toe board"
      onKeyDown={handleKeyDown}
      className="mx-auto grid w-full max-w-[26rem] grid-cols-3 gap-2.5 rounded-3xl border bg-card/70 p-3 shadow-2xl shadow-black/20 backdrop-blur-sm sm:gap-3 sm:p-4"
    >
      {board.map((value, index) => (
        <GameCell
          key={index}
          index={index}
          value={value}
          nextPlayer={nextPlayer}
          isWinning={winningLine?.includes(index) ?? false}
          gameOver={result !== null}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
