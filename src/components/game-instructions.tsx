import { Card } from "@/components/ui/card";

const STEPS = [
  "X always goes first. Players take turns placing their mark in an empty square.",
  "Get three of your marks in a row — across, down, or diagonally — to win.",
  "If all nine squares fill up with no winner, the round is a draw.",
  "Start another round with New Game; scores are kept until you reset them.",
] as const;

export function GameInstructions() {
  return (
    <section aria-labelledby="how-to-play" className="mt-10">
      <Card className="p-5 sm:p-6">
        <h2 id="how-to-play" className="mb-3 text-lg font-semibold tracking-tight">
          How to play
        </h2>
        <ol className="flex flex-col gap-2.5 text-sm text-muted-foreground">
          {STEPS.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span
                aria-hidden="true"
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground"
              >
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 border-t pt-4 text-xs text-muted-foreground">
          Keyboard: press Tab to reach the board, use the arrow keys to move
          between squares, and Enter or Space to place your mark.
        </p>
      </Card>
    </section>
  );
}
