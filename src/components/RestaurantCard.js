import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import '../stylesheets/style.css';

const RestaurantCard = ({ restaurant }) => (
  <Card className="restaurantCard">
    <Card.Img variant="top" src={restaurant.img} fluid="true" />
    <Card.Body>
      <Card.Title>{restaurant.title}</Card.Title>
      <Card.Text className="restaurantRating">
        <FaStar className="starIcon" />{restaurant.rating}
      </Card.Text>
      <Card.Text className="restaurantCategory">
        {restaurant.category.join(', ')}
      </Card.Text>
      <Link to={'/r' + restaurant.id}>
        <Button variant="success">Start Order</Button>
      </Link>
    </Card.Body>
  </Card>
);

export default RestaurantCard;