import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  WIN_LINES,
  createInitialState,
  gameReducer,
  getResult,
  getStatusMessage,
  type GameAction,
  type GameState,
} from "../src/lib/game.ts";

const run = (actions: GameAction[], from = createInitialState()): GameState =>
  actions.reduce(gameReducer, from);

const moves = (...indexes: number[]): GameAction[] =>
  indexes.map((index) => ({ type: "move", index }));

describe("win detection", () => {
  it("has exactly eight winning lines", () => {
    assert.equal(WIN_LINES.length, 8);
  });

  for (const line of WIN_LINES) {
    it(`X wins on line ${line.join("-")}`, () => {
      // O plays the first two cells that are not on X's line.
      const others = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((i) => !line.includes(i));
      const sequence = [line[0], others[0], line[1], others[1], line[2]];
      const state = run(moves(...sequence));
      assert.equal(state.result?.kind, "win");
      if (state.result?.kind === "win") {
        assert.equal(state.result.winner, "X");
        assert.deepEqual([...state.result.line], [...line]);
      }
      assert.equal(state.scores.X, 1);
      assert.equal(getStatusMessage(state), "Player X Wins!");
    });
  }

  it("O can win", () => {
    const state = run(moves(0, 3, 1, 4, 8, 5));
    assert.equal(state.result?.kind, "win");
    assert.equal(state.scores.O, 1);
    assert.equal(getStatusMessage(state), "Player O Wins!");
  });
});

describe("draw", () => {
  it("detects a draw when the board fills with no winner", () => {
    // X O X / X O O / O X X
    const state = run(moves(0, 1, 2, 4, 3, 5, 7, 6, 8));
    assert.deepEqual(state.result, { kind: "draw" });
    assert.equal(state.scores.draws, 1);
    assert.equal(getStatusMessage(state), "It's a Draw!");
  });

  it("a win on the last cell is a win, not a draw", () => {
    // X O X / O X O / O X X  -> X wins diagonal 0-4-8 on the ninth move
    const state = run(moves(0, 1, 2, 3, 4, 5, 7, 6, 8));
    assert.equal(state.result?.kind, "win");
    assert.equal(state.scores.draws, 0);
  });
});

describe("turns and move validation", () => {
  it("alternates turns starting with X", () => {
    let state = createInitialState();
    assert.equal(getStatusMessage(state), "Player X's Turn");
    state = run(moves(4), state);
    assert.equal(state.board[4], "X");
    assert.equal(getStatusMessage(state), "Player O's Turn");
    state = run(moves(0), state);
    assert.equal(state.board[0], "O");
    assert.equal(state.current, "X");
  });

  it("ignores moves on occupied cells without changing the turn", () => {
    const before = run(moves(4));
    const after = run(moves(4), before);
    assert.equal(after, before);
    assert.equal(after.current, "O");
  });

  it("ignores out-of-range moves", () => {
    const state = createInitialState();
    assert.equal(run(moves(-1, 9, 1.5), state), state);
  });

  it("blocks further moves once the game has ended", () => {
    const won = run(moves(0, 3, 1, 4, 2));
    const after = run(moves(8), won);
    assert.equal(after, won);
    assert.equal(after.board[8], null);
  });

  it("scores a finished round only once", () => {
    const won = run(moves(0, 3, 1, 4, 2));
    const after = run(moves(5, 6, 7, 8), won);
    assert.equal(after.scores.X, 1);
    assert.equal(after.scores.O, 0);
  });
});

describe("controls", () => {
  it("New Game clears the board but keeps scores and names", () => {
    let state = run(moves(0, 3, 1, 4, 2));
    state = run([{ type: "setName", player: "X", name: "Ana" }], state);
    state = run([{ type: "newGame" }], state);
    assert.deepEqual([...state.board], Array(9).fill(null));
    assert.equal(state.result, null);
    assert.equal(state.current, "X");
    assert.equal(state.scores.X, 1);
    assert.equal(state.names.X, "Ana");
  });

  it("Reset Score clears scores and the board", () => {
    let state = run(moves(0, 3, 1, 4, 2));
    state = run([{ type: "newGame" }, ...moves(0, 1, 2, 4, 3, 5, 7, 6, 8)], state);
    assert.equal(state.scores.X, 1);
    assert.equal(state.scores.draws, 1);
    state = run([{ type: "resetScore" }], state);
    assert.deepEqual(state.scores, { X: 0, O: 0, draws: 0 });
    assert.deepEqual([...state.board], Array(9).fill(null));
    assert.equal(state.result, null);
  });

  it("custom names appear in status messages; blank names fall back", () => {
    let state = run([{ type: "setName", player: "X", name: "Ana" }]);
    assert.equal(getStatusMessage(state), "Ana's Turn");
    state = run([{ type: "setName", player: "X", name: "   " }], state);
    assert.equal(getStatusMessage(state), "Player X's Turn");
  });

  it("limits name length", () => {
    const state = run([{ type: "setName", player: "O", name: "x".repeat(40) }]);
    assert.equal(state.names.O.length, 12);
  });
});

describe("getResult", () => {
  it("returns null for an empty board", () => {
    assert.equal(getResult(Array(9).fill(null)), null);
  });
});
