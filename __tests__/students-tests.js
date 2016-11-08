import React from 'react';
import renderer from 'react-test-renderer';
import Students from '../src/containers/Students';
import StudentRow from '../src/components/StudentRow';
import StudentDetail from '../src/containers/StudentDetail';
import * as MockStudents from '../config/mockStudents';
import * as types from '../src/actions/constants';
/**
* *************************************************
*   COMPONENT TESTS
* *************************************************
*/
it('renders the Students page', () => {
  const tree = renderer.create(
    <Students students={MockStudents} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders StudentDetail page', () => {
  const tree = renderer.create(
    <StudentDetail student={MockStudents.student3} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders StudentRow component correctly', () => {
  const tree = renderer.create(
    <StudentRow student={MockStudents.student1} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});


/**
* *************************************************
*   ACTION CREATOR TESTS
* *************************************************
*/
import * as addStudent from '../src/actions/addStudent';
import * as fetchStudents from '../src/actions/fetchActions';
import switchToDetail from '../src/actions/switchToDetailRoute';
import switchStudents from '../src/actions/switchToStudentsRoute';

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
  const expectedAction = {
    type: types.FETCH_STUDENTS_SUCCESS,
  };
  expect(fetchStudents.fetchStudentsSuccess()).toEqual(expectedAction);
});

it('creates an "FETCH_STUDENTS_FAILURE" action', () => {
  const expectedAction = {
    type: types.FETCH_STUDENTS_FAILURE,
  };
  expect(fetchStudents.fetchStudentsFailure()).toEqual(expectedAction);
});

it('creates an "FETCH_STUDENT" action', () => {
  const expectedAction = {
    type: types.FETCH_STUDENT,
  };
  expect(fetchStudents.fetchStudent()).toEqual(expectedAction);
});

it('creates an "FETCH_STUDENT_SUCCESS" action', () => {
  const expectedAction = {
    type: types.FETCH_STUDENT_SUCCESS,
  };
  expect(fetchStudents.fetchStudentSuccess()).toEqual(expectedAction);
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



/**
//  * *************************************************
//  *   REDUCER TESTS
//  * *************************************************
//  */
// import * as reducer from '../src/reducers/';
//
// it('returns the same state on an unhandled action', () => {
//     expect(reducer({type: '_NULL'})).toMatchSnapshot();
// });
//
// it('starts BMI collection with a filtered list', () => {
//     const action = actions.startBMICollection(MockStudents.students);
//     expect(reducer(action)).toMatchSnapshot();
// });
