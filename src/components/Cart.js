import React from 'react';
import { Button, Form } from 'react-bootstrap';

import CartCard from './CartCard';

import '../stylesheets/style.css';

const Cart = ({ cart, restaurant, totalPrice, onRemoveFromCart, onClearCart, onSetPaymentMethod, onSetAddress, onOrder }) => (
  <div className="page">
    <h1 className="allMargin">Cart</h1>
    {restaurant === '' 
      ? null 
      : <div>
          <h5 className="allMargin">Order from: {restaurant}</h5>
          {Object.keys(cart).map(c => 
            <CartCard
              key={'c_' + c}
              itemName={c}
              itemQuantity={cart[c].quantity}
              itemPrice={cart[c].base_price}
              onRemoveFromCart={e => onRemoveFromCart(e, c)}
            />
          )}
          <Button className="allMargin" variant="success" type="submit" onClick={onClearCart}>
            Clear Cart
          </Button>
          <h5 className="noTopMargin">
            Total Price: ${totalPrice.toFixed(2)}
          </h5>
          <Form className="noTopMargin">
            <h5>Payment Method:</h5>
            <Form.Group>
              <Form.Control as="select" onChange={onSetPaymentMethod}>
                <option>CASH</option>
                <option>CARD</option>
              </Form.Control>
            </Form.Group>
            <h5>Delivery Address:</h5>
            <Form.Control type="address" onChange={onSetAddress} />
            <Button className="topMargin" variant="danger" type="submit" onClick={e => onOrder(e, totalPrice)}>
              Place Order
            </Button>
          </Form>
        </div>
    }
  </div>
);

export default Cart;