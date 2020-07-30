import { SetCurrentUserAction } from './user';
import {
  SetDocumentStartAction,
  SetDocumentSuccessAction,
  SetDocumentFailureAction,
} from './course';

export enum ActionTypes {
  setCurrentUser,
  setDocumentStart,
  setDocumentSuccess,
  setDocumentFailure,
}

export type Action =
  | SetCurrentUserAction
  | SetDocumentStartAction
  | SetDocumentSuccessAction
  | SetDocumentFailureAction;
