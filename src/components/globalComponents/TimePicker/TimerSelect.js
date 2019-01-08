import React, { Component } from 'react';
import styled from 'styled-components';

class TimerSelect extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      hours: '01',
      minutes: '55',
      labelTime: 'am',
      showHoursTable: false,
      showMinutesTable:  false,
    }
  }

  decreaseHour = (hours) => {
    let newHours = hours;
    if (newHours === 1) {
      newHours = 12;
    } else {
      newHours--;
    }
    return newHours;
  }

  increaseHour = (hours) => {
    let newHours = hours;
    if (newHours === 12) {
      newHours = 1;
    } else {
      newHours++;
    }
    return newHours;
  }

  handleHourePick = (action) => {
    const { hours } = this.state;
    let newHours = parseInt(hours, 10);
    if (action === '-') {
      newHours = this.decreaseHour(newHours);
    }
    if (action === '+') {
      newHours = this.increaseHour(newHours);
    }
    if(newHours < 10) {
      newHours = `0${newHours}`;
    } 
    this.setState({
      hours: newHours,
    });
  }

  handleMinutePick = (action) => {
    const { minutes, hours } = this.state;
    let newMinutes = parseInt(minutes, 10);
    let newHours = parseInt(hours, 10);
    if (action === '-') {
      if (newMinutes === 0) {
        newMinutes = 59;
        newHours = this.decreaseHour(newHours);
      } else {
        newMinutes--;
      }
    }
    if (action === '+') {
      if (minutes === 59) {
        newMinutes = 0;
        newHours = this.increaseHour(newHours);
      } else {
        newMinutes++;
      }
    }
    if (newMinutes < 10) {
      newMinutes = `0${newMinutes}`;
    }
    if (newHours < 10) {
      newHours = `0${newHours}`;
    } 
    this.setState({
      minutes: newMinutes,
      hours: newHours,
    });
  }

  getOption = (time, handleIncrease, handleTableOptions) => {
    return (
      <div>
        <CounterContainer>
          <OptionContainer>
            <InputContainer
              type='button'
              onClick={() => handleIncrease('+')}
            >
              <Icon className="fas fa-angle-up" />
            </InputContainer>
          </OptionContainer>
          <OptionContainer>
            <InputContainer
              type='button'
              onClick={handleTableOptions}
            >
              {time}
            </InputContainer>
          </OptionContainer>
          <OptionContainer>
            <InputContainer
              type='button'
              onClick={() => handleIncrease('-')}
            >
              <Icon className="fas fa-angle-down" />
            </InputContainer>
          </OptionContainer>
        </CounterContainer>
      </div>
    )
  }

  handleLabelTime = () => {
    const { labelTime } = this.state;
    this.setState({
      labelTime: labelTime === 'pm' ? 'am' : 'pm',
    });
  }

  getTimeForm = () => {
    const { hours, minutes, labelTime } = this.state;

    return (
      <Wrapper>
        {this.getOption(hours, this.handleHourePick, this.handleHoursTableShow)}
        <PointsContainer>
          <span>:</span>
        </PointsContainer>
        {this.getOption(minutes, this.handleMinutePick, this.handleMinutesTableShow)}
        <div>
          <LabelTime
            onClick={this.handleLabelTime}
            type='button'
          >
            {labelTime.toUpperCase()}
          </LabelTime>
        </div>
      </Wrapper>
    )
  }

  setHourFromTable = (hours) => {
    this.setState({
      hours,
      showHoursTable: false,
    });
  }

  setMinuteFromTable = (minutes) => {
    this.setState({
      minutes,
      showMinutesTable: false,
    });
  }

  getHoursTable = () => {
    const table = [
      ['12', '01', '02', '03'],
      ['04', '05', '06', '07'],
      ['08', '09', '10', '11']
    ];

    return (
      <Wrapper
        style={{
          padding: '6px',
          display: 'block',
        }}
      >
        {
          table.map(section => (
            <LabelsContainer>
              {
                section.map(label => (
                  <Label
                    onClick={() => this.setHourFromTable(label)}
                  >
                    {label}
                  </Label>
                ))
              }
            </LabelsContainer>
          ))
        }
      </Wrapper>
    )
  }

  getMinutesTable = () => {
    const table = [
      ['00', '05', '10', '15'],
      ['20', '25', '30', '35'],
      ['40', '45', '50', '55']
    ];

    return (
      <Wrapper
        style={{
          padding: '6px',
          display: 'block',
        }}
      >
        {
          table.map(section => (
            <LabelsContainer>
              {
                section.map(label => (
                  <Label
                    onClick={() => this.setMinuteFromTable(label)}
                  >
                    {label}
                  </Label>
                ))
              }
            </LabelsContainer>
          ))
        }
      </Wrapper>
    )
  }

  handleHoursTableShow = () => {
    const { showHoursTable } = this.state;
    this.setState({
      showHoursTable: !showHoursTable,
    });
  }

  handleMinutesTableShow = () => {
    const { showMinutesTable } = this.state;
    this.setState({
      showMinutesTable: !showMinutesTable,
    });
  }

  getBody = () => {
    const { showHoursTable, showMinutesTable } = this.state;
    if (showHoursTable) {
      return this.getHoursTable();
    }
    if (showMinutesTable) {
      return this.getMinutesTable();
    }
    return this.getTimeForm();
  }

  render() {
    return this.getBody();
  }
};

const Icon = styled.i`
  font-size: 25px;
`;

const InputContainer = styled.button`
  border: none;
  border-radius: 3px;
  width: 100%;
  margin: 0;
  height: 100%;
  background-color: white;
  outline: 0;
  width: 55px;
  height: 55px;
  font-size: 18px;
  font-weight: 400;
  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
`;

const OptionContainer = styled.div`
  height: 69px;
  widht: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 8px;
`;

const CounterContainer = styled.div`
  height: 100%;
  width: 90px;
`;

const PointsContainer = styled.div`
  height: 100%;
  width: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LabelsContainer = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
`;

const Label = styled(InputContainer)`
  width: 65px;
  height: 65px;
`;

const LabelTime = styled(InputContainer)`
  margin-left: 8px;
  background-color: rgb(88, 94, 218);
  color: white;
  width: 45px;
  height: 45px;
  &:hover {
    background-color: rgb(66, 72, 204);
  }
`;

export default TimerSelect;
