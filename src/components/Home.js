import React from 'react';

import RestaurantCard from './RestaurantCard';

const Home = ({ data }) => (
  <div className="page home">
    {data.map((d, key) => <RestaurantCard key={key} restaurant={d} />)}
  </div>
);

export default Home;
