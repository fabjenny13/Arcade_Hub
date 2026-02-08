import Navbar from "../Components/Navbar";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="page profile-page">
      <Navbar />
      <main className="profile-content">
        <section className="profile-card">
          <div>
            <p className="profile-label">Username</p>
            <h1 className="profile-name">PlayerOne</h1>
          </div>
          <button className="profile-logout">Logout</button>
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
