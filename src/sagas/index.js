import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import Api from '../util/api';
import * as site from '../actions/site';
import * as program from '../actions/program';
import * as student from '../actions/student';
import * as studentStat from '../actions/studentStat';
import * as stat from '../actions/stat';

export function * fetchSites() {
  try {
    const sites = yield call(Api.fetchSites);
    yield put(actions.fetchSitesSuccess(sites));
  } catch (e) {
    yield put(actions.fetchSitesFailure(e.message));
  }
}

export function * fetchPrograms(action) {
  try {
    const programs = yield call(Api.fetchPrograms, action.site_id);
    yield put(actions.fetchProgramsSuccess(programs));
  } catch (e) {
    yield put(actions.fetchProgramsFailure(e.message));
  }
}

export function * fetchStudents(action) {
  try {
    const students = yield call(Api.fetchStudents, action.program_id);
    yield put(actions.fetchStudentsSuccess(students));
  } catch (e) {
    yield put(actions.fetchStudentsFailure(e.message));
  }
}

export function * fetchStat(action) {
  try {
    const stat = yield call(Api.fetchStat, action.stat_id);
    yield put(actions.fetchStatSuccess(stat));
  } catch (e) {
    yield put(actions.statRequestFailure(e.message));
  }
}

export function * createStat(action) {
  try {
    const status = yield call(Api.createStat, action.stat);
    yield put(actions.createStatSuccess(status));
  } catch (e) {
    yield put(actions.statRequestFailure(e.message));
  }
}

export function * updateStat(action) {
  try {
    const status = yield call(Api.updateStat, action.stat);
    yield put(actions.updateStatSuccess(status));
  } catch (e) {
    yield put(actions.statRequestFailure(e.message));
  }
}

export function * fetchStats(action) {
  try {
    const stats = yield call(Api.fetchStats, action.program_id);
    yield put(actions.fetchStatsSuccess(stats));
  } catch (e) {
    yield put(actions.fetchStatsFailure(e.message));
  }
}

export function * sagas() {
  yield [
    takeEvery(site.SITE_FETCH_REQUESTED, fetchSites),
    takeEvery(program.PROGRAM_FETCH_REQUESTED, fetchPrograms),
    takeEvery(student.STUDENT_FETCH_REQUESTED, fetchStudents),
    takeEvery(studentStat.STAT_FETCH_REQUESTED, fetchStat),
    takeEvery(studentStat.STAT_CREATE_REQUESTED, createStat),
    takeEvery(studentStat.STAT_UPDATE_REQUESTED, updateStat),
    takeEvery(stat.STATS_FETCH_REQUESTED, fetchStats)
  ]
}
