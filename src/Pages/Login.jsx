import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../Components/Navbar";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }

    if (isSignup) {
      const result = signup(username, password);
      if (!result.success) {
        setError(result.message);
        return;
      }
      navigate("/profile");
    } else {
      const success = login(username, password);
      if (!success) {
        setError("Invalid username or password");
        return;
      }
      navigate("/profile");
    }
  };

  return (
    <div className="page">
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          <h1>Arcade Hub</h1>
          <h3>{isSignup ? "Create Account" : "Login"}</h3>
          <br></br>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error-message">{error}</p>}

            <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
          </form>

          <p className="toggle-auth">
            {isSignup ? "Already have an account?" : "New here?"}{" "}
            <span onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? "Login" : "Create one"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
