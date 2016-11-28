export const STUDENT_FETCH_REQUESTED = 'STUDENT_FETCH_REQUESTED';
export const STUDENT_FETCH_SUCCEEDED = 'STUDENT_FETCH_SUCCEEDED';
export const STUDENT_FETCH_FAILED = 'STUDENT_FETCH_FAILED';

export const fetchStudents = program_id => ({
  type: STUDENT_FETCH_REQUESTED,
  program_id
});

export const fetchStudentsSuccess = students => ({
  type: STUDENT_FETCH_SUCCEEDED,
  students
});

export const fetchStudentsFailure = message => ({
  type: STUDENT_FETCH_FAILED,
  message
});
