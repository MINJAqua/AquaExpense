import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./pages/Dashboard";
// import Navbar from "./components/Navbar";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
// import Notifications from "./pages/Notifications";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="App">
        <Sidebar />
        <div className="container">
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/Profile" element={<Profile />} /> */}
            {/* <Route path="/Settings" element={<Settings />} />
            <Route path="/Notifications" element={<Notifications />} /> */}
          </Routes>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default App;
