/* Standard Imports */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

/* Other required imports */
import { NavLink, Link } from 'react-router-dom';
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from '@trendmicro/react-sidenav';

/* CSS/SCSS/LESS Imports */
/* import '@trendmicro/react-sidenav/dist/react-sidenav.css'; //Removing and using custom */
import './Sidebar.scss';

const PublicNav = () => [
  <NavLink key="home" to="/">
    <NavItem eventKey="home">
      <NavIcon>
        <i
          className="fa fa-fw fa-home"
          style={{ fontSize: '1.75em', verticalAlign: 'middle' }}
        />
      </NavIcon>
      <NavText style={{ paddingRight: 32 }} title="Home">
        Home
      </NavText>
    </NavItem>
  </NavLink>,
  <NavLink key="login" to="/login">
    <NavItem eventKey="login">
      <NavIcon>
        <i
          className="fa fa-fw fa-user"
          style={{ fontSize: '1.75em', verticalAlign: 'middle' }}
        />
      </NavIcon>
      <NavText style={{ paddingRight: 32 }} title="Login">
        Login
      </NavText>
    </NavItem>
  </NavLink>,
];

const LoggedInNav = () => [
  <NavLink key="home" to="/">
    <NavItem eventKey="home">
      <NavIcon>
        <i
          className="fa fa-fw fa-home"
          style={{ fontSize: '1.75em', verticalAlign: 'middle' }}
        />
      </NavIcon>
      <NavText style={{ paddingRight: 32 }} title="Home">
        Home
      </NavText>
    </NavItem>
  </NavLink>,
  <NavLink key="profile" to="/profile">
    <NavItem eventKey="profile">
      <NavIcon>
        <i
          className="fa fa-fw fa-user"
          style={{ fontSize: '1.75em', verticalAlign: 'middle' }}
        />
      </NavIcon>
      <NavText style={{ paddingRight: 32 }} title="profile">
        Profile
      </NavText>
    </NavItem>
  </NavLink>,
];

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.expanded = false;
  }

  getExpand() {
    return this.expanded;
  }

  handleToggle() {
    this.expanded = !this.expanded;
  }

  render() {
    return (
      <SideNav onToggle={this.handleToggle}>
        <SideNav.Toggle />
        <SideNav.Nav>
          {Sidebar.loggedIn ? <LoggedInNav /> : <PublicNav />}
        </SideNav.Nav>
      </SideNav>
    );
  }
}

export default Sidebar;
