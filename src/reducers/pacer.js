import {
  LOAD_PACER_TEST,
  PACER_ITEM_TAPPED,
  PACER_ITEM_LONGPRESS,
  TIME_INTERVAL_ELAPSED,
  MAX_SHUTTLES_REACHED
} from '../actions/pacer';

export default function pacerState(state = {}, action) {
  switch (action.type) {
    case LOAD_PACER_TEST:
      return {
        ...state,
        currentLevel: 0,
        currentShuttle: 1,
        totalShuttles: 0,
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
    case TIME_INTERVAL_ELAPSED:
      return {
        ...state,
        currentShuttle: state.currentShuttle + 1,
        totalShuttles: state.totalShuttles + 1
      };
    case MAX_SHUTTLES_REACHED:
      return {
        ...state,
        currentLevel: state.currentLevel + 1,
        currentShuttle: 1
      };
    default:
      return state;
  }
}
