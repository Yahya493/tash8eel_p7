import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleDeleteSearch = () => {
    setSearchTerm('');
  };

  return (
    
    <div className="Navbar">
      <nav className={isNavOpen ? 'open' : ''}>
        <div className="logoName">
          <div className="logo"/>
          <p>Hiking</p>
        </div>


        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/trails">Trails</Link></li>
          <li><Link to="/buses">Buses</Link></li>
        </ul>
        <div className="search">
        
     

          <button type="button" className='button1' onClick={handleDeleteSearch}>
            Logout
          </button>

        </div>

      </nav>

      {/* Rest of the page content */}
    </div>
  );
};

export default Navbar;
