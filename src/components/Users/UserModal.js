import React, { Component } from 'react';
import { Grid, Row, FormGroup, FormControl, ControlLabel, Col, Button, Checkbox } from 'react-bootstrap';
import styled from 'styled-components';
import generator from 'generate-password';
import Modal from '../globalComponents/Modal/Modal';

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      name: '',
      password: '',
      username: '',
      isAdmin: false,
      id: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { edit, userToModify, show } = nextProps;
    if (edit) {
      const {
        name,
        username,
        isAdmin,
        _id,
      } = userToModify;
      this.setState({
        id: _id,
        name,
        username,
        isAdmin,
      });
    } else {
      if (!show) {
        this.setState(this.getInitialState())
      }
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleCheckboxChange = (e) => {
    this.setState({
      isAdmin: e.target.checked,
    })
  }

  createUser = () => {
    const { createUser } = this.props;
    const {
      username,
      password,
      isAdmin,
      name,
    } = this.state;
    const data = {
      username,
      password,
      name,
      isAdmin, 
    }
    createUser(data);
  }

  modifyUser = () => {
    const { modifyUser } = this.props;
    const {
      username,
      password,
      isAdmin,
      name,
      id,
    } = this.state;
    let setPassword = {}
    if (!!password) {
      setPassword = {
        password,
      }
    }
    const data = {
      id,
      username,
      name,
      isAdmin,
      ...setPassword,
    }
    modifyUser(data);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { edit } = this.props;
    if (edit) {
      this.modifyUser();
    } else {
      this.createUser();
    }
  }

  generatePassword = () => {
    const password = generator.generate({
      length: 6,
      numbers: true
    });
    this.setState({
      password,
    });
  }

  getValidationState = () => {
    const length = this.state.password.length;
    if (length >= 6) return 'success';
    else if (length === 0) return 'warning';
    else if (length < 6) return 'error';
    return null;
  }

  render() {
    const { show, onHide, edit } = this.props;
    const { name, password, username, isAdmin } = this.state;

    return (
      <Modal
        title='User'
        onHide={() => {
          this.setState(this.getInitialState(), () => onHide());
        }}
        show={show}
      >
        <Grid fluid>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl
                required
                type="text"
                value={name}
                name='name'
                placeholder="Enter name"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Username</ControlLabel>
              <FormControl
                required
                type="text"
                value={username}
                name='username'
                placeholder="Enter username"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Row>
              <Col md={4}>
                <FormGroup
                  validationState={this.getValidationState()}
                >
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    required={!edit}
                    type="text"
                    value={password}
                    name='password'
                    placeholder="Enter password"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <ButtonContainer>
                  <Button
                    onClick={this.generatePassword}
                    bsStyle='primary'
                  >
                    Generate password
                  </Button>
                </ButtonContainer>
              </Col>
              <Col md={4}>
                <ButtonContainer>
                  <Checkbox
                    name='isAdmin'
                    defaultChecked={isAdmin}
                    onChange={this.handleCheckboxChange}
                  >
                    Is Admin
                </Checkbox>
                </ButtonContainer>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Button
                  type='submit'
                  bsStyle='success'
                >
                  Save
                </Button>
                <Button
                  onClick={onHide}
                  style={{
                    marginLeft: '10px'
                  }}
                  type='button'
                  bsStyle='danger'
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </form>
        </Grid>
      </Modal>
    );
  }
}

const ButtonContainer = styled.div`
  margin-top: 18px;
  height: 40px;
  display: flex;
  justify-content: left;
`;

export default UserModal;
