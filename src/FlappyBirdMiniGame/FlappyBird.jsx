import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import "./style.css";

export default function FlappyBird() {
  useEffect(() => {
    // Load the Flappy Bird game script
    const script = document.createElement("script");
    script.src = "/src/FlappyBirdMiniGame/script.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flappy-bird-page">
      <Navbar />
      
      <div className="top-ui">
        <button id="themeBtn">🌙</button>

        <select id="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <div className="scoreboard">
          Score: <span id="score">0</span> |
          Best: <span id="best">0</span>
        </div>
      </div>

      <canvas id="game"></canvas>

      <div className="overlay" id="overlay">
        <h1>Flappy Bird</h1>
        <p>Press SPACE to start</p>
      </div>
    </div>
  );
}
