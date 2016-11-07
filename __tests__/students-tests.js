import React from 'react';
import renderer from 'react-test-renderer';
import Students from '../src/containers/Students';
import StudentRow from '../src/components/StudentRow';
import StudentDetail from '../src/containers/StudentDetail';
import * as MockStudents from '../config/mockStudents';
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

it('renders StudentRow button correctly', () => {
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
import * as switchToDetail from '../src/actions/switchToDetailRoute';
import * as switchStudents from '../src/actions/switchToStudentsRoute';

it('creates a "ADD_STUDENT" action', () => {
    expect(addStudent.addStudent(MockStudents.student1)).toMatchSnapshot();
});

it('creates an "ADD_STUDENT_SUCCESS" action', () => {
    expect(addStudent.addStudentSuccess()).toMatchSnapshot();
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
