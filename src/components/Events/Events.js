import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Grid, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import _ from 'lodash';
import ContentHeader from '../globalComponents/ContentHeader';
import MainContainer from '../globalComponents/MainContainer';
import EventModal from './EventModal';
import { getEvents, addEvent, udpdateEvent, deleteEvent } from '../../actions/eventActions';
import SnackBar from '../globalComponents/SnackBars';
import All from './Tabs/All';
import AlarmShown from './AlarmShown';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlarm: false,
      edit: false,
      showModal: false,
      eventToModify: {},
      events: [],
      snackbar: {
        open: false,
        message: '',
        type: '',
      },
    };
  }

  componentWillMount() {
    const { getAllEvents } = this.props;
    getAllEvents()
      .catch(() => {
        const { error } = this.props;
        this.setState({
          snackbar: {
            open: true,
            message: error,
            type: 'error',
          },
        });
      });
  }

  componentDidMount() {
    this.setEventsFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setEventsFromProps(nextProps);
  }

  openAlarm = () => {
    this.setState({
      showAlarm: true,
    });
  }

  setEventsFromProps = (props) => {
    const { events } = props;
    const { edit, eventToModify } = this.state;
    const newEvents = _.values(events);
    this.setState({
      events: newEvents,
      eventToModify: edit ? events[eventToModify._id] : {},
    });
  }

  createEvent = (data) => {
    const { createEvent } = this.props;
    createEvent(data)
      .then(() => {
        this.setState({
          showModal: false,
          edit: false,
          snackbar: {
            open: true,
            message: 'Event added successfully',
            type: 'success',
          },
        });
      })
      .catch(() => {
        const { error } = this.props;
        this.setState({
          snackbar: {
            open: true,
            message: error,
            type: 'error',
          },
        });
      });
  }

  editEvent = (data) => {
    const { modifyEvent } = this.props;
    modifyEvent(data)
      .then(() => {
        this.setState({
          showModal: false,
          edit: false,
          snackbar: {
            open: true,
            message: 'Event updated successfully',
            type: 'success',
          },
        });
      })
      .catch(() => {
        const { error } = this.props;
        this.setState({
          snackbar: {
            open: true,
            message: error,
            type: 'error',
          },
        });
      });
  }

  handleHide = () => {
    this.setState({
      showModal: false,
      edit: false,
    });
  }

  hideAlarmModal = () =>  {
    this.setState({
      showAlarm: false,
    });
  }

  handleCloseSnackBar = () => {
    const { snackbar } = this.state;
    this.setState({
      snackbar: {
        ...snackbar,
        open: false,
      },
    });
  }

  onEdit = (data) => {
    this.setState({
      eventToModify: data,
      showModal: true,
      edit: true,
    });
  }

  onRemove = (eventData) => {
    const { _id } = eventData;
    const { removeEvent } = this.props;
    const data = {
      id: _id,
    };
    removeEvent(data)
      .then(() => {
        this.setState({
          snackbar: {
            open: true,
            message: 'Event removed successfully',
            type: 'success',
          },
        });
      })
      .catch(() => {
        const { error } = this.props;
        this.setState({
          snackbar: {
            open: true,
            message: error,
            type: 'error',
          },
        });
      });
  }

  handleSelect = () => {
    
  }

  render() {
    const { history } = this.props;
    const { showModal, snackbar, edit, events, eventToModify, showAlarm } = this.state;

    return (
      <MainContainer
        history={history}
      >
        <ContentHeader
          title='Events'
        />
        <Panel>
          <EventModal 
            show={showModal}
            onHide={this.handleHide}
            editEvent={this.editEvent}
            createEvent={this.createEvent}
            edit={edit}
            eventToModify={eventToModify}
          />
          <Panel.Body>
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <Button
                    onClick={() => this.setState({ showModal: true })}
                    bsStyle='success'
                  >
                    Add a New Event
                  </Button>
                </Col>
              </Row>
            </Grid>
          </Panel.Body>
        </Panel>
        <Tabs
          activeKey={2}
          onSelect={this.handleSelect}
          id="controlled-tab-example"
        >
          <Tab eventKey={1} title="Upcoming">
            Tab 1 content            
          </Tab>
          <Tab eventKey={2} title="All">
            <All
              openAlarm={this.openAlarm}
              onRemove={this.onRemove}
              onEdit={this.onEdit}
              events={events}
            />
          </Tab>
          <Tab eventKey={3} title="Prizes List" disabled>
            Tab 3 content
          </Tab>
        </Tabs>
        <AlarmShown
          show={showAlarm}
          onHide={this.hideAlarmModal}
        />
        <SnackBar
          type={snackbar.type}
          open={snackbar.open}
          message={snackbar.message}
          onClose={this.handleCloseSnackBar}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  events: state.EventReducer.events,
  error: state.EventReducer.error,
});

const mapDispatchToProps = dispatch => ({
  getAllEvents: () => dispatch(getEvents()),
  createEvent: data => dispatch(addEvent(data)),
  modifyEvent: data => dispatch(udpdateEvent(data)),
  removeEvent: data => dispatch(deleteEvent(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
