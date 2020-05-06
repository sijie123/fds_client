import React, { useState } from 'react';
import { connect } from 'react-redux';

import Manager from '../components/Manager';

const ManagerContainer = ({ monthlyCustomers, monthlyOrder, monthlyOrderByCustomer, monthlyOrderByRider }) => {
  const [month, setMonth] = useState(1);
  const [customer, setCustomer] = useState('');
  const [rider, setRider] = useState('');
  const [isError, setError] = useState(false);
  const [stats, setStats] = useState(null);

  const onGetStats = () => {
    let _stats = null;
    setError(false);
    if (customer !== '' && rider !== '') {
      setError(true);
    } else if (customer !== '') {
      for (let i = 0; i < monthlyOrderByCustomer.length; i++) {
        if (monthlyOrderByCustomer[i].customername === customer && monthlyOrderByCustomer[i].month === month) {
          _stats = monthlyOrderByCustomer[i];
          break;
        }
      }
    } else if (rider !== '') {
      for (let i = 0; i < monthlyOrderByRider.length; i++) {
        if (monthlyOrderByRider[i].ridername === rider && monthlyOrderByRider[i].month === month) {
          _stats = monthlyOrderByRider[i];
          break;
        }
      }
    } else {
      for (let i = 0; i < monthlyOrder.length; i++) {
        if (monthlyOrder[i].month === month) {
          _stats = monthlyOrder[i];
          break;
        }
      }

      for (let j = 0; j < monthlyCustomers.length; j++) {
        if (monthlyCustomers[j].month === month) {
          _stats = Object.assign(_stats, monthlyCustomers[j]);
          break;
        }
      }
    }

    setStats(_stats);
  }

  return (
    <div className="page">
      <h1 className="allMargin">Statistics</h1>
      <Manager
        stats={stats}
        months={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        customers={Array.from(new Set(monthlyOrderByCustomer.map(m => m.customername)))}
        riders={Array.from(new Set(monthlyOrderByRider.map(m => m.ridername)))}
        isError={isError}
        onSetMonth={e => setMonth(e.target.value === "" ? null : parseInt(e.target.value))}
        onSetCustomer={e => setCustomer(e.target.value)}
        onSetRider={e => setRider(e.target.value)}
        onGetStats={onGetStats}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  monthlyCustomers: state.monthlyCustomers,
  monthlyOrder: state.monthlyOrder,
  monthlyOrderByCustomer: state.monthlyOrderC,
  monthlyOrderByRider: state.monthlyOrderR
});

export default connect(mapStateToProps)(ManagerContainer);