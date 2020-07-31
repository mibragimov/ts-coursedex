import { ActionTypes } from './types';

export interface User {
  id: string;
  displayName: string;
  email: string;
}

export interface SetCurrentUserAction {
  type: ActionTypes.setCurrentUser;
  payload: User | null;
}

export const setCurrentUser = (user: User | null): SetCurrentUserAction => {
  localStorage.setItem('_user', JSON.stringify(user));
  return {
    type: ActionTypes.setCurrentUser,
    payload: user,
  };
};
