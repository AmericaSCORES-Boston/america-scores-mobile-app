export const START_BMI_COLLECTION = 'START_BMI_COLLECTION';
export const CONTINUE_BMI_COLLECTION = 'CONTINUE_BMI_COLLECTION';

export const startBMICollection = bmi_program_id => ({
    type: START_BMI_COLLECTION,
    bmi_program_id
});

export const continueBMICollection = bmi_continue => ({
    type: CONTINUE_BMI_COLLECTION
});
