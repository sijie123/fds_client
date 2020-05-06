import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';

import { updateRiderStatus } from '../actions';

const RiderContainer = ({ status, riderStats, onUpdateRiderStatus }) => {
  const [month, setMonth] = useState(1);
  const [stats, setStats] = useState(null);

  const onGetStats = () => {
    let _stats = null;
    for (let i = 0; i < riderStats.length; i++) {
      if (riderStats[i].month === month) {
        _stats = riderStats[i];
        break;
      }
    }
    setStats(_stats);
  }

  return (
    <div className="page">
      {status === 'none' &&
        <div>
          <h1 className="allMargin">Current Order</h1>
          {status === 'none' &&
            <Button className="horizontalMargin" variant="danger" type="submit" onClick={() => onUpdateRiderStatus('arrival')}>
              Departing To Restaurant
            </Button>
          }
          {status === 'arrival' &&
            <Button className="horizontalMargin" variant="danger" type="submit" onClick={() => onUpdateRiderStatus('collection')}>
              Arrived At Restaurant
            </Button>
          }
          {status === 'collection' &&
            <Button className="horizontalMargin" variant="danger" type="submit" onClick={() => onUpdateRiderStatus('delivery')}>
              Collected Order From Restaurant
            </Button>
          }
          {status === 'delivery' &&
            <Button className="horizontalMargin" variant="danger" type="submit" onClick={() => onUpdateRiderStatus('none')}>
              Delivered Order To Customer
            </Button>
          }
        </div>
      }
      <h1 className="allMargin">Statistics</h1>
      <Form className="noTopMargin">
        <h5>Month:</h5>
        <Form.Group>
          <Form.Control as="select" onChange={e => setMonth(e.target.value === "" ? null : parseInt(e.target.value))}>
            <option style={{ color: 'grey' }} value="">Select month...</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(o => <option key={`month_${o}`}>{o}</option>)}
          </Form.Control>
        </Form.Group>
        <Button className="topMargin" variant="success"  onClick={onGetStats}>
          Get Statistics
        </Button>
      </Form>
      {stats !== null && stats.hasOwnProperty('countorders') ? <p className="horizontalMargin"><strong>Total Orders Delivered:</strong> {stats.countorders}</p> : null}
      {stats !== null && stats.hasOwnProperty('suminterval') ? <p className="horizontalMargin"><strong>Total Hours Worked:</strong> {stats.suminterval}</p> : null}
      {stats !== null && stats.hasOwnProperty('salary') ? <p className="horizontalMargin"><strong>Total Salary:</strong> {stats.salary}</p> : null}
      {stats !== null && stats.hasOwnProperty('avginterval') ? <p className="horizontalMargin"><strong>Average Delivery Time:</strong> {stats.avginterval}</p> : null}
      {stats !== null && stats.hasOwnProperty('sumrating') ? <p className="horizontalMargin"><strong>Number of Ratings Received:</strong> {stats.sumrating}</p> : null}
      {stats !== null && stats.hasOwnProperty('avgrating') ? <p className="horizontalMargin"><strong>Average Rating:</strong> {stats.avgrating}</p> : null}
    </div>
  );
};

const mapStateToProps = state => ({
  status: state.status,
  riderStats: state.riderStats
});

const mapDispatchToProps = dispatch => ({
  onUpdateRiderStatus: nextStatus => {
    dispatch(updateRiderStatus(nextStatus));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RiderContainer);