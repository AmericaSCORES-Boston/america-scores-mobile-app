import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, H2 } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions/student';

import styles from '../styles';

class IndividualStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = props.studentsState;
  }

  componentWillMount() {
    this.props.fetchStudent(this.props.student_id);
  }

  componentWillReceiveProps(nextProps) {
    const newStudentState = nextProps.studentsState;
    if (newStudentState && newStudentState.student) {
      this.state = newStudentState;
    }
  }

  // Get the properties for the given student.
  getCurrentStudentProperties(currentStudent) {
    let first_name = '', last_name = '', dob = '', feet = '', inches = '', weight = '';

    if (currentStudent) {
      const parsedDob = new Date(currentStudent.dob),
        parsedHeight = parseInt(currentStudent.height),
        parsedWeight = parseInt(currentStudent.weight);

      first_name = currentStudent.first_name;
      last_name = currentStudent.last_name;
      dob = (parsedDob.getUTCMonth() + 1) + "/" + parsedDob.getUTCDate() + "/" + parsedDob.getUTCFullYear();

      if (!isNaN(parsedHeight)) {
        feet = Math.floor(parsedHeight / 12).toString();
        inches = (parsedHeight % 12).toString();
      }

      if (!isNaN(parsedWeight)) {
        weight = parsedWeight.toString();
      }
    }

    return { first_name, last_name, dob, feet, inches, weight };
  }

  render() {
    const currentStudent = this.state.student,
      studentProps = this.getCurrentStudentProperties(currentStudent);

    return (
      <Container style={[styles.container, styles.grayBg]}>
          <Content>
            <Text style={styles.textAlignCenter}>Bib No.</Text>
            <Text style={[styles.largerText, styles.textAlignCenter]}>1</Text>
            <View style={styles.mediumMarginTop}>
              <H2>Name</H2>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                  <Input style={{flex: 1}}
                         ref="first_name"
                         placeholder={studentProps.first_name}
                         //defaultValue={studentProps.first_name}
                         returnKeyType="done"
                  />
                </InputGroup>
                <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                  <Input style={{flex: 1}}
                         ref="last_name"
                         //placeholder={studentProps.last_name}
                         defaultValue={studentProps.last_name}
                         returnKeyType="done"
                  />
                </InputGroup>
                <InputGroup style={styles.inputgroup}>
                  <Input placeholder="0"/>
                </InputGroup>
              </View>
            </View>
            <View style={styles.mediumMarginTop}>
              <H2>Height</H2>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                  <Input style={{flex: 1}}
                         ref="feet"
                         //placeholder={''}
                         keyboardType="numeric"
                         defaultValue={studentProps.feet}
                         returnKeyType="done"
                         maxLength={1}
                  />
                </InputGroup>
                <Text style={{flex: .5, paddingTop: 9}}>ft</Text>
                <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                  <Input style={{flex: 1}}
                         ref="inches"
                         //placeholder={''}
                         keyboardType="numeric"
                         defaultValue={studentProps.inches}
                         returnKeyType="done"
                         maxLength={2}
                  />
                </InputGroup>
                <Text style={{flex: .5, paddingTop: 9}}>in</Text>
                <InputGroup style={styles.inputgroup}>
                  <Input placeholder="0"/>
                </InputGroup>
              </View>
            </View>
          </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  studentsState: state.studentsState
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudent: (student_id) => {
    dispatch(actions.fetchStudent(student_id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndividualStudentContainer);
