import React, { Component } from 'react';
import styled from 'styled-components';

class SideBarConfigMenu extends Component {
  render() {
    return (
      <Wrapper>
        {/* config menu */}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 270px;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
  z-index: 99999;
  top: 0;
  position: fixed;
  margin-left: 100%;
  background-color: rgba(0,0,0,0.75);
  color: white;
`;

export default SideBarConfigMenu;
