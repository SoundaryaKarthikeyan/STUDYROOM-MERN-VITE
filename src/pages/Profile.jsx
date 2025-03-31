import { useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase"; 
import { addActiveUser, listenForActiveUsers } from "../Firebase/rtdb";
import { fetchNotes } from "../Firebase/Firestore";

function Profile() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activeUsers, setActiveUsers] = useState({});

  useEffect(() => {
    // Get the logged-in user
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      addActiveUser(currentUser.uid, currentUser.displayName);
    }

    // Fetch user's notes
    fetchNotes().then(setNotes);

    // Listen for active users in real-time
    listenForActiveUsers(setActiveUsers);
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Please log in.</p>
      )}

      <h2>Your Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}: {note.content}</li>
        ))}
      </ul>

      <h2>Active Users</h2>
      <ul>
        {Object.values(activeUsers).map((user, index) => (
          <li key={index}>{user.username} is online</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
