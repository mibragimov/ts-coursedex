import { Action, ActionTypes, Course } from '../actions';

const INITIAL_STATE = {
  creating: false,
  createError: null,
  courses: [],
  selectedCourse: {},
  loadingSelectedCourse: false,
  loadingDocs: false,
  loadingDocsError: null,
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
        creating: false,
        createError: action.payload,
      };
    case ActionTypes.readDocumentsStart:
      return {
        ...state,
        loadingDocs: true,
      };
    case ActionTypes.readDocumentsSuccess:
      return {
        ...state,
        loadingDocs: false,
        courses: action.payload,
      };
    case ActionTypes.readDocumentsFailure:
      return {
        ...state,
        loadingDocs: false,
        loadingDocsError: action.payload,
      };
    case ActionTypes.readDocumentStart:
      return {
        ...state,
        loadingSelectedCourse: true,
      };
    case ActionTypes.readDocumentSuccess:
      return {
        ...state,
        selectedCourse: action.payload,
        loadingSelectedCourse: false,
      };
    case ActionTypes.readDocumentFailure:
      return {
        ...state,
        loadingSelectedCourse: false,
      };
    default:
      return state;
  }
};
