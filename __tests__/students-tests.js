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

it('renders StudentRow component correctly', () => {
  const tree = renderer.create(
    <StudentRow student={MockStudents.student1} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
