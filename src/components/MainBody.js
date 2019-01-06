import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar from './globalComponents/NavBar';
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
      <Wrapper>
        <NavBar
          isInAside={isInAside}
          toogleConfigMenu={this.toogleConfigMenu}
        />
        <Body
          className={isInAside ? 'isInAside': ''}
        >
          <Content>
            {children}
          </Content>
          <SideBarConfigMenu />
        </Body>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  .isInAside {
    left: -270px;
  }
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
`;

const Body = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  margin-top: 80px;
  min-height: calc(100% - 80px);
`;

const Content = styled.div`
  position: absolute;
  min-height: 100%;
  margin: 0 0 0 100px;
  padding: 100px 30px 30px 30px;
  background-color: rgba(0,0,0,0.05);
  width: calc(100% - 100px);
  max-width: calc(100% - 100px);
  box-sizing: border-box;
`;

export default MainBody;
