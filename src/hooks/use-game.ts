"use client";

import { useCallback, useReducer } from "react";
import {
  createInitialState,
  gameReducer,
  type Player,
} from "@/lib/game";

export function useGame() {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState,
  );

  const play = useCallback(
    (index: number) => dispatch({ type: "move", index }),
    [],
  );
  const newGame = useCallback(() => dispatch({ type: "newGame" }), []);
  const resetScore = useCallback(() => dispatch({ type: "resetScore" }), []);
  const setName = useCallback(
    (player: Player, name: string) =>
      dispatch({ type: "setName", player, name }),
    [],
  );

  return { state, play, newGame, resetScore, setName };
}
