import config from './config.js'; 
export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL';
export const LOGOUT = 'LOGOUT';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SHOW_ALL_RESTAURANTS = 'SHOW_ALL_RESTAURANTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_CURRENT_RESTAURANT = 'SET_CURRENT_RESTAURANT';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';
export const SET_MONTHLY_CUSTOMERS = 'SET_MONTHLY_CUSTOMERS';
export const SET_MONTHLY_ORDER = 'SET_MONTHLY_ORDER';
export const SET_MONTHLY_ORDERC = 'SET_MONTHLY_ORDERC';
export const SET_MONTHLY_ORDERR = 'SET_MONTHLY_ORDERR';
export const SET_RIDER_STATUS = 'SET_RIDER_STATUS';
export const SET_RIDER_STATS = 'SET_RIDER_STATS';
export const SET_RESTAURANT_NAME = 'SET_RESTAURANT_NAME';
export const SET_FOOD_STATS = 'SET_FOOD_STATS';
export const SET_ORDER_STATS = 'SET_ORDER_STATS';
export const SET_PROMO_STATS = 'SET_PROMO_STATS';
export const SET_ORDER_STATUS = 'SET_ORDER_STATUS';

const authenticate = (username, role, rewardpoints=0, cardnumber=null) => ({
  type: AUTHENTICATE,
  username: username,
  role: role
});

const authenticateFail = failure => ({
  type: AUTHENTICATE_FAIL,
  failure: failure
});

export const logout = () => ({ 
  type: LOGOUT
});

export const signup = (username, password, role) => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/${role.toLowerCase()}/new`, {
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
        if ('errors' in data) {
          return dispatch(authenticateFail('signup'));
        } else {
          return dispatch(authenticate(data.username, role.toLowerCase()));
        }
      });
  }
}

export const login = (username, password, role) => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/${role.toLowerCase()}/login`, {
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
        if ('errors' in data) {
          return dispatch(authenticateFail('login'));
        } else {
          return dispatch(authenticate(data.username, role.toLowerCase()));
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
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/category/`, {
        method: 'GET',
        credentials: 'include',
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
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/restaurant/`, {
        method: 'GET',
        credentials: 'include',
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

export const setProfile = (cardnumber, rewardpoints) => ({
  type: SET_PROFILE,
  cardnumber: cardnumber,
  rewardpoints: rewardpoints
});

export const updateCardnumber = (cardnumber, rewardpoints) => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/customer/updateCard`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cardnumber: cardnumber
        })
      })
      .then(res => res.json())
      .then(data => dispatch(setProfile(data.cardnumber, rewardpoints)));
  }
}

const setCurrentOrder = order => ({
  type: SET_CURRENT_ORDER,
  order: order
});

export const setOrderStatus = status => ({
  type: SET_ORDER_STATUS,
  status: status
});

export const placeOrder = (cart, restaurant, totalPrice, paymentmethod, address, promocode, useRewardPoints) => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/order`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          deliverylocation: address,
          paymentmethod: paymentmethod,
          restaurantname: restaurant,
          foodorder: cart,
          promocode: promocode,
          rewardpoints: useRewardPoints
        })
      })
      .then(res => res.json())
      .then(data => {
        if (!('errors' in data)) {
          dispatch(setCurrentOrder({ cart, restaurant, totalPrice, paymentmethod, address, promocode }));
          dispatch(setOrderStatus('success'));
        } else {
          dispatch(setOrderStatus('fail'));
        }
      });
  }
}

const setMonthlyCustomers = data => ({
  type: SET_MONTHLY_CUSTOMERS,
  monthlyCustomers: data
});

const setMonthlyOrder = data => ({
  type: SET_MONTHLY_ORDER,
  monthlyOrder: data
});

const setMonthlyOrderByC = data => ({
  type: SET_MONTHLY_ORDERC,
  monthlyOrderC: data
});

const setMonthlyOrderByR = data => ({
  type: SET_MONTHLY_ORDERR,
  monthlyOrderR: data
});

export const fetchMonthlyCustomers = () => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/manager/monthlycustomers`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => dispatch(setMonthlyCustomers(data)));
  }
}

export const fetchMonthlyOrder = () => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/manager/monthlyorder`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => dispatch(setMonthlyOrder(data)));
  }
}

export const fetchMonthlyOrderByC = () => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/manager/monthlyorderbycustomer`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => dispatch(setMonthlyOrderByC(data)));
  }
}

export const fetchMonthlyOrderByR = () => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/manager/monthlyorderbyrider`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => dispatch(setMonthlyOrderByR(data)));
  }
}

const setRiderStatus = status => ({
  type: SET_RIDER_STATUS,
  status: status
});

export const fetchRiderStatus = () => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/rider/status`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if ('status' in data) {
          dispatch(setRiderStatus(data.status.riderstatus));
        }
      });
  }
}

export const updateRiderStatus = nextStatus => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/rider/update`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!('errors' in data)) {
          dispatch(setRiderStatus(nextStatus));
        }
      });
  }
}

const setRiderStats = data => ({
  type: SET_RIDER_STATS,
  riderStats: data
});

export const fetchRiderStats = username => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/rider/${username}/stats`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!('errors' in data)) {
          dispatch(setRiderStats(data));
        }
      });
  }
}

const setRestaurantName = rname => ({
  type: SET_RESTAURANT_NAME,
  rname: rname
});

const setFoodStats = stats => ({
  type: SET_FOOD_STATS,
  foodStats: stats
});

const setOrderStats = stats => ({
  type: SET_ORDER_STATS,
  orderStats: stats
});

const setPromoStats = stats => ({
  type: SET_PROMO_STATS,
  promoStats: stats
});

export const fetchRestaurantName = () => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/restaurant/work`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!('errors' in data)) {
          dispatch(setRestaurantName(data.restaurantname));
        }
      });
  }
}

export const fetchFoodStats = rname => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/restaurant/${rname}/foodstats`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!('errors' in data)) {
          dispatch(setFoodStats(data));
        }
      });
  }
}

export const fetchOrderStats = rname => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/restaurant/${rname}/stats`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!('errors' in data)) {
          dispatch(setOrderStats(data));
        }
      });
  }
}

export const fetchPromoStats = rname => {
  return dispatch => {
    return fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/restaurant/${rname}/promostats`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!('errors' in data)) {
          dispatch(setPromoStats(data));
        }
      });
  }
}
