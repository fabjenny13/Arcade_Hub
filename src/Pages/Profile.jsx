import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./Profile.css";
import { useAuth } from "../Context/AuthContext";

const RANK_SYMBOLS = ["🥇", "🥈", "🥉"];

export default function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user, authLoading, logout, fetchUserProfile } = useAuth();

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [profileUser, setProfileUser] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState("");

  const isOwnProfile = !username || username === user?.email.split("@")[0];

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

    if (isOwnProfile) {
      fetchUsers();
    }
  }, [user, isOwnProfile]);

  useEffect(() => {
    if (!user || isOwnProfile) {
      setProfileUser(user);
      setProfileError("");
      setLoadingProfile(false);
      return;
    }

    async function loadFriendProfile() {
      try {
        setLoadingProfile(true);
        setProfileError("");
        const friend = await fetchUserProfile(username);
        setProfileUser(friend);
      } catch (error) {
        setProfileError(error.message);
      } finally {
        setLoadingProfile(false);
      }
    }

    loadFriendProfile();
  }, [user, isOwnProfile, username, fetchUserProfile]);

  if (!authLoading && !user) return <Navigate to="/login" replace />;
  if (!user) return null;

  const displayedUser = profileUser || user;
  const avatarLetter =
    displayedUser.email.split("@")[0]?.[0]?.toUpperCase() ?? "?";

  const scoreEntries = Object.entries(displayedUser.scores || {});

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-content">
        <section className="profile-card">
          <div className="profile-avatar">{avatarLetter}</div>
          <div className="profile-info">
            <p className="profile-label">
              {isOwnProfile ? "Player" : "Friend"}
            </p>
            <h1 className="profile-name">
              {displayedUser.email.split("@")[0]}
            </h1>
            <p className="profile-xp">{displayedUser.xp} XP</p>
          </div>

          {isOwnProfile ? (
            <button className="profile-logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button
              className="profile-back"
              onClick={() => navigate("/friends")}
            >
              Back to Friends
            </button>
          )}
        </section>

        <section className="profile-card">
          <div className="profile-card-header">
            <h2>{isOwnProfile ? "Game Scores" : "Games Played"}</h2>
          </div>

          {loadingProfile ? (
            <p className="loading-text">Loading…</p>
          ) : profileError ? (
            <p className="loading-text">{profileError}</p>
          ) : (
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
          )}
        </section>

        {isOwnProfile && (
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
                  const isMe =
                    u.username === user.email.split("@")[0] ? "is-me" : "";
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
        )}
      </main>
    </div>
  );
}
