import React from 'react';
import { Link } from 'react-router-dom';

const DesktopNav = ({style,name}) => {
  const hasAccess = sessionStorage.getItem('access');

  return (
    <nav className="desktop-nav" style={style}>
      <div className="navdiv">
        <div id="logo">
          <Link to="/">MuskCapital</Link>
        </div>
        <ul>
          <li>
            <Link to="/tesla">Tesla</Link>
          </li>
 <li>
            <Link to="/spacex">SpaceX</Link>
          </li>
           <li>
            <Link to="/neuralink">Neuralinks</Link>
          </li>
          {hasAccess && (
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
          )}

           {!hasAccess ? (
    <li>
      <Link to="/login">Login</Link>
    </li>
  ) : (
    <li>
   <Link to="">Welcome</Link>
    </li>
  )}
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNav;
