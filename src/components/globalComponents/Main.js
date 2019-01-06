import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../HomePage';
import Users from '../Users/Users';
import Events from '../Events/Events';

const Main = () => (
  <Switch>
    <Route path='/users' exact component={Users} />
    <Route path='/events' exact component={Events} />
    <Route path='/' exact component={HomePage} />
  </Switch>
);

export default Main;
