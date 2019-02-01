import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import _ from 'lodash';
import DropDownMenu from './DropDownMenu';
import days from '../days';

class Event extends Component {
  state = {
    time: '00:00:00',
    hours: 0,
    minutes: 0,
    seconds: 0,
    keepSettingPicker: true,
  }

  componentDidMount() {
    this.setAlarm();
  }

  timeIsBefore = (target) => {
    console.log(moment('hh:mm A').isBefore(moment(target).format('hh:mm A')));
  }

  getDays = (targetDay) => {
    const newDays = days.map((day, index) => ({
      day: day.value,
      index: index + 1,
    }));
    const currentDay = moment().format('dddd').toLowerCase();
    const allDays = _.keyBy(newDays, 'day');
    const daysResult = allDays[targetDay].index - allDays[currentDay].index;
    let daysToReturn = daysResult;
    if (daysResult < 0) {
      daysToReturn += 7;
    }
    return daysToReturn;
  }

  getTimeForEvent = () => {
    const { event } = this.props;
    const { time, day } = event;
    const eventTimeAsDate = moment(`${day} ${time}`, 'ddd hh:mm A').toDate();
    const eventHours = moment(eventTimeAsDate).format('hh');
    const eventMinutes = moment(eventTimeAsDate).format('mm')
    const eventLabel = moment(eventTimeAsDate).format('A')
    const allDays = this.getDays(day.toLowerCase());
    const timeLeft = this.getTime(allDays, eventHours, eventMinutes, eventLabel);
    return timeLeft;
  }

  getCurrentTime = () => {
    const timeAsDate = moment();
    const hours = moment(timeAsDate).format('hh');
    const minutes = moment(timeAsDate).format('mm')
    const label = moment(timeAsDate).format('A')
    const allDays = 0;
    const timeLeft = this.getTime(allDays, hours, minutes, label);
    return timeLeft;
  }

  AlarmPicker = () => {
    setTimeout(() => {
      const { seconds, minutes, hours } = this.state;
      let newSeconds = parseInt(seconds, 10);
      let newMinutes = parseInt(minutes, 10);
      let newHours = parseInt(hours, 10);
      if (newSeconds === 0) {
        if (newMinutes === 0) {
          if (newHours === 0) {
            const { openAlarm } = this.props;
            openAlarm();
            this.setState({
              keepSettingPicker: false,
            })
          } else {
            newMinutes = 59;
            newHours -= 1;
          }
        } else {
          newMinutes -= 1;
          newSeconds = 59;
        }
      } else {
        newSeconds -= 1;
      }
      // console.log('newMinutes', newMinutes)
      this.setState({
        hours: this.getTimeFormat(newHours),
        seconds: this.getTimeFormat(newSeconds),
        minutes: this.getTimeFormat(newMinutes),
      }, () => {
        const { hours, seconds, minutes } = this.state;
        // console.log('here ', this.state.seconds)
        const { keepSettingPicker } = this.state;
          if (keepSettingPicker) {
            this.AlarmPicker()
          }
      })
    }, 1000);
  }

  setAlarm = () => {
    const currentTime = this.getCurrentTime();
    const eventTime = this.getTimeForEvent();
    const { event } = this.props;
    const { time, day } = event;
    const today = moment().format('dddd').toLowerCase();
    const currentSeconds = moment().format('ss');
    const missingSeconds = 60 - currentSeconds;
    if (today === day.toLowerCase()) {
      if (currentTime.allMinutes < eventTime.allMinutes) {
        // console.log(currentTime, 'here')
        let minutes = eventTime.minutes - currentTime.minutes;
        let hours = eventTime.hours - (currentTime.hours);
        console.log('hours', hours)
        console.log('eventTime.hours', eventTime)
        console.log('currentTime.hours', currentTime)
        if (hours < 0) {
          hours = 0;
        }
        if (minutes < 0) {
          minutes = 60 + minutes;
          // hours = hours - 1;
        }
        this.setState({
          hours: this.getTimeFormat(hours),
          minutes: this.getTimeFormat(minutes),
          seconds: this.getTimeFormat(missingSeconds),
        }, () => this.AlarmPicker());
      }
      if (currentTime.allMinutes === eventTime.allMinutes) {
        console.log('open alarm')
      }
      if (currentTime.allMinutes > eventTime.allMinutes) {
        const hours = 7 * 24;
        const minutes = eventTime.minutes;
        this.setState({
          hours,
          minutes: missingSeconds !== 0 ? (minutes - 1) : minutes,
          seconds: missingSeconds,
        }, () => this.AlarmPicker());
      }
    } else {
      // const left = moment(`${day} ${time}`, 'ddd hh:mm A').toDate();
      let hours = eventTime.hours - (currentTime.hours + 1);
      // console.log('ine here', eventTime)
      let minutes = eventTime.minutes - currentTime.minutes;
      const missingSeconds = 60 - moment().format('ss');
      if (minutes < 0) {
        minutes = 60 + minutes;
        // hours = hours - 1;
      }
      this.setState({
        hours: this.getTimeFormat(hours),
        minutes: this.getTimeFormat(minutes),
        seconds: this.getTimeFormat(missingSeconds),
      }, () => this.AlarmPicker());
    }
    // const { hours, minutes } = timeLeft;
    // this.timeIsBefore(eventTimeAsDate);
    // console.log(time)
    // this.setState({
    //   time: `${hours}:${minutes}:00`,
    // });
  }

  getTime = (allDays, hours, minutes, label) => {
    let allMinutes = (parseInt(hours, 10) * 60) + parseInt(minutes, 10);
    let allHours = (allDays * 24) + parseInt(hours, 10);
    if (label === 'PM') {
      allMinutes += (12 * 60);
      allHours += 12;
    }
    if (label === 'AM') {
      if (allHours === 12) {
        allHours = 0;
      }
    }
    return {
      hours: allHours,
      minutes: parseInt(minutes, 10),
      allMinutes: allMinutes + (allDays * 24 * 60),
    };
  }

  getTimeFormat = time => (time < 10 ? `0${time}` : time);

  onEdit = () => {
    const { event, editAction } = this.props;
    editAction(event);
  }

  onRemove = () => {
    const { event, removeAction } = this.props;
    removeAction(event);
  }
  
  render() {
    const { event } = this.props;
    const { time, hours, minutes, seconds } = this.state;
    return (
      <Wrraper>
        <Header>
          <div>
            <span>
              {event.type}
            </span>
            <p>{event.day}, {event.time}</p>
          </div>
          <DropDownMenu 
            onEdit={this.onEdit}
            onRemove={this.onRemove}
          />
        </Header>
        <Timer>
          {hours}:{minutes}:{seconds}
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
