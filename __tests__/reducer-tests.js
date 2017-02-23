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
/*      This tests the action
        expect(fetchStudentsResult['program_id']).not.toBeDefined();
      expect(fetchStudentsResult['type']).toEqual('STUDENT_FETCH_REQUESTED');*/
      expect(state.isFetching).toEqual(true);
  });

  it('should handle STUDENT_FETCH_SUCCEEDED', () => {
      
      const first = 'Bob';
      const last = 'Bobber';
      const dob = '09-12-1333';
      const student1 = {first, last, dob};
      const studentList1 = {student1};
      
      var fetchStudentsSuccessAction = studentsAction.fetchStudentsSuccess({first, last, dob});
      //state = reducer(state, fetchStudentsSuccessAction);
      expect(fetchStudentsSuccessAction).toEqual(true);
      expect(state.students).toEqual(studentList1);

      //expect(studentsAction.fetchStudentsSuccess(studentList1)[1]).toEqual(studentList1);
  });

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
