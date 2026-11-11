"use client";

import { useGame } from "@/hooks/use-game";
import { GameBoard } from "@/components/game-board";
import { GameControls } from "@/components/game-controls";
import { GameStatus } from "@/components/game-status";
import { ScoreBoard } from "@/components/scoreboard";

export function Game() {
  const { state, play, newGame, resetScore, setName } = useGame();
  const { board, current, result, scores } = state;

  const boardIsEmpty = board.every((cell) => cell === null);
  const hasScores = scores.X + scores.O + scores.draws > 0;

  return (
    <section aria-label="Game" className="flex flex-col gap-5">
      <GameStatus state={state} />
      <ScoreBoard state={state} onNameChange={setName} />
      <GameBoard
        board={board}
        nextPlayer={current}
        result={result}
        onSelect={play}
      />
      <GameControls
        canStartNewGame={!boardIsEmpty}
        canResetScore={hasScores || !boardIsEmpty}
        onNewGame={newGame}
        onResetScore={resetScore}
      />
    </section>
  );
}
