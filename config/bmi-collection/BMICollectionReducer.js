import * as actions from 'BMICollectionActions';

export const initialState = {
    currentStudent: "",
    students: []
};

// A Mocked implementation of the BMICollectionReducer.
export default function BMICollectionReducer(state = initialState, action) {
    switch (action.type) {
        case actions.START_BMI_COLLECTION:
            return state;
        case actions.END_BMI_COLLECTION:
            return state;
        case actions.SAVE_STUDENT:
            return state;
        case actions.SAVE_STUDENT_SUCCESS:
            return state;
        case actions.SAVE_STUDENT_FAILURE:
            return state;
        default:
            return state;
    }
}
