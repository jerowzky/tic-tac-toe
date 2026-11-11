export type Player = "X" | "O";
export type CellValue = Player | null;
export type Board = readonly CellValue[];
export type WinLine = readonly [number, number, number];

export const WIN_LINES: readonly WinLine[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export type GameResult =
  | { kind: "win"; winner: Player; line: WinLine }
  | { kind: "draw" };

export interface Scores {
  X: number;
  O: number;
  draws: number;
}

export type PlayerNames = Record<Player, string>;

export interface GameState {
  board: Board;
  current: Player;
  result: GameResult | null;
  scores: Scores;
  names: PlayerNames;
}

export type GameAction =
  | { type: "move"; index: number }
  | { type: "newGame" }
  | { type: "resetScore" }
  | { type: "setName"; player: Player; name: string };

export const DEFAULT_NAMES: PlayerNames = { X: "Player X", O: "Player O" };
export const MAX_NAME_LENGTH = 12;

export const createEmptyBoard = (): Board => Array<CellValue>(9).fill(null);

export function createInitialState(): GameState {
  return {
    board: createEmptyBoard(),
    current: "X",
    result: null,
    scores: { X: 0, O: 0, draws: 0 },
    names: { ...DEFAULT_NAMES },
  };
}

export function getResult(board: Board): GameResult | null {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    const mark = board[a];
    if (mark && mark === board[b] && mark === board[c]) {
      return { kind: "win", winner: mark, line };
    }
  }
  return board.every((cell) => cell !== null) ? { kind: "draw" } : null;
}

export const otherPlayer = (player: Player): Player =>
  player === "X" ? "O" : "X";

export function getDisplayName(names: PlayerNames, player: Player): string {
  return names[player].trim() || DEFAULT_NAMES[player];
}

export function getStatusMessage(state: GameState): string {
  const { result, current, names } = state;
  if (result?.kind === "draw") return "It's a Draw!";
  if (result?.kind === "win") {
    return `${getDisplayName(names, result.winner)} Wins!`;
  }
  return `${getDisplayName(names, current)}'s Turn`;
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "move": {
      const { index } = action;
      const valid = Number.isInteger(index) && index >= 0 && index < 9;
      if (!valid || state.result || state.board[index] !== null) return state;

      const board = state.board.map((cell, i) =>
        i === index ? state.current : cell,
      );
      const result = getResult(board);

      let scores = state.scores;
      if (result?.kind === "win") {
        scores = { ...scores, [result.winner]: scores[result.winner] + 1 };
      } else if (result?.kind === "draw") {
        scores = { ...scores, draws: scores.draws + 1 };
      }

      return {
        ...state,
        board,
        result,
        scores,
        current: result ? state.current : otherPlayer(state.current),
      };
    }
    case "newGame":
      return {
        ...state,
        board: createEmptyBoard(),
        current: "X",
        result: null,
      };
    case "resetScore":
      return {
        ...state,
        board: createEmptyBoard(),
        current: "X",
        result: null,
        scores: { X: 0, O: 0, draws: 0 },
      };
    case "setName":
      return {
        ...state,
        names: {
          ...state.names,
          [action.player]: action.name.slice(0, MAX_NAME_LENGTH),
        },
      };
    default:
      return state;
  }
}
