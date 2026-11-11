import { Grid3x3 } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="flex w-full  items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-7">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-x to-o text-background shadow-lg">
          <Grid3x3 className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h1 className="font-unbounded text-2xl font-bold tracking-tight">Tic-Tac-Toe</h1>
          <p className="font-unbounded text-sm text-muted-foreground">
            Two players. One board. Three in a row.
          </p>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}
