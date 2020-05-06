import React from 'react';
import { Card } from 'react-bootstrap';

const PromoCard = ({ code, restaurant, description, time }) => (
  <Card className="horizontalCard horizontalMargin bottomMargin">
    <Card.Body className="horizontalCardBody">
      <Card.Title>{code}</Card.Title>
      <Card.Text className="marginBottomZero"><em>{description}</em></Card.Text>
      {restaurant == null ? null : <Card.Text className="marginBottomZero">{restaurant}</Card.Text>}
      {time == null ? null : <Card.Text className="marginBottomZero">Valid until: {time}</Card.Text>}
    </Card.Body>
  </Card>
);

export default PromoCard;