import { User, Action, ActionTypes } from '../actions';

export const userReducer = (state: User | null = null, action: Action) => {
  switch (action.type) {
    case ActionTypes.setCurrentUser:
      return action.payload;
    default:
      return state;
  }
};
