import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import TimerSelect from './TimerSelect';

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      time: moment().format('hh:mm A'),
    }
  }

  toogleTimePicker = () => {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }

  handleChange = (time) => {
    const { onChange } = this.props;
    if (onChange) {
      this.setState({
        time,
      }, () => onChange(time));
    }
  }

  render() {
    const { show, time } = this.state;

    return (
      <FormGroup>
        <InputGroup>
          <FormControl
            type="text"
            value={time}
          />
          <InputGroup.Addon style={{ cursor: 'pointer' }} onClick={this.toogleTimePicker}><i class="far fa-clock"></i></InputGroup.Addon>
        </InputGroup>
        {
          show
            && (
              <Wrapper
                id='timepicker'
              >
                <TimerSelect
                  onChange={this.handleChange}
                />
              </Wrapper>
            )
        }
      </FormGroup>
    );
  }
}

const Wrapper = styled.div`
  z-index: 99999999;
  height: 207px;
  width: 272px;
  position: absolute;
  background-color: white;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 4px;
`;

export default TimePicker;
