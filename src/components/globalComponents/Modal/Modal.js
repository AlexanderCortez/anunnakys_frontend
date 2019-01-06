import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class ModalContainer extends Component {
  render() {
    const { children, title } = this.props;

    return (
      <Modal
        {...this.props}
      >
        <Modal.Header closeButton>
          {title}
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    );
  }
}

export default ModalContainer;
