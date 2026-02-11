import { Link } from "react-router-dom";
// import { useEffect, useMemo, useState } from "react";
// import AccountModal from "../Components/AccountModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

// const ACCOUNTS_KEY = "arcadeHub.accounts";
// const CURRENT_USER_KEY = "arcadeHub.currentUser";

// const loadStored = (key, fallback) => {
//   const value = localStorage.getItem(key);
//   if (!value) {
//     return fallback;
//   }

//   try {
//     return JSON.parse(value);
//   } catch (error) {
//     return fallback;
//   }
// };

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // const [accounts, setAccounts] = useState([]);
  // const [currentUser, setCurrentUser] = useState(null);
  // const [isAccountOpen, setIsAccountOpen] = useState(false);

  // useEffect(() => {
  //   setAccounts(loadStored(ACCOUNTS_KEY, []));
  //   setCurrentUser(loadStored(CURRENT_USER_KEY, null));
  // }, []);

  // const handleAccountsUpdate = (nextAccounts) => {
  //   setAccounts(nextAccounts);
  //   localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(nextAccounts));
  // };

  // const handleLogin = (account) => {
  //   setCurrentUser(account);
  //   localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(account));
  //   setIsAccountOpen(false);
  // };

  // const handleCreateAccount = (newAccount) => {
  //   const nextAccounts = [...accounts, newAccount];
  //   handleAccountsUpdate(nextAccounts);
  //   handleLogin(newAccount);
  // };

  // const handleLogout = () => {
  //   setCurrentUser(null);
  //   localStorage.removeItem(CURRENT_USER_KEY);
  // };

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="top-actions">
        <button className="friends-btn">Friends</button>
        {/* <Link to="/profile" className="profile-btn">
          Profile
        </Link> */}

        {isAuthenticated ? (
          <div className="user-section">
            <span className="username">Hello, {user.username}!</span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>

      <header>
        <div className="dashboard-header">
          <h1 className="dashboard-title">Arcade Hub</h1>
          <p>A collection of simple, relaxing mini games</p>
          <br></br>
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
            <p>Strategy • Casual • Turn-Based</p>
          </Link>

          <div className="game-card">
            <img src="/images/snake.png" alt="Snake Game" />
            <h3>Snake</h3>
            <p>Reflex • Planning • Classic</p>
          </div>

          <div className="game-card">
            <img src="/images/tictactoe.png" alt="Tic Tac Toe" />
            <h3>Tic-Tac-Toe</h3>
            <p>Strategy • Casual • Turn-Based</p>
          </div>

          <div className="game-card">
            <img src="/images/tetris.png" alt="Tic Tac Toe" />
            <h3>Tetris</h3>
            <p>Strategy • Casual • Turn-Based</p>
          </div>
        </div>
      </section>

      {/* <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        accounts={accounts}
        onLogin={handleLogin}
        onCreateAccount={handleCreateAccount}
      /> */}
    </div>
  );
}
