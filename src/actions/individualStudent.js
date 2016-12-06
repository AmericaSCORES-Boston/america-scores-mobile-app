export const INDIVIDUAL_STUDENT_FETCH_REQUESTED = 'INDIVIDUAL_STUDENT_FETCH_REQUESTED';
export const INDIVIDUAL_STUDENT_FETCH_SUCCEEDED = 'INDIVIDUAL_STUDENT_FETCH_SUCCEEDED';
export const INDIVIDUAL_STUDENT_FETCH_FAILED = 'INDIVIDUAL_STUDENT_FETCH_FAILED';
export const INDIVIDUAL_STUDENT_UPDATE_REQUESTED = 'INDIVIDUAL_STUDENT_UPDATE_REQUESTED';
export const INDIVIDUAL_STUDENT_UPDATE_SUCCEEDED = 'INDIVIDUAL_STUDENT_UPDATE_SUCCEEDED';
export const INDIVIDUAL_STUDENT_UPDATE_FAILED = 'INDIVIDUAL_STUDENT_UPDATE_FAILED';

export const fetchStudent = student_id => ({
  type: INDIVIDUAL_STUDENT_FETCH_REQUESTED,
  student_id
});

export const fetchStudentSuccess = (student, stats) => ({
  type: INDIVIDUAL_STUDENT_FETCH_SUCCEEDED,
  student,
  stats
});

export const fetchStudentFailure = message => ({
  type: INDIVIDUAL_STUDENT_FETCH_FAILED,
  message
});

export const updateStudent = newStudent => ({
  type: INDIVIDUAL_STUDENT_UPDATE_REQUESTED,
  newStudent
});

export const updateStudentSuccess = newStudent => ({
  type: INDIVIDUAL_STUDENT_UPDATE_SUCCEEDED,
  newStudent
});

export const updateStudentFailure = message => ({
  type: INDIVIDUAL_STUDENT_UPDATE_FAILED,
  message
});