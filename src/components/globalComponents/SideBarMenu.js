import React, { Component } from 'react';
import styled from 'styled-components';
import { goTo, getActualRoute } from '../actions/AppActions';

class SideBarMenu extends Component {
  isAnActiveRoute = (item) => {
    const { history } = this.props;
    const { route } = item;
    return route === getActualRoute(history);
  }

  getMenuOptions = () => {
    const { history } = this.props;
    const options = [
      {
        icon: 'fas fa-users',
        text: 'Users',
        route: '/users',
      },
      {
        icon: 'fas fa-calendar-week',
        text: 'Events',
        route: '/events',
      },
    ];

    return options.map((item, index) => (
      <Item
        className={this.isAnActiveRoute(item) ? 'active': ''}
        onClick={() => goTo(history, item.route)}
        key={index}
      >
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
  top: 80px;
  margin-left: -130px;
  z-index: 999999;
  .active {
    background-color: rgba(255,255,255,0.9);
    border-right: 1px solid rgba(0,0,0,0.08);
    color: black;
    &:hover {
      background-color: rgba(255,255,255,0.9);
    }
  }
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
    background-color: rgba(255,255,255,0.08);
  }
  .icon {
    padding-top: 12px;
    font-size: 35px;
  }
  .text {
    padding-top: 0px;
  }
`;

export default SideBarMenu;
