import { SetCurrentUserAction } from './user';
import {
  SetDocumentStartAction,
  SetDocumentSuccessAction,
  SetDocumentFailureAction,
  ReadDocsStart,
  ReadDocsSuccess,
  ReadDocsFailure,
  ReadDocStart,
  ReadDocFailure,
  ReadDocSuccess,
  DeleteDocumentStartAction,
  DeleteDocumentSuccessAction,
  DeleteDocumentFailureAction,
} from './course';

export enum ActionTypes {
  setCurrentUser,
  setDocumentStart,
  setDocumentSuccess,
  setDocumentFailure,
  readDocumentsStart,
  readDocumentsSuccess,
  readDocumentsFailure,
  readDocumentStart,
  readDocumentSuccess,
  readDocumentFailure,
  deleteDocumentStart,
  deleteDocumentSuccess,
  delelteDocumentFailure,
}

export type Action =
  | SetCurrentUserAction
  | SetDocumentStartAction
  | SetDocumentSuccessAction
  | SetDocumentFailureAction
  | ReadDocsStart
  | ReadDocsSuccess
  | ReadDocsFailure
  | ReadDocStart
  | ReadDocFailure
  | ReadDocSuccess
  | DeleteDocumentStartAction
  | DeleteDocumentSuccessAction
  | DeleteDocumentFailureAction;
