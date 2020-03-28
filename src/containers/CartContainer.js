import React from 'react';
import { connect } from 'react-redux';

import { removeFromCart, clearCart } from '../actions';

import Cart from '../components/Cart'; 

const CartContainer = ({ cart, onRemoveFromCart, onClearCart }) => (
  <Cart cart={cart} onClearCart={onClearCart} onRemoveFromCart={onRemoveFromCart}/>
);

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  onRemoveFromCart: (event, item) => {
    event.preventDefault();
    dispatch(removeFromCart(item));
  },
  onClearCart: event => {
    event.preventDefault();
    dispatch(clearCart());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);