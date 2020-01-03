import React, { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';

const LoginSignup = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  // form fields references
  const nameField = useRef('');
  const emailField = useRef('');
  const passwordField = useRef('');
  const confirmPasswordField = useRef('');

  const onFormSubmit = e => {
    e.preventDefault();
    console.log('on form submit -->');

    console.log('name:', nameField && nameField.current.value);
    console.log('email:', emailField && emailField.current.value);
    console.log('password:', passwordField && passwordField.current.value);
    console.log(
      'confirmPassword:',
      confirmPasswordField && confirmPasswordField.current.value,
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-5">
          <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
          <hr />
          <form onSubmit={onFormSubmit} noValidate>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name-field">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name-field"
                  aria-describedby="emailHelp"
                  ref={nameField}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email-field">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email-field"
                aria-describedby="emailHelp"
                ref={emailField}
              />
              {!isLogin && (
                <small id="emailHelp" className="form-text text-muted">
                  We&apos;ll never share your email with anyone else.
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password-field">Password</label>
              <input
                type="password"
                className="form-control"
                id="password-field"
                ref={passwordField}
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirm-password-field">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm-password-field"
                  ref={confirmPasswordField}
                />
              </div>
            )}
            <button type="submit" className="btn btn-block btn-dark mt-4 mb-4">
              {isLogin ? 'Sign In' : 'Register'}
            </button>
          </form>
          <p className="text-center text-muted">
            {isLogin ? (
              <small>
                Not registered? <Link to="/signup">Signup</Link>
              </small>
            ) : (
              <small>
                Already Registered? <Link to="/login">Login</Link>
              </small>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
