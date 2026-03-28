import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./Profile.css";
import { useAuth } from "../context/AuthContext";

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
        const res = await fetch("/api/leaderboard", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

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

  // Redirect if not logged in
  if (!authLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="page profile-page">
      <Navbar />

      <main className="profile-content">
        {/* Profile card */}
        <section className="profile-card">
          <div>
            <h1 className="profile-name">{user.username}</h1>
          </div>
          <button className="profile-logout" onClick={handleLogout}>
            Logout
          </button>
        </section>

        {/* Your game scores */}
        <section className="profile-card">
          <div className="profile-card-header">
            <h2>Your Game Scores</h2>
          </div>
          <ul className="leaderboard-list">
            {Object.entries(user.scores || {}).length ? (
              Object.entries(user.scores || {}).map(([game, score]) => (
                <li key={game}>
                  <span>{game}</span>
                  <span>{score} pts</span>
                </li>
              ))
            ) : (
              <li>
                <span>No games played yet</span>
                <span>0 pts</span>
              </li>
            )}
          </ul>
        </section>

        {/* Leaderboard */}
        <section className="profile-card">
          <div className="profile-card-header">
            <h2>Leaderboard</h2>
            <span className="profile-pill">Weekly</span>
          </div>

          {loadingUsers ? (
            <p>Loading leaderboard…</p>
          ) : (
            <ul className="leaderboard-list">
              {users.map((u, index) => (
                <li key={u.username}>
                  <span>{index + 1}.</span>
                  <span>{u.username}</span>
                  <span>{u.xp} XP</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
