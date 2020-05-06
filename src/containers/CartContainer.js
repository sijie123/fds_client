import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { removeFromCart, clearCart, placeOrder } from '../actions';

import Cart from '../components/Cart';

import config from "../config";

const CartContainer = ({ cardnumber, restaurants, cart, currentRestaurant, onRemoveFromCart, onClearCart, onPlaceOrder }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentmethod, setPaymentMethod] = useState('CASH');
  const [address, setAddress] = useState('');
  const [selectedPromo, setSelectedPromo] = useState('');
  const [options, setOptions] = useState(new Set());
  const [isHistoryFetched, setIsHistoryFetched] = useState(false);
  const [isLocationsFetched, setIsLocationsFetched] = useState(false);
  const [promos, setPromos] = useState([]);
  const [isPromosFetched, setIsPromosFetched] = useState(false);
  const [useRewardPoints, setRewardPoints] = useState(false);

  useEffect(() => {
    if (!isHistoryFetched) {
      fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/customer/addresses`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.locations !== null && data.locations !== undefined) {
          let _options = options;

          for (let i = 0; i < data.locations.length; i++) {
            if (_options.has(data.locations[i])) {
              _options.delete(data.locations[i])
            }

            _options.add(data.locations[i] + '$');
          }

          setOptions(_options);
          setIsHistoryFetched(true);
        }
      });
    }

    if (!isLocationsFetched) {
      fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/misc/locations`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.locations !== null && data.locations !== undefined) {
          let _options = options;

          for (let i = 0; i < data.locations.length; i++) {
            if (_options.has(data.locations[i] + '$')) {
              continue;
            }

            _options.add(data.locations[i]);
          }

          setOptions(_options);
          setIsLocationsFetched(true);
        }
      });
    }

    if (!isPromosFetched) {
      fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/misc/promotions`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        let _promos = [];
        for (let k in data) {
            if (k === 'status') {
                continue;
            }
            _promos.push(data[k].code);
        }
        setPromos(_promos);
        setIsPromosFetched(true);
      });
    }
  });

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
      onPlaceOrder(cartorder, currentRestaurant, totalPrice, paymentmethod, address, selectedPromo, useRewardPoints);

      if (currentRestaurant === '') {
        setShowSuccess(true);
        setErrorMsg('');
        setPaymentMethod('');
        setAddress('');
        setSelectedPromo('');
        setRewardPoints(false);
      } else {
        setErrorMsg('Delivery currently unavailable.');
      }
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
        options={options}
        promos={promos}
        useRewardPoints={useRewardPoints}
        onClearCart={onClearCart}
        onRemoveFromCart={onRemoveFromCart}
        onSetPaymentMethod={e => setPaymentMethod(e.target.value)}
        onSetAddress={e => setAddress(e.target.value)}
        onSetPromo={e => setSelectedPromo(e.target.value)}
        onToggleRewardPoints={() => useRewardPoints ? setRewardPoints(false) : setRewardPoints(true)}
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