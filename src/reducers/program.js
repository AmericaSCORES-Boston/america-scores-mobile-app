import {
  PROGRAM_FETCH_REQUESTED,
  PROGRAM_FETCH_SUCCEDED,
  PROGRAM_FETCH_FAILED
} from '../actions/program';

export default function programsState(state = {}, action) {
  switch (action.type) {
    case PROGRAM_FETCH_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case PROGRAM_FETCH_SUCCEDED:
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
    default:
      return state;
  }
}
