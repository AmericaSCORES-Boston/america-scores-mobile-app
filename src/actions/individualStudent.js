export const STUDENT_FETCH_REQUESTED = 'STUDENT_FETCH_REQUESTED';
export const STUDENT_FETCH_SUCCEEDED = 'STUDENT_FETCH_REQUESTED';
export const STUDENT_FETCH_FAILED = 'STUDENT_FETCH_REQUESTED';

export const fetchStudent = student_id => ({
  type: STUDENT_FETCH_REQUESTED,
  student_id
});

export const fetchStudentSuccess = student => ({
  type: STUDENT_FETCH_SUCCEEDED,
  student,
  stats
});

export const fetchStudentFailure = message => ({
  type: STUDENT_FETCH_FAILED,
  message
});