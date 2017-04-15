export const EVENTS_FETCH_REQUESTED = 'EVENTS_FETCH_REQUESTED';
export const EVENTS_FETCH_SUCCEEDED = 'EVENTS_FETCH_SUCCEEDED';
export const EVENTS_FETCH_FAILED = 'EVENTS_FETCH_FAILED';

export const CREATE_EVENT_REQUESTED = 'CREATE_EVENT_REQUESTED';
export const CREATE_EVENT_SUCCEEDED = 'CREATE_EVENT_SUCCEEDED';
export const CREATE_EVENT_FAILED = 'CREATE_EVENT_FAILED';

export const fetchEvents = program_id => ({
    type: EVENTS_FETCH_REQUESTED,
    program_id
});

export const fetchEventsSuccess = events => ({
    type: EVENTS_FETCH_SUCCEEDED,
    events
});

export const fetchEventsFailure = message => ({
    type: EVENTS_FETCH_FAILED,
    message
});

export const createEvent = program_id => ({
    type: CREATE_EVENT_REQUESTED,
    program_id
});

export const createEventSuccess = event => ({
    type: CREATE_EVENT_SUCCEEDED,
    event
});

export const createEventFailure = message => ({
    type: CREATE_EVENT_FAILED,
    message
});
