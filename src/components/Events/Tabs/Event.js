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
        const minutes = eventTime.minutes - currentTime.minutes;
        this.setState({
          hours: eventTime.hours - currentTime.hours,
          minutes: missingSeconds !== 0 ? (minutes - 1) : minutes,
          seconds: missingSeconds,
        });
      }
      if (currentTime.allMinutes === eventTime.allMinutes) {
        console.log('open alarm')
      }
      if (currentTime.allMinutes > eventTime.allMinutes) {
        console.log(eventTime.minutes)
        const hours = 7 * 24;
        const minutes = eventTime.minutes;
        this.setState({
          hours,
          minutes: missingSeconds !== 0 ? (minutes - 1) : minutes,
          seconds: missingSeconds,
        });  
      }
    } else {
      // const left = moment(`${day} ${time}`, 'ddd hh:mm A').toDate();
      // console.log('left', left - moment())
      let hours = eventTime.hours - (currentTime.hours + 1);
      // console.log('ine here', eventTime)
      let minutes = eventTime.minutes - currentTime.minutes;
      // const missingMinutes = 60 - minutes;
      if (minutes < 0) {
        console.log('minues', minutes)
        console.log('eve', event.name)
        minutes = 60 + minutes;
        // hours = hours - 1;
      }
      this.setState({
        hours,
        minutes,
        // seconds: missingSeconds,
      });
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
