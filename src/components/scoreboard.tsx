import { Handshake } from "lucide-react";

import type { GameState, Player } from "@/lib/game";
import { Card } from "@/components/ui/card";
import { PlayerCard } from "@/components/player-card";

interface ScoreBoardProps {
  state: GameState;
  onNameChange: (player: Player, name: string) => void;
}

export function ScoreBoard({ state, onNameChange }: ScoreBoardProps) {
  const { names, scores, result, current } = state;
  const gameOver = result !== null;
  const winner = result?.kind === "win" ? result.winner : null;

  return (
    <section
      aria-label="Scoreboard"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3"
    >
      <PlayerCard
        player="X"
        name={names.X}
        score={scores.X}
        isActive={!gameOver && current === "X"}
        isWinner={winner === "X"}
        onNameChange={onNameChange}
      />
      <Card className="order-3 col-span-2 flex items-center justify-between gap-1 p-3 sm:order-2 sm:col-span-1 sm:flex-col sm:justify-center">
        <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <Handshake className="size-4" aria-hidden="true" />
          Draws
        </span>
        <span
          className="text-4xl font-bold tabular-nums leading-none"
          aria-label={`${scores.draws} ${scores.draws === 1 ? "draw" : "draws"}`}
        >
          {scores.draws}
        </span>
      </Card>
      <PlayerCard
        player="O"
        name={names.O}
        score={scores.O}
        isActive={!gameOver && current === "O"}
        isWinner={winner === "O"}
        className="order-2 sm:order-3"
        onNameChange={onNameChange}
      />
    </section>
  );
}
