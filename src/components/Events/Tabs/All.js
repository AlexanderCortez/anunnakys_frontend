import React, { Component } from 'react';
import styled from 'styled-components';
import Event from './Event';

class Upcoming extends Component {
  render() {
    const { events, onEdit, onRemove, openAlarm } = this.props;

    return (
      <Wrapper>
        <Container>
          {
            events.map((event, i) => {
              return (
                <Event
                  openAlarm={openAlarm}
                  key={i}
                  event={event}
                  editAction={onEdit}
                  removeAction={onRemove}
                />
              );
            })
          }
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  padding-top: 15px;
`;

const Container = styled.div`
  ${'' /* width: 1000px; */}
`;

export default Upcoming;
