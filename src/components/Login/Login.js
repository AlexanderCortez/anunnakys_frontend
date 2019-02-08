import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Grid, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { signIn } from '../../actions/AppActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  componentWillMount() {
    const { logged, history } = this.props;
    if (logged) {
      history.push('/events');
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) =>  {
    event.preventDefault();
    const { login } = this.props;
    const { username, password } = this.state;
    const data = {
      username,
      password,
    };
    login(data)
      .then(() => {
        const { history } = this.props;
        history.push('/events');
      })
      .catch(() => {
        console.log('error sign in');
      });
  }

  render() {
    const { username, password } = this.state;

    return (
      <Wrapper>
        <LoginCard>
          <LoginHeader>
            <span>
              Anunnakys
            </span>
          </LoginHeader>
          <LoginBody>
            <Title>
              Sign in
            </Title>
            <Grid fluid>
              <form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label>Username</Label>
                  <FormControl
                    autoComplete='off'
                    required
                    type="text"
                    value={username}
                    name='username'
                    placeholder="Enter username"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <FormControl
                    required
                    type="password"
                    value={password}
                    name='password'
                    placeholder="Enter password"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <SubmitButton
                  type='submit'  
                >
                  <i className="fas fa-lock" />
                  <span>Sign in</span>
                </SubmitButton>
              </form>
            </Grid>
          </LoginBody>
        </LoginCard>
      </Wrapper>
    );
  }
}

const SubmitButton = styled(Button)`
  background-color: rgb(96, 125, 139);
  color: #FFF;
  &:hover {
    background-color: rgb(96, 125, 139);
    color: #FFF;
  }
  i {
    padding-right: 5px;
  }
`;

const Label = styled(ControlLabel)`
  font-weight: 400;
`;

const Title = styled.div`
  padding: 30px 0 20px 14px;
  color: rgb(47, 62, 72);
  font-size: 20px;
  font-weight: 400;
`;

const Wrapper = styled.div`
  background-color: #0090dd;
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginCard = styled.div`
  background-color: #FFF;
  width: 450px;
  height: 375px;
  border-radius: 5px;
`;

const LoginHeader = styled.div`
  width: 100%;
  height: 60px;
  background-color: rgb(47, 62, 72);
  display: flex;
  align-items: center;
  color: #FFF;
  font-weight: 400;
  font-size: 20px;
  font-family: 'Roboto';
  padding-left: 22px;
  border-radius: 5px 5px 0 0;
`;

const LoginBody = styled.div`
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;

const mapStateToProps = state => ({
  logged: state.AppReducer.logged,
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(signIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
