import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./style.css";
import GameBoot from "../Components/GameBoot";
import "../Components/GameBoot.css";

import { useAuth } from "../context/AuthContext";

export default function FlappyBird() {
  const { user } = useAuth();
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 650);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (booting) return;

    window.arcadeAuth = {
      isLoggedIn: Boolean(user),
    };
  }, [booting, user]);

  useEffect(() => {
    if (booting) return;
    if (document.getElementById("flappy-script")) return;

    const script = document.createElement("script");
    script.id = "flappy-script";
    script.src = "/src/FlappyBird/script.js";
    script.defer = true;
    document.body.appendChild(script);
  }, [booting]);

  if (booting) {
    return (
      <div className="flappy-bird-page">
        <Navbar />
        <GameBoot
          title="Flappy Bird"
          subtitle="Loading pipes, gravity, and timing controls..."
        />
      </div>
    );
  }

  return (
    <div className="flappy-bird-page">
      <Navbar />

      <div className="top-ui">
        <button id="themeBtn">🌙</button>
        <button id="musicBtn">🔊</button>

        <audio id="bgMusic" loop src="./audio/bg-music.mp3"></audio>
        <audio id="crashSound" src="./audio/crash.wav"></audio>

        <select id="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <div className="scoreboard">
          Score: <span id="score">0</span> | Best: <span id="best">0</span>
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
