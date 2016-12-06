import React, { Component, PropTypes } from 'react';
import { View, Text, Alert } from 'react-native';
import { Container, Content, InputGroup, Input, H2 , H1, Picker, Button } from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../actions/individualStudent';
import * as studentActions from '../actions/student';
import * as statActions from '../actions/studentStat';
import dates from '../util/dates';
import { Actions } from 'react-native-router-flux';

import scoresTheme from '../themes/scoresTheme';
import styles from '../styles';

class IndividualStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = props.individualStudentState;
  }

  componentWillMount() {
    this.props.fetchStudent(this.props.stud_id);
  }

  componentWillReceiveProps(nextProps) {
    const newStudentState = nextProps.individualStudentState;
    if (newStudentState && newStudentState.student) {
      this.state = newStudentState;
    }
  }

  saveStudent(newStudent, newStats) {
    this.props.updateStudent(newStudent);
    if (newStats.measurement_id != 0) {
      this.props.updateStat(newStats);
    }

    Actions.pop();
  }

  getHeight(currentStats) {
    const feet = currentStats.height / 12;
    const inches = currentStats.height % 12;
    return { feet, inches };
  }

  getNewStats(newStats) {
    var currentStats = { height: 0, weight: 0, pacer: 0 };
    currentStats.measurement_id = newStats.measurement_id;
    currentStats.student_id = newStats.student_id;
    currentStats.event_id = newStats.event_id;
    if (newStats.height != null)
      currentStats.height = newStats.height;
    if (newStats.weight != null)
      currentStats.weight = newStats.weight;
    if (newStats.pacer != null)
      currentStats.pacer = newStats.pacer;

    return currentStats;
  }

  isValidData(student, stats) {
    return this.isValidStudent(student) && this.areValidStats(stats);
  }

  isValidStudent(student) {
    return student.first_name.length > 0 &&
      student.last_name.length > 0 &&
      this.isValidDate(student.dob);
  }

  isValidDate(dob) {
    if (dob.length < 10)
      return false;
    return parseInt(dob.substring(0,4), 10) > 0 &&
      parseInt(dob.substring(5,7), 10) > 0 &&
      parseInt(dob.substring(8,10), 10) > 0;
  }

  areValidStats(stats) {
    return stats.weight > 0 &&
      stats.height > 0 &&
      stats.pacer > 0;
  }

  render() {
    if (this.state.student != null && this.state.stats != null) {
      const currentStudent = this.state.student[0];
      var currentStats = { measurement_id: 0, height: 0, weight: 0, pacer: 0 };
      if (this.state.stats.length != 0) {
        const newStats = this.state.stats[this.state.stats.length - 1];
        currentStats = this.getNewStats(newStats);
      }
      const bib_number = this.props.bib_num;

      return (
        <Container style={[styles.container, styles.containerPadding]}>
          <Content theme={scoresTheme}>
            <Text style={styles.textAlignCenter}>Bib No.</Text>
            <Text style={[styles.largerText, styles.textAlignCenter]}>{bib_number}</Text>
            <View style={styles.mediumMarginTop}>
              <H2 style={styles.bold}>Name</H2>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: .75, flexDirection: 'row', paddingRight: 10 }}>
                  <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                    <Input ref="first_name"
                           autoCorrect={false}
                           defaultValue={currentStudent.first_name}
                           onChangeText={(firstName) => currentStudent.first_name = firstName}
                           returnKeyType="done"
                    />
                  </InputGroup>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                    <Input ref="last_name"
                           autoCorrect={false}
                           defaultValue={currentStudent.last_name}
                           onChangeText={(lastName) => currentStudent.last_name = lastName}
                           returnKeyType="done"
                    />
                  </InputGroup>
                </View>
              </View>
            </View>
            <View style={styles.mediumMarginTop}>
              <H2 style={styles.bold}>Date of Birth</H2>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: .75, flexDirection: 'row'}}>
                  <Picker
                    style={{flex: 1}}
                    iosHeader="Month"
                    mode="dropdown"
                    selectedValue={this.state.student[0].dob.substring(5,7)}
                    onValueChange={(newMonth) => currentStudent.dob = 
						dates.getDateStringFromSql(currentStudent.dob).substring(0,5) +
						newMonth + dates.getDateStringFromSql(currentStudent.dob).substring(7)} >

                    <Picker.Item label="Month" value="" />
                    <Picker.Item label="Jan."  value="01" />
                    <Picker.Item label="Feb."  value="02" />
                    <Picker.Item label="Mar."  value="03" />
                    <Picker.Item label="Apr."  value="04" />
                    <Picker.Item label="May"   value="05" />
                    <Picker.Item label="Jun."  value="06" />
                    <Picker.Item label="Jul."  value="07" />
                    <Picker.Item label="Aug."  value="08" />
                    <Picker.Item label="Sep."  value="09" />
                    <Picker.Item label="Oct."  value="10" />
                    <Picker.Item label="Nov."  value="11" />
                    <Picker.Item label="Dec."  value="12" />
                  </Picker>
                </View>

                <View style={{flex: .75, flexDirection: 'row', paddingRight: 10 }}>
                  <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                    <Input style={{flex: 1}}
                           ref="day"
                           keyboardType="numeric"
                           defaultValue={currentStudent.dob.substring(8,10)}
                           onChangeText={(day) => currentStudent.dob =
                            dates.getDateStringFromSql(currentStudent.dob).substring(0,8) + dates.formatDayMonth(day)}
                           returnKeyType="done"
                           maxLength={2}
                    />
                  </InputGroup>
                </View>

                <View style={{flex: .75, flexDirection: 'row'}}>
                  <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                    <Input style={{flex: 1}}
                           ref="year"
                           keyboardType="numeric"
                           defaultValue={currentStudent.dob.substring(0,4)}
                           onChangeText={(year) => currentStudent.dob =
                              year + dates.getDateStringFromSql(currentStudent.dob).substring(5)}
                           returnKeyType="done"
                           maxLength={4}
                    />
                  </InputGroup>
                </View>
              </View>
            </View>
            <View style={styles.mediumMarginTop}>
              <H2 style={styles.bold}>Height</H2>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: .75, flexDirection: 'row', paddingRight: 10 }}>
                  <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                    <Input ref="feet"
                           keyboardType="numeric"
                           defaultValue={this.getHeight(currentStats).feet.toString()}
                           onChangeText={(feet) => currentStats.height =
							(feet * 12) + this.getHeight(currentStats).inches}
                           returnKeyType="done"
                           maxLength={1}
                    />
                  </InputGroup>
                  <Text style={{flex: .5, paddingTop: 9}}>ft</Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                    <Input ref="inches"
                           keyboardType="numeric"
                           defaultValue={this.getHeight(currentStats).inches.toString()}
                           onChangeText={(inches) => currentStats.height =
							this.getHeight(currentStats).feet + inches}
                           returnKeyType="done"
                           maxLength={2}
                    />
                  </InputGroup>
                  <Text style={{flex: .5, paddingTop: 9}}>in</Text>
                </View>
              </View>
            </View>
            <View style={styles.mediumMarginTop}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <H2 style={styles.bold}>Weight</H2>
                </View>
                <View style={{flex: 1, flexDirection: 'row', paddingRight: 10, justifyContent: 'flex-start' }}>
                  <H2 style={styles.bold}>PACER</H2>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{flex: 1, flexDirection: 'row', paddingRight: 10 }}>
                    <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                      <Input ref="weight"
                             keyboardType="numeric"
                             defaultValue={currentStats.weight.toString()}
                             onChangeText={(weight) => currentStats.weight = weight}
                             returnKeyType="done"
                             maxLength={3}
                      />
                    </InputGroup>
                  </View>
                  <Text style={{flex: 1, paddingTop: 9}}>lbs</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{flex: 1, flexDirection: 'row', paddingRight: 10 }}>
                    <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                      <Input ref="pacer"
                             keyboardType="numeric"
                             defaultValue={currentStats.pacer.toString()}
                             onChangeText={(pacer) => currentStats.pacer = pacer}
                             returnKeyType="done"
                             maxLength={3}
                      />
                    </InputGroup>
                    <Text style={{flex: 1, paddingTop: 9}}>laps</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.mediumMarginTop}>
              <Button block large onPress={() => this.saveStudent(currentStudent, currentStats)}>
                <H1 style={styles.white}>Save</H1>
              </Button>
            </View>
          </Content>
        </Container>
      );
    }
    else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  individualStudentState: state.individualStudentState
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudent: (student_id) => {
    dispatch(actions.fetchStudent(student_id));
  },
  updateStudent: (student) => {
    dispatch(actions.updateStudent(student));
  },
  fetchStudents: (program_id) => {
    dispatch(studentActions.fetchStudents(program_id));
  },
  updateStat: (stats) => {
    dispatch(statActions.updateStat(stats));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndividualStudentContainer);