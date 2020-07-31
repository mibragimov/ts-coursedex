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
  UpdateDocumentStartAction,
  UpdateDocumentSuccessAction,
  UpdateDocumentFailureAction,
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
  updateDocumentStart,
  updateDocumentSuccess,
  updateDocumentFailure,
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
  | DeleteDocumentFailureAction
  | UpdateDocumentStartAction
  | UpdateDocumentSuccessAction
  | UpdateDocumentFailureAction;
