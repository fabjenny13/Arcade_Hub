import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import AccountModal from "../Components/AccountModal";
import "./Dashboard.css";

const ACCOUNTS_KEY = "arcadeHub.accounts";
const CURRENT_USER_KEY = "arcadeHub.currentUser";

const loadStored = (key, fallback) => {
  const value = localStorage.getItem(key);
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  useEffect(() => {
    setAccounts(loadStored(ACCOUNTS_KEY, []));
    setCurrentUser(loadStored(CURRENT_USER_KEY, null));
  }, []);

  const friendButtonLabel = useMemo(() => {
    if (currentUser) {
      return "Friends";
    }

    return "Friends (login required)";
  }, [currentUser]);

  const handleAccountsUpdate = (nextAccounts) => {
    setAccounts(nextAccounts);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(nextAccounts));
  };

  const handleLogin = (account) => {
    setCurrentUser(account);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(account));
    setIsAccountOpen(false);
  };

  const handleCreateAccount = (newAccount) => {
    const nextAccounts = [...accounts, newAccount];
    handleAccountsUpdate(nextAccounts);
    handleLogin(newAccount);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="top-actions">
        <button
          className="friends-btn"
          disabled={!currentUser}
          title={
            currentUser
              ? "Invite friends to your next match"
              : "Log in to invite friends"
          }
        >
          {friendButtonLabel}
        </button>
        {currentUser ? (
          <div className="user-actions">
            <button
              className="login-btn"
              onClick={() => setIsAccountOpen(true)}
            >
              Account
            </button>
            <button className="ghost-btn" onClick={handleLogout}>
              Log out
            </button>
          </div>
        ) : (
          <button className="login-btn" onClick={() => setIsAccountOpen(true)}>
            Login
          </button>
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

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        accounts={accounts}
        onLogin={handleLogin}
        onCreateAccount={handleCreateAccount}
      />
    </div>
  );
}
