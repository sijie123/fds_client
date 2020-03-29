import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

import { login } from '../actions';
import Login from '../components/Login'; 

const LoginContainer = ({ isLoggedIn, authenticateFail, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <Login
      onChangeUsername={e => setUsername(e.target.value)}
      onChangePassword={e => setPassword(e.target.value)}
      onLogin={e => onLogin(e, username, password)}
      isAuthenticateFail={authenticateFail === 'login'}
    />
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
  authenticateFail: state.authenticateFail
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogin: (event, username, password) => {
    event.preventDefault();
    dispatch(login(username, password));
    ownProps.history.push('/');
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));