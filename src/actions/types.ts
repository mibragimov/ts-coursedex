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
  | ReadDocSuccess;
