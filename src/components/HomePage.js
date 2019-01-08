import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import ContentHeader from './globalComponents/ContentHeader';
import MainContainer from './globalComponents/MainContainer';

class HomePage extends Component {
  render() {
    const { history } = this.props;

    return (
      <MainContainer
        history={history}
      >
        <ContentHeader
          title='Home'
        />
        <Panel>
          <Panel.Body>
            Basic panel example
          </Panel.Body>
        </Panel>
      </MainContainer>
    );
  }
}

export default HomePage;
