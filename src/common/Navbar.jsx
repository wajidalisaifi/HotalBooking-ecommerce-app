import React from 'react';

import './cssCode/Navbar.css';
import { Link, Links, NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';

export default function Navbar() {

  const isAuthentication = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const isUser = ApiService.isUser();

  // const navigate = useNavigate();
  const navigate = useNavigate();

  const handleLogout = () => {
    const isLogout = window.confirm('Are you sure you want to logout this user?');
    if (isLogout) {
        ApiService.logout();
        navigate('/home');
    }
};


  return (
    <div>
      <div className='navbar'>
        <div className='logo'>Resort Hotel</div>
        <ul>
          <li> <NavLink to="/Home" activeclassname={"active"} >Home</NavLink></li>
          <li> <NavLink  to={"/Room"}>Rooms</NavLink>    </li>
          <li> <a href="/findBooking">Find Booking</a> </li>

          {isUser && <li><NavLink to="/profile" activeclassname="active">Profile</NavLink></li>}
          {isAdmin && <li><NavLink to="/admin" activeclassname="active">Admin</NavLink></li>}

          {!isAuthentication && <li> <NavLink to={"/Login"} activeclassname={"active"} >Login</NavLink></li>}
          {!isAuthentication &&  <li> <NavLink to={"/Registration"} activeclassname={"active"} >Registration</NavLink> </li> }
          {isAuthentication && <li onClick={handleLogout}>Logout</li>}
        </ul>
        

      </div>
    </div>
  )
}
