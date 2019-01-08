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
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
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
    const { show, onHide } = this.props;
    const { name, password, username } = this.state;

    return (
      <Modal
        title='User'
        onHide={onHide}
        show={show}
      >
        <Grid fluid>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl
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
                  <Checkbox>
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
