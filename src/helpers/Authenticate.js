import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const authFunction = (AppComponents) => {
  class Authenticate extends Component {
    state = {
      canAccess: false,
      user: {},
    }

    componentWillMount() {
      const { logged, history, user } = this.props;
      if (!logged) {
        history.push('/login');
      } else {
        this.setState({
          user,
          canAccess: true,
        });
      }
    }

    componentWillUpdate(nextProps) {
      const { history } = this.props;
      if (!nextProps.logged) {
        history.push('/login');
      }
    }

    render() {
      const { canAccess, user } = this.state;
      return (
        canAccess
          && (
            <AppComponents
              user={user}
            />
          )        
      );
    }
  }

  const mapStateToProps = state => ({
    logged: state.AppReducer.logged,
    user: state.AppReducer.currentUser,
  });

  return connect(mapStateToProps)(withRouter(Authenticate));
}

export default authFunction;
