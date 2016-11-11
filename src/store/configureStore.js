import { createStore, applyMiddleware } from 'redux';
import sagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import sagas from '../sagas';

const initialState = {
    isLoading: false,
    userData: {},
    sites: [],
    programs: [],
    pacer: []
}

const createStoreWithMiddleware = applyMiddleware(
  sagaMiddleware(sagas),
)(createStore);

export default () => (
  createStoreWithMiddleware(reducer, initialState)
);