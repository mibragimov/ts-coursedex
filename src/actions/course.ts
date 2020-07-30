import { ActionTypes } from './types';
import { Dispatch } from 'redux';
import { addDocumentToCollection } from '../firebase/firebase.utils';

export interface Course {
  creating: boolean;
  createError: string | null;
}

export interface SetDocumentStartAction {
  type: ActionTypes.setDocumentStart;
}
export interface SetDocumentSuccessAction {
  type: ActionTypes.setDocumentSuccess;
}
export interface SetDocumentFailureAction {
  type: ActionTypes.setDocumentFailure;
  payload: string;
}

const setDocumentStart = (): SetDocumentStartAction => ({
  type: ActionTypes.setDocumentStart,
});
const setDocumentSuccess = (): SetDocumentSuccessAction => ({
  type: ActionTypes.setDocumentSuccess,
});
const setDocumentFailure = (err: string): SetDocumentFailureAction => ({
  type: ActionTypes.setDocumentFailure,
  payload: err,
});

export const setDocument = (data: {}) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setDocumentStart());
      await addDocumentToCollection(data);
      dispatch(setDocumentSuccess());
    } catch (error) {
      dispatch(setDocumentFailure(error.message));
    }
  };
};
