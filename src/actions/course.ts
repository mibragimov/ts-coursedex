import { ActionTypes } from './types';
import { Dispatch } from 'redux';
import {
  addDocumentToCollection,
  readDocumentsFromCollection,
} from '../firebase/firebase.utils';

export interface Course {
  creating: boolean;
  createError: string | null;
  courses: CourseDetails[];
  loadingDocs: boolean;
  loadingDocsError: string | null;
}

export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  materialsNeeded: string;
}

// Set Documents

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

// Read Documents

export interface ReadDocsStart {
  type: ActionTypes.readDocumentsStart;
}
export interface ReadDocsSuccess {
  type: ActionTypes.readDocumentsSuccess;
  payload: any;
}
export interface ReadDocsFailure {
  type: ActionTypes.readDocumentsFailure;
  payload: string;
}

const readDocsStart = (): ReadDocsStart => ({
  type: ActionTypes.readDocumentsStart,
});
const readDocsSuccess = (data: any): ReadDocsSuccess => ({
  type: ActionTypes.readDocumentsSuccess,
  payload: data,
});
const readDocsFailure = (err: string): ReadDocsFailure => ({
  type: ActionTypes.readDocumentsFailure,
  payload: err,
});

export const readDocuments = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(readDocsStart());
      const data = await readDocumentsFromCollection();
      dispatch(readDocsSuccess(data));
    } catch (error) {
      dispatch(readDocsFailure(error.message));
    }
  };
};
