import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import PlaidLink from "./pages/Plaid";

function App() {
  const [showNav, setShowNav] = useState(true);

  return (
    <div className="App">
      {showNav && <Sidebar />}
      <div className="container">
        {showNav && (
          <nav>
            <Navbar />
          </nav>
        )}
        <Routes>
          <Route path="/" element={<Login funcNav={setShowNav} />} />
          <Route path="/signup" element={<SignUp funcNav={setShowNav} />} />
          <Route path="/plaid" element={<PlaidLink />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Notifications" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
