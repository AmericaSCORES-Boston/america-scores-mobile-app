export const STATS_FETCH_REQUESTED = 'STATS_FETCH_REQUESTED';
export const STATS_FETCH_SUCCEEDED = 'STATS_FETCH_SUCCEEDED';
export const STATS_FETCH_FAILED = 'STAT_FETCH_FAILURE';

export const fetchStats = program_id => ({
    type: STATS_FETCH_REQUESTED,
    program_id
});

export const fetchStatsSuccess = stats => ({
    type: STATS_FETCH_SUCCEEDED,
    stats
});

export const fetchStatsFailure = message => ({
    type: STATS_FETCH_FAILED,
    message
});