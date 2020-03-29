export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL';
export const LOGOUT = 'LOGOUT';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SHOW_ALL_RESTAURANTS = 'SHOW_ALL_RESTAURANTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_CURRENT_RESTAURANT = 'SET_CURRENT_RESTAURANT';
export const SET_CARDNUMBER = 'SET_CARDNUMBER';
export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';

const authenticate = (username, rewardpoints=0, cardnumber=null) => ({
  type: AUTHENTICATE,
  username: username,
  rewardpoints: rewardpoints,
  cardnumber: cardnumber
});

const authenticateFail = failure => ({
  type: AUTHENTICATE_FAIL,
  failure: failure
});

export const logout = () => ({ 
  type: LOGOUT
});

export const signup = (username, password) => {
  return dispatch => {
    return fetch('http://54.169.81.205:3001/customer/new', {
        method: 'POST',
        credentials: 'include',
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
          return dispatch(authenticateFail('signup'));
        } else {
          return dispatch(authenticate(data.username));
        }
      });
  }
}

export const login = (username, password) => {
  return dispatch => {
    return fetch('http://54.169.81.205:3001/customer/testlogin', {
        method: 'POST',
        credentials: 'include',
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
          return dispatch(authenticateFail('login'));
        } else {
          return dispatch(authenticate(data.username, data.rewardpoints, data.cardnumber));
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

export const addToCart = (itemName, itemPrice) => ({
  type: ADD_TO_CART,
  itemName: itemName,
  itemPrice: itemPrice
});

export const removeFromCart = itemName => ({
  type: REMOVE_FROM_CART,
  itemName: itemName
});

export const clearCart = () => ({
  type: CLEAR_CART
});

export const setCurrentRestaurant = restaurant => ({
  type: SET_CURRENT_RESTAURANT,
  restaurant: restaurant
});

const setCardnumber = cardnumber => ({
  type: SET_CARDNUMBER,
  cardnumber: cardnumber
});

export const updateCardnumber = (username, cardnumber) => {
  return dispatch => {
    return fetch('http://54.169.81.205:3001/customer/testcard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          cardnumber: cardnumber
        })
      })
      .then(res => res.json())
      .then(data => dispatch(setCardnumber(data.cardnumber)));
  }
}

const setCurrentOrder = order => ({
  type: SET_CURRENT_ORDER,
  order: order
});

export const placeOrder = (cart, restaurant, totalPrice, paymentmethod, address) => {
  return dispatch => {
    return fetch('http://54.169.81.205:3001/order', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          deliverylocation: address,
          paymentmethod: paymentmethod,
          restaurantname: restaurant,
          foodorder: cart
        })
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(() => dispatch(setCurrentOrder({ cart, restaurant, totalPrice, paymentmethod, address })));
  }
}
