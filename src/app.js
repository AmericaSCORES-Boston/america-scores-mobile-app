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
import AddProgramContainer from './containers/AddProgram';
import StudentsContainer from './containers/Students';
import AddStudentContainer from './containers/AddStudent';
import PacerContainer from './containers/Pacer';
import BMIContainer from './containers/BMI';
import IndividualStudentContainer from './containers/IndividualStudent';

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
            initial
            hideBackImage="true"
            renderBackButton={() => null}
          />
          <Scene
            key="programs"
            component={ProgramsContainer}
            title="SiteName"
            backTitle="Sites"
          />
          <Scene
            key="addProgram"
            component={AddProgramContainer}
            title="New Program"
            backTitle="Cancel"
            hideBackImage="true"
            direction="vertical"
          />
          <Scene
            key="students"
            component={StudentsContainer}
            title="ProgramName"
            backTitle="Programs"
          />
          <Scene
            key="addStudent"
            component={AddStudentContainer}
            title="Add Student"
            hideBackImage="true"
            backTitle="Cancel"
            direction="vertical"
          />
          <Scene
            key="pacer"
            component={PacerContainer}
            title="Pacer Test"
            backTitle="Cancel"
            hideBackImage="true"
            direction="vertical"
          />
          <Scene
            key="bmi"
            component={BMIContainer}
            title="BMI Collection"
            backTitle="Stop"
            hideBackImage="true"
            direction="vertical"
          />
          <Scene
            key="student"
            component={IndividualStudentContainer}
            title="StudentName"
            backTitle="Cancel"
            hideBackImage="true"
            direction="vertical"
          />
        </Router>
      </Provider>
    );
};

export default App;
