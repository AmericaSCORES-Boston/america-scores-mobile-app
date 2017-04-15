import * as addStudent from '../src/actions/addStudent';
import * as fetchStudents from '../src/actions/fetchActions';
import switchToDetail from '../src/actions/switchToDetailRoute';
import switchStudents from '../src/actions/switchToStudentsRoute';
import * as MockStudents from '../config/mockStudents';
import * as types from '../src/actions/constants';

it('creates a "ADD_STUDENT" action', () => {
  const student = MockStudents.student1;
  const expectedAction = {
    type: types.ADD_STUDENT,
    student,
  };
  expect(addStudent.addStudent(MockStudents.student1)).toEqual(expectedAction);
});

it('creates an "ADD_STUDENT_SUCCESS" action', () => {
  const expectedAction = {
    type: types.ADD_STUDENT_SUCCESS,
  };
  expect(addStudent.addStudentSuccess()).toEqual(expectedAction);
});

it('creates an "ADD_STUDENT_FAILURE" action', () => {
  const expectedAction = {
    type: types.ADD_STUDENT_FAILURE,
  };
  expect(addStudent.addStudentFailure()).toEqual(expectedAction);
});

it('creates an "FETCH_STUDENTS" action', () => {
  const expectedAction = {
    type: types.FETCH_STUDENTS,
  };
  expect(fetchStudents.fetchStudents()).toEqual(expectedAction);
});

it('creates an "FETCH_STUDENTS_SUCCESS" action', () => {
  const students = MockStudents.students;
  const expectedAction = {
    type: types.FETCH_STUDENTS_SUCCESS,
    students,
  };
  expect(fetchStudents.fetchStudentsSuccess(students)).toEqual(expectedAction);
});

it('creates an "FETCH_STUDENTS_FAILURE" action', () => {
  const expectedAction = {
    type: types.FETCH_STUDENTS_FAILURE,
  };
  expect(fetchStudents.fetchStudentsFailure()).toEqual(expectedAction);
});

it('creates an "FETCH_STUDENT" action', () => {
  const first = 'Bob';
  const last = 'Bobber';
  const dob = '08-12-1996';
  const expectedAction = {
    type: types.FETCH_STUDENT,
    first,
    last,
    dob,
  };
  expect(fetchStudents.searchStudent('Bob', 'Bobber', '08-12-1996')).toEqual(expectedAction);
});

it('creates an "FETCH_STUDENT_SUCCESS" action', () => {
  const student = MockStudents.student3;
  const expectedAction = {
    type: types.FETCH_STUDENT_SUCCESS,
    student,
  };
  expect(fetchStudents.fetchStudentSuccess(student)).toEqual(expectedAction);
});

it('creates an "FETCH_STUDENT_FAILURE" action', () => {
  const expectedAction = {
    type: types.FETCH_STUDENT_FAILURE,
  };
  expect(fetchStudents.fetchStudentFailure()).toEqual(expectedAction);
});

it('creates an "SWITCH_TO_DETAIL_ROUTE" action', () => {
  const student = MockStudents.student2;
  const expectedAction = {
    type: types.SWITCH_TO_STUDENT_DETAIL_ROUTE,
    student,
  };
  expect(switchToDetail(MockStudents.student2)).toEqual(expectedAction);
});

it('creates an "SWITCH_TO_STUDENTS_ROUTE" action', () => {
  const expectedAction = {
    type: types.SWITCH_TO_STUDENTS_ROUTE,
  };
  expect(switchStudents()).toEqual(expectedAction);
});
