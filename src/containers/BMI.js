import React, { Component, PropTypes } from 'react';
import { Container, Header, Content, Button, List, ListItem, InputGroup, Input, H1, H2, H3 } from 'native-base';
import Hr from 'react-native-hr';
import {Actions} from 'react-native-router-flux';
import scoresTheme from '../themes/scoresTheme';

import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/bmi';

import styles from '../styles/index';

class BMIContainer extends Component {
  constructor(props) {
    super(props);
    this.state = props.bmiState;
  }

  componentWillMount() {
    this.props.startBmiCollection();
  }

  componentWillReceiveProps(nextProps) {
    const newBmiState = nextProps.bmiState;
    if (newBmiState.currentBmiStudent != this.state.currentBmiStudent) {
      this.state = newBmiState;
    }
  }

  // Continue BMI collection if there are more students.
  // Otherwise, end bmi collection and go back to the students page.
  getNextStudent() {
    if (!this.hasMoreStudents()) {
      Actions.pop();
      return;
    }

    // TODO Save height/weight here.
    // TODO On success, continue. On failure, display error message and return.

    this.clearTextBox();
    this.props.continueBmiCollection();
  }

  // Are there more students in the list after the current one?
  hasMoreStudents() {
    return this.state.currentBmiStudent + 1 < this.props.students.length;
  }

  // Clear the text inputs on this page for height and weight.
  clearTextBox() {
    this._feet._textInput.setNativeProps({text: ''});
    this._inches._textInput.setNativeProps({text: ''});
    this._weight._textInput.setNativeProps({text: ''});
  }

  // Get the properties for the given student.
  getCurrentStudentProperties(currentStudent) {
    let name = '', dob = '', feet = '', inches = '', weight = '';

    if (currentStudent) {
      const parsedDob = new Date(currentStudent.dob),
          parsedHeight = parseInt(currentStudent.height),
          parsedWeight = parseInt(currentStudent.weight);

      name = currentStudent.first_name + ' ' + currentStudent.last_name;
      dob = (parsedDob.getUTCMonth() + 1) + "/" + parsedDob.getUTCDate() + "/" + parsedDob.getUTCFullYear();

      if (!isNaN(parsedHeight)) {
        feet = Math.floor(parsedHeight / 12).toString();
        inches = (parsedHeight % 12).toString();
      }

      if (!isNaN(parsedWeight)) {
        weight = parsedWeight.toString();
      }
    }

    return { name, dob, feet, inches, weight };
  }


  render() {
    const currentStudentId = this.state.currentBmiStudent,
        currentStudent = this.props.students[currentStudentId],
        studentProps = this.getCurrentStudentProperties(currentStudent);

    return (
      <Container style={[styles.container, styles.containerPadding]}>
        <Content theme={scoresTheme}>
          <View>
            <H3 style={styles.textCenter}>Collecting BMI Data for:</H3>
            <H2 style={styles.textCenter}>{this.props.program_name}</H2>
            <View style={styles.smallVerticalMargin}>
              <Hr lineColor="#000" />
            </View>
          </View>

          <View style={[styles.flexRow, styles.mediumMarginTop]}>
            <H2>Student:</H2>
            <H2 style={styles.flexRowRight}>{studentProps.name}</H2>
          </View>

          <View style={styles.mediumMarginTop}>
            <H2>Height</H2>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                <Input style={{flex: 1}}
                       ref={component => this._feet = component}
                       placeholder={''}
                       keyboardType="numeric"
                       defaultValue={studentProps.feet}
                       returnKeyType="next"
                       maxLength={1}
                       onSubmitEditing={() => { this._inches._textInput.focus();}}
                />
              </InputGroup>
              <Text style={{flex: .5, paddingTop: 9}}>ft</Text>
              <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                <Input style={{flex: 1}}
                       ref={component => this._inches = component}
                       placeholder={''}
                       keyboardType="numeric"
                       defaultValue={studentProps.inches}
                       returnKeyType="next"
                       maxLength={2}
                       onSubmitEditing={() => { this._weight._textInput.focus();}}
                />
              </InputGroup>
              <Text style={{flex: .5, paddingTop: 9}}>in</Text>
            </View>
          </View>

          <View style={styles.mediumMarginTop}>
            <H2>Weight</H2>
            <View style={{flex: .25, flexDirection: 'row'}}>
              <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                <Input style={{flex: 1}}
                       ref={component => this._weight = component}
                       placeholder={''}
                       keyboardType="numeric"
                       defaultValue={studentProps.weight}
                       maxLength={3}
                       returnKeyType="next"
                />
              </InputGroup>
              <Text style={{flex: 1, paddingTop: 9}}>lbs</Text>
            </View>
          </View>

          <View style={styles.mediumMarginTop}>
            {this.showSaveButton()}
          </View>

        </Content>
      </Container>
    );
  }

  // Shows the save button.  On press, it will continue or finish bmi collection.
  showSaveButton() {
    const buttonText = (this.hasMoreStudents()) ? 'Save' : 'Finish';

    return (
        <Button large block onPress={() => this.getNextStudent()} style={styles.smallVerticalMargin}>
          <H1 style={styles.white}>{buttonText}</H1>
        </Button>
    );
  }
}

const mapStateToProps = (state) => ({
  bmiState: state.bmiState
});

const mapDispatchToProps = (dispatch) => ({
  startBmiCollection: () => {
    dispatch(actions.startBMICollection());
  },
  continueBmiCollection: () => {
    dispatch(actions.continueBMICollection());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BMIContainer);
