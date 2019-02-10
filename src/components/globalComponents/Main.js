import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../HomePage';
import Users from '../Users/Users';
import Events from '../Events/Events';

const privateRoutes = [
  {
    component: Users,
    path: '/users',
    canAccess: {
      admin: true,
    },
  },
  {
    component: Events,
    path: '/events',
    canAccess: {
      admin: true,
      user: true,
    },
  },
];

// const RenderNoPermissionPage = () => <ErrorPage text="You do not have acces to this page" />;
// const RenderNotFoundPage = () => <ErrorPage text="This page does not exist." notFound />;
const RenderNoPermissionPage = () => "You do not have acces to this page";
const RenderNotFoundPage = () => "This page does not exist.";

const getRoutes = (user) => (
  <React.Fragment>
    <Switch>
    {
      privateRoutes.map(({
        component, canAccess, path, isExact,
      }) => {
        if (user.role) {
          if (canAccess.hasOwnProperty(user.role)) {
            return <Route key={path} path={path} component={component} exact={isExact} />;
          }
        }
        return <Route key={path} path={path} exact={isExact} component={RenderNoPermissionPage} />
      })
    }
    <Route exact path='/' component={HomePage} />
    <Route component={RenderNotFoundPage} />
    </Switch>
  </React.Fragment>
);

const Main = ({ user }) => {
  return (
    <Switch>
      {
        getRoutes(user)
      }
    </Switch>
  );
};

export default Main;
