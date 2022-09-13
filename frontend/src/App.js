import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
