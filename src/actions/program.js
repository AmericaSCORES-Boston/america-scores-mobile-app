export const PROGRAM_FETCH_REQUESTED = 'PROGRAM_FETCH_REQUESTED';
export const PROGRAM_FETCH_SUCCEDED = 'PROGRAM_FETCH_SUCCEDED';
export const PROGRAM_FETCH_FAILED = 'PROGRAM_FETCH_FAILED';
export const ADD_PROGRAM_REQUESTED = 'ADD_PROGRAM_REQUESTED';
export const ADD_PROGRAM_SUCCEDED = 'ADD_PROGRAM_SUCCEDED';
export const ADD_PROGRAM_FAILED = 'ADD_PROGRAM_FAILED';

export const fetchPrograms = site_id => ({
  type: PROGRAM_FETCH_REQUESTED,
  site_id
});

export const fetchProgramsSuccess = programs => ({
  type: PROGRAM_FETCH_SUCCEDED,
  programs
});

export const fetchProgramsFailure = message => ({
  type: PROGRAM_FETCH_FAILED,
  message
});

export const addProgram = (site_id, program_name) => ({
  type: ADD_PROGRAM_REQUESTED,
  site_id,
  program_name
});

export const addProgramSuccess = program => ({
  type: ADD_PROGRAM_SUCCEDED,
  program
});

export const addProgramFailure = message => ({
  type: ADD_PROGRAM_FAILED,
  message
});
