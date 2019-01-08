import React, { Component } from 'react';
import { Panel, Grid, Row, Col, Button } from 'react-bootstrap';
import ContentHeader from '../globalComponents/ContentHeader';
import MainContainer from '../globalComponents/MainContainer';
import EventModal from './EventModal';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  handleHide = () => {
    this.setState({
      showModal: false,
    });
  }

  render() {
    const { history } = this.props;
    const { showModal } = this.state;

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
      </MainContainer>
    );
  }
}

export default Events;
