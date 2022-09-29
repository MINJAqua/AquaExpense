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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function checkToken() {
      const item = localStorage.getItem("token");

      if (item) {
        setIsLoggedIn(true);
        navbar();
        sidebar();
      }
    }
    checkToken();
  }, []);

  const sidebar = () => {
    console.log(localStorage.token);
    if (isLoggedIn) {
      return <Sidebar />;
    }
  };

  const navbar = () => {
    if (isLoggedIn) {
      return <Navbar />;
    }
  };

  const checkLogin = () => {};

  return (
    <div className="App">
      {sidebar()}
      <div className="container">
        {navbar()}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
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
