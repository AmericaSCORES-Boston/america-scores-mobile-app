// __tests__/StudentSearchTests.js
import 'react-native';
import React from 'react';
import AmericaSCORES from '../StudentSearchView.js';
import {
  AppRegistry,
  DatePickerIOS,
  TextInput,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Note: test renderer must be required after react native
import renderer from 'react-test-renderer';

jest.mock('TextInput', () => 'TextInput');
jest.mock('Text', () => {
  const RealComponent = require.requireActual('Text');
  const React = require('React');
  class Text extends React.Component {
    render() {
      return React.createElement('Text', this.props, this.props.children);
    }
  }
  Text.propTypes = RealComponent.propTypes;
  return Text;
});
jest.mock('DatePickerIOS', () => 'DatePickerIOS');

// Tests the Header
it('renders correctly', () => {
  const tree = renderer.create(
    <Text style={styles.welcome}>
          Search Students
        </Text>
  );
});

// Tests the info field
it('renders correctly', () => {
  const tree = renderer.create(
    <Text style={styles.instructions}>
          To add a student to this roster,
          search by their first and last name, and date of birth.
        </Text>
  );
});

// Tests the First Name Field
it('renders correctly', () => {
  const tree = renderer.create(
    <TextInput
          style={{height: 40}}
          placeholder="First Name"
          onChangeText={(text) => this.setState({text})}
        />
  );
});


// Tests the Last Name Field
it('renders correctly', () => {
  const tree = renderer.create(
    <TextInput
          style={{height: 40}}
          placeholder="Last Name"
          onChangeText={(text) => this.setState({text})}
        />
  );
});


// Tests the DOB Picker
it('renders correctly', () => {
  const tree = renderer.create(
    <DatePickerIOS date={
          //this.state.date
          new Date()
        } 
        mode="date" 
        timeZoneOffsetInMinutes={
          300
        } 
        onDateChange={
          this.onDateChange
        } />
  );
});






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
