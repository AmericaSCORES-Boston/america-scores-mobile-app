export const LOAD_PACER_TEST = 'LOAD_PACER_TEST';
export const PACER_ITEM_TAPPED = 'PACER_ITEM_TAPPED';
export const PACER_ITEM_LONGPRESS = 'PACER_ITEM_LONGPRESS';
export const TIME_INTERVAL_ELAPSED = 'TIME_INTERVAL_ELAPSED';
export const MAX_SHUTTLES_REACHED = 'MAX_SHUTTLES_REACHED';
export const SAVE_PACER_DATA_REQUESTED = 'SAVE_PACER_DATA_REQUESTED';
export const SAVE_PACER_DATA_SUCCEEDED = 'SAVE_PACER_DATA_SUCCEEDED';
export const SAVE_PACER_DATA_FAILED = 'SAVE_PACER_DATA_FAILED';

export const loadPacerTest = numStudents => ({
    type: LOAD_PACER_TEST,
    numStudents
});

export const pacerItemTapped = index => ({
    type: PACER_ITEM_TAPPED,
    index
});

export const pacerItemLongPress = index => ({
    type: PACER_ITEM_LONGPRESS,
    index
});

export const timeIntervalElapsed = () => ({
  type: TIME_INTERVAL_ELAPSED
});

export const maxShuttlesReached = () => ({
  type: MAX_SHUTTLES_REACHED
});

//save pacer data requested succeeded and failed
//input with index and the pacer stats
export const savePacerData = (event_id, stats) => ({
    type: SAVE_PACER_DATA_REQUESTED,
    event_id,
    stats
});

export const saveCollectedBmiDataSuccess = message => ({
    type: SAVE_PACER_DATA_SUCCEEDED,
    message
});

export const saveCollectedBmiDataFailure = message => ({
    type: SAVE_PACER_DATA_FAILED,
    message
});
