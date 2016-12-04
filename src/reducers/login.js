import {
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED
} from '../actions/login';

export default function loginState(state = {}, action) {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        isFetching: false,
        user: action.user
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    default:
      return state;
  }
}
