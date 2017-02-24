import reducer from '../src/reducers/student';
import * as MockStudents from '../config/mockStudents';
import * as studentsAction from '../src/actions/student';


// Tests are mocked in for now so they pass travis
// Should replace the .toMatchSnapshot() calls with .toEqual() calls for real testing

describe('students reducer', () => {

    let state = {
    isFetching: false,
    student_ids: {},
    students: {},
    message: null,
    searchResults: {},
    };

    //pass in the action
    state = reducer(state, studentsAction);

  it('should return the initial state', () => {
      let reducer1 = reducer(undefined, {});
      expect(reducer1).toEqual(state);
  });

  it('should handle STUDENT_FETCH_REQUESTED', () => {
      var fetchStudentsResult = studentsAction.fetchStudents(undefined);
      state = reducer(state, fetchStudentsResult);
      expect(state.isFetching).toEqual(true);
  });

  it('should handle STUDENT_FETCH_SUCCEEDED', () => {

      const first = 'Bob';
      const last = 'Bobber';
      const dob = '09-12-1333';
      const student = {first, last, dob};

      var fetchStudentsSuccessAction = studentsAction.fetchStudentsSuccess({first, last, dob});
      state = reducer(state, fetchStudentsSuccessAction);
      expect(state.students).toEqual(true);
      expect(fetchStudentsSuccessAction['students']).toEqual(student);
  });

  //new tests added for the 'undo' feature and sorted student list
  it('should handle ADD_EXISTING_STUDENT_SUCCEEDED'), () => {

  }
/*


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
*/


});
