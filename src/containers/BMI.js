import React, { Component, PropTypes } from 'react';
import { Container, Content, Button, InputGroup, Input, List, H1, H2, H3 } from 'native-base';
import Hr from 'react-native-hr';
import {Actions} from 'react-native-router-flux';
import scoresTheme from '../themes/scoresTheme';

import { View, Text, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import * as bmiActions from '../actions/bmi';
import * as eventActions from '../actions/event';
import numbers from '../util/numbers';
import dates from '../util/dates';
import styles from '../styles/index';

class BMIContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.bmiState,
      feet: '',
      inches: '',
      weight: '',
      student: props.students[0],
      currentBmiStudent: 0,
      bmiDataCollected: [],
      event: props.event
    };
  }

  componentWillMount() {
    if (!this.props.event) {
      this.props.createEvent(this.props.program.program_id);
    }
    console.log("event" + this.props.event);
    console.log("programid" + this.props.program.program_id);

  }

  componentWillReceiveProps(nextProps) {
    const newBmiState = nextProps.bmiState,
        newEventsState = nextProps.eventsState;

    if (this.isBmiCollectionCompleted() && newBmiState.message) {
      Alert.alert('BMI Collection', newBmiState.message);
      Actions.pop();
    }

    if (newEventsState && newEventsState.events) {
      this.state.events = newEventsState.events;

      const filteredEvents = this.state.events.slice().filter(function(event) {
        return dates.getDateStringFromSql(event.event_date) === dates.getTodayDateString();
      });

      const event = (filteredEvents.length > 0) ? filteredEvents[0] : null;
      this.setState({event});
    }
  }

  // Continue BMI collection if there are more students.
  // Otherwise, end bmi collection and go back to the students page.
  getNextStudent() {
    const student_id = this.state.student.student_id,
        height = this.getCurrentStudentHeight(),
        weight = this.getCurrentStudentWeight(),
        bmiData = {student_id, height, weight};

    if (this.isBmiCollectionCompleted()) {
      return;
    }

    const nextBmiStudent = this.state.currentBmiStudent + 1;
    const nextStudent = (!this.hasMoreStudents()) ? this.state.student : this.props.students[nextBmiStudent];

    this.setState({
      currentBmiStudent: nextBmiStudent,
      student: nextStudent,
      bmiDataCollected: this.state.bmiDataCollected.concat([bmiData])
    }, function() {
      this.clearCurrentInputs();
      if (this.isBmiCollectionCompleted()) {
        const event = this.state.event || this.props.event;
        console.log("event.event_id on BMI " + event.event_id);
        this.props.saveCollectedBmiData(event.event_id, this.state.bmiDataCollected);
      }
    });

  }

  getCurrentStudentHeight() {
    return parseInt(this.state.feet, 10) * 12 + parseInt(this.state.inches, 10);
  }

  getCurrentStudentWeight() {
    return parseInt(this.state.weight, 10);
  }

  // Are there more students in the list after the current one?
  hasMoreStudents() {
    return this.state.currentBmiStudent + 1 < this.props.students.length;
  }

  isBmiCollectionCompleted() {
    return this.state.currentBmiStudent >= this.props.students.length;
  }

  // Clear the text inputs on this page for height and weight.
  clearCurrentInputs() {
    this.setState({feet: '', inches: '', weight: ''});
  }

  // Get the properties for the given student.
  getCurrentStudentStats(currentStudent) {
    let feet = '', inches = '', weight = '';

    if (currentStudent) {
      const parsedHeight = parseInt(currentStudent.height),
          parsedWeight = parseInt(currentStudent.weight);

      if (!isNaN(parsedHeight)) {
        feet = Math.floor(parsedHeight / 12).toString();
        inches = (parsedHeight % 12).toString();
      }

      if (!isNaN(parsedWeight)) {
        weight = parsedWeight.toString();
      }
    }

    return { feet, inches, weight };
  }

  isDataValid() {
    return this.isFeetValid() &&
            this.isInchesValid() &&
            this.isWeightValid();
  }

  isInchesValid() {
    const inches = this.state.inches;
    return inches.length > 0 &&
        numbers.isInt(inches) &&
        numbers.toInt(inches) >= 0 &&
        numbers.toInt(inches) < 12;
  }

  isFeetValid() {
    const feet = this.state.feet;
    return feet.length > 0 &&
        numbers.isInt(feet) &&
        numbers.toInt(feet) >= 0 &&
        numbers.toInt(feet) < 10;
  }

  isWeightValid() {
    const weight = this.state.weight;
    return weight.length > 0 &&
        numbers.isInt(weight) &&
        numbers.toInt(weight) > 0 &&
        numbers.toInt(weight) < 400;
  }

  render() {
    return (
      <Container style={[styles.container, styles.containerPadding]}>
        <Content theme={scoresTheme}>
          <View>
            <H3 style={styles.textCenter}>Collecting BMI Data for:</H3>
            <H2 style={styles.textCenter}>{this.props.program.program_name}</H2>
            <View style={styles.smallVerticalMargin}>
              <Hr lineColor="#000" />
            </View>
          </View>

          <H1 style={[styles.textCenter, styles.smallVerticalMargin]}>
            {`${this.state.student.first_name} ${this.state.student.last_name}`}
          </H1>

          <View style={styles.smallVerticalMargin}>
            <H2 style={styles.bold}>Height</H2>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                <Input style={{flex: 1}}
                       ref={component => this._feet = component}
                       placeholder={''}
                       keyboardType="numeric"
                       defaultValue={this.state.feet}
                       returnKeyType="next"
                       maxLength={1}
                       onChangeText={(feet) => this.setState({feet})}
                       onSubmitEditing={() => { this._inches._textInput.focus();}}
                />
              </InputGroup>
              <Text style={{flex: .5, paddingTop: 9}}>ft</Text>
              <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                <Input style={{flex: 1}}
                       ref={component => this._inches = component}
                       placeholder={''}
                       keyboardType="numeric"
                       defaultValue={this.state.inches}
                       returnKeyType="next"
                       maxLength={2}
                       onChangeText={(inches) => this.setState({inches})}
                       onSubmitEditing={() => { this._weight._textInput.focus();}}
                />
              </InputGroup>
              <Text style={{flex: .5, paddingTop: 9}}>in</Text>
            </View>
          </View>

          <View style={styles.smallVerticalMargin}>
            <H2 style={styles.bold}>Weight</H2>
            <View style={{flex: .25, flexDirection: 'row'}}>
              <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                <Input style={{flex: 1}}
                       ref={component => this._weight = component}
                       placeholder={''}
                       keyboardType="numeric"
                       defaultValue={this.state.weight}
                       maxLength={3}
                       onChangeText={(weight) => this.setState({weight})}
                       returnKeyType="next"
                />
              </InputGroup>
              <Text style={{flex: 1, paddingTop: 9}}>lbs</Text>
            </View>
          </View>

          {this.showErrors()}

          <View style={styles.mediumMarginTop}>
            {this.showSaveButton()}
          </View>

        </Content>
      </Container>
    );
  }

  // Shows the save button.  On press, it will continue or finish bmi collection.
  showSaveButton() {
    const buttonText = (this.hasMoreStudents()) ? 'Next' : 'Finish';

    return (
        <Button large block disabled={!this.isDataValid()} onPress={() => this.getNextStudent()} style={styles.smallVerticalMargin}>
          <H1 style={styles.white}>{buttonText}</H1>
        </Button>
    );
  }

  // Show a list of errors to the user based on their inputs so far.
  showErrors() {
    let errors = [];

    if (!this.isFeetValid()) {
      errors.push('\u2022 The feet entered must be between 0 and 10.');
    }
    if (!this.isInchesValid()) {
      errors.push('\u2022 The inches entered must be between 0 and 11.');
    }
    if (!this.isWeightValid()) {
      errors.push('\u2022 The weight entered must be between 0 and 400.');
    }

    return (errors.length > 0) ? (
        <List style={styles.mediumMarginTop}
              dataArray={errors}
              renderRow={(rowData) =>
                    <H3 style={styles.errorRed}>{rowData}</H3>
                  }
        />
    ) : null;
  }
}


const mapStateToProps = (state) => ({
  bmiState: state.bmiState,
  eventsState: state.eventsState
});

const mapDispatchToProps = (dispatch) => ({
  saveCollectedBmiData: (event_id, stats) => {
    dispatch(bmiActions.saveCollectedBmiData(event_id, stats));
  },
  createEvent: (program_id) => {
    dispatch(eventActions.createEvent(program_id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BMIContainer);
