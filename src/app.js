import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import configureStore from './store/configureStore';
import Sites from './containers/Sites';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

const store = configureStore();

class AmericaSCORES extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router hideNavBar name="root">
          <Scene
            key="list"
            component={Sites}
            title="List"
          />
        </Router>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('AmericaSCORES', () => AmericaSCORES);
