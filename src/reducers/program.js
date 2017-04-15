import {
  PROGRAM_FETCH_REQUESTED,
  PROGRAM_FETCH_SUCCEEDED,
  PROGRAM_FETCH_FAILED,
  ADD_PROGRAM_REQUESTED,
  ADD_PROGRAM_SUCCEEDED,
  ADD_PROGRAM_FAILED
} from '../actions/program';

export default function programsState(state = {}, action) {
  switch (action.type) {
    case PROGRAM_FETCH_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case PROGRAM_FETCH_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        programs: action.programs
      };
    case PROGRAM_FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    case ADD_PROGRAM_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case ADD_PROGRAM_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        programs: [...state.programs, action.program[0]]
      };
    case ADD_PROGRAM_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    default:
      return state;
  }
}
