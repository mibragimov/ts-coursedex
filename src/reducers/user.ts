import { User, Action, ActionTypes } from '../actions';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

export const userReducer = (state: User = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.signinSuccess:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case ActionTypes.signoutSuccess:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case ActionTypes.signinFailure:
    case ActionTypes.signoutFailure:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
