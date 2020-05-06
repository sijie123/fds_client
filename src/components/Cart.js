import React from 'react';
import { Button, Form } from 'react-bootstrap';

import CartCard from './CartCard';

import '../stylesheets/style.css';

const Cart = ({ cart, restaurant, totalPrice, options, promos, useRewardPoints, onRemoveFromCart, onClearCart, onSetPaymentMethod, onSetAddress, onSetPromo, onToggleRewardPoints, onOrder }) => (
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
          <p className="horizontalMargin2">
            Price: ${totalPrice.toFixed(2)}
          </p>
          <p className="horizontalMargin2">
            Delivery Fee: $2.00
          </p>
          <h5 className="noTopMargin">
            Total Price: ${(totalPrice + 2).toFixed(2)}
          </h5>
          <Form className="noTopMargin">
            <h6>Payment Method:</h6>
            <Form.Group>
              <Form.Control as="select" onChange={onSetPaymentMethod}>
                <option>CASH</option>
                <option>CARD</option>
              </Form.Control>
            </Form.Group>
            <h6>Delivery Address:</h6>
            <Form.Group>
              <Form.Control as="select" onChange={onSetAddress}>
                <option style={{ color: 'grey' }} value="">Select delivery address...</option>
                {[...options].map(o => o.charAt(o.length - 1) === '$'
                  ? <option key={`option_${o}`} value={o.slice(0, -1)} style={{ fontWeight: 'bold' }}>{o.slice(0, -1)}</option>
                  : <option key={`option_${o}`}>{o}</option>
                )}
              </Form.Control>
            </Form.Group>
            <h6>Promo Code:</h6>
            <Form.Group>
              <Form.Control as="select" onChange={onSetPromo}>
                <option style={{ color: 'grey' }} value="">Apply promo code...</option>
                {promos.map(o => <option key={`promocode_${o}`}>{o}</option>)}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Check
                checked={useRewardPoints}
                type='checkbox'
                label={'Use reward points'}
                onChange={() => onToggleRewardPoints()}
                style={{ fontWeight: 'bold' }}
              />
            </Form.Group>
            <Button className="topMargin" variant="danger" type="submit" onClick={e => onOrder(e, totalPrice)}>
              Place Order
            </Button>
          </Form>
        </div>
    }
  </div>
);

export default Cart;