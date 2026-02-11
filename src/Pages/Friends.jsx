import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../Components/Navbar";
import "./Friends.css";

export default function Friends() {
  const { user, addFriend } = useAuth();
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const users = JSON.parse(localStorage.getItem("arcadeHub.users")) || [];

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) &&
      u.username !== user.username,
  );

  const handleAdd = (username) => {
    const success = addFriend(username);
    setMessage(success ? "Friend added!" : "Unable to add friend");
  };

  return (
    <div className="page">
      <Navbar />
      <div className="friends-container">
        <div className="friends-box">
          <h1>Friends</h1>

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {message && <p className="info">{message}</p>}

          <div className="users-list">
            {filteredUsers.map((u) => (
              <div key={u.username} className="user-row">
                <span>{u.username}</span>
                <button onClick={() => handleAdd(u.username)}>Add</button>
              </div>
            ))}
          </div>

          <h2>Your Friends</h2>
          <ul className="friends-list">
            {(user.friends || []).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
