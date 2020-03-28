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
  SET_CURRENT_RESTAURANT
} from './actions';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['isLoggedIn', 'categories', 'restaurants', 'cart', 'currentRestaurant']
}

const initialState = {
  isLoggedIn: false,
  isAuthenticateFail: false,
  categories: [],
  restaurants: [],
  cart: {},
  currentRestaurant: ''
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isLoggedIn: true,
        isAuthenticateFail: false,
        username: action.username
      };
    case AUTHENTICATE_FAIL:
      return {
        ...state,
        isAuthenticateFail: true
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false
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
      const name = action.item;
      const quantity_add = name in state.cart ? state.cart[name] + 1 : 1;
      return {
        ...state,
        cart: {
          ...state.cart,
          [name]: quantity_add
        }
      };
    case REMOVE_FROM_CART:
      const quantity_remove = state.cart[action.item];
      if (quantity_remove === 1) {
        const {[action.item]: quantity_remove, ...others} = state.cart;
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
            [action.item]: quantity_remove - 1
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
    default:
      return state;
  }
};

const reducers = authentication;

export default persistReducer(persistConfig, reducers);