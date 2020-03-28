import React from 'react';
import { Button} from 'react-bootstrap';

import CartCard from './CartCard';

import '../stylesheets/style.css';

const Cart = ({ cart, onRemoveFromCart, onClearCart }) => (
  <div className="page">
    <h1 className="leftVerticalMargin">Cart</h1>
    {Object.keys(cart).map(c => <CartCard key={'c_' + c} itemName={c} itemQuantity={cart[c]} onRemoveFromCart={e => onRemoveFromCart(e, c)} />)}
    <Button className="leftVerticalMargin" variant="success" type="submit" onClick={onClearCart}>
      Clear Cart
    </Button>
  </div>
);

export default Cart;