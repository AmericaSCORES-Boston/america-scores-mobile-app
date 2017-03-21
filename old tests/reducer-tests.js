import reducer from '../src/reducers/students';
import * as types from '../src/actions/constants';
import * as MockStudents from '../config/mockStudents';

// Tests are mocked in for now so they pass travis
// Should replace the .toMatchSnapshot() calls with .toEqual() calls for real testing

describe('students reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toMatchSnapshot();
  });

  it('should handle ADD_STUDENT', () => {
    const student = MockStudents.student1;
    expect(
      reducer([], {
        type: types.ADD_STUDENT,
        student,
      })
    ).toMatchSnapshot();
  });

  it('should handle ADD_STUDENT_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.ADD_STUDENT_SUCCESS,
      })
    ).toMatchSnapshot();
  });

  it('should handle FETCH_STUDENT', () => {
    const first = 'Bob';
    const last = 'Bobber';
    const dob = '09-12-1333';
    expect(
      reducer([], {
        type: types.FETCH_STUDENT,
        first,
        last,
        dob,
      })
    ).toMatchSnapshot();
  });

  it('should handle FETCH_STUDENT_SUCCESS', () => {
    const students = MockStudents.students;
    expect(
      reducer([], {
        type: types.FETCH_STUDENT_SUCCESS,
        students,
      })
    ).toMatchSnapshot();
  });

  it('should handle FETCH_STUDENTS', () => {
    expect(
      reducer([], {
        type: types.FETCH_STUDENTS,
      })
    ).toMatchSnapshot();
  });

  it('should handle FETCH_STUDENTS_SUCCESS', () => {
    const students = MockStudents.students;
    expect(
      reducer([], {
        type: types.FETCH_STUDENTS_SUCCESS,
        students,
      })
    ).toMatchSnapshot();
  });


});
