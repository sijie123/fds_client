import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';

import { setProfile, updateCardnumber } from '../actions';

import Profile from '../components/Profile';

import config from "../config.js";

const ProfileContainer = ({ username, rewardpoints, cardnumber, onSetProfile, onUpdateCardnumber }) => {
  const [isInfoFetched, setIsInfoFetched] = useState(false);
  const [showCardUpdate, setShowCardUpdate] = useState(false);
  const [newCardnumber, setNewCardnumber] = useState('');
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (!isInfoFetched) {
      fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/customer/info`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data !== null && data !== undefined) {
          onSetProfile(data.cardnumber, data.rewardpoints);
          setIsInfoFetched(true);
        }
      });
    }
  });

  const onSetCardnumber = event => {
    if (newCardnumber.length === 16 && !isNaN(newCardnumber)) {
      setShowCardUpdate(false);
      onUpdateCardnumber(event, newCardnumber, rewardpoints);
    } else {
      setError(true);
      setNewCardnumber('');
    }
  }

  const onCancel = () => {
    setNewCardnumber('');
    setShowCardUpdate(false);
  }

  return (
    <div>
      <Modal centered show={showCardUpdate} backdrop="static">
        <Modal.Header className="updateModal">Update Card Information</Modal.Header>
        <Form className="allMargin">
          <Form.Control type="cardnumber" defaultValue={cardnumber ? cardnumber : ''} onChange={e => setNewCardnumber(e.target.value)} />
          {isError ? <p className="authenticateFailure">Error: Invalid card number</p> : null}
          <Button className="topMargin" variant="success" onClick={onSetCardnumber}>Update</Button>
          <Button className="topMargin leftMargin" variant="danger" onClick={onCancel}>Cancel</Button>
        </Form>
      </Modal>
      <Profile username={username} rewardpoints={rewardpoints} cardnumber={cardnumber} onUpdateCard={() => setShowCardUpdate(true)} />
    </div>
  );
};

const mapStateToProps = state => ({
  username: state.user.username,
  rewardpoints: state.user.rewardpoints,
  cardnumber: state.user.cardnumber
});

const mapDispatchToProps = dispatch => ({
  onUpdateCardnumber: (event, cardnumber, rewardpoints) => {
    event.preventDefault();
    dispatch(updateCardnumber(cardnumber, rewardpoints));
  },
  onSetProfile: (cardnumber, rewardpoints) => {
    dispatch(setProfile(cardnumber, rewardpoints));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);