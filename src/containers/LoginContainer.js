import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { authenticate } from '../actions';
import Login from '../components/Login'; 

const LoginContainer = ({ history, isLoggedIn, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (isLoggedIn) {
    history.push('/');
    return null;
  }

  return (
    <Login
      onChangeUsername={e => setUsername(e.target.value)}
      onChangePassword={e => setPassword(e.target.value)}
      onLogin={e => onLogin(e, username, password)} 
    />
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogin: (event, username, password) => {
    event.preventDefault();
    dispatch(authenticate(username, password));
    ownProps.history.push('/');
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));