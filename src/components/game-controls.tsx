import { RotateCcw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface GameControlsProps {
  /** New Game is pointless on an untouched board. */
  canStartNewGame: boolean;
  /** Reset Score is pointless when nothing has been played or scored. */
  canResetScore: boolean;
  onNewGame: () => void;
  onResetScore: () => void;
}

export function GameControls({
  canStartNewGame,
  canResetScore,
  onNewGame,
  onResetScore,
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      <Button onClick={onNewGame} disabled={!canStartNewGame} className="sm:min-w-40">
        <RotateCcw aria-hidden="true" />
        New Game
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" disabled={!canResetScore} className="sm:min-w-40">
            <Trash2 aria-hidden="true" />
            Reset Score
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset the scoreboard?</AlertDialogTitle>
            <AlertDialogDescription>
              This sets both players&apos; wins and the draw count back to zero
              and clears the current board. Player names are kept.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onResetScore}>Reset Score</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
