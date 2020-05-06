import React from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';

import { 
  fetchCategories,
  fetchRestaurants,
  fetchMonthlyCustomers,
  fetchMonthlyOrder,
  fetchMonthlyOrderByC,
  fetchMonthlyOrderByR,
  fetchRiderStatus,
  fetchRiderStats,
  fetchRestaurantName,
  logout 
} from './actions';
import Header from './components/Header';

import CartContainer from './containers/CartContainer';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';
import ManagerContainer from './containers/ManagerContainer';
import OrderContainer from './containers/OrderContainer';
import ProfileContainer from './containers/ProfileContainer';
import PromoContainer from './containers/PromoContainer';
import RestaurantContainer from './containers/RestaurantContainer';
import RiderContainer from './containers/RiderContainer';
import SignupContainer from './containers/SignupContainer';
import StaffContainer from './containers/StaffContainer';

class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      if (this.props.user.role === 'customer') {
        this.props.onFetchCategories();
        this.props.onFetchRestaurants();
      } else if (this.props.user.role === 'manager') {
        this.props.onFetchMonthlyCustomers();
        this.props.onFetchMonthlyOrder();
        this.props.onFetchMonthlyOrderByC();
        this.props.onFetchMonthlyOrderByR();
      } else if (this.props.user.role === 'rider') {
        this.props.onFetchRiderStatus();
        this.props.onFetchRiderStats(this.props.user.username);
      } else if (this.props.user.role === 'restaurant') {
        this.props.onFetchRestaurantName();
      }
    }
  }

  render() {
    const { isLoggedIn, user, restaurants, onLogout } = this.props;

    if (!restaurants) {
      return null;
    }

    return (
      <BrowserRouter>
        <div style={{ width: '100%', height: '100%' }}>
          <Header isLoggedIn={isLoggedIn} role={user.role} onLogout={onLogout} />
          <Switch>
            <Route exact path='/' render={() => isLoggedIn 
              ? user.role === 'customer'
                ? <HomeContainer />
                : user.role === 'manager'
                  ? <ManagerContainer />
                  : user.role === 'rider'
                    ? <RiderContainer />
                    : <StaffContainer />
              : <Redirect to='/login' /> } />
            <Route path='/login' component={LoginContainer} />
            <Route path='/signup' component={SignupContainer} />
            {user.role === 'customer' && <Route exact path='/r/:id' component={RestaurantContainer} />}
            {user.role === 'customer' && <Route path='/orders' component={OrderContainer} />}
            {user.role === 'customer' && <Route path='/promotions' component={PromoContainer} />}
            {user.role === 'customer' && <Route path='/cart' component={CartContainer} />}
            {user.role === 'customer' && <Route path='/profile' component={ProfileContainer} />}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
  user: state.user,
  restaurants: state.restaurants
});

const mapDispatchToProps = dispatch => ({
  onFetchCategories: () => {
    dispatch(fetchCategories())
  },
  onFetchRestaurants: () => {
    dispatch(fetchRestaurants())
  },
  onFetchMonthlyCustomers: () => {
    dispatch(fetchMonthlyCustomers())
  },
  onFetchMonthlyOrder: () => {
    dispatch(fetchMonthlyOrder())
  },
  onFetchMonthlyOrderByC: () => {
    dispatch(fetchMonthlyOrderByC())
  },
  onFetchMonthlyOrderByR: () => {
    dispatch(fetchMonthlyOrderByR())
  },
  onFetchRiderStatus: () => {
    dispatch(fetchRiderStatus())
  },
  onFetchRiderStats: username => {
    dispatch(fetchRiderStats(username))
  },
  onFetchRestaurantName: () => {
    dispatch(fetchRestaurantName())
  },
  onLogout: () => {
    dispatch(logout())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
