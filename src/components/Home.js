import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';

import RestaurantCard from './RestaurantCard';

const Home = ({ restaurants, onChangeKeyword, onSearch, onOpenCategories }) => (
  <div className="page">
    <div className="searchBar">
      <InputGroup>
        <InputGroup.Prepend>
          <Button className="actionButton" variant="success" onClick={onOpenCategories}>{<FaFilter />}</Button>
        </InputGroup.Prepend>
        <Form.Control type="keyword" placeholder="Enter restaurant name" onChange={onChangeKeyword} />
        <InputGroup.Append>
          <Button variant="outline-success" onClick={onSearch}>Search</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
    <div className="home">
      {restaurants.map((r, key) => <RestaurantCard key={key} restaurant={r} id={key} />)}
    </div>
  </div>
);

export default Home;
