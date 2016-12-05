export const STUDENT_FETCH_REQUESTED = 'STUDENT_FETCH_REQUESTED';
export const STUDENT_FETCH_SUCCEEDED = 'STUDENT_FETCH_SUCCEEDED';
export const STUDENT_FETCH_FAILED = 'STUDENT_FETCH_FAILED';
export const STUDENT_UPDATE_REQUESTED = 'STUDENT_UPDATE_REQUESTED';
export const STUDENT_UPDATE_SUCCEEDED = 'STUDENT_UPDATE_SUCCEEDED';
export const STUDENT_UPDATE_FAILED = 'STUDENT_UPDATE_FAILED';

export const fetchStudent = student_id => ({
  type: STUDENT_FETCH_REQUESTED,
  student_id
});

export const fetchStudentSuccess = (student, stats) => ({
  type: STUDENT_FETCH_SUCCEEDED,
  student,
  stats
});

export const fetchStudentFailure = message => ({
  type: STUDENT_FETCH_FAILED,
  message
});

export const updateStudent = newStudent => ({
  type: STUDENT_UPDATE_REQUESTED,
  newStudent
});

export const updateStudentSuccess = newStudent => ({
  type: STUDENT_UPDATE_SUCCEEDED,
  newStudent
});

export const updateStudentFailure = message => ({
  type: STUDENT_UPDATE_FAILED,
  message
});