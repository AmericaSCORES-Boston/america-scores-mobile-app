export const STAT_CREATE_REQUESTED = 'STAT_CREATE_REQUESTED';
export const STAT_CREATE_SUCCEEDED = 'STAT_CREATE_SUCCEEDED';

export const STAT_FETCH_REQUESTED = 'STATS_FETCH_REQUESTED';
export const STAT_FETCH_SUCCEEDED = 'STATS_FETCH_SUCCEEDED';

export const STUDENT_STATS_FETCH_REQUESTED = 'STUDENT_STATS_FETCH_REQUESTED';
export const STUDENT_STATS_FETCH_SUCCEEDED = 'STUDENT_STATS_FETCH_SUCCEEDED';
export const STUDENT_STATS_FETCH_FAILED = 'STUDENT_STATS_FETCH_FAILED';

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

export const fetchStatsForStudent = student_id => ({
    type: STUDENT_STATS_FETCH_REQUESTED,
    student_id
})

export const fetchStatsForStudentSuccess = stats => ({
    type: STUDENT_STATS_FETCH_SUCCEEDED,
    stats
});

export const fetchStatsForStudentFailure = message => ({
    type: STUDENT_STATS_FETCH_FAILED,
    message
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