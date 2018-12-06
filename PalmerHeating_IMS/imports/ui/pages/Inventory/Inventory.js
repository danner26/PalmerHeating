import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
// React-Bootstreap-Table
import BootstrapTable from 'react-bootstrap-table-next';
import ControlledPopup from '../../components/ControlledPopup';

import GetInventory from '../../../api/inventory/inventory_items.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './Inventory.scss';

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.expanded = false;
  }

  getInventory = () => {
    const theInv = GetInventory;
    console.log(theInv.find().fetch());

    const theInventory = [];

    const quantity = theInv.find().count();
    const data = theInv.find({}).fetch();
    for (let i = 0; i < quantity; i++) {
      theInventory.push({
        _id: data[i]._id,
        name: data[i].name,
        description: data[i].description,
        summerLimit: data[i].summerLimit,
        winterLimit: data[i].winterLimit,
        Price: data[i].Price,
        inStock: data[i].inStock,
      });
    }

    function permissionFormatter() {
      if (
        Meteor.userId() &&
        Roles.userIsInRole(Meteor.userId(), ['admin', 'secretary'])
      ) {
        return <span>{Meteor.userId()}</span>;
      }
      return <span>TEST</span>;
    }

    const columns = [
      {
        dataField: 'name',
        text: 'Name',
      },
      {
        dataField: 'description',
        text: 'Description',
      },
      {
        dataField: 'Price',
        text: 'Price',
      },
      {
        dataField: 'inStock',
        text: 'In Stock',
      },
      {
        dataField: 'functions',
        isDummyField: true,
        text: 'Functions',
        formatter: permissionFormatter,
      },
    ];

    return (
      <BootstrapTable
        keyField="_id"
        data={theInventory}
        columns={columns}
        bootstrap4
      />
    );
  };

  render() {
    const reset = React.createElement(
      'button',
      { type: 'button' },
      '<i className="fa fa-refresh" aria-hidden="true">'
    );

    return (
      <div className="Inventory-page">
        <div>
          <h1>Inventory Page</h1>
          {this.reset}
        </div>

        {this.getInventory()}
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
