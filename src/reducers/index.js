import { combineReducers } from 'redux';
import sitesState from './site';
import programsState from './program';
import studentsState from './student';
import bmiState from './bmi';
import studentStatState from './stat';

export default combineReducers({
  sitesState, 
  programsState,
  studentsState,
  bmiState
});
