import { useMemo, useState } from "react";
import ModeSelector from "./ModeSelector";
import "./MultiplayerGames.css";

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const winnerForBoard = (board) => {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default function TicTacToe() {
  const [started, setStarted] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [status, setStatus] = useState("Start a match against the computer.");

  const winner = useMemo(() => winnerForBoard(board), [board]);
  const isDraw = useMemo(() => !winner && board.every(Boolean), [winner, board]);

  const handleMove = (index) => {
    if (!started || board[index] || winner || isDraw) {
      return;
    }

    const playerBoard = [...board];
    playerBoard[index] = "X";
    const playerWinner = winnerForBoard(playerBoard);

    if (playerWinner) {
      setBoard(playerBoard);
      setStatus("You win!");
      return;
    }

    const remaining = playerBoard
      .map((value, idx) => (value ? null : idx))
      .filter((value) => value !== null);

    if (remaining.length === 0) {
      setBoard(playerBoard);
      setStatus("Draw game.");
      return;
    }

    const cpuMove = remaining[Math.floor(Math.random() * remaining.length)];
    playerBoard[cpuMove] = "O";
    const cpuWinner = winnerForBoard(playerBoard);

    setBoard(playerBoard);
    setStatus(cpuWinner ? "Computer wins this round." : "Your turn.");
  };

  const startGame = () => {
    setStarted(true);
    setBoard(Array(9).fill(null));
    setStatus("Your turn.");
  };

  return (
    <main className="multiplayer-page">
      <div className="multiplayer-shell">
        <h1>Tic-Tac-Toe Arena</h1>
        <p>Invite a friend or jump into a quick game vs computer.</p>

        <ModeSelector gameTitle="Tic-Tac-Toe" onPlayComputer={startGame} />

        <p>{status}</p>
        <div className="ttt-board">
          {board.map((cell, index) => (
            <button
              key={index}
              className="ttt-cell"
              onClick={() => handleMove(index)}
              type="button"
            >
              {cell}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
