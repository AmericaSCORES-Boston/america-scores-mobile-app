import { combineReducers } from 'redux';
import sitesState from './site';
import programsState from './program';
import eventsState from './event';
import studentsState from './student';
import bmiState from './bmi';
import pacerState from './pacer';
import studentStatState from './stat';
import loginState from './login';
import individualStudentState from './individualStudent';

export default combineReducers({
  sitesState,
  programsState,
  eventsState,
  studentsState,
  bmiState,
  loginState,
  pacerState,
  individualStudentState
});
