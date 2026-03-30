import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../Components/Navbar";
import "./Friends.css";

export default function Friends() {
  const { user, authLoading, addFriend, fetchUsers } = useAuth();
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchAllUsers = async () => {
      try {
        const results = await fetchUsers(search);
        setUsers(results);
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchAllUsers();
  }, [search, user, fetchUsers]);

  if (!authLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  const handleAdd = async (username) => {
    try {
      await addFriend(username);
      setMessage("Friend added!");
      const refreshedUsers = await fetchUsers(search);
      setUsers(refreshedUsers);
    } catch (error) {
      setMessage(error.message);
    }
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
            {users.map((u) => (
              <div key={u.username} className="user-row">
                <span>{u.username}</span>
                <button
                  disabled={u.isFriend}
                  onClick={() => handleAdd(u.username)}
                >
                  {u.isFriend ? "Added" : "Add"}
                </button>
              </div>
            ))}
          </div>

          <h2>Your Friends</h2>
          <ul className="friends-list">
            {(user?.friends || []).map((f) => (
              <li key={f}>
                <span>{f}</span>
                <Link to={`/profile/${encodeURIComponent(f)}`}>View Profile</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
