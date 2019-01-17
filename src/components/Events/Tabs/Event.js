import React, { Component } from 'react';
import styled from 'styled-components';
import DropDownMenu from './DropDownMenu';

class Event extends Component {
  render() {
    const { event } = this.props;
    return (
      <Wrraper>
        <Header>
          <div>
            <span>
              {event.type}
            </span>
            <p>{event.day}, {event.time}</p>
          </div>
          {/* <i className="fas fa-ellipsis-v" /> */}
          <DropDownMenu />
        </Header>
        <Timer>
          21:21:05
        </Timer>
        <p>{event.name}</p>
        <p>{event.place}</p>
        <p>{event.npc}</p>
      </Wrraper>
    );
  }
}

const Wrraper = styled.div`
  * {
    box-sizing: border-box;
  }
  border: 1px solid rgba(0,0,0,0.04);
  border-radius: 3px;
  width: 260px;
  height: 190px;
  display: inline-block;
  margin: 0 20px 20px 0;
  background-color: white;
  box-sizing: border-box;
  p {
    font-family: 'Open Sans';
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    margin: 0;
    width: 100%;
    margin-bottom: 2px;
  }
`;

const Header = styled.div`
  border-bottom: 1px solid rgba(0,0,0,0.1);
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  i {
    text-align: center;
    font-size: 20px;
    width: 30px;
    margin-right: 7px;
    cursor: pointer;
  }
  div {
    ${'' /* border: 1px solid red; */}
    font-size: 18px;
    padding-left: 20px;
    font-weight: 200;
    ${'' /* font-family: 'Roboto', sans-serif; */}
    p {
      font-size: 12px !important;
    }
  }
`;

const Timer = styled.div`
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
  text-align: center;
  font-size: 22px;
  ${'' /* border: 1px solid red; */}
  padding-top: 15px;
`;

export default Event;
