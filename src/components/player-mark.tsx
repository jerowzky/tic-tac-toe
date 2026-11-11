import type { Player } from "@/lib/game";
import { cn } from "@/lib/utils";

interface PlayerMarkProps {
  player: Player;
  /** Play the "draw" animation (used when a mark is placed). */
  animate?: boolean;
  className?: string;
}

/** Friendly cloud and sun characters rendered as SVG so they can animate. */
export function PlayerMark({ player, animate = false, className }: PlayerMarkProps) {
  const draw = animate ? "mark-draw" : "";
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(
        player === "X" ? "text-x" : "text-o",
        animate && "mark-pop",
        className,
      )}
    >
      {player === "X" ? (
        <>
          <path
            d="M28 73a17 17 0 0 1-1-34 24 24 0 0 1 46-6 17 17 0 0 1 0 40Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={4}
            pathLength={1}
            className={cn(draw, animate && "mark-draw-delayed")}
          />
          <circle cx={43} cy={54} r={2.5} fill="#173047" />
          <circle cx={58} cy={54} r={2.5} fill="#173047" />
          <path
            d="M44 62q6 7 12 0"
            stroke="#173047"
            strokeWidth={3}
          />
          <circle cx={35} cy={61} r={2.5} fill="var(--background)" opacity=".55" />
          <circle cx={66} cy={61} r={2.5} fill="var(--background)" opacity=".55" />
        </>
      ) : (
        <>
          <path
            d="M50 9v9m0 64v9M9 50h9m64 0h9M21 21l7 7m44 44 7 7m0-58-7 7m-44 44-7 7"
            stroke="currentColor"
            strokeWidth={5}
            pathLength={1}
            className={draw}
          />
          <circle
            cx={50}
            cy={50}
            r={24}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={3}
            pathLength={1}
            className={cn(draw, animate && "mark-draw-delayed")}
          />
          <circle cx={42} cy={48} r={2.5} fill="#173047" />
          <circle cx={58} cy={48} r={2.5} fill="#173047" />
          <path
            d="M42 57q8 9 16 0"
            stroke="#173047"
            strokeWidth={3}
          />
          <circle cx={34} cy={57} r={2.5} fill="var(--background)" opacity=".55" />
          <circle cx={66} cy={57} r={2.5} fill="var(--background)" opacity=".55" />
        </>
      )}
    </svg>
  );
}
