export const STUDENT_FETCH_REQUESTED = 'STUDENT_FETCH_REQUESTED';
export const STUDENT_FETCH_SUCCEDED = 'STUDENT_FETCH_SUCCEDED';
export const STUDENT_FETCH_FAILED = 'STUDENT_FETCH_FAILED';

export const fetchStudents = program_id => ({
  type: STUDENT_FETCH_REQUESTED,
  program_id
});

export const fetchStudentsSuccess = students => ({
  type: STUDENT_FETCH_SUCCEDED,
  students
});

export const fetchStudentsFailure = message => ({
  type: STUDENT_FETCH_FAILED,
  message
});
