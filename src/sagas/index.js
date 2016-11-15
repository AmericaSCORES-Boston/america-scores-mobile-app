import { take, put, call, fork, select } from 'redux-saga/effects'
// import { api, history } from '../services'
import { fetchSites, fetchSitesSuccess, fetchSitesFailure } from '../actions/fetchSites';
import * as actions from '../actions/constants';

function* loadUser() {
  while(true) {
    // Wait for the SAVE_SCORE action
    const { score } = yield take(actions.FETCH_SITES)
    try {
      // Tell redux-saga to call fetch with the specified options
      yield call(fetch, 'http://api.icndb.com/jokes/random/', { method: 'GET', body: { score } })
      // Tell redux-saga to dispatch the saveScoreSucceeded action
      yield put(fetchSitesSuccess())
    }
    catch (err) {
      // You get it
      yield put(fetchSitesFailure(err))
    }
  }
}
