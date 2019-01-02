import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar from './globalComponents/NavBar';
import SideBarMenu from './globalComponents/SideBarMenu';
import SideBarConfigMenu from './globalComponents/SideBarConfigMenu';

class MainBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInAside: false,
    };
  }

  toogleConfigMenu = () => {
    const { isInAside } = this.state;
    this.setState({
      isInAside: !isInAside,
    });
  }

  render() {
    const { children } = this.props;
    const { isInAside } = this.state;

    return (
      <div>
        <NavBar
          isInAside={isInAside}
          toogleConfigMenu={this.toogleConfigMenu}
        />
        <Body
          isInAside={isInAside}
        >
          <SideBarMenu />
          <Content>
            {children}
          </Content>
          <SideBarConfigMenu />
        </Body>
      </div>
    );
  }
}

const Body = styled.div`
  left: ${({ isInAside }) => (isInAside ? '-270px' : 0)};
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  margin-top: 80px;
`;

const Content = styled.div`
  margin: 0 0 0 100px;
`;

export default MainBody;
