import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../stylesheets/style.css';

const RestaurantCard = ({ restaurant, id }) => (
  <Card className="restaurantCard">
    <Card.Body>
      <Card.Title className="marginBottomZero">{restaurant.name}</Card.Title>
      <Card.Text className="greyText">{restaurant.location}</Card.Text>
      <Link to={'/r/' + id}>
        <Button variant="success">Start Order</Button>
      </Link>
    </Card.Body>
  </Card>
);

export default RestaurantCard;