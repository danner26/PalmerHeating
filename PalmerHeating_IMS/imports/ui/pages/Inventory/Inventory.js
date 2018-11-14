import React from 'react';
import PropTypes from 'prop-types';
import ControlledPopup from '../../components/ControlledPopup'

import './Inventory.scss';

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.expanded = false;
  }

  render() {
    return (
      <div className="Inventory-page">
        <h1>Inventory Page</h1>
        <ControlledPopup />
      </div>
    );
  }
}

Inventory.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Inventory;
