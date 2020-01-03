import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../media/images/logo.png';

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bd-navbar bg-light mb-5">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="xoxo" height="28" />
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item ml-2">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
