import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const games = [
    {
      title: "Minesweeper",
      path: "/minesweeper",
      image: "/images/minesweeper.png",
      description: "Logic • Deduction • Classic",
    },
    {
      title: "Pac-Man",
      path: "/pacman",
      image: "/images/pacman.png",
      description: "Arcade • Navigation • Reflex",
    },
    {
      title: "Flappy Bird",
      path: "/flappybird",
      image: "/images/flappybird.png",
      description: "Reflex • Timing • Casual",
    },
    {
      title: "Snake",
      path: "/snake",
      image: "/images/snake.png",
      description: "Reflex • Planning • Classic",
    },
    {
      title: "Brick Breaker",
      path: "/brick-breaker",
      thumb: "BB",
      description: "Paddle • Physics • Arcade",
    },
    {
      title: "Pong",
      path: "/pong",
      thumb: "PG",
      description: "Arcade • Duel • Precision",
    },
    {
      title: "Tic-Tac-Toe",
      path: "/tictactoe",
      image: "/images/tictactoe.png",
      description: "Strategy • PvP/AI • Classic",
    },
    {
      title: "Tetris",
      path: "/tetris",
      image: "/images/tetris.png",
      description: "Blocks • Rotation • Puzzle",
    },
  ];

  return (
    <div className="dashboard">
      <div className="ambient-3d" aria-hidden="true">
        <span className="float-shape orb orb-a" />
        <span className="float-shape orb orb-b" />
        <span className="float-shape panel panel-a" />
        <span className="float-shape panel panel-b" />
      </div>

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
          {games.map((game) => (
            <Link to={game.path} key={game.path} className="game-card">
              {game.image ? (
                <img src={game.image} alt={game.title} />
              ) : (
                <div className="game-thumb">{game.thumb}</div>
              )}
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <span className="play-cta">Play</span>
            </Link>
          ))}
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

          <Link to="/tictactoe" className="game-card">
            <img src="/images/tictactoe.png" alt="Tic Tac Toe" />
            <h3>Tic-Tac-Toe</h3>
            <p>Strategy • Casual • Turn-Based</p>
          </Link>

          <Link to="/pingpong" className="game-card">
            <img src="/images/pingpong.png" alt="Ping Pong" />
            <h3>Ping Pong</h3>
            <p>Strategy • Casual • Turn-Based</p>
          </Link>

          <div className="game-card">
            <img src="/images/tetris.png" alt="Tetris" />
            <h3>Tetris</h3>
            <p>Strategy • Casual • Turn-Based</p>
          </div>

          <Link to="/shooter" className="game-card">
            <img src="/images/tetris.png" alt="Shooter" />
            <h3>Shooter</h3>
            <p>Strategy • Casual • Turn-Based</p>
          </Link>

          <div className="game-card">
            <img src="/images/tetris.png" alt="Game" />
            <h3>Game</h3>
            <p>Strategy • Casual • Turn-Based</p>
          </div>
        </div>
      </section>
    </div>
  );
}
