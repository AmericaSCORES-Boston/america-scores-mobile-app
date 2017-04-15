import * as bmi from '../actions/bmi';

export default function bmiState(state = {}, action) {
  switch (action.type) {
    case bmi.SAVE_COLLECTED_BMI_DATA_REQUESTED:
      return {
        ...state,
        isFetching: true,
        message: ""
      };
    case bmi.SAVE_COLLECTED_BMI_DATA_SUCCEEDED:
    case bmi.SAVE_COLLECTED_BMI_DATA_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    default:
      return state;
  }
}
