import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import '../stylesheets/style.css';

const Header = ({ isLoggedIn, role, onLogout }) => {
  return isLoggedIn 
  ? (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand>
        <NavLink className="navbarbrand" to='/'>GrabPanda</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {role === 'customer' &&<NavLink className="navbarlink" to='/orders'>Orders</NavLink>}
          {role === 'customer' &&<NavLink className="navbarlink" to='/promotions'>Promotions</NavLink>}
          {role === 'customer' &&<NavLink className="navbarlink" to='/cart'>Cart</NavLink>}
          {role === 'customer' &&<NavLink className="navbarlink" to='/profile'>Profile</NavLink>}
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
