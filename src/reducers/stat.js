import * as stat from '../actions/stat';

export default function statState(state = {}, action) {
    switch (action.type) {
        case stat.STATS_FETCH_REQUESTED:
            return {
                ...state,
                isFetching: true
            };
        case stat.STATS_FETCH_SUCCEEDED:
            return {
                ...state,
                isFetching: false,
                stats: action.stats
            };
        case stat.STATS_FETCH_FAILED:
            return {
                ...state,
                isFetching: false,
                message: action.message
            };
        default:
            return state;
    }
}
