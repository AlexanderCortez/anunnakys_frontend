import React from 'react';

const getAdminLabel = (cell, row) => {
  const { role } = row;
  if (role === 'admin') {
    return (
      <span>
        ADMIN
      </span>
    );
  } else {
    return (
      <span>
        USER
      </span>
    );
  }
};

const getTableColumns = (getEditOption, getRemoveOption) => {
  const commonStyle = {
    width: '75px',
  }
  const columns = [{
    dataField: 'name',
    text: 'Name',
  }, {
    dataField: 'username',
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
