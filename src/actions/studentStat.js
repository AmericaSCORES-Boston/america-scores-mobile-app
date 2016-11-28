export const STAT_CREATE_REQUESTED = 'STAT_CREATE_REQUESTED';
export const STAT_CREATE_SUCCEEDED = 'STAT_CREATE_SUCCEEDED';

export const STAT_FETCH_REQUESTED = 'STATS_FETCH_REQUESTED';
export const STAT_FETCH_SUCCEEDED = 'STATS_FETCH_SUCCEEDED';

export const STAT_UPDATE_REQUESTED = 'STAT_UPDATE_REQUESTED';
export const STAT_UPDATE_SUCCEEDED = 'STAT_UPDATE_SUCCEEDED';

export const STAT_REQUEST_FAILED = 'STAT_REQUEST_FAILED';

export const createStat = stat => ({
    type: STAT_CREATE_REQUESTED,
    stat
});

export const createStatSuccess = status => ({
    type: STAT_CREATE_SUCCEEDED,
    status
});

export const fetchStat = stat_id => ({
    type: STAT_FETCH_REQUESTED,
    stat_id
});

export const fetchStatSuccess = stat => ({
    type: STAT_FETCH_SUCCEEDED,
    stat
});

export const updateStat = stat => ({
    type: STAT_UPDATE_REQUESTED,
    stat
});

export const updateStatSuccess = status => ({
    type: STAT_UPDATE_SUCCEEDED,
    status
});

export const statRequestFailure = message => ({
    type: STAT_REQUEST_FAILED,
    message
});