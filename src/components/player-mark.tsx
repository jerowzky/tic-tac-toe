import type { Player } from "@/lib/game";
import { cn } from "@/lib/utils";

interface PlayerMarkProps {
  player: Player;
  /** Play the "draw" animation (used when a mark is placed). */
  animate?: boolean;
  className?: string;
}

/** Hand-drawn style X / O marks rendered as SVG so they can animate. */
export function PlayerMark({ player, animate = false, className }: PlayerMarkProps) {
  const draw = animate ? "mark-draw" : "";
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={11}
      strokeLinecap="round"
      aria-hidden="true"
      className={cn(player === "X" ? "text-x" : "text-o", className)}
    >
      {player === "X" ? (
        <>
          <path d="M24 24 L76 76" pathLength={1} className={draw} />
          <path
            d="M76 24 L24 76"
            pathLength={1}
            className={cn(draw, animate && "mark-draw-delayed")}
          />
        </>
      ) : (
        <circle cx={50} cy={50} r={27} pathLength={1} className={draw} />
      )}
    </svg>
  );
}
