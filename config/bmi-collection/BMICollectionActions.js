export const START_BMI_COLLECTION = "START_BMI_COLLECTION";
export const END_BMI_COLLECTION = "END_BMI_COLLECTION";
export const SAVE_STUDENT = "SAVE_STUDENT";
export const SAVE_STUDENT_SUCCESS = "SAVE_STUDENT_SUCCESS";
export const SAVE_STUDENT_FAILURE = "SAVE_STUDENT_FAILURE";

export function startBMICollection(studentsToFilter) {
    return {
        type: START_BMI_COLLECTION,
        students: studentsToFilter
    }
}

export function endBMICollection(studentsToFilter) {
    return {
        type: END_BMI_COLLECTION,
        students: studentsToFilter
    }
}

export function saveStudent(student) {
    return {
        type: SAVE_STUDENT,
        student: student
    }
}

export function onSaveStudentSuccess(student) {
    return {
        type: SAVE_STUDENT_SUCCESS,
        student: student

    }
}

export function onSaveStudentFailure(student) {
    return {
        type: SAVE_STUDENT_FAILURE,
        student: student
    }
}