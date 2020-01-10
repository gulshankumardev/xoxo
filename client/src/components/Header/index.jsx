import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import logo from '../../media/images/logo.png';
import USER_INFO_QUERY from '../../gql/queries';
import { LOGOUT_MUTATION } from '../../gql/mutations';

const Header = () => {
  const { data } = useQuery(USER_INFO_QUERY);
  const [requestToLogout] = useMutation(LOGOUT_MUTATION);

  const {
    me: { isLoggedIn },
  } = data;

  const handleLogout = () => {
    requestToLogout();
  };

  return (
    <nav className="navbar navbar-expand navbar-light bd-navbar bg-light mb-5">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="xoxo" height="28" />
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item ml-2">
            {isLoggedIn ? (
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={handleLogout}
              >
                logout
              </button>
            ) : (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
