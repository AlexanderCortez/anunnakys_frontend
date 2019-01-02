import React, { Component } from 'react';
import styled from 'styled-components';

class SideBarMenu extends Component {
  getMenuOptions = () => {
    const options = [
      {
        icon: 'fas fa-users',
        text: 'Users',
      },
      {
        icon: 'fas fa-calendar-week',
        text: 'Events',
      },
    ];
    return options.map(item => (
      <Item>
        <div className='icon'>
          <i className={item.icon} />
        </div>
        <div className='text'>
          {item.text}
        </div>
      </Item>
    ));
  }

  render() {
    return (
      <Wrapper>
        {this.getMenuOptions()}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background-color: rgba(0,0,0,0.75);
  box-sizing: border-box;
  width: 100px;
  position: fixed;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
  clear: both;
`;

const Item = styled.div`
  border-bottom: 1px solid rgba(255,255,255,0.15);
  width: 100%;
  height: 88px;
  text-align: center;
  color: white;
  cursor: pointer;
  clear: both;
  &:hover {
    background-color: rgba(255,255,255,0.05);
  }
  .icon {
    padding-top: 12px;
    font-size: 35px;
  }
  .text {
    padding-top: 5px;
  }
`;

export default SideBarMenu;
