export const SAVE_COLLECTED_BMI_DATA_REQUESTED = 'SAVE_COLLECTED_BMI_DATA_REQUESTED';
export const SAVE_COLLECTED_BMI_DATA_SUCCEEDED = 'SAVE_COLLECTED_BMI_DATA_SUCCEEDED';
export const SAVE_COLLECTED_BMI_DATA_FAILED = 'SAVE_COLLECTED_BMI_DATA_FAILED';

export const saveCollectedBmiData = (event_id, stats) => ({
    type: SAVE_COLLECTED_BMI_DATA_REQUESTED,
    event_id,
    stats
});

export const saveCollectedBmiDataSuccess = message => ({
    type: SAVE_COLLECTED_BMI_DATA_SUCCEEDED,
    message
});

export const saveCollectedBmiDataFailure = message => ({
    type: SAVE_COLLECTED_BMI_DATA_FAILED,
    message
});