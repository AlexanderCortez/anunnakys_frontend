import React, { Component } from 'react';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Panel, Grid, Row, Col, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import styled from 'styled-components';
import { connect } from 'react-redux';
import _ from 'lodash';
import ContentHeader from '../globalComponents/ContentHeader';
import MainContainer from '../globalComponents/MainContainer';
import { getUsers, addUser, updateUser, deleteUser } from '../../actions/userActions';
import SnackBar from '../globalComponents/SnackBars';
import UserModal from './UserModal';
import { getTableColumns } from './columns';

class Users extends Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);
    this.state = {
      showModal: false,
      users: [],
      userToModify: {},
      edit: false,
      snackbar: {
        open: false,
        message: '',
        type: '',
      },
    };
  }

  componentWillMount() {
    const { getUsers } = this.props;
    getUsers()
      .catch(() => {
        const { error } = this.props;
        this.setState({
          snackbar: {
            open: true,
            message: error,
            type: 'error',
          },
        });
      })
  }

  componentDidMount() {
    this.setUsersFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setUsersFromProps(nextProps);
  }

  setUsersFromProps = (props) => {
    const { users } = props;
    const { edit, userToModify } = this.state;
    const newUsers = _.values(users).reverse();
    this.setState({
      users: newUsers,
      userToModify: edit ? users[userToModify.user_id] : {},
    });
  }

  handleHide = () => {
    this.setState({
      showModal: false,
      edit: false,
    });
  }

  createUser = (data) => {
    const { createUser } = this.props;
    createUser(data)
      .then(() => {
        this.setState({
          showModal: false,
          edit: false,
          snackbar: {
            open: true,
            message: 'User added successfully',
            type: 'success',
          },
        });
      })
      .catch(() => {
        const { error } = this.props;
        this.setState({
          snackbar: {
            open: true,
            message: error,
            type: 'error',
          },
        });
      })
  }

  modifyUser = (data) => {
    const { modifyUser } = this.props;
    modifyUser(data)
      .then(() => {
        this.setState({
          showModal: false,
          edit: false,
          snackbar: {
            open: true,
            message: 'User updated successfully',
            type: 'success',
          },
        });
      })
      .catch(() => {
        const { error } = this.props;
        this.setState({
          snackbar: {
            open: true,
            message: error,
            type: 'error',
          },
        });
      });
  }

  removeUser = (userToModify) => {
    const { removeUser } = this.props;
    const { user_id } = userToModify;
    const data = {
      id: user_id,
    };
    removeUser(data)
      .then(() => {
        this.setState({
          snackbar: {
            open: true,
            message: 'User removed successfully',
            type: 'success',
          },
        });
      })
      .catch(() => {
        const { error } = this.props;
        this.setState({
          snackbar: {
            open: true,
            message: error,
            type: 'error',
          },
        });
      });
  }

  getCurrentUser = (row) => {
    const { users } = this.state;
    const { user_id } = row;
    const newUsers = _.keyBy(users, 'user_id');
    return newUsers[user_id];
  }

  handleCloseSnackBar = () => {
    const { snackbar } = this.state;
    this.setState({
      snackbar: {
        ...snackbar,
        open: false,
      },
    });
  }

  getEditOption = (cell, row) => {
    return (
      <OptionContainer>
        <OptionButton
          bsStyle='primary'
          onClick={() => {
            this.setState({
              edit: true,
              userToModify: this.getCurrentUser(row),
              showModal: true,
            });
          }}
        >
          <i className="far fa-edit" />
        </OptionButton>
      </OptionContainer> 
    )
  }

  getRemoveOption = (cell, row) => {
    return (
      <OptionContainer>
        <OptionButton
          bsStyle='danger'
          onClick={() => this.removeUser(row)}
        >
          <i className="far fa-trash-alt" />
        </OptionButton>
      </OptionContainer>
    )
  }

  render() {
    const { history } = this.props;
    const { showModal, users, edit, userToModify, snackbar } = this.state;
    const columns = getTableColumns(this.getEditOption, this.getRemoveOption);

    return (
      <MainContainer
        history={history}
      >
        <ContentHeader
          title='Users'
        />
        <Panel>
          <UserModal
            userToModify={userToModify}
            edit={edit}
            show={showModal}
            onHide={this.handleHide}
            createUser={this.createUser}
            modifyUser={this.modifyUser}
          />
          <Panel.Body>
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <Button
                    onClick={() => this.setState({
                      showModal: true,
                      edit: false,
                    })}
                    bsStyle='success'
                  >
                    Add a New User
                  </Button>
                </Col>
              </Row>
              <RowSpace />
              <Row>
                <Col md={12}>
                  <BootstrapTable
                    keyField='user_id'
                    data={users}
                    columns={columns}
                    pagination={paginationFactory()}
                  />
                </Col>
              </Row>
            </Grid>
          </Panel.Body>
        </Panel>
        <SnackBar
          type={snackbar.type}
          open={snackbar.open}
          message={snackbar.message}
          onClose={this.handleCloseSnackBar}
        />
      </MainContainer>
    );
  }
}

const RowSpace = styled.div`
  height: 15px;
  width: 100%;
`;

const OptionButton = styled(Button)`
  width: 35px;
  height: 30px;
  padding: 0;
  text-align: center;
`;

const OptionContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const mapStateToProps = state => ({
  users: state.UserReducer.users,
  error: state.UserReducer.error,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers()),
  createUser: data => dispatch(addUser(data)),
  modifyUser: data => dispatch(updateUser(data)),
  removeUser: data => dispatch(deleteUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
