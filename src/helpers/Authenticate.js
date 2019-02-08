import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const authFunction = (AppComponents) => {
  class Authenticate extends Component {
    state = {
      canAccess: false,
    }

    componentWillMount() {
      const { logged, history } = this.props;
      if (!logged) {
        history.push('/login');
      } else {
        this.setState({
          canAccess: true,
        })
      }
    }

    componentWillUpdate(nextProps) {
      const { history } = this.props;
      if (!nextProps.logged) {
        history.push('/login');
      }
    }

    render() {
      const { canAccess } = this.state;
      return (
        canAccess
          && (
            <AppComponents />
          )        
      );
    }
  }

  const mapStateToProps = state => ({
    logged: state.AppReducer.logged,
  });

  return connect(mapStateToProps)(withRouter(Authenticate));
}

export default authFunction;
