import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

class AlarmShown extends Component {
  render() {
    return (
      <Modal
        {...this.props}
      >
        <Header closeButton>
          Alarm
        </Header>
        <Modal.Body>
          <AlarmBody>
            <div className='alarm'>
              <div className='icon' />
            </div>
            <div>
              Alarm
            </div>
          </AlarmBody>
        </Modal.Body>
      </Modal>
    );
  }
}

const Header = styled(Modal.Header)`
  background-color: #EF6262;
  color: #FFF;
  height: 75px;
  font-size: 25px;
  padding-top: 20px;
`;

const AlarmBody = styled.div`
  .alarm {
    margin: 0 auto;
    border: 1px solid rgba(0,0,0,0.25);
    width: 75px;
    height: 75px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      background-image: url('./assets/img/alarm-icon.png');
      background-repeat: no-repeat;
      background-size: contain;
      width: 45px;
      height: 45px;
    }
  }
`;

export default AlarmShown;
