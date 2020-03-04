import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import logo from '../../media/images/logo.png';
import { USER_INFO_QUERY } from '../../gql/queries';
import { LOGOUT_MUTATION } from '../../gql/mutations';

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const { data } = useQuery(USER_INFO_QUERY);
  const [requestToLogout] = useMutation(LOGOUT_MUTATION, {
    onCompleted() {
      history.push('/');
    },
  });
  const isCreatePost = location.pathname === '/create-post';

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

      {isLoggedIn && (
        <ul className="navbar-nav">
          <li className="nav-item mr-3">
            <Link to="/profile" className="text-info nav-link">
              <small>Profile</small>
            </Link>
          </li>
        </ul>
      )}

      <ul className="navbar-nav ml-auto">
        {isLoggedIn && !isCreatePost && (
          <li className="nav-item mr-3">
            <Link to="/create-post" className="btn btn-dark">
              Create Post
            </Link>
          </li>
        )}
        <li className="nav-item ml-2">
          {isLoggedIn ? (
            <button
              type="button"
              className="btn nav-link"
              onClick={handleLogout}
            >
              logout
            </button>
          ) : (
            <Link className=" nav-link" to="/login">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
