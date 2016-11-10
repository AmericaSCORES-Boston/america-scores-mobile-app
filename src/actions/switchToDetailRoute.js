import { SWITCH_TO_STUDENT_DETAIL_ROUTE } from '../actions/constants';

export default (student) => ({
  type: SWITCH_TO_STUDENT_DETAIL_ROUTE,
  student,
});
