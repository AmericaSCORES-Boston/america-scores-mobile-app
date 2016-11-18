import {
  SITE_FETCH_REQUESTED,
  SITE_FETCH_SUCCEDED,
  SITE_FETCH_FAILED,
} from '../actions/site';

export default function sitesState(state = {}, action) {
  switch (action.type) {
    case SITE_FETCH_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case SITE_FETCH_SUCCEDED:
      return {
        ...state,
        isFetching: false,
        sites: action.sites
      };
    case SITE_FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    default:
      return state;
  }
}
