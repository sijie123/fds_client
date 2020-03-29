import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';

import FoodCard from '../components/FoodCard';

import '../stylesheets/style.css';

const Restaurant = ({ restaurant, food, onAddToCart }) => (
  <div className="page">
    <Card>
    <Card.Img className="restaurantImage" variant="top" src={require("../images/food.jpg")} fluid="true" />
      <Card.ImgOverlay className="restaurantInfo">
        <Card.Title>{restaurant.name}</Card.Title>
        <Card.Text>{restaurant.location}</Card.Text>
      </Card.ImgOverlay>
    </Card>
    <CardGroup className="verticalList">
      {food.map((f, key) => <FoodCard key={'f_' + key} food={f} onAddToCart={e => onAddToCart(e, restaurant.name, f)} />)}
    </CardGroup>
  </div>
);

export default Restaurant;
