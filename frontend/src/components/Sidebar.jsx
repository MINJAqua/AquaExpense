//import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';



const Sidebar = () => {

  //All TBD Icons are being directed to setting page for now but will change when we actaully have stuff

  return (
    <div className='sidebar'>
      <div className='top'>
        <span className='logo'>Aqua Expense</span>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className='title'>MAIN</p>
          <li>
            <DashboardIcon className='icon'/>
            <Link className="link" to="/">
              Dashboard
            </Link>
          </li>
          <p className='title'>Something1</p>
          <li>
            <HelpIcon className='icon'/>
          <Link className="link" to="/Settings">
              TBD
            </Link>
          </li>
          <li>
            <HelpIcon className='icon'/>
          <Link className="link" to="/Settings">
              TBD
            </Link>
          </li>
          <li>
            <HelpIcon className='icon'/>
          <Link className="link" to="/Settings">
              TBD
            </Link>
          </li>
          <p className='title'>Something2</p>
          <li>
            <HelpIcon className='icon'/>
          <Link className="link" to="/Settings">
              TBD
            </Link>
          </li>
          <li>
            <HelpIcon className='icon'/>
          <Link className="link" to="/Settings">
              TBD
            </Link>
          </li>
          <li>
            <HelpIcon className='icon'/>
          <Link className="link" to="/Settings">
              TBD
            </Link>
          </li>
          <p className='title'>Something3</p>
          <li>
            <HelpIcon className='icon'/>
          <Link className="link" to="/Settings">
              TBD
            </Link>
          </li>
          <li>
            <HelpIcon className='icon'/>
          <Link className="link" to="/Settings">
              TBD
            </Link>
          </li>
          <li>
            <HelpIcon className='icon'/>
          <Link className="link" to="/Settings">
              TBD
            </Link>
          </li>
          <p className='title'>USER</p>
          <li>
            <AccountCircleIcon className='icon'/>
            <Link className="link" to="/Profile">
              Profile
            </Link>
          </li>
          <li>
            <SettingsIcon className='icon'/>
          <Link className="link" to="/Settings">
              Settings
            </Link>
          </li>
          <li>
            <LoginIcon className='icon'/>
          <Link className="link" to="/login">
              Login
            </Link>
          </li>
          <li>
            <PersonAddAltIcon className='icon'/>
          <Link className="link" to="/signup">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;