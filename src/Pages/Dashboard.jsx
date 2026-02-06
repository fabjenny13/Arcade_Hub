import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Arcade Hub</h1>

      <div className="game-grid">
        <Link to="/minesweeper" className="game-card">
          <h2>Minesweeper</h2>
          <p>Classic logic puzzle</p>
        </Link>

        {/* future games */}
        <div className="game-card disabled">
          <h2>Coming Soon</h2>
        </div>
      </div>
    </div>
  );
}
