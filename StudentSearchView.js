'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  DatePickerIOS,
  TextInput,
  StyleSheet,
  Text,
  View
} from 'react-native';



export default class AmericaSCORES extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      date: new Date(), 
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60, 
    };
  }

  // static defaultProps = {
  //   first_name: '',
  //   last_name: '',
  //   date: new Date(), 
  //   timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60, 
  // }; 

  state = {
    first_name: this.props.first_name,
    last_name: this.props.last_name,
    date: this.props.date, 
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours, 
  };

  onDateChange = (date) => { 
    this.setState({date: date}); 
  }; 
  onTimezoneChange = (event) => { 
    var offset = parseInt(event.nativeEvent.text, 10); 
    if (isNaN(offset)) { 
      return; 
    } 
    this.setState({
      timeZoneOffsetInHours: offset
    }); 
  };
  
//<View style={styles.container}> 
// style commented as it makes datepicker invisible
  render() {
    return (
      <View >
        <Text style={styles.welcome}>
          Search Students
        </Text>
        <Text style={styles.instructions}>
          To add a student to this roster,
          search by their first and last name, and date of birth.
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>

        <TextInput
          style={{height: 40}}
          placeholder="First Name"
          onChangeText={(text) => this.setState({text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Last Name"
          onChangeText={(text) => this.setState({text})}
        />

        <Text>Date of Birth</Text>

        <DatePickerIOS date={
          this.state.date
        } 
        mode="date" 
        timeZoneOffsetInMinutes={
          this.state.timeZoneOffsetInHours * 60
        } 
        onDateChange={
          this.onDateChange
        } />

        
      </View>
    );
  }
}

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

AppRegistry.registerComponent('AmericaSCORES', () => AmericaSCORES);
