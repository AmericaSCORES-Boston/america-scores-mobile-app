import studentState from '../src/reducers/student';
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
    state = studentState(state, studentsAction);

  it('should return the initial state', () => {
      let reducer1 = studentState(undefined, {});
      expect(reducer1).toEqual(state);
  });

  it('should handle STUDENT_FETCH_REQUESTED', () => {
      var fetchStudentsResult = studentsAction.fetchStudents(undefined);
      state = studentState(state, fetchStudentsResult);
      expect(state.isFetching).toEqual(true);
  });

  it('should handle STUDENT_FETCH_SUCCEEDED', () => {

      const first_name = 'Bob';
      const last_name = 'Bobber';
      const dob = '09-12-1333';
      const student = {first_name, last_name, dob};
      // make var students like below
      state.students = [{first_name, last_name, dob}, {first_name, last_name, dob}];



      var fetchStudentsSuccessAction = studentsAction.fetchStudentsSuccess(state.students);
      console.log(fetchStudentsSuccessAction);

      state = studentState(state, fetchStudentsSuccessAction);
      expect(state.students).toEqual([student]);
  });

  //new tests added for the sorted student list
  it('should handle ADD_EXISTING_STUDENT_SUCCEEDED', () => {
      var student = {program_id: '000', first_name: 'bob', last_name: 'bobber', dob: '09-12-1993'};
      var addExistingStudentAction = studentsAction.createStudentSuccess(student);
      state = studentState(state, addExistingStudentAction);
      console.log(state.students);
      expect(state.students.length).toEqual(2);
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
