import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./Profile.css";
import { useAuth } from "../context/AuthContext";

const RANK_SYMBOLS = ["🥇", "🥈", "🥉"];

export default function Profile() {
  const navigate = useNavigate();
  const { user, authLoading, logout } = useAuth();

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    if (!user) return;

    async function fetchUsers() {
      try {
        const res = await fetch("/api/leaderboard", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUsers(false);
      }
    }

    fetchUsers();
  }, [user]);

  if (!authLoading && !user) return <Navigate to="/login" replace />;
  if (!user) return null;

  // Avatar: first letter of username
  const avatarLetter = user.username?.[0]?.toUpperCase() ?? "?";

  const scoreEntries = Object.entries(user.scores || {});

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-content">
        {/* ── Profile header ── */}
        <section className="profile-card">
          <div className="profile-avatar">{avatarLetter}</div>
          <div className="profile-info">
            <p className="profile-label">Player</p>
            <h1 className="profile-name">{user.username}</h1>
          </div>
          <button className="profile-logout" onClick={handleLogout}>
            Logout
          </button>
        </section>

        {/* ── Your game scores ── */}
        <section className="profile-card">
          <div className="profile-card-header">
            <h2>Game Scores</h2>
          </div>
          <ul className="leaderboard-list">
            {scoreEntries.length ? (
              scoreEntries.map(([game, score]) => (
                <li key={game}>
                  <span>—</span>
                  <span>{game}</span>
                  <span>{score} pts</span>
                </li>
              ))
            ) : (
              <li className="empty-state">
                <span>No games played yet</span>
              </li>
            )}
          </ul>
        </section>

        {/* ── Leaderboard ── */}
        <section className="profile-card">
          <div className="profile-card-header">
            <h2>Leaderboard</h2>
            <span className="profile-pill">Weekly</span>
          </div>

          {loadingUsers ? (
            <p className="loading-text">Loading…</p>
          ) : (
            <ul className="leaderboard-list">
              {users.map((u, index) => {
                const rankClass =
                  index === 0
                    ? "rank-1"
                    : index === 1
                      ? "rank-2"
                      : index === 2
                        ? "rank-3"
                        : "";
                const isMe = u.username === user.username ? "is-me" : "";
                const rankSymbol =
                  index < 3 ? RANK_SYMBOLS[index] : `${index + 1}.`;

                return (
                  <li
                    key={u.username}
                    className={`${rankClass} ${isMe}`.trim()}
                  >
                    <span>{rankSymbol}</span>
                    <span>{u.username}</span>
                    <span>{u.xp} XP</span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
