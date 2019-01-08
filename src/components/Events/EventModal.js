import React, { Component } from 'react';
import { Grid, Row, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Modal from '../globalComponents/Modal/Modal';
import TimePicker from '../globalComponents/TimePicker/TimePicker';

class EventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimePicker: false,
    }
  }
  
  getInitialState = () => {
    return {
      name: '',
    };
  }  

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { show, onHide } = this.props;
    const { name, showTimePicker } = this.state;

    return (
      <Modal
        title='Event'
        onHide={onHide}
        show={show}
      >
      <form>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={name}
            name='name'
            placeholder="Enter name"
            onChange={this.handleChange}
          />
        </FormGroup>
        <TimePicker
          show={showTimePicker}
        />
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={name}
            name='name'
            placeholder="Enter name"
            onChange={this.handleChange}
          />
        </FormGroup>
      </form>
      </Modal>
    );
  }
}

export default EventModal;
