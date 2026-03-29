import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ModeSelector({ gameTitle, onPlayComputer, className = "" }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedFriend, setSelectedFriend] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");

  const friends = useMemo(() => user?.friends || [], [user]);

  const handleInvite = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!selectedFriend) {
      setInviteMessage("Choose a friend to invite first.");
      return;
    }

    setInviteMessage(`Invite sent to ${selectedFriend} for ${gameTitle}!`);
  };

  return (
    <section className={`mode-selector ${className}`.trim()}>
      <h2>Choose Mode</h2>
      <div className="mode-buttons">
        <button onClick={onPlayComputer}>Play vs Computer</button>
      </div>

      <div className="invite-box">
        <h3>Invite a Friend</h3>
        {!user ? (
          <button onClick={() => navigate("/login")}>Login to invite friends</button>
        ) : friends.length === 0 ? (
          <p className="mode-hint">Add friends first from the Friends page.</p>
        ) : (
          <>
            <select
              value={selectedFriend}
              onChange={(event) => setSelectedFriend(event.target.value)}
            >
              <option value="">Select a friend</option>
              {friends.map((friend) => (
                <option key={friend} value={friend}>
                  {friend}
                </option>
              ))}
            </select>
            <button onClick={handleInvite}>Invite Friend</button>
          </>
        )}
      </div>

      {inviteMessage && <p className="mode-hint">{inviteMessage}</p>}
    </section>
  );
}
