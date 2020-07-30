import { combineReducers } from 'redux';
import { User, Course } from '../actions';
import { userReducer } from './user';
import { courseReducer } from './course';

export interface StoreState {
  user: User;
  course: Course;
}

export const reducers = combineReducers({
  user: userReducer,
  course: courseReducer,
});
