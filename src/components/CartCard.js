import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaMinus } from 'react-icons/fa';

const CartCard = ({ itemName, itemQuantity, onRemoveFromCart }) => (
  <Card className="horizontalCard horizontalMargin">
    <Card.Body className="horizontalCardBody">
      <Card.Title>{itemName}</Card.Title>
      <Card.Text className="marginBottomZero">Quantity: {itemQuantity}</Card.Text>
    </Card.Body>
    <Button className="actionButton" variant="success" onClick={onRemoveFromCart}>{<FaMinus className="faIcon" />}</Button>
  </Card>
);

export default CartCard;