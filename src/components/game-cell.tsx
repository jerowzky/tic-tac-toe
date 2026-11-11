import type { CellValue, Player } from "@/lib/game";
import { cn } from "@/lib/utils";
import { PlayerMark } from "@/components/player-mark";

interface GameCellProps {
  index: number;
  value: CellValue;
  /** Player whose turn it is — used for the hover preview. */
  nextPlayer: Player;
  isWinning: boolean;
  gameOver: boolean;
  onSelect: (index: number) => void;
}

const ROWS = ["Row 1", "Row 2", "Row 3"] as const;
const COLS = ["column 1", "column 2", "column 3"] as const;

export function GameCell({
  index,
  value,
  nextPlayer,
  isWinning,
  gameOver,
  onSelect,
}: GameCellProps) {
  const playable = value === null && !gameOver;
  const label = `${ROWS[Math.floor(index / 3)]}, ${COLS[index % 3]}: ${
    value ?? "empty"
  }`;

  return (
    <button
      type="button"
      data-index={index}
      aria-label={label}
      aria-disabled={!playable}
      onClick={() => {
        if (playable) onSelect(index);
      }}
      className={cn(
        "group relative flex aspect-square items-center justify-center rounded-2xl border bg-muted/50 outline-none transition-all duration-200",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
nextPlayer === "X"
  ? "focus-visible:ring-x"
  : "focus-visible:ring-o",
        playable
          ? "cursor-pointer hover:-translate-y-0.5 hover:border-input hover:bg-muted hover:shadow-lg active:scale-95"
          : "cursor-default",
        gameOver && !isWinning && value !== null && "opacity-60",
        gameOver && !isWinning && value === null && "opacity-40",
        isWinning &&
          "win-cell scale-[1.03] border-transparent bg-card shadow-lg",
        isWinning && value === "X" && "[--glow:var(--x)] ring-2 ring-x/60",
        isWinning && value === "O" && "[--glow:var(--o)] ring-2 ring-o/60",
      )}
    >
      {value ? (
        <PlayerMark player={value} animate className="size-3/5" />
      ) : (
        playable && (
          <PlayerMark
            player={nextPlayer}
            className="size-3/5 opacity-0 transition-opacity duration-200 group-hover:opacity-25 group-focus-visible:opacity-25"
          />
        )
      )}
    </button>
  );
}
