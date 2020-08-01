import { takeLatest, put, call, all } from 'redux-saga/effects';
import { ActionTypes } from './types';
import { readDocumentsFromCollection } from '../firebase/firebase.utils';
import { readDocsSuccess, readDocsFailure } from './course';

export function* readDocs() {
  try {
    const data = yield readDocumentsFromCollection();
    yield put(readDocsSuccess(data));
  } catch (error) {
    yield put(readDocsFailure(error.message));
  }
}

export function* onReadDocuments() {
  yield takeLatest(ActionTypes.readDocumentsStart, readDocs);
}

export function* courseSaga() {
  yield all([call(onReadDocuments)]);
}
