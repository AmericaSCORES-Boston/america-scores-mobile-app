import * as students from '../actions/student';

export default function studentsState(state = {}, action) {
  switch (action.type) {
    case students.STUDENT_FETCH_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case students.STUDENT_FETCH_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        student_ids: action.students.map((student) => student.student_id),
        students: action.students
      };
    case students.STUDENT_FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    case students.SEARCH_STUDENT_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case students.SEARCH_STUDENT_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        searchResults: action.students
      };
    case students.SEARCH_STUDENT_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    case students.CREATE_STUDENT_REQUESTED:
    case students.ADD_EXISTING_STUDENT_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case students.CREATE_STUDENT_SUCCEEDED:
    case students.ADD_EXISTING_STUDENT_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        student_ids: [...state.student_ids, action.student.student_id],
        students: [...state.students, action.student]
      };
    case students.CREATE_STUDENT_FAILED:
    case students.ADD_EXISTING_STUDENT_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    default:
      return state;
  }
}