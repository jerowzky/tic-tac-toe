import { Handshake, Trophy } from "lucide-react";

import type { GameState } from "@/lib/game";
import { getStatusMessage } from "@/lib/game";
import { cn } from "@/lib/utils";
import { PlayerMark } from "@/components/player-mark";

export function GameStatus({ state }: { state: GameState }) {
  const { result, current } = state;
  const message = getStatusMessage(state);
  const activePlayer = result?.kind === "win" ? result.winner : current;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-14 items-center justify-center"
    >
      <p
        key={message}
        className={cn(
          "status-pop font-unbounded flex items-center gap-3 rounded-full border bg-card/70 px-5 py-2.5 text-lg font-semibold tracking-tight shadow-lg backdrop-blur-sm sm:text-xl",
          result?.kind !== "draw" && activePlayer === "X" && "text-x",
          result?.kind !== "draw" && activePlayer === "O" && "text-o",
          result?.kind === "draw" && "text-foreground",
        )}
      >
        {result?.kind === "win" ? (
          <Trophy className="size-5" aria-hidden="true" />
        ) : result?.kind === "draw" ? (
          <Handshake className="size-5" aria-hidden="true" />
        ) : (
          <PlayerMark player={current} className="size-5" />
        )}
        {message}
      </p>
    </div>
  );
}
