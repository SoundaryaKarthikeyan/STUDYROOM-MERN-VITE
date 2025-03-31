import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./Firebase/Firebase"; // Firebase import for authentication
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Files from "./pages/Files";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import Clock from "./pages/Clock";
import RoomDashboard from "./pages/Dashboard";
import StreakPage from "./pages/StreakPage";
import ChatScreen from "./components/ChatScreen";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider
import { ChatProvider } from "./components/ChatContext"; // Import ChatProvider
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [guest, setGuest] = useState(false);

  useEffect(() => {
    // Set up Firebase authentication state listener
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <ChatProvider>
        {user || guest ? (
          <div className="app-container">
            <Sidebar user={user} guest={guest} />
            <div className="content">
              <Routes>
                {/* Main Routes after authentication */}
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<RoomDashboard />} />
                <Route path="/profile" element={<Profile />} />
                {!guest && <Route path="/files" element={<Files />} />}
                {!guest && <Route path="/schedule" element={<Schedule />} />}
                <Route path="/settings" element={<Settings />} />
                <Route path="/clock" element={<Clock />} />
                <Route path="/streakpage" element={<StreakPage />} />
                <Route path="/chatpage" element={<ChatScreen />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            {/* Login Route for unauthenticated users */}
            <Route path="/login" element={<Login setGuest={setGuest} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </ChatProvider>
    </AuthProvider>
  );
};

export default App;
