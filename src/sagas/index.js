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

export function * addProgram(action) {
  try {
    const program = yield call(Api.addProgram, action.site_id, action.program_name);
    yield put(actions.addProgramSuccess(program));
  } catch (e) {
    yield put(actions.addProgramFailure(e.message));
  }
}

export function * sagas() {
  yield [
    takeEvery('SITE_FETCH_REQUESTED', fetchSites),
    takeEvery('PROGRAM_FETCH_REQUESTED', fetchPrograms),
    takeEvery('STUDENT_FETCH_REQUESTED', fetchStudents),
    takeEvery('ADD_PROGRAM_REQUESTED', addProgram),
  ]
}
