import { takeLatest, put, call, all } from 'redux-saga/effects';
import {
  googleProvider,
  auth,
  signInWithGoogle,
  createUserProfileDocument,
  getCurrentUser,
} from '../firebase/firebase.utils';
import {
  ActionTypes,
  SigninWithEmailStartAction,
  signinSuccess,
  signinFailure,
} from '../actions';
import {
  signoutSuccess,
  signoutFailure,
  SignupStartAction,
  SignoutStart,
} from './user';

export function* getSnapshotFromUserAuth(user: firebase.User, data?: {}) {
  try {
    // create user profile with user object details
    const userRef = yield call(createUserProfileDocument, user, data);
    // get snapshot from userRef and put success action
    const userSnapshot = yield userRef.get();

    // this success method will update the reducer using the object we passsed to it
    yield put(signinSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signinFailure(error.message));
  }
}

// check if current user is authenticated
export function* isUserAuthenticated() {
  try {
    const user = yield getCurrentUser();
    if (!user) return;
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signinFailure(error.message));
  }
}

export function* signinWithGoogle() {
  try {
    // once user succeeds sign in with popup it returns user object
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signinFailure(error.message));
  }
}

export function* signinWithEmail({
  payload: { email, password },
  history,
}: SigninWithEmailStartAction) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
    history.push('/');
  } catch (error) {
    yield put(signinFailure(error.message));
  }
}

export function* signup({
  payload: { email, password },
  history,
  additionalData,
}: SignupStartAction) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user, additionalData);
    history.push('/');
  } catch (error) {
    yield put(signinFailure(error.message));
  }
}

export function* signout({ history }: SignoutStart) {
  try {
    yield auth.signOut();
    yield put(signoutSuccess());
    history.push('/');
  } catch (error) {
    yield put(signoutFailure(error.message));
  }
}

// google signin listener that listens for the start call
export function* onGoogleSigninStart() {
  yield takeLatest(ActionTypes.googleSigninStart, signInWithGoogle);
}

// email signin listener that listens for the start call
export function* onEmailSignin() {
  yield takeLatest<SigninWithEmailStartAction>(
    ActionTypes.signinWithEmailStart,
    signinWithEmail
  );
}

export function* onSignup() {
  yield takeLatest<SignupStartAction>(ActionTypes.signupStart, signup);
}

// signout listener
export function* onSignout() {
  yield takeLatest<SignoutStart>(ActionTypes.signoutStart, signout);
}

// check user session listener
export function* onCheckUserSession() {
  yield takeLatest(ActionTypes.checkUserSession, isUserAuthenticated);
}

export function* userSaga() {
  yield all([
    call(onGoogleSigninStart),
    call(onEmailSignin),
    call(onSignup),
    call(onCheckUserSession),
    call(onSignout),
  ]);
}
