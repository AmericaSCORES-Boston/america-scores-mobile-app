import React, { Component, PropTypes } from 'react';
import { View, Text, Alert } from 'react-native';
import { Container, Content, InputGroup, Input, H2 } from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../actions/individualStudent';

import styles from '../styles';

class IndividualStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = props.individualStudentState;


    this.props.component.onRight = () => {
      if (this.saveStudent())
        Alert.alert('Success', 'Student saved');
      else
        Alert.alert('Failure', 'Student was not saved correctly');
    };
    this.props.component.rightTitle = 'Save';
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

  saveStudent() {
    try {
      const currentStudent = this.state.student[0];
      const currentStats = this.state.stats[0];
      const newStudent = { student_id: this.props.stud_id, first_name: currentStudent.first_name,
        last_name: currentStudent.last_name, dob: currentStudent.dob };
      this.props.updateStudent(newStudent);
      return 1;
    } catch (e) {
      return 0;
    }
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

  render() {
    if (this.state.student != null && this.state.stats != null) {
      const currentStudent = this.state.student[0];
      var currentStats = { height: 0, weight: 0, pacer: 0 };
      if (this.state.stats.length != 0) {
        const newStats = this.state.stats[this.state.stats.length - 1];
        currentStats = this.getNewStats(newStats);
      }
      const bib_number = this.props.bib_num;

      console.log(currentStudent);
      console.log(currentStats);

      return (
        <Container style={[styles.container, styles.grayBg]}>
          <Content>
            <Text style={styles.textAlignCenter}>Bib No.</Text>
            <Text style={[styles.largerText, styles.textAlignCenter]}>{bib_number}</Text>
            <View style={styles.mediumMarginTop}>
              <H2>Name</H2>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <InputGroup style={[styles.inputGroup, {flex: 1}]}>
                  <Input style={{flex: 1}}
                         ref="first_name"
                         autoCorrect={false}
                         defaultValue={currentStudent.first_name}
                         onChangeText={(firstName) => this.state.student[0].first_name = firstName}
                         returnKeyType="done"
                  />
                </InputGroup>
                <Text style={{flex: .5, paddingTop: 9}}></Text>
                <InputGroup style={[styles.inputGroup, {flex: 1}]}>
                  <Input style={{flex: 1}}
                         ref="last_name"
                         autoCorrect={false}
                         defaultValue={currentStudent.last_name}
                         returnKeyType="done"
                  />
                </InputGroup>
                <Text style={{flex: .5, paddingTop: 9}}></Text>
              </View>
            </View>
            <View style={styles.mediumMarginTop}>
              <H2>Height</H2>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <InputGroup style={[styles.inputGroup, {flex: 1}]}>
                  <Input style={{flex: 1}}
                         ref="feet"
                         keyboardType="numeric"
                         defaultValue={this.getHeight(currentStats).feet.toString()}
                         returnKeyType="done"
                         maxLength={1}
                  />
                </InputGroup>
                <Text style={{flex: .5, paddingTop: 9}}>ft</Text>
                <InputGroup style={[styles.inputGroup, {flex: 1, paddingTop: 3}]}>
                  <Input style={{flex: 1}}
                         ref="inches"
                         keyboardType="numeric"
                         defaultValue={this.getHeight(currentStats).inches.toString()}
                         returnKeyType="done"
                         maxLength={2}
                  />
                </InputGroup>
                <Text style={{flex: .5, paddingTop: 9}}>in</Text>
              </View>
            </View>
            <View style={styles.mediumMarginTop}>
              <H2>Weight</H2>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <InputGroup style={[styles.inputGroup, {flex: 1}]}>
                  <Input style={{flex: 1}}
                         ref="weight"
                         keyboardType="numeric"
                         defaultValue={currentStats.weight.toString()}
                         returnKeyType="done"
                         maxLength={3}
                  />
                </InputGroup>
                <Text style={{flex: 2, paddingTop: 9}}>lbs</Text>
              </View>
            </View>
            <View style={styles.mediumMarginTop}>
              <H2>PACER</H2>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <InputGroup style={[styles.inputGroup, {flex: 1}]}>
                  <Input style={{flex: 1}}
                         ref="pacer"
                         keyboardType="numeric"
                         defaultValue={currentStats.pacer.toString()}
                         returnKeyType="done"
                         maxLength={3}
                  />
                </InputGroup>
                <Text style={{flex: 2, paddingTop: 9}}>laps</Text>
              </View>
            </View>
          </Content>
        </Container>
      );
    }
    else {
      return (
        <View>
          <H2 style={[styles.textAlignCenter, styles.mediumVerticalMargin]}>An error has occurred</H2>
        </View>
      )
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndividualStudentContainer);
