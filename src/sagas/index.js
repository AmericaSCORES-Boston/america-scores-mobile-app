import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import { getUser } from '../selectors';
import Auth0Lock from 'react-native-lock';
import * as actions from '../actions/index';
import Api from '../util/api';
import * as site from '../actions/site';
import * as program from '../actions/program';
import * as student from '../actions/student';
import * as studentStat from '../actions/studentStat';
import * as stat from '../actions/stat';
import * as login from '../actions/login';

export function * fetchSites() {
  try {
    const user = yield select(getUser);
    const sites = yield call(Api.fetchSites, user);
    yield put(actions.fetchSitesSuccess(sites));
  } catch (e) {
    yield put(actions.fetchSitesFailure(e.message));
  }
}

export function * fetchPrograms(action) {
  try {
    const user = yield select(getUser);
    const programs = yield call(Api.fetchPrograms, user, action.site_id);
    yield put(actions.fetchProgramsSuccess(programs));
  } catch (e) {
    yield put(actions.fetchProgramsFailure(e.message));
  }
}

export function * addProgram(action) {
  try {
    const user = yield select(getUser);
    const program = yield call(Api.addProgram, user, action.site_id, action.program_name);
    yield put(actions.addProgramSuccess(program));
  } catch (e) {
    yield put(actions.addProgramFailure(e.message));
  }
}

export function * fetchStudents(action) {
  try {
    const user = yield select(getUser);
    const students = yield call(Api.fetchStudents, user, action.program_id);
    yield put(actions.fetchStudentsSuccess(students));
  } catch (e) {
    yield put(actions.fetchStudentsFailure(e.message));
  }
}

export function * searchStudent(action) {
  try {
    const user = yield select(getUser);
    const student = yield call(Api.searchStudent, user, action.first_name, action.last_name, action.dob);
    yield put(actions.searchStudentSuccess(student));
  } catch (e) {
    yield put(actions.searchStudentFailure(e.message));
  }
}

export function * addExistingStudent(action) {
  try {
    if (action.student_ids.includes(action.student.student_id)) {
      throw new StudentAlreadyInProgramException(action.student);
    }

    const user = yield select(getUser);
    const students = yield call(Api.addExistingStudent, user, action.program_id, action.student);
    yield put(actions.addExistingStudentSuccess(students[0]));
  } catch (e) {
    yield put(actions.addExistingStudentFailure(e.message));
  }
}

export function * createStudent(action) {
  try {
    const user = yield select(getUser);
    yield call(Api.createStudent, user, action.program_id, action.first_name, action.last_name, action.dob);
    const students = yield call(Api.searchStudent, user, action.first_name, action.last_name, action.dob);
    yield put(actions.createStudentSuccess(students[0]));
  } catch (e) {
    yield put(actions.createStudentFailure(e.message));
  }
}

export function * fetchStat(action) {
  try {
    const user = yield select(getUser);
    const stat = yield call(Api.fetchStat, user, action.stat_id);
    yield put(actions.fetchStatSuccess(stat));
  } catch (e) {
    yield put(actions.statRequestFailure(e.message));
  }
}

export function * createStat(action) {
  try {
    const user = yield select(getUser);
    const status = yield call(Api.createStat, user, action.stat);
    yield put(actions.createStatSuccess(status));
  } catch (e) {
    yield put(actions.statRequestFailure(e.message));
  }
}

export function * updateStat(action) {
  try {
    const user = yield select(getUser);
    const status = yield call(Api.updateStat, user, action.stat);
    yield put(actions.updateStatSuccess(status));
  } catch (e) {
    yield put(actions.statRequestFailure(e.message));
  }
}

export function * fetchStats(action) {
  try {
    const user = yield select(getUser);
    const stats = yield call(Api.fetchStats, user, action.program_id);
    yield put(actions.fetchStatsSuccess(stats));
  } catch (e) {
    yield put(actions.fetchStatsFailure(e.message));
  }
}

export function * loginUser() {
  var lock = new Auth0Lock({clientId: 'HvNKnxLle17wN23DJj1TFmpMBwG1Kb0U', domain: 'asbadmin.auth0.com'});

  const showLock = () =>
    new Promise((resolve, reject) => {
      lock.show({
        closable: true,
        disableSignUp: true,
        connections: ["Username-Password-Authentication"],
        authParams: { scope: 'openid email user_metadata app_metadata' }
      }, (err, profile, auth0Token) => {
        if (err) {
          reject({ err });
        }
        resolve({ auth0Token });
      });
    });

  try {
    const {auth0Token} = yield call(showLock);
    yield put(actions.loginUserSuccess(auth0Token));
    Actions.sites();
  } catch (e) {
    yield put(actions.loginUserFailure(e.message));
  }
}

export function * sagas() {
  yield [
    takeEvery(site.SITE_FETCH_REQUESTED, fetchSites),
    takeEvery(program.PROGRAM_FETCH_REQUESTED, fetchPrograms),
    takeEvery(program.ADD_PROGRAM_REQUESTED, addProgram),
    takeEvery(student.STUDENT_FETCH_REQUESTED, fetchStudents),
    takeEvery(student.SEARCH_STUDENT_REQUESTED, searchStudent),
    takeEvery(student.CREATE_STUDENT_REQUESTED, createStudent),
    takeEvery(student.ADD_EXISTING_STUDENT_REQUESTED, addExistingStudent),
    takeEvery(studentStat.STAT_FETCH_REQUESTED, fetchStat),
    takeEvery(studentStat.STAT_CREATE_REQUESTED, createStat),
    takeEvery(studentStat.STAT_UPDATE_REQUESTED, updateStat),
    takeEvery(stat.STATS_FETCH_REQUESTED, fetchStats),
    takeEvery(login.LOGIN_REQUESTED, loginUser)
  ]
}

function StudentAlreadyInProgramException(student) {
  this.name = "StudentAlreadyInProgram";
  this.message = `${student.first_name} ${student.last_name} already exists in program.`;
  this.stack = (new Error()).stack;
}
