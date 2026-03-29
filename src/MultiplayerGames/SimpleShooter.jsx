import { useState } from "react";
import ModeSelector from "./ModeSelector";
import "./MultiplayerGames.css";

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function SimpleShooter() {
  const [started, setStarted] = useState(false);
  const [playerHp, setPlayerHp] = useState(100);
  const [cpuHp, setCpuHp] = useState(100);
  const [charge, setCharge] = useState(0);
  const [log, setLog] = useState("Pick a mode to begin.");

  const reset = () => {
    setStarted(true);
    setPlayerHp(100);
    setCpuHp(100);
    setCharge(0);
    setLog("Battle started! Choose your move.");
  };

  const cpuTurn = (nextPlayerHp, nextCpuHp) => {
    if (nextPlayerHp <= 0 || nextCpuHp <= 0) {
      return;
    }

    const cpuDamage = randomInt(8, 18);
    const updatedHp = Math.max(0, nextPlayerHp - cpuDamage);
    setPlayerHp(updatedHp);

    if (updatedHp <= 0) {
      setLog("Computer landed a final shot. You lost this round.");
      return;
    }

    setLog(`Computer hits you for ${cpuDamage} damage.`);
  };

  const shoot = () => {
    if (!started || playerHp <= 0 || cpuHp <= 0) return;
    const damage = randomInt(12, 22) + charge;
    const updatedCpu = Math.max(0, cpuHp - damage);
    setCpuHp(updatedCpu);
    setCharge(0);

    if (updatedCpu <= 0) {
      setLog(`Direct hit for ${damage}. You win!`);
      return;
    }

    setLog(`You hit for ${damage} damage.`);
    cpuTurn(playerHp, updatedCpu);
  };

  const powerUp = () => {
    if (!started || playerHp <= 0 || cpuHp <= 0) return;
    const bonus = randomInt(4, 10);
    setCharge((current) => current + bonus);
    setLog(`Power charging: +${bonus} bonus damage on next shot.`);
    cpuTurn(playerHp, cpuHp);
  };

  const heal = () => {
    if (!started || playerHp <= 0 || cpuHp <= 0) return;
    const amount = randomInt(8, 15);
    const nextHp = Math.min(100, playerHp + amount);
    setPlayerHp(nextHp);
    setLog(`You healed for ${amount}.`);
    cpuTurn(nextHp, cpuHp);
  };

  return (
    <main className="multiplayer-page">
      <div className="multiplayer-shell">
        <h1>Simple Shooting Duel</h1>
        <p>Fast turn-based shooting game with invite support.</p>

        <ModeSelector gameTitle="Simple Shooting Duel" onPlayComputer={reset} />

        <div className="shooter-grid">
          <div className="hp-row">
            <strong>Your HP:</strong> <span>{playerHp}</span>
          </div>
          <div className="hp-row">
            <strong>Computer HP:</strong> <span>{cpuHp}</span>
          </div>
          <div className="hp-row">
            <strong>Charge Bonus:</strong> <span>{charge}</span>
          </div>
          <div className="game-controls">
            <button onClick={shoot}>Shoot</button>
            <button onClick={powerUp}>Charge</button>
            <button onClick={heal}>Heal</button>
          </div>
          <p>{log}</p>
        </div>
      </div>
    </main>
  );
}
