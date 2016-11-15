import {
  FETCH_SITES,
  FETCH_SITES_SUCCESS,
  FETCH_SITES_FAILURE,
} from '../actions/constants';

export function fetchSites() {
  return {
    type: FETCH_SITES,
  };
}

export function fetchSitesSuccess(sites) {
  return {
    type: FETCH_SITES_SUCCESS,
    sites,
  };
}

export function fetchSitesFailure() {
  return {
    type: FETCH_SITES_FAILURE,
  };
}
