import { User, Action, ActionTypes } from '../actions';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userReducer = (state: User = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.signinWithEmailStart:
    case ActionTypes.signupStart:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.signinSuccess:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
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
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
