import { useEffect, useRef, useState } from "react";
import "./pingpong.css";
import Navbar from "../Components/Navbar";

export default function PingPong() {
  const gameRef = useRef(null);

  const [gameState, setGameState] = useState("idle"); // idle | playing | gameover
  const [playerY, setPlayerY] = useState(150);
  const [aiY, setAiY] = useState(150);

  const [ball, setBall] = useState({
    x: 300,
    y: 200,
    dx: 4,
    dy: 3,
  });

  const paddleHeight = 100;
  const gameHeight = 400;
  const gameWidth = 600;

  const keys = useRef({
    up: false,
    down: false,
  });

  // 🎮 Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") keys.current.up = true;
      if (e.key === "ArrowDown") keys.current.down = true;
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowUp") keys.current.up = false;
      if (e.key === "ArrowDown") keys.current.down = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // 🔁 Game Loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      setBall((prev) => {
        let { x, y, dx, dy } = prev;

        x += dx;
        y += dy;

        // Wall collision
        if (y <= 0 || y >= gameHeight - 10) {
          dy = -dy;
        }

        // Player paddle collision
        if (x <= 20 && y >= playerY && y <= playerY + paddleHeight) {
          dx = -dx;
        }

        // AI paddle collision
        if (x >= gameWidth - 30 && y >= aiY && y <= aiY + paddleHeight) {
          dx = -dx;
        }

        // ❌ Missed by player → Game Over
        if (x < 0) {
          setGameState("gameover");
          return prev;
        }

        // AI misses → just reset ball
        if (x > gameWidth) {
          return {
            x: gameWidth / 2,
            y: gameHeight / 2,
            dx: 4 * (Math.random() > 0.5 ? 1 : -1),
            dy: 3,
          };
        }

        return { x, y, dx, dy };
      });

      // 🎮 Smooth player movement
      const speed = 5;
      setPlayerY((prev) => {
        let newY = prev;
        if (keys.current.up) newY -= speed;
        if (keys.current.down) newY += speed;
        return Math.max(0, Math.min(newY, gameHeight - paddleHeight));
      });

      // 🤖 AI
      setAiY((prev) => {
        if (ball.y > prev + paddleHeight / 2) {
          return Math.min(prev + 3, gameHeight - paddleHeight);
        } else {
          return Math.max(prev - 3, 0);
        }
      });
    }, 16);

    return () => clearInterval(interval);
  }, [gameState, ball.y]);

  // ▶️ Start / Replay
  const startGame = () => {
    setPlayerY(150);
    setAiY(150);
    setBall({
      x: gameWidth / 2,
      y: gameHeight / 2,
      dx: 4,
      dy: 3,
    });
    setGameState("playing");
  };

  return (
    <div className="page">
      <Navbar />

      <div className="game" ref={gameRef}>
        {/* Player Paddle */}
        <div className="paddle" style={{ left: "10px", top: `${playerY}px` }} />

        {/* AI Paddle */}
        <div
          className="paddle"
          style={{ left: `${gameWidth - 20}px`, top: `${aiY}px` }}
        />

        {/* Ball */}
        <div
          className="ball"
          style={{ left: `${ball.x}px`, top: `${ball.y}px` }}
        />

        {gameState === "idle" && (
          <div class="button-div">
            <button className="start-button" onClick={startGame}>
              START GAME
            </button>
          </div>
        )}

        {gameState === "gameover" && (
          <div class="button-div">
            <h2>Game Over</h2>
            <button class="start-button" onClick={startGame}>
              Replay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
