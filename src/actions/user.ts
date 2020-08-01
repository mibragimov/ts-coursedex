import { ActionTypes } from './types';
import { History } from 'history';

export interface CurrentUser {
  createdAt: Date | undefined;
  id: string;
  displayName: string;
  email: string;
}

export interface User {
  currentUser: CurrentUser | null;
  error: string | null;
  loading: boolean;
}

export interface SigninTypes {
  email: string;
  password: string;
}

export interface SignupTypes extends SigninTypes {}

//  Signin actions
export interface GoogleSigninStartAction {
  type: ActionTypes.googleSigninStart;
}
export interface SigninWithEmailStartAction {
  type: ActionTypes.signinWithEmailStart;
  payload: SigninTypes;
  history: History;
}

export interface SigninSuccessAction {
  type: ActionTypes.signinSuccess;
  payload: firebase.User | null;
}
export interface SigninFailureAction {
  type: ActionTypes.signinFailure;
  payload: string | null;
}

export const googleSigninStart = (): GoogleSigninStartAction => ({
  type: ActionTypes.googleSigninStart,
});
export const signinWithEmailStart = (
  emailAndPassword: SigninTypes,
  history: History
): SigninWithEmailStartAction => ({
  type: ActionTypes.signinWithEmailStart,
  payload: emailAndPassword,
  history: history,
});
export const signinSuccess = (
  user: firebase.User | null
): SigninSuccessAction => ({
  type: ActionTypes.signinSuccess,
  payload: user,
});
export const signinFailure = (err: string | null): SigninFailureAction => ({
  type: ActionTypes.signinFailure,
  payload: err,
});

// signup actions

export interface SignupStartAction {
  type: ActionTypes.signupStart;
  payload: SignupTypes;
  history: History;
  additionalData: {};
}

export const signupStart = (
  emailAndPassword: SignupTypes,
  history: History,
  additionalData: {}
): SignupStartAction => ({
  type: ActionTypes.signupStart,
  payload: emailAndPassword,
  history: history,
  additionalData: additionalData,
});

// sign out actions

export interface SignoutStart {
  type: ActionTypes.signoutStart;
  history: History;
}
export interface SignoutSuccess {
  type: ActionTypes.signoutSuccess;
}
export interface SignoutFailure {
  type: ActionTypes.signoutFailure;
  payload: string | null;
}

export const signoutStart = (history: History): SignoutStart => ({
  type: ActionTypes.signoutStart,
  history,
});
export const signoutSuccess = (): SignoutSuccess => ({
  type: ActionTypes.signoutSuccess,
});
export const signoutFailure = (err: string | null): SignoutFailure => ({
  type: ActionTypes.signoutFailure,
  payload: err,
});
// check user session

export interface CheckUserSessionAction {
  type: ActionTypes.checkUserSession;
}

export const checkUserSession = (): CheckUserSessionAction => ({
  type: ActionTypes.checkUserSession,
});
