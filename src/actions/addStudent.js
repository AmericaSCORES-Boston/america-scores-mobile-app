
import { ADD_STUDENT, ADD_STUDENT_SUCCESS, ADD_STUDENT_FAILURE } from '../actions/constants';

export function addStudent(student) {
  return {
    type: ADD_STUDENT,
    student,
  };
}

export function addStudentSuccess() {
  return {
    type: ADD_STUDENT_SUCCESS,
  };
}

export function addStudentFailure() {
  return {
    type: ADD_STUDENT_FAILURE,
  };
}
