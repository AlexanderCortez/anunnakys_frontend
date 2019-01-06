const goTo = (history, route) => {
  history.push(route);
};

const getActualRoute = (history) => {
  const { location } = history;
  return location.pathname;
}

export {
  goTo,
  getActualRoute,
};
