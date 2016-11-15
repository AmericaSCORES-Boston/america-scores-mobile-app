import {
  FETCH_SITES,
  FETCH_SITES_SUCCESS,
  FETCH_SITES_FAILURE,
} from '../actions/constants';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SITES:
      return { ...state, isLoading: true }
    case FETCH_SITES_SUCCESS:
      return { ...state, sites: action.sites, isLoading: false }
    case FETCH_SITES_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state;
  }
};
