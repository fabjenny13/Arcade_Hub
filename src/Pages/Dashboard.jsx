import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="top-actions">
        <button className="friends-btn">Friends</button>
        {isAuthenticated ? (
          <div className="user-section">
            <span className="username">Hello, {user.username}!</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
      </div>

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

          <Link to="/pacman" className="game-card">
            <img src="/images/pacman.png" alt="Pac-Man" />
            <h3>Pac-Man</h3>
            <p>Arcade • Navigation • Reflex</p>
          </Link>

          <Link to="/flappybird" className="game-card">
            <img src="/images/flappybird.png" alt="Flappy Bird" />
            <h3>Flappy Bird</h3>
            <p>Arcade • Timing • Challenge</p>
          </Link>

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
