import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

import FoodCard from './FoodCard';

import '../stylesheets/style.css';

const Restaurant = ({ restaurant }) => (
  <div className="page restaurant">
    <Card>
      <Card.Img className="restaurantImage" variant="top" src={restaurant.img} fluid="true" />
      <Card.ImgOverlay className="restaurantInfo">
        <Card.Title>{restaurant.title}</Card.Title>
        <Card.Text className="restaurantRating">
          <FaStar className="starIcon" />{restaurant.rating}
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
    <CardGroup className="restaurantMenu">
      {restaurant.menu.map((m, key) => <FoodCard key={restaurant.id + key} food={m} />)}
    </CardGroup>
  </div>
);

export default Restaurant;
