export const CREATE_ACCOUNT_REQUESTED = 'CREATE_ACCOUNT_REQUESTED';
export const CREATE_ACCOUNT_SUCCEEDED = 'CREATE_ACCOUNT_SUCCEEDED';
export const CREATE_ACCOUNT_FAILED = 'CREATE_ACCOUNT_FAILED';

export const createAccount = (email, username, password, first_name, last_name) => ({
  type: CREATE_ACCOUNT_REQUESTED,
  email,
  username,
  password,
  first_name,
  last_name
});

export const createAccountSuccess = () => ({
  type: CREATE_ACCOUNT_SUCCEEDED,
});

export const createAccountFailure = message => ({
  type: CREATE_ACCOUNT_FAILED,
  message
});