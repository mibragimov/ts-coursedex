import { Action, ActionTypes, Course } from '../actions';

const INITIAL_STATE = {
  creating: false,
  createError: null,
};

export const courseReducer = (
  state: Course = INITIAL_STATE,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.setDocumentStart:
      return {
        ...state,
        creating: true,
      };
    case ActionTypes.setDocumentSuccess:
      return {
        ...state,
        creating: false,
      };
    case ActionTypes.setDocumentFailure:
      return {
        ...state,
        createError: action.payload,
      };
    default:
      return state;
  }
};
