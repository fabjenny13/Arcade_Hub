import { useState } from "react";
import "./Minesweeper.css";
import Navbar from "../Components/Navbar";
import { useAuth } from "../context/AuthContext";

const SIZE = 8;
const MINES = 10;

function generateBoard() {
  const board = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => ({
      mine: false,
      revealed: false,
      count: 0,
    })),
  );

  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * SIZE);
    const c = Math.floor(Math.random() * SIZE);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      placed++;
    }
  }

  const dirs = [-1, 0, 1];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      dirs.forEach((dr) =>
        dirs.forEach((dc) => {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nc >= 0 && nr < SIZE && nc < SIZE) {
            if (board[nr][nc].mine) count++;
          }
        }),
      );
      board[r][c].count = count;
    }
  }

  return board;
}

export default function Minesweeper() {
  const { user, reportScore } = useAuth();
  const [board, setBoard] = useState(generateBoard);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const reveal = (r, c) => {
    if (gameOver || board[r][c].revealed) return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    newBoard[r][c].revealed = true;

    if (newBoard[r][c].mine) {
      setGameOver(true);
    } else {
      const points = 5;
      setScore((prev) => prev + points);

      if (user) {
        reportScore("minesweeper", points).catch(() => {
          console.error;
        });
      }
    }

    setBoard(newBoard);
  };

  const reset = () => {
    setBoard(generateBoard());
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="page">
      <Navbar />
      <div className="minesweeper-page">
        <h1 className="minesweeper-title">Minesweeper</h1>
        <p>Score: {score}</p>

        <div
          className="minesweeper-grid"
          style={{ gridTemplateColumns: `repeat(${SIZE}, 36px)` }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => reveal(r, c)}
                className={`cell ${cell.revealed ? "revealed" : ""}`}
              >
                {cell.revealed && (cell.mine ? "✕" : cell.count || "")}
              </button>
            )),
          )}
        </div>

        {gameOver && <p>Game Over</p>}
        <button className="reset-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
