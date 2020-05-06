import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  AUTHENTICATE,
  AUTHENTICATE_FAIL,
  LOGOUT,
  SET_CATEGORIES,
  SHOW_ALL_RESTAURANTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SET_CURRENT_RESTAURANT,
  SET_PROFILE,
  SET_CURRENT_ORDER,
  SET_MONTHLY_CUSTOMERS,
  SET_MONTHLY_ORDER,
  SET_MONTHLY_ORDERC,
  SET_MONTHLY_ORDERR,
  SET_RIDER_STATUS,
  SET_RIDER_STATS,
  SET_RESTAURANT_NAME,
  SET_FOOD_STATS,
  SET_ORDER_STATS,
  SET_PROMO_STATS
} from './actions';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['isLoggedIn', 'user', 'categories', 'restaurants', 'cart', 'currentRestaurant']
    //'monthlyCustomers', 'monthlyOrder', 'monthlyOrderC', 'monthlyOrderR', 'status']
}

const initialState = {
  isLoggedIn: false,
  authenticateFail: '',
  user: {},
  categories: [],
  restaurants: [],
  cart: {},
  currentRestaurant: '',
  monthlyCustomers: [],
  monthlyOrder: [],
  monthlyOrderC: [],
  monthlyOrderR: [],
  riderStats: [],
  foodStats: [],
  orderStats: [],
  promoStats: []
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isLoggedIn: true,
        authenticateFail: '',
        user: {
          username: action.username,
          role: action.role
        }
      };
    case AUTHENTICATE_FAIL:
      return {
        ...state,
        authenticateFail: action.failure
      };
    case LOGOUT:
      let newState = state;
      if ('rname' in newState) {
        delete newState.rname;
      }
      return {
        ...newState,
        isLoggedIn: false,
        user: {},
        cart: {},
        currentRestaurant: ''
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    case SHOW_ALL_RESTAURANTS:
      return {
        ...state,
        restaurants: action.restaurants
      };
    case ADD_TO_CART:
      const name = action.itemName;
      const quantity_add = name in state.cart ? state.cart[name].quantity + 1 : 1;
      return {
        ...state,
        cart: {
          ...state.cart,
          [name]: {
            quantity: quantity_add,
            base_price: action.itemPrice
          }
        }
      };
    case REMOVE_FROM_CART:
      const quantity_remove = state.cart[action.itemName].quantity;
      const price = state.cart[action.itemName].base_price;
      if (quantity_remove === 1) {
        const {[action.itemName]: _, ...others} = state.cart;
        if (Object.keys(others).length === 0) {
          return {
              ...state,
              cart: others,
              currentRestaurant: ''
          };
        }
        return {
          ...state,
          cart: others
        };
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            [action.itemName]: {
              quantity: quantity_remove - 1,
              base_price: price
            }
          }
        };
      }
    case CLEAR_CART:
      return {
        ...state,
        cart: {},
        currentRestaurant: ''
      };
    case SET_CURRENT_RESTAURANT:
      return {
        ...state,
        currentRestaurant: action.restaurant
      };
    case SET_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          cardnumber: action.cardnumber,
          rewardpoints: action.rewardpoints
        }
      };
    case SET_CURRENT_ORDER:
      return {
        ...state,
        cart: {},
        currentRestaurant: ''
      };
    case SET_MONTHLY_CUSTOMERS:
      return {
        ...state,
        monthlyCustomers: action.monthlyCustomers
      };
    case SET_MONTHLY_ORDER:
      return {
        ...state,
        monthlyOrder: action.monthlyOrder
      };
    case SET_MONTHLY_ORDERC:
      return {
        ...state,
        monthlyOrderC: action.monthlyOrderC
      };
    case SET_MONTHLY_ORDERR:
      return {
        ...state,
        monthlyOrderR: action.monthlyOrderR
      };
    case SET_RIDER_STATUS:
      return {
        ...state,
        status: action.status
      };
    case SET_RIDER_STATS:
      return {
        ...state,
        riderStats: action.riderStats
      };
    case SET_RESTAURANT_NAME:
      return {
        ...state,
        rname: action.rname
      };
    case SET_FOOD_STATS:
      return {
        ...state,
        foodStats: action.foodStats
      };
    case SET_ORDER_STATS:
      return {
        ...state,
        orderStats: action.orderStats
      };
    case SET_PROMO_STATS:
      return {
        ...state,
        promoStats: action.promoStats
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducers);