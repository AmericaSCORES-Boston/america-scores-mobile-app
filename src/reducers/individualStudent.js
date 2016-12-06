import {
  INDIVIDUAL_STUDENT_FETCH_REQUESTED,
  INDIVIDUAL_STUDENT_FETCH_SUCCEEDED,
  INDIVIDUAL_STUDENT_FETCH_FAILED,
  INDIVIDUAL_STUDENT_UPDATE_REQUESTED,
  INDIVIDUAL_STUDENT_UPDATE_SUCCEEDED,
  INDIVIDUAL_STUDENT_UPDATE_FAILED
} from '../actions/individualStudent';

export default function individualStudentState(state = {}, action) {
  switch (action.type) {
    case INDIVIDUAL_STUDENT_FETCH_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case INDIVIDUAL_STUDENT_FETCH_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        student: action.student,
        stats: action.stats
      };
    case INDIVIDUAL_STUDENT_FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    case INDIVIDUAL_STUDENT_UPDATE_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case INDIVIDUAL_STUDENT_UPDATE_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        newStudent: action.student
      };
    case INDIVIDUAL_STUDENT_UPDATE_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    default:
      return state;
  }
}