import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch()

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.prNavbarDefault();
    // Do something with the search term
    console.log(searchTerm);
  };

  const handleLogOut = () => {
    Cookies.remove('user')
    dispatch({ type: 'setUser', user: {} })
    dispatch({ type: 'setLogIn', logedIn: false })
  };

  return (

    <div className="Navbar">
      <nav className={isNavOpen ? 'open' : ''}>
        <div className="logoName">
          <div className="logo" />
          <p id='siteName'>Hiking</p>
        </div>


        <ul className="nav-links">
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/buses">Buses</Link></li>
          <li><Link to="/trails">Trails</Link></li>
          <li><Link to="/milestones">Milestones</Link></li>
        </ul>

        <button type="button" className='logOut' onClick={handleLogOut}>
          Log out
        </button>

      </nav>

      {/* Rest of the page content */}
    </div>
  );
};

export default Navbar;
