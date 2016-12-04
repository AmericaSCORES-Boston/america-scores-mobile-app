export const LOAD_PACER_TEST = 'LOAD_PACER_TEST';
export const PACER_ITEM_TAPPED = 'PACER_ITEM_TAPPED';
export const PACER_ITEM_LONGPRESS = 'PACER_ITEM_LONGPRESS';

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
