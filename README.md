# Tic-Tac-Toe

A polished two-player Tic-Tac-Toe game built with **Next.js (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4** and **shadcn/ui-style components** (Radix primitives + `class-variance-authority`), with **Lucide** icons. No backend or database.

## Features

- 3×3 board with friendly cloud and sunshine characters; the cloud goes first
- Occupied cells are rejected and moves are blocked after the game ends
- All 8 winning lines detected; the 3 winning cells are highlighted and pulse; draws detected
- Scoreboard with cloud wins, sunshine wins and draws; the active player's card is highlighted
- Editable player names (defaults: "Cloud" / "Sunshine"), reflected in the status message
- **New Game** keeps scores; **Reset Score** asks for confirmation, then clears scores and the board
- Dark theme by default with a light-theme toggle (saved in `localStorage`, no flash on load)
- Responsive layout, keyboard support (Tab, arrow keys between cells, Enter/Space), ARIA labels and a live status region, `prefers-reduced-motion` respected

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm test           # game-logic tests (node:test, 22 cases)
```

## Project structure

```
src/
  app/            layout, page, global styles, icon
  components/     Header, Game, GameBoard, GameCell, ScoreBoard, PlayerCard,
                  GameStatus, GameControls, GameInstructions, Footer, ThemeToggle
    ui/           button, card, input, label, alert-dialog (shadcn/ui style)
  hooks/use-game  useReducer wrapper around the game reducer
  lib/game.ts     pure game logic and types (no React)
tests/            logic tests
```

Game rules live entirely in `src/lib/game.ts` as a pure reducer, so the UI only dispatches actions (`move`, `newGame`, `resetScore`, `setName`). Scores update inside the reducer at the moment a round ends, and the reducer rejects any move after that, so a round can only be scored once.

## Deploy to Vercel

No special configuration is needed; Vercel detects Next.js automatically.

**Via Git (recommended)**

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repository, and click **Deploy**.

**Via CLI**

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```
