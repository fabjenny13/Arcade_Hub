import { useState } from "react";
import Navbar from "../Components/Navbar";
import "./tictactoe.css";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares) {
  for (let [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function Square({ value, onClick, highlight }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 100,
        height: 100,
        fontSize: 40,
        fontFamily: "'Georgia', serif",
        fontWeight: "bold",
        border: "none",
        background: highlight ? "#f0e6d3" : "#faf7f2",
        color: value === "X" ? "#c0392b" : "#2c3e50",
        cursor: value ? "default" : "pointer",
        borderRadius: 12,
        boxShadow: highlight
          ? "0 4px 16px rgba(192,57,43,0.18)"
          : "0 2px 8px rgba(0,0,0,0.07)",
        transition: "background 0.2s, transform 0.1s, box-shadow 0.2s",
        transform: value ? "scale(1)" : undefined,
        outline: "none",
        letterSpacing: 2,
      }}
      onMouseEnter={(e) => {
        if (!value) e.currentTarget.style.background = "#ede8df";
      }}
      onMouseLeave={(e) => {
        if (!value)
          e.currentTarget.style.background = highlight ? "#f0e6d3" : "#faf7f2";
      }}
    >
      {value}
    </button>
  );
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const result = calculateWinner(squares);
  const winLine = result?.line || [];
  const isDraw = !result && squares.every(Boolean);

  const status = result
    ? `${result.winner} wins!`
    : isDraw
      ? "It's a draw!"
      : `${xIsNext ? "X" : "O"}'s turn`;

  function handleClick(i) {
    if (squares[i] || result) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div class="page">
      <Navbar />
      <div class="game-container">
        <h1 class="title">Tic Tac Toe</h1>

        <p
          style={{
            fontSize: 15,
            color: result
              ? result.winner === "X"
                ? "#c0392b"
                : "#2c3e50"
              : "#888",
            letterSpacing: 3,
            marginBottom: 32,
            textTransform: "uppercase",
            fontWeight: result || isDraw ? "bold" : "normal",
            transition: "color 0.3s",
          }}
        >
          {status}
        </p>

        <div class="grid">
          {squares.map((val, i) => (
            <Square
              key={i}
              value={val}
              onClick={() => handleClick(i)}
              highlight={winLine.includes(i)}
            />
          ))}
        </div>

        <button
          onClick={reset}
          class="reset-button"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#2c3e50";
            e.currentTarget.style.color = "#f5f0e8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#2c3e50";
          }}
        >
          New Game
        </button>
      </div>
    </div>
  );
}
