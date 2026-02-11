import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Profile.css";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="page profile-page">
      <Navbar />
      <main className="profile-content">
        <section className="profile-card">
          <div>
            <h1 className="profile-name">{user.username}</h1>
          </div>
          <button className="profile-logout" onClick={handleLogout}>
            Logout
          </button>
        </section>

        <section className="profile-card">
          <div className="profile-card-header">
            <h2>Leaderboard</h2>
            <span className="profile-pill">Weekly</span>
          </div>
          <ul className="leaderboard-list">
            <li>
              <span>1.</span>
              <span>NovaRush</span>
              <span>1,240 pts</span>
            </li>
            <li>
              <span>2.</span>
              <span>PixelAce</span>
              <span>1,110 pts</span>
            </li>
            <li>
              <span>3.</span>
              <span>PlayerOne</span>
              <span>980 pts</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
