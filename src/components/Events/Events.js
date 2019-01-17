import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Grid, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import _ from 'lodash';
import styled from 'styled-components';
import ContentHeader from '../globalComponents/ContentHeader';
import MainContainer from '../globalComponents/MainContainer';
import EventModal from './EventModal';
import { getEvents, addEvent } from '../../actions/eventActions';
import SnackBar from '../globalComponents/SnackBars';
import Upcoming from './Tabs/Upcoming';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      showModal: false,
      eventToModify: {},
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

  setEventsFromProps = (props) => {
    const { events } = props;
    const { edit, eventToModify } = this.state;
    const newEvents = _.values(events).reverse();
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

  handleHide = () => {
    this.setState({
      showModal: false,
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

  render() {
    const { history } = this.props;
    const { showModal, snackbar, edit } = this.state;

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
            createEvent={this.createEvent}
            edit={edit}
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
              <RowSpace />
              <Tabs
                // activeKey={this.state.key}
                // onSelect={this.handleSelect}
                id="controlled-tab-example"
              >
                <Tab eventKey={1} title="Upcoming">
                  <Upcoming />
                </Tab>
                <Tab eventKey={2} title="All">
                  Tab 2 content
                </Tab>
                <Tab eventKey={3} title="Prizes List" disabled>
                  Tab 3 content
                </Tab>
              </Tabs>
            </Grid>
          </Panel.Body>
        </Panel>
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

const RowSpace = styled.div`
  height: 15px;
  width: 100%;
`;

const mapStateToProps = state => ({
  events: state.EventReducer.events,
  error: state.EventReducer.error,
});

const mapDispatchToProps = dispatch => ({
  getAllEvents: () => dispatch(getEvents()),
  createEvent: data => dispatch(addEvent(data)),
  // modifyUser: data => dispatch(updateUser(data)),
  // removeUser: data => dispatch(deleteUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
