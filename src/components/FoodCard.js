import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';

const FoodCard = ({ food }) => (
  <Card className="foodCard">
    <Card.Img className="foodImage" variant="top" src={food.img} fluid="true" />
    <Card.Body className="foodCardBody">
      <Card.Title>{food.name}</Card.Title>
      <Card.Text>
        Price: ${food.price}
      </Card.Text>
    </Card.Body>
    <Button className="addToCartButton" variant="success">{<FaCartPlus className="addToCartIcon" />}</Button>
  </Card>
);

export default FoodCard;
