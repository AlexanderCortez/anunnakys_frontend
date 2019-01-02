import React, { Component } from 'react';
import styled from 'styled-components';

class NavBar extends Component {
  render() {
    const { isInAside, toogleConfigMenu } = this.props;

    return (
      <Wrapper
        isInAside={isInAside}
      >
        <div className='logo-container'>
          Anunnakys
        </div>
        <div className='options-container'>
          <Option>
            <Icon className='fas fa-adjust' />
          </Option>
          <Option
            onClick={toogleConfigMenu}
          >
            <Icon 
              className='fas fa-cog'
            />
          </Option>
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: fixed;
  left: ${({ isInAside }) => (isInAside ? '-270px' : 0)};
  z-index: 1;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  background-color: #0090dd;
  padding: 0 35px 0 20px;
  display: flex;
  color: white;
  .logo-container {
    width: 50%;
    display: flex;
    align-items: center;
  }

  .options-container {
    width: 50%;
    display: flex;
    justify-content: flex-end;
  }
`;

const Option = styled.div`
  height: 100%;
  width: auto;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 5px;
`;

const Icon = styled.i`
  color: white;
  font-size: 24px;
`;

export default NavBar;
