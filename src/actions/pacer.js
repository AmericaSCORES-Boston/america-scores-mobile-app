export const LOAD_PACER_TEST = 'LOAD_PACER_TEST';
export const PACER_ITEM_TAPPED = 'PACER_ITEM_TAPPED';
export const PACER_ITEM_LONGPRESS = 'PACER_ITEM_LONGPRESS';
export const TIME_INTERVAL_ELAPSED = 'TIME_INTERVAL_ELAPSED';
export const MAX_SHUTTLES_REACHED = 'MAX_SHUTTLES_REACHED';

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
