import { combineReducers } from 'redux';
import { User, Course } from '../actions';
import { userReducer } from './user';
import { courseReducer } from './course';
import { createSelector } from 'reselect';

export const selectUserStore = (state: StoreState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserStore],

  (selectUserStore) => selectUserStore.currentUser
);
export const selectCourseStore = (state: StoreState) => state.course;

export const selectCourses = createSelector(
  [selectCourseStore],

  (selectCourseStore) => selectCourseStore.courses
);

export interface StoreState {
  user: User;
  course: Course;
}

export const reducers = combineReducers({
  user: userReducer,
  course: courseReducer,
});
