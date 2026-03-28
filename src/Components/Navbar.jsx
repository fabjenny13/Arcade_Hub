import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <div className="nav-brand-icon">👾</div>
        <span className="nav-brand-name">Arcade Hub</span>
      </Link>

      <Link to="/" className="nav-home">
        <span className="nav-home-arrow">←</span>
        Home
      </Link>
    </nav>
  );
}
