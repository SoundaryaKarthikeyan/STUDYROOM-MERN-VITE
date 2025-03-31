import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchUserFiles from "../utils/FetchUserFiles"; // Utility to fetch user files
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getFiles = async () => {
      const userFiles = await fetchUserFiles();
      setFiles(userFiles);
    };
    getFiles();
  }, []);

  return (
    <div className="dashboard-container min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <button
          className="p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
        <button
          className="p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          onClick={() => navigate("/files")}
        >
          Files
        </button>
        <button
          className="p-4 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
          onClick={() => navigate("/schedule")}
        >
          Schedule
        </button>
        <button
          className="p-4 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
          onClick={() => navigate("/settings")}
        >
          Settings
        </button>
        <button
          className="p-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
          onClick={() => navigate("/analytics")}
        >
          Analytics
        </button>
        <button
          className="p-4 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600"
          onClick={() => navigate("/study-planner")}
        >
          Study Planner
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">My Uploaded Files</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {files.length === 0 ? (
          <p>No files uploaded yet.</p>
        ) : (
          files.map((file) => (
            <div key={file.id} className="p-4 bg-white rounded-lg shadow">
              <p className="font-semibold">{file.name}</p>
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                View File
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
