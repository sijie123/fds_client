import React from 'react';
import { Button, Form } from 'react-bootstrap';

const Login = ({ onChangeUsername, onChangePassword, onChangeRole, onLogin, isAuthenticateFail }) => (
  <div className="authenticate">
    <h1 className="title">GrabPanda</h1>
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label className="label">Username</Form.Label>
        <Form.Control type="username" placeholder="Enter your username" onChange={onChangeUsername} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className="label">Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" onChange={onChangePassword} />
      </Form.Group>
      <Form.Group controlId="formBasicRole">
        <Form.Label className="label">Role</Form.Label>
        <Form.Control as="select" onChange={onChangeRole}>
          <option>Customer</option>
          <option>Rider</option>
          <option>Restaurant</option>
          <option>Manager</option>
        </Form.Control>
      </Form.Group>
      {isAuthenticateFail ? <p className="authenticateFailure">Error: Invalid username or password</p> : null}
      <Button variant="success" type="submit" onClick={onLogin}>
        Login
      </Button>
    </Form>
  </div>
);

export default Login;