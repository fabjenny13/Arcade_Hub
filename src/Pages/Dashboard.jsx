import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* HEADER */}
      <header>
        <div>
          <h1 className="dashboard-title">Arcade Hub</h1>
          <p>A collection of simple, relaxing mini games</p>
        </div>
      </header>

      {/* GAME GRID */}
      <section className="games-section">
        <div className="game-grid">
          <Link to="/minesweeper" className="game-card">
            <img src="/images/minesweeper.png" alt="Minesweeper" />
            <h3>Minesweeper</h3>
            <p>Logic • Deduction • Classic</p>
          </Link>

          <div className="game-card disabled">
            <img src="/images/pacman.png" alt="Pac-Man" />
            <h3>Pac-Man</h3>
            <p>Arcade • Navigation • Reflex</p>
          </div>

          <div className="game-card disabled">
            <img src="/images/snake.png" alt="Snake Game" />
            <h3>Snake</h3>
            <p>Reflex • Planning • Classic</p>
          </div>

          <div className="game-card disabled">
            <img src="/images/tictactoe.png" alt="Tic Tac Toe" />
            <h3>Tic-Tac-Toe</h3>
            <p>Strategy • Casual • Turn-Based</p>
          </div>
        </div>
      </section>

      <footer className="dashboard-footer">
        <p>More games coming soon</p>
      </footer>
    </div>
  );
}
