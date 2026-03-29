import { useMemo, useState } from "react";
import ModeSelector from "./ModeSelector";
import "./MultiplayerGames.css";

const ROWS = 6;
const COLS = 7;

const createGrid = () => Array.from({ length: ROWS }, () => Array(COLS).fill(null));

const dropToken = (grid, col, token) => {
  const next = grid.map((row) => [...row]);
  for (let row = ROWS - 1; row >= 0; row -= 1) {
    if (!next[row][col]) {
      next[row][col] = token;
      return next;
    }
  }
  return null;
};

const hasWinner = (grid, token) => {
  const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      if (grid[row][col] !== token) continue;

      for (const [dr, dc] of dirs) {
        let connected = 1;
        while (
          connected < 4 &&
          grid[row + dr * connected]?.[col + dc * connected] === token
        ) {
          connected += 1;
        }
        if (connected === 4) return true;
      }
    }
  }
  return false;
};

export default function ConnectFour() {
  const [started, setStarted] = useState(false);
  const [grid, setGrid] = useState(createGrid());
  const [status, setStatus] = useState("Choose a mode to begin.");

  const isBoardFull = useMemo(
    () => grid.every((row) => row.every((cell) => cell !== null)),
    [grid],
  );

  const start = () => {
    setStarted(true);
    setGrid(createGrid());
    setStatus("Your move: drop a yellow chip.");
  };

  const playColumn = (col) => {
    if (!started || isBoardFull || status.includes("wins")) {
      return;
    }

    const afterPlayer = dropToken(grid, col, "player");
    if (!afterPlayer) {
      setStatus("Column is full. Pick another column.");
      return;
    }

    if (hasWinner(afterPlayer, "player")) {
      setGrid(afterPlayer);
      setStatus("You win!");
      return;
    }

    const availableCols = Array.from({ length: COLS }, (_, idx) => idx).filter(
      (idx) => dropToken(afterPlayer, idx, "cpu") !== null,
    );

    if (availableCols.length === 0) {
      setGrid(afterPlayer);
      setStatus("Draw game.");
      return;
    }

    const cpuCol = availableCols[Math.floor(Math.random() * availableCols.length)];
    const afterCpu = dropToken(afterPlayer, cpuCol, "cpu");

    setGrid(afterCpu);
    setStatus(hasWinner(afterCpu, "cpu") ? "Computer wins." : "Your move.");
  };

  return (
    <main className="multiplayer-page">
      <div className="multiplayer-shell">
        <h1>Connect Four Rush</h1>
        <p>Invite a friend or take on the CPU in this quick strategy game.</p>

        <ModeSelector gameTitle="Connect Four Rush" onPlayComputer={start} />

        <div className="game-controls">
          {Array.from({ length: COLS }, (_, col) => (
            <button key={col} onClick={() => playColumn(col)}>
              Drop {col + 1}
            </button>
          ))}
        </div>

        <p>{status}</p>
        <div className="connect-grid">
          {grid.flat().map((cell, index) => (
            <div key={index} className={`connect-cell ${cell || ""}`.trim()} />
          ))}
        </div>
      </div>
    </main>
  );
}
