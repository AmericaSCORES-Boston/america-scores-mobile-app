import {
  FETCH_STUDENTS,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  FETCH_STUDENT,
  FETCH_STUDENT_SUCCESS,
  FETCH_STUDENT_FAILURE,
} from '../actions/constants';

export function fetchStudents() {
  return {
    type: FETCH_STUDENTS,
  };
}

export function fetchStudentsSuccess(students) {
  return {
    type: FETCH_STUDENTS_SUCCESS,
    students,
  };
}

export function fetchStudentsFailure() {
  return {
    type: FETCH_STUDENTS_FAILURE,
  };
}

export function fetchStudent(first, last, dob) {
  return {
    type: FETCH_STUDENT,
    first,
    last,
    dob,
  };
}

export function fetchStudentSuccess(student) {
  return {
    type: FETCH_STUDENT_SUCCESS,
    student,
  };
}

export function fetchStudentFailure() {
  return {
    type: FETCH_STUDENT_FAILURE,
  };
}
