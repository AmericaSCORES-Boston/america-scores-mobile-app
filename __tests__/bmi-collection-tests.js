/**
* ********************************************
*   PAGE FLOW
* ********************************************
* 1) User begins BMI Collection
* 2) Student detail view is shown (students with information should *probably* not be shown)
* 3) User decides:
*    a) User enters info about student (repeat from step 3)
*    b) Clicks 'Save' (repeat from step 2)
*    c) Clicks 'Stop'
*    d) Clicks 'Previous Student' (repeat from step 2) (optional)
*
* ********************************************
*   COMPONENTS
* ********************************************
* -- StudentDetailsContainer (manages state)
*    -- StudentDetail (contains stats/info)
*    -- 'Save' Button (save this student and show next one)
*    -- 'Stop' Button
*    -- 'Previous Student' Button (optional)
*
* ********************************************
*   ACTIONS
* ********************************************
*  -- Start Collection (pass in current roster, filter students who don't have a height or weight entered)
*  -- End Collection
*
* -- Async:
*   -- Save Student:
*      -- Request to save student
*      -- Successful save of student
*      -- Failure to save student
*
* ********************************************
*   REDUCERS
* ********************************************
* -- BMICollection State (updates current student, and maintains list of students missing height or weight)
* -- StudentDetail State
*      -- Request to save student - show 'Saving data for [student].'
*      -- Success on saving student - show '[Student]'s data has been saved.' Update navigation
*      -- Failure to save student - show feedback and student with saved input
*
*/

'use strict';

import React from 'react';
import renderer from 'react-test-renderer';
import BMICollectionStudentDetail from '../config/bmi-collection/BMICollectionStudentDetail.js';
import NextStudentButton from '../config/bmi-collection/NextStudentButton.js';
import StopCollectionButton from '../config/bmi-collection/StopCollectionButton.js';
import * as MockStudents from '../config/bmi-collection/data/MockStudents.js';

/**
* *************************************************
*   COMPONENT TESTS
* *************************************************
*/

describe('component tests', () => {
  it('renders the student1 detail view correctly', () => {
    const tree = renderer.create(
      <BMICollectionStudentDetail student={MockStudents.student1}></BMICollectionStudentDetail>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders "Save" button correctly', () => {
    const tree = renderer.create(
      <NextStudentButton></NextStudentButton>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders "Stop" button correctly', () => {
    const tree = renderer.create(
      <StopCollectionButton></StopCollectionButton>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});



/**
* *************************************************
*   ACTION CREATOR TESTS
* *************************************************
*/
import * as actions from '../config/bmi-collection/BMICollectionActions';

describe('action creator tests', () => {
  it('creates a "START_BMI_COLLECTION" action', () => {
    expect(actions.startBMICollection(MockStudents.students)).toMatchSnapshot();
  });

  it('creates an "END_BMI_COLLECTION" action', () => {
    expect(actions.endBMICollection(MockStudents.students)).toMatchSnapshot();
  });

  // Async action tests may need to be reworked since they are more complicated,
  // but this is the basic idea.

  it('creates a "SAVE_STUDENT" action', () => {
    expect(actions.saveStudent(MockStudents.student1)).toMatchSnapshot();
  });

  it('creates a "SAVE_STUDENT_SUCCESS" action', () => {
    expect(actions.saveStudent(MockStudents.student1)).toMatchSnapshot();
  });

  it('creates a "SAVE_STUDENT_FAILURE" action', () => {
    expect(actions.saveStudent(MockStudents.badStudent)).toMatchSnapshot();
  });
});

/**
* *************************************************
*   REDUCER TESTS
* *************************************************
*/
import {BMICollectionReducer as reducer} from '../config/bmi-collection/BMICollectionReducer';

describe('reducer tests', () => {

  it('returns the same state on an unhandled action', () => {
    expect(reducer(undefined, {type: '_NULL'})).toMatchSnapshot();
  });

  it('starts BMI collection with a filtered list', () => {
    const action = actions.startBMICollection(MockStudents.students);
    expect(reducer(undefined, action)).toMatchSnapshot();
  });

  it('starts BMI collection', () => {
    const action = actions.startBMICollection(MockStudents.studentsWithoutHeightAndWeight);
    expect(reducer(undefined, action)).toMatchSnapshot();
  });

  it('ends BMI collection', () => {
    const action = actions.endBMICollection(MockStudents.studentsWithoutHeightAndWeight);
    expect(reducer(undefined, action)).toMatchSnapshot();
  });

  it('does not start BMI collection because there are no students created for this program', () => {
    const action = actions.startBMICollection([]);
    expect(reducer(undefined, action)).toMatchSnapshot();
  });

  it('does not start BMI collection because height and weight data has already been collected for all students', () => {
    const action = actions.startBMICollection(MockStudents.studentsWithHeightAndWeight);
    expect(reducer(undefined, action)).toMatchSnapshot();
  });

  it('makes a request to save the data entered for a student', () => {
    const action = actions.saveStudent(MockStudents.student1);
    expect(reducer(MockStudents.studentsWithoutHeightAndWeight, action)).toMatchSnapshot();
  });

  it('saves the student data successfully', () => {
    const action = actions.onSaveStudentSuccess(MockStudents.student1);
    expect(reducer(MockStudents.studentsWithoutHeightAndWeight, action)).toMatchSnapshot();
  });

  it('fails to save the student data', () => {
    const action = actions.onSaveStudentFailure(MockStudents.badStudent);
    expect(reducer(MockStudents.studentsWithoutHeightAndWeight, action)).toMatchSnapshot();
  });
});
