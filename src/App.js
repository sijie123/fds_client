import React from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from './actions';
import Header from './components/Header';
import Home from './components/Home';
import Restaurant from './components/Restaurant';

import LoginContainer from './containers/LoginContainer';
import SignupContainer from './containers/SignupContainer';

const data = [
  { id: 0, 
    title: "ABC RESTAURANT", 
    img: require("./images/test.jpeg"), 
    category: ["halal", "lunch", "fast food"], 
    rating: 4.5, 
    menu: [{ name: "Food A", price: 5, img: require("./images/test.jpeg") }, { name: "Food B", price: 3, img: require("./images/test.jpeg") }] 
  },
  { id: 1, 
    title: "DE RESTAURANT", 
    img: require("./images/test.jpeg"), 
    category: ["halal", "lunch", "fast food"], 
    rating: 4.5, 
    menu: [{ name: "Food A", price: 5, img: require("./images/test.jpeg") }, { name: "Food B", price: 3, img: require("./images/test.jpeg") }] 
  },
  { id: 2, 
    title: "F RESTAURANT", 
    img: require("./images/test.jpeg"), 
    category: ["halal", "lunch", "fast food"], 
    rating: 4.5, 
    menu: [{ name: "Food A", price: 5, img: require("./images/test.jpeg") }, { name: "Food B", price: 3, img: require("./images/test.jpeg") }] 
  },
  { id: 3, 
    title: "GHI RESTAURANT", 
    img: require("./images/test.jpeg"), 
    category: ["halal", "lunch", "fast food"], 
    rating: 4.5, 
    menu: [{ name: "Food A", price: 5, img: require("./images/test.jpeg") }, { name: "Food B", price: 3, img: require("./images/test.jpeg") }] 
  },
  { id: 4, 
    title: "JK RESTAURANT", 
    img: require("./images/test.jpeg"), 
    category: ["halal", "lunch", "fast food"], 
    rating: 4.5, 
    menu: [{ name: "Food A", price: 5, img: require("./images/test.jpeg") }, { name: "Food B", price: 3, img: require("./images/test.jpeg") }] 
  },
  { id: 5, 
    title: "L RESTAURANT", 
    img: require("./images/test.jpeg"), 
    category: ["halal", "lunch", "fast food"], 
    rating: 4.5, 
    menu: [{ name: "Food A", price: 5, img: require("./images/test.jpeg") }, { name: "Food B", price: 3, img: require("./images/test.jpeg") }] 
  },
  { id: 6, 
    title: "M RESTAURANT", 
    img: require("./images/test.jpeg"), 
    category: ["halal", "lunch", "fast food"], 
    rating: 4.5, 
    menu: [{ name: "Food A", price: 5, img: require("./images/test.jpeg") }, { name: "Food B", price: 3, img: require("./images/test.jpeg") }] 
  },
  { id: 7, 
    title: "NO RESTAURANT", 
    img: require("./images/test.jpeg"), 
    category: ["halal", "lunch", "fast food"], 
    rating: 4.5, 
    menu: [{ name: "Food A", price: 5, img: require("./images/test.jpeg") }, { name: "Food B", price: 3, img: require("./images/test.jpeg") }] 
  },
];

const App = ({ isLoggedIn, onLogout }) => {
  return (
    <BrowserRouter>
      <div style={{ width: '100%', height: '100%' }}>
        <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
        <Switch>
          <Route exact path='/' render={() => isLoggedIn ? <Home data={data} /> : <Redirect to='/login' /> } />
          <Route path='/login' render={() => <LoginContainer />} />
          <Route path='/signup' render={() => <SignupContainer  />} />
          {isLoggedIn 
            ? data.map((d, key) => <Route key={'route_r' + key} exact path={'/r' + key} render={() => <Restaurant restaurant={d} /> } />)
            : null
          }
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(logout())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
