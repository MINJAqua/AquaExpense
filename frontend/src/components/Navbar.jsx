//import { useState } from "react";
import { Link } from "react-router-dom";



const Navbar = () => {

  return (
    <div className='navbar'>
      <div className='top'>
        <span className='logo'>Aqua Expense</span>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <li>
            <Link className="link" to="/">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="link" to="/Profile">
              Profile
            </Link>
          </li>
          <li>
          <Link className="link" to="/Settings">
              Settings
            </Link>
          </li>
        </ul>
      </div>
      <div className='bottom'> color options </div>

    </div>
  )
}

export default Navbar;