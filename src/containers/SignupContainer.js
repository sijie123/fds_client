import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

import { signup } from '../actions';
import Signup from '../components/Signup'; 

const SignupContainer = ({ isLoggedIn, authenticateFail, onSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <Signup 
      onChangeUsername={e => setUsername(e.target.value)}
      onChangePassword={e => setPassword(e.target.value)}
      onSignup={e => onSignup(e, username, password)}
      isAuthenticateFail={authenticateFail === 'signup'}
    />
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
  authenticateFail: state.authenticateFail
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSignup: (event, username, password) => {
    event.preventDefault();
    dispatch(signup(username, password));
    ownProps.history.push('/');
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupContainer));