import {
  CREATE_ACCOUNT_REQUESTED,
  CREATE_ACCOUNT_SUCCEEDED,
  CREATE_ACCOUNT_FAILED
} from '../actions/createAccount';

export default function createAccountState(state = {}, action) {
  switch (action.type) {
    case CREATE_ACCOUNT_REQUESTED:
      return {
        ...state,
        isFetching: true,
        email: action.email,
        username: action.username,
        password: action.password,
        first_name: action.first_name,
        last_name: action.last_name
      };
    case CREATE_ACCOUNT_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
      };
    case CREATE_ACCOUNT_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    default:
      return state;
  }
}
