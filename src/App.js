import React from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCategories, fetchRestaurants, logout } from './actions';
import Header from './components/Header';

import CartContainer from './containers/CartContainer';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';
import RestaurantContainer from './containers/RestaurantContainer';
import SignupContainer from './containers/SignupContainer';

class App extends React.Component {
  componentDidMount() {
    this.props.onFetchCategories();
    this.props.onFetchRestaurants();
  }

  render() {
    const { isLoggedIn, restaurants, onLogout } = this.props;

    if (!restaurants) {
      return null;
    }

    return (
      <BrowserRouter>
        <div style={{ width: '100%', height: '100%' }}>
          <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
          <Switch>
            <Route exact path='/' render={() => isLoggedIn ? <HomeContainer /> : <Redirect to='/login' /> } />
            <Route path='/login' component={LoginContainer} />
            <Route path='/signup' component={SignupContainer} />
            <Route exact path='/r/:id' component={RestaurantContainer} />
            <Route path='/cart' component={CartContainer} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
  restaurants: state.restaurants
});

const mapDispatchToProps = dispatch => ({
  onFetchCategories: () => {
    dispatch(fetchCategories())
  },
  onFetchRestaurants: () => {
    dispatch(fetchRestaurants())
  },
  onLogout: () => {
    dispatch(logout())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
