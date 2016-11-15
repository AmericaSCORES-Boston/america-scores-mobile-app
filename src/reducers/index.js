import { combineReducers } from 'redux';
import sites from './sites';
import students from './students';
import userData from './userData';
import programs from './programs';
import pacer from './pacer';
import isLoading from './isLoading';

export default combineReducers({
  sites,
  students,
  userData,
  programs,
  pacer,
  isLoading,
})