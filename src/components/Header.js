import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import '../stylesheets/style.css';

const Header = ({ isLoggedIn, onLogout }) => {
  return isLoggedIn 
  ? (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand>
        <NavLink className="navbarbrand" to='/'>FoodBear</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavLink className="navbarlink" to='/orders'>Orders</NavLink>
        <NavLink className="navbarlink" to='/promotions'>Promotions</NavLink>
        <NavLink className="navbarlink" to='/profile'>Profile</NavLink>
        <NavLink className="navbarlink" to='/' onClick={onLogout}>Logout</NavLink>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  : (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand>
        <NavLink className="navbarbrand" to='/'>Food</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavLink className="navbarlink" to='/login'>Login</NavLink>
        <NavLink className="navbarlink" to='/signup'>Sign up</NavLink>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
};

export default Header;
