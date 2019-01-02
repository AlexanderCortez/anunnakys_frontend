import React, { Component } from 'react';
import Main from './components/globalComponents/Main';
import MainBody from './components/MainBody';

class App extends Component {
  render() {
    return (
      <div>
       <MainBody>
         <Main />
       </MainBody>
      </div>
    );
  }
}

export default App;
