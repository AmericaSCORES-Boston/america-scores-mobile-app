import {
  ADD_STUDENT,
  ADD_STUDENT_SUCCESS,
  FETCH_STUDENT,
  FETCH_STUDENTS,
  FETCH_STUDENT_SUCCESS,
  FETCH_STUDENTS_SUCCESS,
} from '../actions/constants';

/* eslint no-fallthrough: 0 */  // --> OFF
export default (state = {}, action) => {
  switch (action.type) {
    case ADD_STUDENT:
      // Set a loading flag
    case ADD_STUDENT_SUCCESS:
      // Add the student to the local state
    case FETCH_STUDENT:
      // Set a loading flag
    case FETCH_STUDENT_SUCCESS:
      // Set the student data (based on id?)
    case FETCH_STUDENTS:
      // Set a loading flag
    case FETCH_STUDENTS_SUCCESS:
      // Set the students data (overwrite stuff from add since it reached the server)
    default:
      return state;
  }
};
