import { ActionTypes } from './types';
import { Dispatch } from 'redux';
import {
  addDocumentToCollection,
  readDocumentById,
  deleteDocumentFromCollection,
  updateDocumentFromCollection,
  firestore,
} from '../firebase/firebase.utils';

export interface Course {
  creating: boolean;
  createError: string | null;
  courses: CourseDetails[];
  selectedCourse: CourseDetails | {};
  loadingSelectedCourse: boolean;
  loadingDocs: boolean;
  loadingDocsError: string | null;
  deleting: boolean;
  deleteError: string | null;
  updating: boolean;
  updateError: string | null;
}

export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  materialsNeeded: string;
  displayName: string;
  owner: string;
}

// Set Documents

export interface SetDocumentStartAction {
  type: ActionTypes.setDocumentStart;
}
export interface SetDocumentSuccessAction {
  type: ActionTypes.setDocumentSuccess;
  payload: {};
}
export interface SetDocumentFailureAction {
  type: ActionTypes.setDocumentFailure;
  payload: string;
}

const setDocumentStart = (): SetDocumentStartAction => ({
  type: ActionTypes.setDocumentStart,
});
const setDocumentSuccess = (data: {}): SetDocumentSuccessAction => ({
  type: ActionTypes.setDocumentSuccess,
  payload: data,
});
const setDocumentFailure = (err: string): SetDocumentFailureAction => ({
  type: ActionTypes.setDocumentFailure,
  payload: err,
});

export const setDocument = (data: {}) => {
  const docRef = firestore.collection('courses').doc();
  const id = docRef.id;
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setDocumentStart());
      await addDocumentToCollection(data, id);
      dispatch(setDocumentSuccess({ ...data, id }));
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

export const readDocsStart = (): ReadDocsStart => ({
  type: ActionTypes.readDocumentsStart,
});
export const readDocsSuccess = (data: any): ReadDocsSuccess => ({
  type: ActionTypes.readDocumentsSuccess,
  payload: data,
});
export const readDocsFailure = (err: string): ReadDocsFailure => ({
  type: ActionTypes.readDocumentsFailure,
  payload: err,
});

// Read a single document

export interface ReadDocStart {
  type: ActionTypes.readDocumentStart;
}
export interface ReadDocSuccess {
  type: ActionTypes.readDocumentSuccess;
  payload: any;
}
export interface ReadDocFailure {
  type: ActionTypes.readDocumentFailure;
  payload: string;
}

const readDocStart = (): ReadDocStart => ({
  type: ActionTypes.readDocumentStart,
});
const readDocSuccess = (data: any): ReadDocSuccess => ({
  type: ActionTypes.readDocumentSuccess,
  payload: data,
});
const readDocFailure = (err: string): ReadDocFailure => ({
  type: ActionTypes.readDocumentFailure,
  payload: err,
});

export const readDocument = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(readDocStart());
      const data = await readDocumentById(id);
      dispatch(readDocSuccess(data));
    } catch (error) {
      dispatch(readDocFailure(error.message));
    }
  };
};

// Delete a document

export interface DeleteDocumentStartAction {
  type: ActionTypes.deleteDocumentStart;
}
export interface DeleteDocumentSuccessAction {
  type: ActionTypes.deleteDocumentSuccess;
  payload: string;
}
export interface DeleteDocumentFailureAction {
  type: ActionTypes.delelteDocumentFailure;
  payload: string;
}

const deleteDocumentStart = (): DeleteDocumentStartAction => ({
  type: ActionTypes.deleteDocumentStart,
});
const deleteDocumentSuccess = (id: string): DeleteDocumentSuccessAction => ({
  type: ActionTypes.deleteDocumentSuccess,
  payload: id,
});
const deleteDocumentFailure = (err: string): DeleteDocumentFailureAction => ({
  type: ActionTypes.delelteDocumentFailure,
  payload: err,
});

export const deleteDocument = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(deleteDocumentStart());
      await deleteDocumentFromCollection(id);
      dispatch(deleteDocumentSuccess(id));
      localStorage.removeItem('_course');
    } catch (error) {
      dispatch(deleteDocumentFailure(error.message));
    }
  };
};

// Update a document

export interface UpdateDocumentStartAction {
  type: ActionTypes.updateDocumentStart;
}
export interface UpdateDocumentSuccessAction {
  type: ActionTypes.updateDocumentSuccess;
  payload: {};
  id: string;
}
export interface UpdateDocumentFailureAction {
  type: ActionTypes.updateDocumentFailure;
  payload: string;
}

const updateDocumentStart = (): UpdateDocumentStartAction => ({
  type: ActionTypes.updateDocumentStart,
});
const updateDocumentSuccess = (
  data: {},
  id: string
): UpdateDocumentSuccessAction => ({
  type: ActionTypes.updateDocumentSuccess,
  payload: data,
  id: id,
});
const updateDocumentFailure = (err: string): UpdateDocumentFailureAction => ({
  type: ActionTypes.updateDocumentFailure,
  payload: err,
});

export const updateDocument = (id: string, data: {}) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(updateDocumentStart());
      await updateDocumentFromCollection(id, data);
      dispatch(updateDocumentSuccess(data, id));
    } catch (error) {
      dispatch(updateDocumentFailure(error.message));
    }
  };
};
