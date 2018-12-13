import React from 'react';
import PropTypes from 'prop-types';
// React-Bootstreap-Table
import BootstrapTable from 'react-bootstrap-table-next';
import ControlledPopup from '../../components/ControlledPopup';

//import GetInventory from '../../../api/inventory/inventory_items.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './Tickets.scss';

class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.expanded = false;
  }

  render() {
    return (
      <div className="Tickets-page">
        <h1>Tickets Page</h1>
      </div>
    );
  }
}



export default Tickets;
