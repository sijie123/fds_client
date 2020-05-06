import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import OrderCard from '../components/OrderCard';

import config from "../config";

const OrderContainer = () => {
  const [orders, setOrders] = useState([]);
  const [isOrdersFetched, setIsOrdersFetched] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [review, setReview] = useState({ deliveryrating: null, foodreview: [] });
  const [foods, setFoods] = useState([]);
  const [reviewId, setReviewId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!isOrdersFetched) {
      fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/order`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.orders !== null && data.orders !== undefined) {
          setOrders(data.orders);
          setIsOrdersFetched(true);
        }
      });
    }
  });

  const onReview = (event, id, items) => {
    event.preventDefault();
    setReviewId(id);
    setFoods(items);
    setShowReview(true);
  };

  const onUpdateReview = (type, food, value) => {
    if (type === 'delivery') {
      setReview({ ...review, deliveryrating: value });
    } else if (type === 'foodrating') {
      let _review = review;
      let isFound = false;
      for (let i = 0; i < _review.foodreview.length; i++) {
        if (_review.foodreview[i].foodname === food) {
          isFound = true;
          _review.foodreview[i].rating = value;
          break;
        }
      }

      if (!isFound) {
        _review.foodreview.push({ foodname: food, rating: value, content: "" });
      }
      setReview(_review);
    } else if (type === 'foodreview') {
      let _review = review;
      let isFound = false;
      for (let i = 0; i < _review.foodreview.length; i++) {
        if (_review.foodreview[i].foodname === food) {
          isFound = true;
          _review.foodreview[i].content = value;
          break;
        }
      }

      if (!isFound) {
        _review.foodreview.push({ foodname: food, rating: null, content: value });
      }
      setReview(_review);
    }
  };

  const onSubmitReview = () => {
    fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/order/review`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderid: reviewId,
        ...review
      })
    })
    .then(res => res.json())
    .then(data => {
      if ('errors' in data) {
        setShowAlert(true);
      }
      onCancel();
    });
  };

  const onCancel = () => {
    setShowReview(false);
    setReview({ deliveryrating: null, foodreview: [] });
    setFoods([]);
    setReviewId(null);
  };

  return (
    <div className="page">
      <Modal show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header className="errorModal" closeButton>
          Fail To Submit Review!<br /><br />
          You can only review once.
        </Modal.Header>
      </Modal>
      <Modal centered show={showReview} backdrop="static">
        <Modal.Header className="updateModal">Review</Modal.Header>
        <Form className="allMargin">
          <p><strong>Rate your delivery rider:</strong></p>
          <Form.Control as="select" onChange={e => onUpdateReview('delivery', '', e.target.value)}>
            <option value={null} style={{ color: 'grey' }}>Select rating...</option>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </Form.Control>
          <br /><br />
          <p><strong>Rate your food order:</strong></p>
          {foods.map(f => 
            <Form.Group key={'foodreview_' + f}>
              <p>{f}</p>
              <Form.Control as="select" onChange={e => onUpdateReview('foodrating', f, e.target.value)}>
                <option value={null} style={{ color: 'grey' }}>Select rating...</option>
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
              </Form.Control>
              <br />
              <Form.Control as="textarea" placeholder="Write your review..." onChange={e => onUpdateReview('foodreview', f, e.target.value)} />
            </Form.Group>  
          )}
          <Button className="topMargin" variant="success" onClick={onSubmitReview}>Submit</Button>
          <Button className="topMargin leftMargin" variant="danger" onClick={onCancel}>Cancel</Button>
        </Form>
      </Modal>
      <h1 className="allMargin">Orders</h1>
      {orders.map(o =>
        <OrderCard
          id={o.id}
          key={`ordercard_${o.id}`}
          restaurant={o.array_agg[0][0]}
          totalcost={parseFloat(o.totalcost.slice(1)) + parseFloat(o.deliveryfee.slice(1))}
          items={o.array_agg.map(a => a[1])}
          time={o.creation.slice(0, 10) + ' ' + o.creation.slice(11, 16)}
          onReview={onReview}
        />
      )}
    </div>
  );
};

export default OrderContainer;