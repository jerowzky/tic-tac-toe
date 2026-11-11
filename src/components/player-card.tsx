import { Trophy } from "lucide-react";

import {
  DEFAULT_NAMES,
  MAX_NAME_LENGTH,
  type Player,
} from "@/lib/game";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlayerMark } from "@/components/player-mark";

interface PlayerCardProps {
  player: Player;
  name: string;
  score: number;
  isActive: boolean;
  isWinner: boolean;
  className?: string;
  onNameChange: (player: Player, name: string) => void;
}

export function PlayerCard({
  player,
  name,
  score,
  isActive,
  isWinner,
  className,
  onNameChange,
}: PlayerCardProps) {
  const inputId = `name-${player}`;
  const isX = player === "X";

  return (
    <Card
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "flex flex-col gap-1 p-3 transition-all duration-300",
        isActive &&
          (isX
            ? "border-x/60 shadow-[0_0_28px_-8px_var(--x)]"
            : "border-o/60 shadow-[0_0_28px_-8px_var(--o)]"),
        isWinner && "border-transparent ring-2 " + (isX ? "ring-x/70" : "ring-o/70"),
        className,
      )}
    >
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            isX ? "bg-x/15" : "bg-o/15",
          )}
        >
          <PlayerMark player={player} className="size-5" />
        </span>
        <Label htmlFor={inputId} className="sr-only">
          {`Player ${player} name`}
        </Label>
        <Input
          id={inputId}
          value={name}
          maxLength={MAX_NAME_LENGTH}
          placeholder={DEFAULT_NAMES[player]}
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => onNameChange(player, event.target.value)}
          onBlur={() => {
            if (!name.trim()) onNameChange(player, DEFAULT_NAMES[player]);
          }}
        />
      </div>

      <div className="flex items-end justify-between px-1">
        <span
          className={cn(
            "text-4xl font-bold tabular-nums leading-none",
            isX ? "text-x" : "text-o",
          )}
          aria-label={`${score} ${score === 1 ? "win" : "wins"}`}
        >
          {score}
        </span>
        <span className="flex h-5 items-center gap-1 text-xs font-medium text-muted-foreground">
          {isWinner ? (
            <>
              <Trophy className="size-3.5" aria-hidden="true" /> Winner
            </>
          ) : isActive ? (
            <>
              <span
                className={cn(
                  "size-2 animate-pulse rounded-full",
                  isX ? "bg-x" : "bg-o",
                )}
                aria-hidden="true"
              />
              Your turn
            </>
          ) : null}
        </span>
      </div>
    </Card>
  );
}
