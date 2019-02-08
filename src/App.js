import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Main from './components/globalComponents/Main';
import MainBody from './components/MainBody';
import Login from './components/Login/Login';
import Authenticate from './helpers/Authenticate';

const AppMain = () => (
  <Wrapper>
    <MainBody>
      <Main />
    </MainBody>
  </Wrapper>
)

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Authenticate(AppMain)} />
      </Switch>
    );
  }
}

const Wrapper = styled.div`
  font-family: 'Roboto', sans-serif;
`;

export default App;
