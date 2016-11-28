import {
  START_BMI_COLLECTION,
  CONTINUE_BMI_COLLECTION,
  END_BMI_COLLECTION
} from '../actions/bmi';

export default function bmiState(state = {}, action) {
  switch (action.type) {
    case START_BMI_COLLECTION:
      return {
        ...state,
        currentBmiStudent: 0
      };
    case CONTINUE_BMI_COLLECTION:
      return {
        ...state,
        currentBmiStudent: state.currentBmiStudent + 1
      };
    default:
      return state;
  }
}
