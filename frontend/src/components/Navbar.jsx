import { useNavigate, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/signup" || location.pathname === "/") {
    return null;
  }
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon className="nav-icon" />
        </div>
        <div className="navbar-items">
          <div className="navbar-item">
            <LanguageIcon className="nav-icon" />
            English
          </div>
          <div className="navbar-item">
            <IconButton onClick={() => navigate("/Notifications")}>
              <NotificationsIcon className="nav-icon" />
            </IconButton>
            {/* will need to be refactored to only appear when there are notifications */}
            <div className="notification-counter">1</div>
          </div>
          <div className="navbar-item">
            <MenuIcon className="nav-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
