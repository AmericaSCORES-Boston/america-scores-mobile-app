export const SITE_FETCH_REQUESTED = 'SITE_FETCH_REQUESTED';
export const SITE_FETCH_SUCCEEDED = 'SITE_FETCH_SUCCEEDED';
export const SITE_FETCH_FAILED = 'SITE_FETCH_FAILED';

export const fetchSites = () => ({
  type: SITE_FETCH_REQUESTED
});

export const fetchSitesSuccess = sites => ({
  type: SITE_FETCH_SUCCEEDED,
  sites
});

export const fetchSitesFailure = message => ({
  type: SITE_FETCH_FAILED,
  message
});
