import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { sagas } from './sagas';
import reducers from './reducers';

import SitesContainer from './containers/Sites';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

const App = () => {
  return (
    <Provider store={store}>
        <Router hideNavBar name="root">
          <Scene
            key="login"
            component={SitesContainer}
            title="Login"
          />
          <Scene
            key="createAccount"
            component={SitesContainer}
            title="Create Account"
          />
          <Scene
            key="sites"
            component={SitesContainer}
            title="Sites"
          />
          <Scene
            key="programs"
            component={SitesContainer}
            title="Programs"
          />
          <Scene
            key="students"
            component={SitesContainer}
            title="Students"
          />
        </Router>
      </Provider>
    );
};

export default App;
