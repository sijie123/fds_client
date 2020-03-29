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
  SET_CARDNUMBER,
  SET_CURRENT_ORDER
} from './actions';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['isLoggedIn', 'user', 'categories', 'restaurants', 'cart', 'currentRestaurant', 'order']
}

const initialState = {
  isLoggedIn: false,
  authenticateFail: '',
  user: {},
  categories: [],
  restaurants: [],
  cart: {},
  currentRestaurant: ''
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
          rewardpoints: action.rewardpoints,
          cardnumber: action.cardnumber
        }
      };
    case AUTHENTICATE_FAIL:
      return {
        ...state,
        authenticateFail: action.failure
      };
    case LOGOUT:
      return {
        ...state,
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
        const {[action.itemName]: { quantity: quantity_remove, base_price: price }, ...others} = state.cart;
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
    case SET_CARDNUMBER:
      return {
        ...state,
        user: {
          ...state.user,
          cardnumber: action.cardnumber
        }
      };
    case SET_CURRENT_ORDER:
      return {
        ...state,
        cart: {},
        currentRestaurant: '',
        order: action.order
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducers);