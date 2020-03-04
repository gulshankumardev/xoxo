import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Header from './components/Header';
import LoginSignup from './pages/LoginSignupPage';
import CreateUpdatePost from './pages/CreateUpdatePost';
import Posts from './pages/Posts';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';

const AppRouter = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login">
            <LoginSignup />
          </Route>
          <Route exact path="/signup">
            <LoginSignup />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/create-post">
            <CreateUpdatePost />
          </Route>
          <Route exact path="/posts">
            <Posts />
          </Route>
          <Route exact path="/update-post/:postId">
            <CreateUpdatePost />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
