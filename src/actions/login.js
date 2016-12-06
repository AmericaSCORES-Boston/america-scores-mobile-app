export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const loginUser = () => ({
  type: LOGIN_REQUESTED
});

export const loginUserSuccess = user => ({
  type: LOGIN_SUCCEEDED,
  user
});

export const loginUserFailure = message => ({
  type: LOGIN_FAILED,
  message
});