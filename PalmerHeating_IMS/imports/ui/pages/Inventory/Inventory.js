import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { createStore, combineReducers } from 'redux';
import { Tracker } from 'meteor/tracker';
// React-Bootstreap-Table
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AddInventoryPopup from '../../components/inventory_components/AddInventoryPopup';
import EditInventoryPopup from '../../components/inventory_components/EditInventoryPopup';
import DeleteInventoryPopup from '../../components/inventory_components/DeleteInventoryPopup';

import GetInventory from '../../../api/inventory/inventory_items.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './Inventory.scss';

const inventoryReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_INVENTORY':
      return action.inventory;
    default:
      return state;
  }
};

const reducers = combineReducers({ inventory: inventoryReducer});
const store = createStore(reducers, {});

Tracker.autorun(() => {
  store.dispatch({
    type: 'SET_INVENTORY',
    inventory: GetInventory.find().fetch(),
  });
});

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.expanded = false;
    this.invObject= '';
    this.rowSelect = this.rowSelect.bind(this);
    this.state = {
      rowID: this.rowSelect,
    }
  }

  rowSelect = () => this.getRow()

  rowClick = inv => {
    this.setState({ rowID: inv._id });
  }

  getRow = () => this.state.rowID;

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

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.rowClick(row);
      },
    };

    function permissionFormatter() {
      if (
        Meteor.userId() &&
        Roles.userIsInRole(Meteor.userId(), ['admin', 'secretary'])
      ) {
        return (
          <div className="inventoryFunctionBtns btn-group" >
            <EditInventoryPopup />
            <DeleteInventoryPopup {...this} onRowSelect={this.rowClick} />
          </div>
        );
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
        formatExtraData: this.state.rowID,
      },
    ];

    const customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        Showing {from} to {to} of {size} Results
      </span>
    );

    const options = {
      paginationSize: 7,
      pageStartIndex: 0,
      withFirstAndLast: true,
      firstPageText: 'First',
      prePageText: 'Back',
      nextPageText: 'Next',
      lastPageText: 'Last',
      nextPageTitle: 'First Page',
      prePageTitle: 'Pre Page',
      firstPageTitle: 'Next Page',
      lastPageTitle: 'Last Page',
      showTotal: true,
      paginationTotalRenderer: customTotal,
      sizePerPageList: [{
          text: '8',
          value: 8,
        },
        {
          text: '15',
          value: 15,
        },
      ],
    };

    const table = this.invTable;

    return (
      <BootstrapTable
        keyField="_id"
        data={theInventory}
        columns={columns}
        rowEvents={rowEvents}
        pagination={paginationFactory(options)}
        bootstrap4
        ref={table => {
          this.invTable = table;
        }}
      />
    );
  };

  handleReset() {
    console.log(this.invTable);
    this.invTable.reset();
  }

  render() {

    return (
      <div className="Inventory-page">
        <div>
          <h1>Inventory Page</h1>
          <button
            className="button btn btn-info"
            type="button"
            onClick={this.handleReset.bind(this)}
          >
            Reset
          </button>
        </div>

        {this.getInventory()}
        <AddInventoryPopup />
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
