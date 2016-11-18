export const SITE_FETCH_REQUESTED = 'SITE_FETCH_REQUESTED';
export const SITE_FETCH_SUCCEDED = 'SITE_FETCH_SUCCEDED';
export const SITE_FETCH_FAILED = 'SITE_FETCH_FAILED';

export const fetchSites = () => ({
  type: SITE_FETCH_REQUESTED,
});

export const fetchSitesSuccess = sites => ({
  type: SITE_FETCH_SUCCEDED,
  sites,
});

export const fetchSitesFailure = message => ({
  type: SITE_FETCH_FAILED,
  message,
});
