export const STUDENTS_FETCH_REQUESTED = 'STUDENTS_FETCH_REQUESTED';
export const STUDENTS_FETCH_SUCCEEDED = 'STUDENTS_FETCH_SUCCEEDED';
export const STUDENTS_FETCH_FAILED = 'STUDENTS_FETCH_FAILED';
export const STUDENT_FETCH_REQUESTED = 'STUDENT_FETCH_REQUESTED';
export const STUDENT_FETCH_SUCCEEDED = 'STUDENT_FETCH_REQUESTED';
export const STUDENT_FETCH_FAILED = 'STUDENT_FETCH_REQUESTED';

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

export const fetchStudent = student_id => ({
  type: STUDENT_FETCH_REQUESTED,
  student_id
});

export const fetchStudentSuccess = student => ({
  type: STUDENT_FETCH_SUCCEEDED,
  student
});

export const fetchStudentFailure = message => ({
  type: STUDENT_FETCH_FAILED,
  message
});