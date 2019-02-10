import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Logout } from '../../actions/AppActions';

class SideBarConfigMenu extends Component {
  render() {
    const { signOut } = this.props;
    return (
      <Wrapper>
        <button
          type='button'
          onClick={signOut}
          style={{
            color: 'black'
          }}
        >
          Sign out
        </button>
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
const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(Logout()),
});

export default connect(null, mapDispatchToProps)(SideBarConfigMenu)
