import React, { Component } from 'react';
import styled from 'styled-components';
import Main from './components/globalComponents/Main';
import MainBody from './components/MainBody';

class App extends Component {
  render() {
    return (
      <Wrapper>
        <MainBody>
          <Main />
        </MainBody>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  font-family: 'Roboto', sans-serif;
`;

export default App;
