import {
  STUDENT_FETCH_REQUESTED,
  STUDENT_FETCH_SUCCEEDED,
  STUDENT_FETCH_FAILED,
  STUDENT_UPDATE_REQUESTED,
  STUDENT_UPDATE_SUCCEEDED,
  STUDENT_UPDATE_FAILED
} from '../actions/individualStudent';

export default function individualStudentState(state = {}, action) {
  switch (action.type) {
    case STUDENT_FETCH_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case STUDENT_FETCH_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        student: action.student,
        stats: action.stats
      };
    case STUDENT_FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    case STUDENT_UPDATE_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case STUDENT_UPDATE_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        newStudent: action.student
      };
    case STUDENT_UPDATE_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    default:
      return state;
  }
}
