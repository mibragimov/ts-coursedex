import { SetCurrentUserAction } from './user';
import {
  SetDocumentStartAction,
  SetDocumentSuccessAction,
  SetDocumentFailureAction,
  ReadDocsStart,
  ReadDocsSuccess,
  ReadDocsFailure,
} from './course';

export enum ActionTypes {
  setCurrentUser,
  setDocumentStart,
  setDocumentSuccess,
  setDocumentFailure,
  readDocumentsStart,
  readDocumentsSuccess,
  readDocumentsFailure,
}

export type Action =
  | SetCurrentUserAction
  | SetDocumentStartAction
  | SetDocumentSuccessAction
  | SetDocumentFailureAction
  | ReadDocsStart
  | ReadDocsSuccess
  | ReadDocsFailure;
