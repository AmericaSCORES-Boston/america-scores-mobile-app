import studentState from '../src/reducers/student';
import * as studentsAction from '../src/actions/student';

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

  it('should handle SEARCH_STUDENT_REQUESTED', () => {
    var searchResult = studentsAction.searchStudent("bob", "bobber", "09-12-1333");
    state = studentState(state, searchResult);
    expect(state.isFetching).toEqual(true);
  });

  it('should handle STUDENT_FETCH_SUCCEEDED', () => {
    var student = {first_name: 'bob', last_name: 'bobber', dob: '09-12-1333'}
    state.students = [student];
    var fetchStudentsSuccessAction = studentsAction.fetchStudentsSuccess(state.students);
    state = studentState(state, fetchStudentsSuccessAction);
    expect(state.students).toEqual([student]);
  });

  it('should handle SEARCH_STUDENT_SUCCEEDED', () => {
    var student = {first_name: 'bob', last_name: 'bobber', dob: '09-12-1333'}
    state.students = [student];
    var searchSuccess = studentsAction.searchStudentSuccess(state.students);
    //console.log(fetchStudentsSuccessAction);
    state = studentState(state, searchSuccess);
    expect(state.students).toEqual([student]);
  });

  it('should handle STUDENT_FETCH_FAILED', () => {
    const error = "fetch failed";
    var fetchStudentsFailureAction = studentsAction.fetchStudentsFailure(error);
    state = studentState(state, fetchStudentsFailureAction);
    expect(state.message).toEqual(error);
  });

  it('should handle SEARCH_STUDENT_FAILED', () => {
    const error = "search failed";
    var searchFailure = studentsAction.searchStudentFailure(error);
    state = studentState(state, searchFailure);
    expect(state.message).toEqual(error);
  });

  it('should handle CREATE_STUDENT_REQUESTED', () => {
    var student = {first_name: 'bob', last_name: 'bobber', dob: '09-12-1333'}
    var createStudentRequested = studentsAction.createStudent(student);
    state = studentState(state, createStudentRequested);
    expect(state.isFetching).toEqual(true);
  });

  it('should handle CREATE_STUDENT_SUCCEEDED', () => {
    var student = {program_id: '000', first_name: 'bob', last_name: 'bobber', dob: '09-12-1993'};
    var createSuccess = studentsAction.createStudentSuccess(student);
    state = studentState(state, createSuccess);
    //console.log(state.students);
    expect(state.students.length).toEqual(2);
  });


    it('should handle CREATE_STUDENT_FAILED', () => {
      const error = "failed to create a student";
      var createFailed = studentsAction.createStudentFailure(error);
      state = studentState(state, createFailed);
      //console.log(state.students);
      expect(state.message).toEqual(error);
    });


  it('students sorted by first name after creating a student to empty list', () => {
    //clear the students list
    state.students = [];
    var student = {program_id: '000', first_name: 'Rosaline', last_name: 'A', dob: '05-05-1995'};
    var createStudentSuccessAction = studentsAction.createStudentSuccess(student);
    state = studentState(state, createStudentSuccessAction);
    //console.log(state.students);
    //new length should reflect the adding action
    expect(state.students.length).toEqual(1);
    //the student should be stored first in the array because it is the only student
    expect(state.students[0]).toEqual(student);
  });

  it('students sorted by first name after creating a student to existing list', () => {
    state.students = [{first_name: 'Pear', last_name: 'P', dob: '02-02-1999'},
    {first_name: 'Alice', last_name: 'Opal', dob: '03-03-1998'},
    {first_name: 'Bob', last_name: 'Bobber', dob: '04-04-1997'}];
    var student = {program_id: '000', first_name: 'Apple', last_name: 'A', dob: '05-05-1995'};
    var createStudentSuccessAction = studentsAction.createStudentSuccess(student);
    state = studentState(state, createStudentSuccessAction);
    console.log(state.students);
    //new length should reflect the adding action
    expect(state.students.length).toEqual(4);
    //since Apple comes after Alice, the student should be stored second in the array
    expect(state.students[1]).toEqual(student);
    //The rest of the list should still be sorted alphabetically after the new student is added
    expect(state.students[0]).toEqual({first_name: 'Alice', last_name: 'Opal', dob: '03-03-1998'});
    expect(state.students[2]).toEqual({first_name: 'Bob', last_name: 'Bobber', dob: '04-04-1997'});
    expect(state.students[3]).toEqual({first_name: 'Pear', last_name: 'P', dob: '02-02-1999'});


  });

  it('students sorted by first name more detailed comparison', () => {

    state.students = [{first_name: 'Rosaline', last_name: 'P', dob: '02-02-1999'},
    {first_name: 'Roslyn', last_name: 'Opal', dob: '03-03-1998'}];
    var student = {program_id: '000', first_name: 'Rosalind', last_name: 'A', dob: '05-05-1995'};
    var createStudentSuccessAction = studentsAction.createStudentSuccess(student);
    state = studentState(state, createStudentSuccessAction);
    //console.log(state.students);
    //new length should reflect the adding action
    expect(state.students.length).toEqual(3);
    //Test the order of the modified list
    //The rest of the list should still be sorted alphabetically after the new student is added
    expect(state.students[0]).toEqual(student);
    expect(state.students[1]).toEqual({first_name: 'Rosaline', last_name: 'P', dob: '02-02-1999'});
    expect(state.students[2]).toEqual({first_name: 'Roslyn', last_name: 'Opal', dob: '03-03-1998'});

  });

  it('student added in with same first names should not be sorted by last name', () => {

    //The sorted list should not care about last names' order
    state.students = [{first_name: 'Alice', last_name: 'P', dob: '02-02-1999'},
    {first_name: 'Alice', last_name: 'Opal', dob: '03-03-1998'},
    {first_name: 'Alice', last_name: 'Z', dob: '04-03-1998'}];
    var student = {program_id: '000', first_name: 'Alice', last_name: 'A', dob: '05-05-1995'};
    var createStudentSuccessAction = studentsAction.createStudentSuccess(student);
    state = studentState(state, createStudentSuccessAction);
    console.log(state.students);
    //new length should reflect the adding action
    expect(state.students.length).toEqual(4);
    //Test the order of the modified list
    //The rest of the list should still be sorted alphabetically after the new student is added
    expect(state.students[0]).toEqual({first_name: 'Alice', last_name: 'P', dob: '02-02-1999'});
    expect(state.students[1]).toEqual({first_name: 'Alice', last_name: 'Opal', dob: '03-03-1998'});
    expect(state.students[2]).toEqual({first_name: 'Alice', last_name: 'Z', dob: '04-03-1998'});
    expect(state.students[3]).toEqual({program_id: '000', first_name: 'Alice', last_name: 'A', dob: '05-05-1995'});

  });

  it('student name being a number should not be passed in as a number when sorting', () => {

    //Edge case: when number is passed as string, it should be sorted not as numbers
    state.students = [{first_name: '10', last_name: 'P', dob: '02-02-1999'}];
    var student = {program_id: '000', first_name: '2', last_name: 'A', dob: '05-05-1995'};
    var createStudentSuccessAction = studentsAction.createStudentSuccess(student);
    state = studentState(state, createStudentSuccessAction);
    console.log(state.students);
    //new length should reflect the adding action
    expect(state.students.length).toEqual(2);
    //Test the order of the modified list
    //10 should come first
    expect(state.students[0]).toEqual({first_name: '10', last_name: 'P', dob: '02-02-1999'});
    expect(state.students[1]).toEqual(student);
  });


});
