//import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const Sidebar = () => {
  //All TBD Icons are being directed to setting page for now but will change when we actaully have stuff

  const location = useLocation();

  if (location.pathname === "/signup" || location.pathname === "/") {
    return null;
  }

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Aqua Expense</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <li>
            <DashboardIcon className="icon" />
            <Link className="link" to="/Dashboard">
              Dashboard
            </Link>
          </li>

          <p className="title">User</p>
          <li>
            <AccountCircleIcon className="icon" />
            <Link className="link" to="/Profile">
              Profile
            </Link>
          </li>
          <li>
            <SettingsIcon className="icon" />
            <Link className="link" to="/Settings">
              Settings
            </Link>
          </li>
          <li>
            <LoginIcon className="icon" />
            <Link className="link" to="/">
              Logout
            </Link>
          </li>
          <li>
            <PersonAddAltIcon className="icon" />
            <Link className="link" to="/signup">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
