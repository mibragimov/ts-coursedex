import { ActionTypes } from './types';

export interface CurrentUser {
  createdAt: Date | undefined;
  id: string;
  displayName: string;
  email: string;
}

export interface User {
  currentUser: CurrentUser | null;
  error: string | null;
}

export type SigninTypes = {
  email: string;
  password: string;
};

//  Signin actions
export interface GoogleSigninStartAction {
  type: ActionTypes.googleSigninStart;
}
export interface SigninWithEmailStartAction {
  type: ActionTypes.signinWithEmailStart;
  payload: SigninTypes;
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
  emailAndPassword: SigninTypes
): SigninWithEmailStartAction => ({
  type: ActionTypes.signinWithEmailStart,
  payload: emailAndPassword,
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

// sign out actions

export interface SignoutStart {
  type: ActionTypes.signoutStart;
}
export interface SignoutSuccess {
  type: ActionTypes.signoutSuccess;
}
export interface SignoutFailure {
  type: ActionTypes.signoutFailure;
  payload: string | null;
}

export const signoutStart = (): SignoutStart => ({
  type: ActionTypes.signoutStart,
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
