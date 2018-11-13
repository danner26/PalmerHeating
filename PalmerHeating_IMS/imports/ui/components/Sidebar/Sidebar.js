import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import './Sidebar.scss';

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
          <NavItem eventKey="devices">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: '1.75em', verticalAlign: 'middle' }}
              />
            </NavIcon>
            <NavText style={{ paddingRight: 32 }} title="Devices">
              Devices
            </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  }
}

Sidebar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Sidebar;
