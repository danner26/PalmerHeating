/* react-live */
import React from 'react';
import Popup from 'reactjs-popup';

class DeleteInventoryPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  openModal() {
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  removeItem() {
    console.log(this.invObject);
  }

  render() {
    return (
      <div>
        <button
          className="button"
          onClick={this.openModal}
          type="button"
          tabIndex={0}
        >
          Remove
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
              onKeyPress={this.closeModal}
              tabIndex={0}
            >
              &times;
            </a>
            Are you sure you want to delete this item?
            <a
              role="button"
              onClick={this.removeItem}
              onKeyPress={this.removeItem}
              tabIndex={-1}
            >
              <button type="button">Yes</button>
            </a>
            <a
              role="button"
              onClick={this.closeModal}
              onKeyPress={this.closeModal}
              tabIndex={-2}
            >
              <button type="button">No</button>
            </a>
          </div>
        </Popup>
      </div>
    );
  }
}

export default DeleteInventoryPopup;
