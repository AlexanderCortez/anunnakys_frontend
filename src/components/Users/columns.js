const getAdminLabel = (cell, row) => {
  const isAdmin = row.user_isAdmin;
  if (isAdmin === 0) {
    return 'USER';
  } else {
    return 'ADMIN';
  }
};

const getTableColumns = (getEditOption, getRemoveOption) => {
  const commonStyle = {
    width: '75px',
  }
  const columns = [{
    dataField: 'user_name',
    text: 'Name',
  }, {
    dataField: 'user_username',
    text: 'Username'
  }, {
    isDummyField: true,
    dataField: 'isAdmin',
    text: 'User Type',
    formatter: getAdminLabel,
  }, {
    style: commonStyle,
    headerStyle: commonStyle,
    dataField: 'edit',
    text: '',
    formatter: getEditOption,
  }, {
    style: commonStyle,
    headerStyle: commonStyle,
    dataField: 'remove',
    text: '',
    formatter: getRemoveOption,
  }];
  return columns;
};

export {
  getTableColumns,
};
