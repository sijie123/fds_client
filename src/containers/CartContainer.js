import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { removeFromCart, clearCart, placeOrder } from '../actions';

import Cart from '../components/Cart'; 

const CartContainer = ({ cardnumber, restaurants, cart, currentRestaurant, onRemoveFromCart, onClearCart, onPlaceOrder }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentmethod, setPaymentMethod] = useState('CASH');
  const [address, setAddress] = useState('');

  const onOrder = (event, totalPrice) => {
    event.preventDefault();
    let minorder;
    for (let r of restaurants) {
      if (r.name === currentRestaurant) {
        minorder = parseFloat(r.minorder.substr(1));
        break;
      }
    }
    if (totalPrice < minorder) {
      setErrorMsg(`Order must reach a minimum of $${minorder.toFixed(2)}`);
    } else if (paymentmethod === 'CARD' && cardnumber === null) {
      setErrorMsg('Please update your card number in Profile before proceeding to order.');
    } else if (address === '') {
      setErrorMsg('Please provide a delivery address.');
    } else {
      let cartorder = {};
      for (let c in cart) {
        cartorder[c] = cart[c].quantity;
      }
      console.log(cartorder);
      onPlaceOrder(cartorder, currentRestaurant, totalPrice, paymentmethod, address);
      setShowSuccess(true);
      setErrorMsg('');
      setPaymentMethod('');
      setAddress('');
    }
  }

  return (
    <div>
      <Modal show={errorMsg !== ''} onHide={() => setErrorMsg('')}>
        <Modal.Header className="errorModal" closeButton>
          Fail To Place Order!<br /><br />
          {errorMsg}
        </Modal.Header>
      </Modal>
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
        <Modal.Header className="successModal" closeButton>Order Placed!</Modal.Header>
      </Modal>
      <Cart
        cart={cart}
        restaurant={currentRestaurant}
        totalPrice={Object.keys(cart).reduce((acc, c) => acc + parseFloat(cart[c].base_price.substr(1)) * cart[c].quantity, 0)}
        onClearCart={onClearCart}
        onRemoveFromCart={onRemoveFromCart}
        onSetPaymentMethod={e => setPaymentMethod(e.target.value)}
        onSetAddress={e => setAddress(e.target.value)}
        onOrder={onOrder}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  cardnumber: state.user.cardnumber,
  restaurants: state.restaurants,
  cart: state.cart,
  currentRestaurant: state.currentRestaurant
});

const mapDispatchToProps = dispatch => ({
  onRemoveFromCart: (event, itemName) => {
    event.preventDefault();
    dispatch(removeFromCart(itemName));
  },
  onClearCart: event => {
    event.preventDefault();
    dispatch(clearCart());
  },
  onPlaceOrder: (cart, restaurant, totalPrice, paymentmethod, address) => {
    dispatch(placeOrder(cart, restaurant, totalPrice, paymentmethod, address));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);