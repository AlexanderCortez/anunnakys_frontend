import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import ContentHeader from './globalComponents/ContentHeader';

class HomePage extends Component {
  render() {
    return (
      <div>
        <ContentHeader 
          title='Home'
        />
        <Panel>
          <Panel.Body>
            Basic panel example
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default HomePage;
