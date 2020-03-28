import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';

import Home from '../components/Home'; 

const HomeContainer = ({ categories, restaurants }) => {
  const [keyword, setKeyword] = useState("");
  const [localRestaurants, setLocalRestaurants] = useState(restaurants);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  const onSearch = rs => {
    if (keyword === "") {
      setLocalRestaurants(rs);
    } else {
      setLocalRestaurants(rs.filter(r => r.name.toLowerCase().includes(keyword.toLowerCase())));
    }
  }

  const onToggleCategory = category => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  const onFilterByCategories = () => {
    if (selectedCategories.length !== 0) {
      fetch('http://54.169.81.205:3001/category/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cname: selectedCategories
        })
      })
      .then(res => res.json())
      .then(data => {
        setFilteredRestaurants(data.restaurants);
        onSearch(data.restaurants);
      })
      .then(() => setShowCategories(false));
    } else {
      setFilteredRestaurants(restaurants);
      onSearch(restaurants);
      setShowCategories(false);
    }
  }

  return (
    <div>
      <Modal centered show={showCategories} backdrop="static" onHide={() => setShowCategories(false)}>
        <Modal.Header className="categoriesModal">Categories</Modal.Header>
        <Form className="leftVerticalMargin">
          {categories.map(c => 
            <Form.Check
              checked={selectedCategories.includes(c)}
              type='checkbox'
              id={'cat_' + c}
              key={c}
              label={c}
              onChange={() => onToggleCategory(c)}
            />
          )}
          <Button className="topMargin" variant="success" onClick={onFilterByCategories}>Filter</Button>
        </Form>
      </Modal>
      <Home
        restaurants={localRestaurants}
        onChangeKeyword={e => setKeyword(e.target.value)}
        onSearch={() => onSearch(filteredRestaurants)}
        onOpenCategories={() => setShowCategories(true)}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  categories: state.categories,
  restaurants: state.restaurants
});

export default connect(mapStateToProps)(HomeContainer);