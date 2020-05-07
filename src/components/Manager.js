import React from 'react';
import { Button, Form } from 'react-bootstrap';

import '../stylesheets/style.css';

const Manager = ({ stats, months, customers, riders, isError, onSetMonth, onSetCustomer, onSetRider, onGetStats }) => (
  <div>
    <Form className="noTopMargin">
      <div className="horizontalCard">
        <div className="horizontalCardBody rightMargin">
          <h5>Month:</h5>
          <Form.Group>
            <Form.Control as="select" onChange={onSetMonth}>
              <option style={{ color: 'grey' }} value="">Select month...</option>
              {months.map(o => <option key={`month_${o}`}>{o}</option>)}
            </Form.Control>
          </Form.Group>
        </div>
        <div className="horizontalCardBody rightMargin">
          <h5>Customer:</h5>
          <Form.Group>
            <Form.Control as="select" onChange={onSetCustomer}>
              <option style={{ color: 'grey' }} value="">Select customer...</option>
              {customers.map(o => <option key={`customer_${o}`}>{o}</option>)}
            </Form.Control>
          </Form.Group>
        </div>
        <div className="horizontalCardBody rightMargin">
          <h5>Rider:</h5>
          <Form.Group>
            <Form.Control as="select" onChange={onSetRider}>
              <option style={{ color: 'grey' }} value="">Select rider...</option>
              {riders.map(o => <option key={`rider_${o}`}>{o}</option>)}
            </Form.Control>
          </Form.Group>
        </div>
      </div>
      {isError ? <p className="authenticateFailure">Error: Select either customer or rider only</p> : null}
      <Button className="topMargin" variant="success"  onClick={onGetStats}>
        Get Statistics
      </Button>
    </Form>
    {stats !== null && stats.hasOwnProperty('count') ? <p className="horizontalMargin"><strong>New Customers:</strong> {stats.count}</p> : null}
    {stats !== null && stats.hasOwnProperty('ordercount') ? <p className="horizontalMargin"><strong>Total Orders:</strong> {stats.ordercount}</p> : null}
    {stats !== null && stats.hasOwnProperty('revenue') ? <p className="horizontalMargin"><strong>Total Revenue:</strong> {stats.revenue}</p> : null}
    {stats !== null && stats.hasOwnProperty('countorders') ? <p className="horizontalMargin"><strong>Total Orders Delivered:</strong> {stats.countorders}</p> : null}
    {stats !== null && stats.hasOwnProperty('suminterval') ? <p className="horizontalMargin"><strong>Total Hours Worked:</strong> {stats.suminterval}</p> : null}
    {stats !== null && stats.hasOwnProperty('salary') ? <p className="horizontalMargin"><strong>Total Salary:</strong> {stats.salary}</p> : null}
    {stats !== null && stats.hasOwnProperty('avginterval') ? <p className="horizontalMargin"><strong>Average Delivery Time:</strong> {stats.avginterval}</p> : null}
    {stats !== null && stats.hasOwnProperty('countrating') ? <p className="horizontalMargin"><strong>Number of Ratings Received:</strong> {stats.countrating}</p> : null}
    {stats !== null && stats.hasOwnProperty('avgrating') ? <p className="horizontalMargin"><strong>Average Rating:</strong> {stats.avgrating}</p> : null}
  </div>
);

export default Manager;