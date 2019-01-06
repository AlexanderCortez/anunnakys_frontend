import React, { Component } from 'react';
import styled from 'styled-components';

class ContentHeader extends Component {
  render() {
    const { title } = this.props;

    return (
      <Header>
        <div className='title'>
          {title}
        </div>
        <div className='icon'>
          <span>Icon</span>
        </div>
      </Header>
    );
  }
}

const Header = styled.div`
  left: 0;
  top: 0;
  width: 100%;
  position: absolute;
  height: 70px;
  background-color: white;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
  margin-bottom: 20px;
  display: flex;
  .title {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 50px;
  }
  .icon {
    padding-right: 50px;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export default ContentHeader;
