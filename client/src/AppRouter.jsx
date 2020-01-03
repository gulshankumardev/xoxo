import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Header from './components/Header';
import LoginSignup from './pages/LoginSignupPage';

const AppRouter = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login">
            <LoginSignup />
          </Route>
          <Route path="/signup">
            <LoginSignup />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
