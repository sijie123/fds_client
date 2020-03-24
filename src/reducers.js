import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  AUTHENTICATE,
  LOGOUT
} from './actions';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['isLoggedIn']
}


const initialState = {
  isLoggedIn: false
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isLoggedIn: true,
        username: action.username,
        password: action.password
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

const reducers = authentication;

export default persistReducer(persistConfig, reducers);