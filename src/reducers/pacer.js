import {
  LOAD_PACER_TEST,
  PACER_ITEM_TAPPED,
  PACER_ITEM_LONGPRESS
} from '../actions/pacer';

export default function bmiState(state = {}, action) {
  switch (action.type) {
    case LOAD_PACER_TEST:
      return {
        ...state,
        pacerArray: new Array(action.numStudents).fill(0)
      };
    case PACER_ITEM_TAPPED:
      return {
        ...state,
        pacerArray: [
          ...state.pacerArray.slice(0, action.index),
          state.pacerArray[action.index] + 1,
          ...state.pacerArray.slice(action.index + 1)
        ]
      };
    case PACER_ITEM_LONGPRESS:
      return {
        ...state,
        pacerArray: [
          ...state.pacerArray.slice(0, action.index),
          state.pacerArray[action.index] - 1,
          ...state.pacerArray.slice(action.index + 1)
        ]
      };
    default:
      return state;
  }
}
