import * as students from '../actions/student';

//export for test purposes
export const initialState = {
    isFetching: false,
    student_ids: {},
    students: {},
    message: null,
    searchResults: {},
};

export default function studentsState(state = initialState, action) {
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
        students: sortList(action.students)
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
        students: sortList([...state.students, action.student])
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

function sortList(studentList) {
  studentList.sort(function(a,b){
    if(a.first_name < b.first_name) return -1;
    if(a.first_name > b.first_name) return 1;
    return 0;
  });
  return studentList;
}
