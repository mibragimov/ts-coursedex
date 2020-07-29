import { combineReducers } from 'redux';
import { User } from '../actions';
import { userReducer } from './user';

export interface StoreState {
  user: User;
}

export const reducers = combineReducers({
  user: userReducer,
});
