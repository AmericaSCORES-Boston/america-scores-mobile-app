export const STUDENT_FETCH_REQUESTED = 'STATS_FETCH_REQUESTED';
export const STUDENT_FETCH_SUCCEEDED = 'STATS_FETCH_SUCCEEDED';
export const STUDENT_FETCH_FAILED = 'STATS_FETCH_FAILED';

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
