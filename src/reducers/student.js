import {
  STUDENT_FETCH_REQUESTED,
  STUDENT_FETCH_SUCCEDED,
  STUDENT_FETCH_FAILED
} from '../actions/student';

export default function studentsState(state = {}, action) {
  switch (action.type) {
    case STUDENT_FETCH_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case STUDENT_FETCH_SUCCEDED:
      return {
        ...state,
        isFetching: false,
        students: action.students
      };
    case STUDENT_FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    default:
      return state;
  }
}
