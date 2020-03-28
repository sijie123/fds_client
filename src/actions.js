export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL';
export const LOGOUT = 'LOGOUT';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SHOW_ALL_RESTAURANTS = 'SHOW_ALL_RESTAURANTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_CURRENT_RESTAURANT = 'SET_CURRENT_RESTAURANT';

const authenticate = username => ({
  type: AUTHENTICATE,
  username: username
});

const authenticateFail = () => ({
  type: AUTHENTICATE_FAIL
});

export const logout = () => ({ 
  type: LOGOUT
});

export const signup = (username, password) => {
  return dispatch => {
    return fetch('http://54.169.81.205:3001/customer/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(res => res.json())
      .then(data => {
        if ("errors" in data) {
          return dispatch(authenticateFail());
        } else {
          return dispatch(authenticate(data.username));
        }
      });
  }
}

export const login = (username, password) => {
  return dispatch => {
    return fetch('http://54.169.81.205:3001/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(res => res.json())
      .then(data => {
        if ("errors" in data) {
          return dispatch(authenticateFail());
        } else {
          return dispatch(authenticate(data.username));
        }
      });
  }
}

const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories: categories
});

export const fetchCategories = () => {
  return dispatch => {
    return fetch('http://54.169.81.205:3001/category/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => data.categories.map(c => c.cname))
      .then(categories => dispatch(setCategories(categories)));
  }
}

const showAllRestaurants = restaurants => ({
  type: SHOW_ALL_RESTAURANTS,
  restaurants: restaurants
});

export const fetchRestaurants = () => {
  return dispatch => {
    return fetch('http://54.169.81.205:3001/restaurant/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => dispatch(showAllRestaurants(data.restaurants)));
  }
}

export const addToCart = item => ({
  type: ADD_TO_CART,
  item: item,
});

export const removeFromCart = item => ({
  type: REMOVE_FROM_CART,
  item: item
});

export const clearCart = () => ({
  type: CLEAR_CART
});

export const setCurrentRestaurant = restaurant => ({
  type: SET_CURRENT_RESTAURANT,
  restaurant: restaurant
});
