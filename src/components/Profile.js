import React from 'react';
import { Button } from 'react-bootstrap';

import '../stylesheets/style.css';

const Profile = ({ username, rewardpoints, cardnumber, onUpdateCard }) => (
  <div className="page">
    <h1 className="allMargin">Profile</h1>
    <h5 className="allMargin">Name: {username}</h5>
    <h5 className="allMargin">Reward: {rewardpoints} points</h5>
    <h5 className="allMargin">Credit Card: {cardnumber ? cardnumber : "not set"}</h5>
    <Button className="horizontalMargin" variant="success" type="submit" onClick={onUpdateCard}>
      Update Card
    </Button>
  </div>
);

export default Profile;