import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';

import { fetchOrderStats, fetchFoodStats, fetchPromoStats } from '../actions';

const StaffContainer = ({ rname, foodStats, orderStats, promoStats, onFetchFoodStats, onFetchOrderStats, onFetchPromoStats }) => {
  const [isStatsFetched, setIsStatsFetched] = useState(false);
  const [month, setMonth] = useState(1);
  const [monthlyFoodStats, setFoodStats] = useState([]);
  const [monthlyOrderStats, setOrderStats] = useState(null);
  const [promo, setPromo] = useState('');
  const [monthlyPromoStats, setPromoStats] = useState(null);

  useEffect(() => {
    if (!isStatsFetched && rname !== undefined) {
      onFetchFoodStats(rname);
      onFetchOrderStats(rname);
      onFetchPromoStats(rname);
      setIsStatsFetched(true);
    }
  }, [isStatsFetched, rname, onFetchFoodStats, onFetchOrderStats, onFetchPromoStats]);

  const onGetMonthlyStats = () => {
    let _foodStats = [];
    let _orderStats = null;

    for (let i = 0; i < foodStats.length; i++) {
      if (foodStats[i].month === month) {
        _foodStats.push(foodStats[i]);
      }
    }

    for (let j = 0; j < orderStats.length; j++) {
      if (orderStats[j].month === month) {
        _orderStats = orderStats[j];
        break;
      }
    }

    setFoodStats(_foodStats);
    setOrderStats(_orderStats);
  }

  const onGetPromoStats = () => {
    let _promoStats = null;
    for (let j = 0; j < promoStats.length; j++) {
      if (promoStats[j].code === promo) {
        _promoStats = promoStats[j];
        break;
      }
    }
    setPromoStats(_promoStats);
  }

  return (
    <div className="page">
      <h1 className="allMargin">Order Statistics</h1>
      <Form className="noTopMargin">
        <h5>Month:</h5>
        <Form.Group>
          <Form.Control as="select" onChange={e => setMonth(e.target.value === "" ? null : parseInt(e.target.value))}>
            <option style={{ color: 'grey' }} value="">Select month...</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(o => <option key={`month_${o}`}>{o}</option>)}
          </Form.Control>
        </Form.Group>
        <Button className="topMargin" variant="success" onClick={onGetMonthlyStats}>
          Get Order Statistics
        </Button>
      </Form>
      {monthlyOrderStats !== null && monthlyOrderStats.hasOwnProperty('ordercount') ? <p className="horizontalMargin"><strong>Total Orders:</strong> {monthlyOrderStats.ordercount}</p> : null}
      {monthlyOrderStats !== null && monthlyOrderStats.hasOwnProperty('revenue') ? <p className="horizontalMargin"><strong>Total Revenue:</strong> {monthlyOrderStats.revenue}</p> : null}
      {monthlyFoodStats.length > 0 && <p className="horizontalMargin"><strong>Most Popular Items:</strong></p>}
      {monthlyFoodStats.map(f => <p key={f.foodname + f.totalqty} className="horizontalMargin">{`- ${f.foodname} (${f.totalqty} pcs)`}</p>)}
      
      <h1 className="allMargin">Promotion Statistics</h1>
      <Form className="noTopMargin">
        <h5>Promotion:</h5>
        <Form.Group>
          <Form.Control as="select" onChange={e => setPromo(e.target.value === "" ? null : e.target.value)}>
            <option style={{ color: 'grey' }} value="">Select promotion...</option>
            {promoStats.map(o => <option key={`promo_${o.code}`}>{o.code}</option>)}
          </Form.Control>
        </Form.Group>
        <Button className="topMargin" variant="success" onClick={onGetPromoStats}>
          Get Promotion Statistics
        </Button>
      </Form>
      {monthlyPromoStats !== null && monthlyPromoStats.hasOwnProperty('runtime') && monthlyPromoStats.runtime.hasOwnProperty('months') ? <p className="horizontalMargin"><strong>Duration:</strong> {monthlyPromoStats.runtime.months * 30} days</p> : null}
      {monthlyPromoStats !== null && monthlyPromoStats.hasOwnProperty('usecount')
        ? <p className="horizontalMargin"><strong>Use Count:</strong> {monthlyPromoStats.usecount}</p>
        : null
      }
      {monthlyPromoStats !== null && monthlyPromoStats.hasOwnProperty('runtime') && monthlyPromoStats.runtime.hasOwnProperty('months') && monthlyPromoStats.hasOwnProperty('usecount')
        ? <p className="horizontalMargin"><strong>Average Order:</strong> {monthlyPromoStats.usecount / (monthlyPromoStats.runtime.months * 30)}</p>
        : null
      }
    </div>
  );
};

const mapStateToProps = state => ({
  rname: state.rname,
  foodStats: state.foodStats,
  orderStats: state.orderStats,
  promoStats: state.promoStats
});

const mapDispatchToProps = dispatch => ({
  onFetchFoodStats: rname => {
    dispatch(fetchFoodStats(rname));
  },
  onFetchOrderStats: rname => {
    dispatch(fetchOrderStats(rname));
  },
  onFetchPromoStats: rname => {
    dispatch(fetchPromoStats(rname));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StaffContainer);