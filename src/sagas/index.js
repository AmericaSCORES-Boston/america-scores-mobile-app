import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import Api from '../util/api';

export function * fetchSites() {
  try {
    const sites = yield call(Api.fetchSites);
    yield put(actions.fetchSitesSuccess(sites));
  } catch (e) {
    yield put(actions.fetchSitesFailure(e.message));
  }
}

export function * sagas() {
  yield* takeEvery('SITE_FETCH_REQUESTED', fetchSites);
}
