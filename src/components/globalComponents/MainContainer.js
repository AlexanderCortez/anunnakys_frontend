import React, { Component } from 'react';
import SideBarMenu from './SideBarMenu';

class MainContainer extends Component {
  render() {
    const { children, history } = this.props;

    return (
      <div>
        <SideBarMenu
          history={history}
        />
        {children}
      </div>
    );
  }
}

export default MainContainer;
