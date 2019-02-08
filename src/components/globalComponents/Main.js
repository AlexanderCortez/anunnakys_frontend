import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../HomePage';
import Users from '../Users/Users';
import Events from '../Events/Events';

const Main = () => (
  <Switch>
    <Route path='/users' component={Users} />
    <Route path='/events' component={Events} />
    <Route path='/' component={HomePage} />
    {/* <Route path='/' component={Error404} /> */}
  </Switch>
);

export default Main;
