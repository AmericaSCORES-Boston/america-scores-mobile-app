/**
 * *************************************************
 *   REWORKED REDUCER TESTS FOR BMI PAGE
 * *************************************************
 */
 import bmiState from '../src/reducers/bmi';
 import * as bmiAction from '../src/actions/bmi';

describe(bmiReducer, () => {
  let state = {
    isFetching: false
  };


  //pass in the action
  state = bmiState(state, studentsAction);

  it('should return the initial state', () => {
    let reducer1 = bmiState(undefined, {});
    expect(reducer1).toEqual(state);
  });

  it('should handle SAVE_COLLECTED_BMI_DATA_REQUESTED', () => {
    var saveRequested = bmiAction.saveCollectedBmiData(undefined);
    state = bmiState(state, saveRequested);
    expect(state.isFetching).toEqual(true);
  });
})
//  it('returns the same state on an unhandled action', () => {
//     expect(reducer(undefined, {type: '_NULL'})).toMatchSnapshot();
// });
//
// it('starts BMI collection with a filtered list', () => {
//     const action = actions.startBMICollection(MockStudents.students);
//     expect(reducer(undefined, action)).toMatchSnapshot();
// });
//
// it('starts BMI collection', () => {
//     const action = actions.startBMICollection(MockStudents.studentsWithoutHeightAndWeight);
//     expect(reducer(undefined, action)).toMatchSnapshot();
// });
//
// it('does not start BMI collection because there are no students created for this program', () => {
//     const action = actions.startBMICollection([]);
//     expect(reducer(undefined, action)).toMatchSnapshot();
// });
//
// it('does not start BMI collection because height and weight data has already been collected for all students', () => {
//     const action = actions.startBMICollection(MockStudents.studentsWithHeightAndWeight);
//     expect(reducer(undefined, action)).toMatchSnapshot();
// });
//
// it('makes a request to save the data entered for a student', () => {
//     const action = actions.saveStudent(MockStudents.student1);
//     expect(reducer(MockStudents.studentsWithoutHeightAndWeight, action)).toMatchSnapshot();
// });
//
// it('saves the student data successfully', () => {
//     const action = actions.onSaveStudentSuccess(MockStudents.student1);
//     expect(reducer(MockStudents.studentsWithoutHeightAndWeight, action)).toMatchSnapshot();
// });
//
// it('fails to save the student data', () => {
//     const action = actions.onSaveStudentFailure(MockStudents.badStudent);
//     expect(reducer(MockStudents.studentsWithoutHeightAndWeight, action)).toMatchSnapshot();
// });
