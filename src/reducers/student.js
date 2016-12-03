import {
  STUDENTS_FETCH_REQUESTED,
  STUDENTS_FETCH_SUCCEEDED,
  STUDENTS_FETCH_FAILED,
} from '../actions/student';

export default function studentsState(state = {}, action) {
  switch (action.type) {
    case STUDENTS_FETCH_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case STUDENTS_FETCH_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        students: action.students
      };
    case STUDENTS_FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    default:
      return state;
  }
}
