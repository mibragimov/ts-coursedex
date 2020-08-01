import { all, call } from 'redux-saga/effects';

import { userSaga, courseSaga } from '../actions';

export function* rootSaga() {
  yield all([call(userSaga), call(courseSaga)]);
}
