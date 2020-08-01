import {
  GoogleSigninStartAction,
  SigninWithEmailStartAction,
  SigninSuccessAction,
  SigninFailureAction,
  SignoutSuccess,
  SignoutFailure,
} from './user';
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

  // auth types
  googleSigninStart = '@app/google-signin-start',
  signinWithEmailStart = '@app/signin-with-email-start',
  signinSuccess = '@app/signin-success',
  signinFailure = '@app/signin-failure',
  checkUserSession = '@app/check-user-session',

  signoutStart = '@app/signout-start',
  signoutSuccess = '@app/signout-success',
  signoutFailure = '@app/signout-failure',

  // document types
  setDocumentStart = '@app/set-document-start',
  setDocumentSuccess = '@app/set-document-success',
  setDocumentFailure = '@app/set-document-failure',
  readDocumentsStart = '@app/read-documents-start',
  readDocumentsSuccess = '@app/read-documents-success',
  readDocumentsFailure = '@app/read-documents-failure',
  readDocumentStart = '@app/read-document-start',
  readDocumentSuccess = '@app/read-document-success',
  readDocumentFailure = '@app/read-document-failure',
  deleteDocumentStart = '@app/delete-document-start',
  deleteDocumentSuccess = '@app/delete-document-success',
  delelteDocumentFailure = '@app/delete-document-failure',
  updateDocumentStart = '@app/update-document-start',
  updateDocumentSuccess = '@app/update-document-success',
  updateDocumentFailure = '@app/update-document-failure',
}

export type Action =
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
  | UpdateDocumentFailureAction
  | GoogleSigninStartAction
  | SigninWithEmailStartAction
  | SigninSuccessAction
  | SigninFailureAction
  | SignoutSuccess
  | SignoutFailure;
