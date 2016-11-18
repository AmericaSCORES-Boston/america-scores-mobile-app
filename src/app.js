import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { sagas } from './sagas';
import reducers from './reducers';

import SitesContainer from './containers/Sites';
import LoginContainer from './containers/Login';
import CreateAccountContainer from './containers/CreateAccount';
import ProgramsContainer from './containers/Programs';
import StudentsContainer from './containers/Students';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

const App = () => {
  return (
    <Provider store={store}>
        <Router name="root">
          <Scene
            key="login"
            component={LoginContainer}
            title="Login"
            rightTitle="Sign Up"
            onRight={() => Actions.createAccount()}
            hideBackImage="true"
            direction="vertical"
          />
          <Scene
            key="createAccount"
            component={CreateAccountContainer}
            title="Sign Up"
            rightTitle="Login"
            onRight={() => Actions.login()}
            direction="vertical"
            hideBackImage="true"
          />
          <Scene
            key="sites"
            component={SitesContainer}
            title="Sites"
            initial // temp
          />
          <Scene
            key="programs"
            component={ProgramsContainer}
            title="Programs"
            backTitle="Sites"
            rightTitle="Add"
            onRight={() => alert('Add Program')}
          />
          <Scene
            key="students"
            component={StudentsContainer}
            title="Students"
            backTitle="Programs"
            rightTitle="Add"
            onRight={() => alert('Add Student')}
          />
        </Router>
      </Provider>
    );
};

export default App;
