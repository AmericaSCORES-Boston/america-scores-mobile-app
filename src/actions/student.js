export const STUDENT_FETCH_REQUESTED = 'STUDENT_FETCH_REQUESTED';
export const STUDENT_FETCH_SUCCEEDED = 'STUDENT_FETCH_SUCCEEDED';
export const STUDENT_FETCH_FAILED = 'STUDENT_FETCH_FAILED';

export const STUDENTS_FETCH_REQUESTED = 'STUDENTS_FETCH_REQUESTED';
export const STUDENTS_FETCH_SUCCEEDED = 'STUDENTS_FETCH_SUCCEEDED';
export const STUDENTS_FETCH_FAILED = 'STUDENTS_FETCH_FAILED';

export const SEARCH_STUDENT_REQUESTED = 'SEARCH_STUDENT_REQUESTED';
export const SEARCH_STUDENT_SUCCEEDED = 'SEARCH_STUDENT_SUCCEEDED';
export const SEARCH_STUDENT_FAILED = 'SEARCH_STUDENT_FAILED';

export const CREATE_STUDENT_REQUESTED = 'CREATE_STUDENT_REQUESTED';
export const CREATE_STUDENT_SUCCEEDED = 'CREATE_STUDENT_SUCCEEDED';
export const CREATE_STUDENT_FAILED = 'CREATE_STUDENT_FAILED';

export const ADD_EXISTING_STUDENT_REQUESTED = 'ADD_EXISTING_STUDENT_REQUESTED';
export const ADD_EXISTING_STUDENT_SUCCEEDED = 'ADD_EXISTING_STUDENT_SUCCEEDED';
export const ADD_EXISTING_STUDENT_FAILED = 'ADD_EXISTING_STUDENT_FAILED';

export const fetchStudent = student_id => ({
  type: STUDENT_FETCH_REQUESTED,
  student_id
})

export const fetchStudentSuccess = student => ({
  type: STUDENT_FETCH_SUCCEEDED,
  student
});

export const fetchStudentFailure = message => ({
  type: STUDENT_FETCH_FAILED,
  message
});

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

export const searchStudent = (first_name, last_name, dob) => ({
  type: SEARCH_STUDENT_REQUESTED,
  first_name,
  last_name,
  dob
});

export const searchStudentSuccess = (students) => ({
  type: SEARCH_STUDENT_SUCCEEDED,
  students
});

export const searchStudentFailure = message => ({
  type: SEARCH_STUDENT_FAILED,
  message
});

export const createStudent = (program_id, first_name, last_name, dob) => ({
  type: CREATE_STUDENT_REQUESTED,
  program_id,
  first_name,
  last_name,
  dob
});

export const createStudentSuccess = student => ({
  type: CREATE_STUDENT_SUCCEEDED,
  student
});

export const createStudentFailure = message => ({
  type: CREATE_STUDENT_FAILED,
  message
});

export const addExistingStudent = (program_id, student_ids, student) => ({
  type: ADD_EXISTING_STUDENT_REQUESTED,
  program_id,
  student_ids,
  student
});

export const addExistingStudentSuccess = student => ({
  type: ADD_EXISTING_STUDENT_SUCCEEDED,
  student
});

export const addExistingStudentFailure = message => ({
  type: ADD_EXISTING_STUDENT_FAILED,
  message
});