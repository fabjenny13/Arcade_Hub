import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* ── Top actions ── */}
      <div className="top-actions">
        <button
          className="friends-btn"
          onClick={() => (user ? navigate("/friends") : navigate("/login"))}
        >
          Friends
        </button>

        {user ? (
          <div className="user-section">
            <span className="username">Hello, {user.username}</span>
            <button
              className="profile-btn"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>

      {/* ── Header ── */}
      <header>
        <div className="dashboard-header">
          <h1 className="dashboard-title">Arcade Hub</h1>
          <p>A collection of simple, relaxing mini games</p>
        </div>
      </header>

      {/* ── Game grid ── */}
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
            <p>Reflex • Timing • Casual</p>
          </Link>

          <Link to="/snake" className="game-card">
            <img src="/images/snake.png" alt="Snake Game" />
            <h3>Snake</h3>
            <p>Reflex • Planning • Classic</p>
          </Link>

          <div className="game-card">
            <img src="/images/tictactoe.png" alt="Tic Tac Toe" />
            <h3>Tic-Tac-Toe</h3>
            <p>Strategy • Casual • Turn-Based</p>
          </div>

          <div className="game-card">
            <img src="/images/tetris.png" alt="Tetris" />
            <h3>Tetris</h3>
            <p>Strategy • Casual • Turn-Based</p>
          </div>

          <div className="game-card">
            <img src="/images/tetris.png" alt="Tetris" />
            <h3>Ping Pong</h3>
            <p>Strategy • Casual • Turn-Based</p>
          </div>

          <div className="game-card">
            <img src="/images/tetris.png" alt="Tetris" />
            <h3>Shooter</h3>
            <p>Strategy • Casual • Turn-Based</p>
          </div>

          <div className="game-card">
            <img src="/images/tetris.png" alt="Tetris" />
            <h3>Game</h3>
            <p>Strategy • Casual • Turn-Based</p>
          </div>
        </div>
      </section>
    </div>
  );
}
