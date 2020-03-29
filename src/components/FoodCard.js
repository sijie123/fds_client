import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';

const FoodCard = ({ food, onAddToCart }) => (
  <Card className="horizontalCard">
    <Card.Img className="foodImage" variant="top" src={require("../images/food_logo.jpg")} fluid="true" />
    <Card.Body className="horizontalCardBody">
      <Card.Title>{food.fname}</Card.Title>
      <Card.Text className="marginBottomZero">Price: {food.price}</Card.Text>
      <Card.Text className="greyText">{food.categories.join(', ')}</Card.Text>
    </Card.Body>
    <Button className="actionButton" variant="success" onClick={onAddToCart}>{<FaCartPlus className="faIcon" />}</Button>
  </Card>
);

export default FoodCard;
