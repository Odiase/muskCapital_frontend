import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const MobileNavbar = ({style}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="mobile-nav" style={style}>
      <div className="mobile-nav-container">
        <div className="mobile-logo">
          <Link to="/">MuskCapital</Link>
        </div>
        
        {/* Hamburger button */}
        <button 
          className={`hamburger ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        
        {/* Mobile menu dropdown - now slides from right */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <ul>
            <li className="mobile-menu-item">
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li className="mobile-menu-item">
              <Link to="/tesla" onClick={toggleMenu}>Tesla</Link>
            </li>
            <li className="mobile-menu-item">
              <Link to="/spacex" onClick={toggleMenu}>spaceX</Link>
            </li>
             <li className="mobile-menu-item">
              <Link to="/neuralink" onClick={toggleMenu}>Neuralink</Link>
            </li>
            <li className="mobile-menu-item">
              <Link to="/portfolio" onClick={toggleMenu}>Portfolio</Link>
            </li>
            <li className="mobile-menu-item">
              <button className="mobile-login-btn">
                <Link to="/login" onClick={toggleMenu}>Login</Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;
