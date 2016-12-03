import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { Container, Content, InputGroup, Input, H2 } from 'native-base';
import scoresTheme from '../themes/scoresTheme';
import { connect } from 'react-redux';
import * as actions from '../actions/individualStudent';

import styles from '../styles';

class IndividualStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = props.individualStudentState;
    //this.state.bib_number = this.props.bib_num;
  }

  componentWillMount() {
    this.props.fetchStudent(this.props.stud_id);
  }

  componentWillReceiveProps(nextProps) {
    const newStudentState = nextProps.studentsState;
    if (newStudentState && newStudentState.student) {
      this.state = newStudentState;
    }
  }

  render() {
    const currentStudent = this.state.students;

    return (
      <Container style={[styles.container, styles.grayBg]}>
          <Content>
            <Text style={styles.textAlignCenter}>Bib No.</Text>
            <Text style={[styles.largerText, styles.textAlignCenter]}>1</Text>
            <View style={styles.mediumMarginTop}>
              <H2>Name</H2>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <InputGroup style={[styles.inputGroup, {flex: 1}]}>
                  <Input style={{flex: 1}}
                         ref="first_name"
                         autoCorrect={false}
                         defaultValue={currentStudent.first_name}
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
                <InputGroup style={styles.inputGroup}>
                  <Input placeholder="0"/>
                </InputGroup>
              </View>
            </View>
            <View style={styles.mediumMarginTop}>
              <H2>Height</H2>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <InputGroup style={[styles.inputGroup, {flex: 1}]}>
                  <Input style={{flex: 1}}
                         ref="feet"
                         keyboardType="numeric"
                         defaultValue={currentStudent.height}
                         returnKeyType="done"
                         maxLength={1}
                  />
                </InputGroup>
                <Text style={{flex: .5, paddingTop: 9}}>ft</Text>
                <InputGroup style={[styles.inputGroup, {flex: 1, paddingTop: 3}]}>
                  <Input style={{flex: 1}}
                         ref="inches"
                         keyboardType="numeric"
                         defaultValue={""}
                         returnKeyType="done"
                         maxLength={2}
                  />
                </InputGroup>
                <Text style={{flex: .5, paddingTop: 9}}>in</Text>
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
