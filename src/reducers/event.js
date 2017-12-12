import * as event from '../actions/event';

export default function eventsState(state = {}, action) {
    switch (action.type) {
        case event.EVENTS_FETCH_REQUESTED:
        case event.CREATE_EVENT_REQUESTED:
            return {
                ...state,
                isFetching: true
            };
        case event.EVENTS_FETCH_SUCCEEDED:
            return {
                ...state,
                isFetching: false,
                events: action.events
            };
        case event.CREATE_EVENT_SUCCEEDED:
            return {
                ...state,
                isFetching: false,
                events: [...state.events, action.event]
            };
        case event.EVENTS_FETCH_FAILED:
        case event.CREATE_EVENT_FAILED:
            return {
                ...state,
                isFetching: false,
                message: action.message
            };
        default:
            return state;
    }
}
