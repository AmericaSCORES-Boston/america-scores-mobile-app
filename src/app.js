import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import { Scene, Router } from 'react-native-router-flux';

import SitesContainer from './containers/Sites';
import { sagas } from './sagas/index';

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
