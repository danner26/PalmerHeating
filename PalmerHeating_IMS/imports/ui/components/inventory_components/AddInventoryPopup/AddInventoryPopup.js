/* react-live */
import React from 'react';
import Popup from 'reactjs-popup';

class AddInventoryPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <button
          className="button btn btn-success"
          onClick={this.openModal}
          type="button"
          tabIndex={0}
        >
          New Stock
        </button>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div>
            <a
              className="close"
              role="button"
              onClick={this.closeModal}
              tabIndex={0}
            >
              &times;
            </a>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            magni magni omnis delectus nemo, maxime molestiae dolorem numquam
            mollitia, voluptate ea, accusamus excepturi deleniti ratione
            sapiente! Laudantium, aperiam doloribus. Odit, aut.
          </div>
        </Popup>
      </div>
    );
  }
}

export default AddInventoryPopup;
