import React from 'react';
import { Button, Card } from 'react-bootstrap';

const OrderCard = ({ id, restaurant, totalcost, items, time, onReview }) => (
  <Card className="horizontalCard horizontalMargin bottomMargin">
    <Card.Body className="horizontalCardBody">
      <Card.Title>{restaurant}</Card.Title>
      <Card.Text className="marginBottomZero">{items.join(', ')}</Card.Text>
      <Card.Text className="marginBottomZero">${totalcost}</Card.Text>
      <Card.Text className="marginBottomZero">{time}</Card.Text>
    </Card.Body>
    <Button className="actionButton" variant="success" onClick={e => onReview(e, id, items)}>Review</Button>
  </Card>
);

export default OrderCard;