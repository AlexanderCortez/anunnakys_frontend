import React, { Component } from 'react';
import { Grid, Row, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import Modal from '../globalComponents/Modal/Modal';
import TimePicker from '../globalComponents/TimePicker/TimePicker';
import days from './days';
import types from './types';

class EventModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  
  getInitialState = () => {
    const commonState = {
      label: '',
      value: '',
    };

    return {
      name: '',
      type: commonState,
      npc: '',
      place: '',
      day: commonState,
      time: '',
      sound: 'none',
      showTimePicker: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSelectChange = (data, event) => {
    const { name } = event;
    if (data) {
      this.setState({
        [name]: data,
      });
    } else {
      this.setState({
        [name]: {
          label: '',
          value: '',
        },
      });
    }
  }

  handleTimeChange = (time) => {
    this.setState({
      time,
    });
  }

  createEvent = () => {
    const {
      name,
      type,
      npc,
      place,
      day,
      time,
      sound,
    } = this.state;
    const data = {
      name,
      type: type.label,
      npc,
      place,
      day: day.label,
      time,
      sound,
    };
    const { createEvent } = this.props;
    createEvent(data);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { edit } = this.props;
    if (edit) {

    } else {
      this.createEvent();
    }
  }

  render() {
    const { show, onHide } = this.props;
    const { name, showTimePicker, place, npc, type, day } = this.state;

    return (
      <Modal
        title='Event'
        onHide={onHide}
        show={show}
      >
        <Grid fluid>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    required
                    type="text"
                    value={name}
                    name='name'
                    placeholder="Enter name"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <ControlLabel>Type</ControlLabel>
                <Select
                  isClearable
                  options={types}
                  onChange={this.handleSelectChange}
                  name='type'
                  value={type}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <ControlLabel>Place</ControlLabel>
                  <FormControl
                    type="text"
                    value={place}
                    name='place'
                    placeholder="Enter place"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <ControlLabel>NPC</ControlLabel>
                  <FormControl
                    type="text"
                    value={npc}
                    name='npc'
                    placeholder="Enter npc"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <ControlLabel>Time</ControlLabel>
                <TimePicker
                  onChange={this.handleTimeChange}
                  show={showTimePicker}
                />
              </Col>
              <Col md={6}>
                <ControlLabel>Day</ControlLabel>
                <Select 
                  isClearable
                  options={days}
                  value={day}
                  name='day'
                  onChange={this.handleSelectChange}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Button
                  type='submit'
                  bsStyle='success'
                >
                  Save
                </Button>
                <Button
                  onClick={onHide}
                  style={{
                    marginLeft: '10px'
                  }}
                  type='button'
                  bsStyle='danger'
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </form>
        </Grid>
      </Modal>
    );
  }
}

export default EventModal;
