/**
 * *************************************************
 *   REWORKED REDUCER TESTS FOR BMI PAGE
 * *************************************************
 */
 import bmiState from '../src/reducers/bmi';
 import * as bmiAction from '../src/actions/bmi';

describe('bmi Reducer', () => {
  let state = {
    isFetching: false
  };

  //pass in the action
  state = bmiState(state, bmiAction);

  it('should return the initial state', () => {
    let reducer1 = bmiState(undefined, {});
    expect(reducer1).toEqual({});
  });

  it('should handle SAVE_COLLECTED_BMI_DATA_REQUESTED', () => {
    var saveRequested = bmiAction.saveCollectedBmiData(undefined);
    state = bmiState(state, saveRequested);
    expect(state.isFetching).toEqual(true);
  });

  it('should handle SAVE_COLLECTED_BMI_DATA_SUCCEEDED', () => {
    const msg = "data saved";
    var saveSuccess = bmiAction.saveCollectedBmiDataSuccess(msg);
    state = bmiState(state, saveSuccess);
  });
})
