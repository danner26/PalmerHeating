/* eslint-disable import/no-named-default, react/destructuring-assignment */

// import packages
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import styled from 'styled-components';

// import navbar
import Navbar from '../components/Navbar';

// import SideNavbar
import Sidebar from '../components/Sidebar';

// import routes
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import NotFound from '../pages/Not-Found';
import RecoverPassword from '../pages/RecoverPassword';
import ResetPassword from '../pages/ResetPassword';

import Inventory from '../pages/Inventory';

// import Tickets
import Tickets from '../pages/Tickets';

// import Spinner
import Spinner from '../components/Spinner';

// import hoc to pass additional props to routes
import PropsRoute from '../pages/PropsRoute';

const Main = styled.main`
  position: relative;
  overflow: hidden;
  transition: all 0.15s;
  margin-left: ${props => (Sidebar.expanded ? 240 : 64)}px;
`;

const App = props => (
  <Router>
    <div>
      <PropsRoute component={Sidebar} {...props} />
      <Main expanded={Sidebar.getExpand}>
        <PropsRoute component={Navbar} {...props} />
        {props.loggingIn && <Spinner />}
        <Switch>
          <PropsRoute exact path="/" component={Landing} {...props} />
          <PropsRoute path="/login" component={Login} {...props} />
          <PropsRoute path="/signup" component={Signup} {...props} />
          <PropsRoute exact path="/profile" component={Profile} {...props} />
          <PropsRoute exact path="/tickets" component={Tickets} {...props} />
          <PropsRoute
            exact
            path="/profile/:_id"
            component={Profile}
            {...props}
          />
          <PropsRoute
            exact
            path="/inventory"
            component={Inventory}
            {...props}
          />
          <PropsRoute
            path="/recover-password"
            component={RecoverPassword}
            {...props}
          />
          <PropsRoute
            path="/reset-password/:token"
            component={ResetPassword}
            {...props}
          />
          <PropsRoute component={NotFound} {...props} />
        </Switch>
      </Main>
    </div>
  </Router>
);

App.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  userReady: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const userSub = Meteor.subscribe('user');
  const user = Meteor.user();
  const userReady = userSub.ready() && !!user;
  const loggingIn = Meteor.loggingIn();
  const loggedIn = !loggingIn && userReady;
  return {
    loggingIn,
    userReady,
    loggedIn,
  };
})(App);
