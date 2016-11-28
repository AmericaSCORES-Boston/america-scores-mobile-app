export const PROGRAM_FETCH_REQUESTED = 'PROGRAM_FETCH_REQUESTED';
export const PROGRAM_FETCH_SUCCEEDED = 'PROGRAM_FETCH_SUCCEEDED';
export const PROGRAM_FETCH_FAILED = 'PROGRAM_FETCH_FAILED';

export const fetchPrograms = site_id => ({
  type: PROGRAM_FETCH_REQUESTED,
  site_id
});

export const fetchProgramsSuccess = programs => ({
  type: PROGRAM_FETCH_SUCCEEDED,
  programs
});

export const fetchProgramsFailure = message => ({
  type: PROGRAM_FETCH_FAILED,
  message
});
