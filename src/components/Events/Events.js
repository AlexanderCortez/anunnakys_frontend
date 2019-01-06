import React, { Component } from 'react';
import ContentHeader from '../globalComponents/ContentHeader';
import MainContainer from '../globalComponents/MainContainer';

class Events extends Component {
  render() {
    const { history } = this.props;

    return (
      <MainContainer
        history={history}
      >
        <ContentHeader
          title='Events'
        />
      </MainContainer>
    );
  }
}

export default Events;
