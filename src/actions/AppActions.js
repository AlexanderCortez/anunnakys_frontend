import _ from 'lodash/fp'

const goTo = (history, route) => {
  history.push(route);
};

const getActualRoute = history => {
  const { location } = history;
  return location.pathname;
};

const getContainerRect = (container) => {
  return _.flow(
    _.result('getBoundingClientRect'),
    _.defaultTo({
      width: 0,
      height: 0,
      top: 0,
      left: 0
    })
  )(container)
}

export {
  goTo,
  getActualRoute,
  getContainerRect,
};
