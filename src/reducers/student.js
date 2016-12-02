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
        isFetching: true,
        studentIds: state.studentIds
      };
    case students.SEARCH_STUDENT_SUCCEEDED:
      // const studentToAdd = action.student[0];
      // if (state.studentIds.contains(studentToAdd.student_id)) {
      //   return {
      //     ...state,
      //     isFetching: false
      //   };
      // }

      return {
        ...state,
        isFetching: false,
        // studentIds: [...state.studentIds, action.student[0].student_id],
        searchResult: action.student
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