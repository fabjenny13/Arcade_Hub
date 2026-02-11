import { useState, useEffect } from "react";
import "./Pacman.css";
import Navbar from "../Components/Navbar";

// Game board: 0=empty, 1=wall, 2=pellet
const createInitialBoard = () => [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export default function Pacman() {
  const [player, setPlayer] = useState({ row: 5, col: 6, direction: "right" });
  const [score, setScore] = useState(0);
  const [grid, setGrid] = useState(createInitialBoard());
  const [gameState, setGameState] = useState("playing");
  const [highScore, setHighScore] = useState(0);

  // Count total pellets
  const totalPellets = () => {
    return grid.flat().filter((cell) => cell === 2).length;
  };

  // Check win condition
  useEffect(() => {
    if (totalPellets() === 0 && gameState === "playing") {
      setGameState("won");
      if (score > highScore) setHighScore(score);
    }
  }, [grid, gameState, score, highScore]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (gameState !== "playing") return;

      let { row, col } = player;
      let newRow = row;
      let newCol = col;
      let direction = player.direction;

      if (e.key === "ArrowUp") {
        newRow--;
        direction = "up";
      }
      if (e.key === "ArrowDown") {
        newRow++;
        direction = "down";
      }
      if (e.key === "ArrowLeft") {
        newCol--;
        direction = "left";
      }
      if (e.key === "ArrowRight") {
        newCol++;
        direction = "right";
      }

      // Check bounds and walls
      if (
        newRow < 0 ||
        newRow >= grid.length ||
        newCol < 0 ||
        newCol >= grid[0].length
      )
        return;
      if (grid[newRow][newCol] === 1) return;

      // Eat pellets
      if (grid[newRow][newCol] === 2) {
        const newGrid = grid.map((r) => [...r]);
        newGrid[newRow][newCol] = 0;
        setGrid(newGrid);
        setScore(score + 10);
      }

      setPlayer({ row: newRow, col: newCol, direction });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [player, grid, score, gameState]);

  const resetGame = () => {
    setPlayer({ row: 5, col: 6, direction: "right" });
    setScore(0);
    setGrid(createInitialBoard());
    setGameState("playing");
  };

  return (
    <div className="page">
      <Navbar />

      <div className="game-container">
        <div className="game-header">
          <div className="score-board">
            <div className="score">Score: {score}</div>
            <div className="high-score">Best: {highScore}</div>
          </div>

          {gameState === "won" && (
            <div className="message won">
              You Win!
              <button onClick={resetGame}>New Game</button>
            </div>
          )}
        </div>

        <div className="board">
          {grid.map((row, i) =>
            row.map((cell, j) => {
              let className = "cell";

              if (cell === 1) className += " wall";
              if (cell === 2) className += " pellet";

              if (player.row === i && player.col === j) {
                className += ` pacman pacman-${player.direction}`;
              }

              return <div key={`${i}-${j}`} className={className} />;
            }),
          )}
        </div>

        <div className="controls">
          <p>Use arrow keys to move</p>
        </div>
      </div>
    </div>
  );
}
