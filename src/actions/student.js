export const STUDENTS_FETCH_REQUESTED = 'STUDENTS_FETCH_REQUESTED';
export const STUDENTS_FETCH_SUCCEEDED = 'STUDENTS_FETCH_SUCCEEDED';
export const STUDENTS_FETCH_FAILED = 'STUDENTS_FETCH_FAILED';

export const fetchStudents = program_id => ({
  type: STUDENTS_FETCH_REQUESTED,
  program_id
});

export const fetchStudentsSuccess = students => ({
  type: STUDENTS_FETCH_SUCCEEDED,
  students
});

export const fetchStudentsFailure = message => ({
  type: STUDENTS_FETCH_FAILED,
  message
});