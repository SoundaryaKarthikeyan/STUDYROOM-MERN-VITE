import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";
import "../styles/App.css"; // Ensure styles exist
import "../styles/Sidebar.css"
export default function Sidebar({ user, guest }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (guest) {
      navigate("/login"); // Redirect guest users to login
    } else {
      await auth.signOut();
      navigate("/login");
    }
  };

  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/dashboard">☰</Link></li>
        <li><Link to="/chatpage">✉ </Link></li>
        <li><Link to="/profile">👤</Link></li>
        {!guest && <li><Link to="/files">🗁</Link></li>}
        {!guest && <li><Link to="/schedule">🗓</Link></li>}
        <li><Link to="/clock"> ⏲</Link></li>
        <li><Link to="/streakpage">🐦‍🔥</Link></li>
        <li><Link to="/Goal">🎯</Link></li>
        <li><Link to="/settings">⚙︎</Link></li>
        
      </ul>
      <button className="logout-btn" onClick={handleLogout}>
        {guest ? "Exit Guest Mode" : "Logout"}
      </button>
    </nav>
  );
}
