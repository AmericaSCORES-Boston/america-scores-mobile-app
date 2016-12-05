import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { Container, Content, List, ListItem, Footer, FooterTab, Button, H2, H3 } from 'native-base';
import scoresTheme from '../themes/scoresTheme';
import { connect } from 'react-redux';
import * as actions from '../actions/student';

import styles from '../styles';

class StudentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = props.studentsState;
  }

  componentWillMount() {
    this.props.fetchStudents(this.props.program_id);
  }

  componentWillReceiveProps(nextProps) {
    const newStudentsState = nextProps.studentsState;
    if (newStudentsState && newStudentsState.students) {
      this.state = newStudentsState;
    }
  }

  // Does this program have any students?
  hasStudents() {
    const students = this.state.students || [];
    return students.length > 0;
  }

  render() {
    return (
        <Container style={styles.container} theme={scoresTheme}>
          <Content>
            <View>
              {this.showStudents()}
            </View>
          </Content>

          {this.showFooter()}

        </Container>
    );
  }

  // Find the row number that contains the given student
  findRow(student_id) {
    for (var i = 0; i < this.state.students.length; i++) {
      if (this.state.students[i].student_id == student_id) {
        return i + 1;
      }
    }
  }

  // Show a list of students for this program if it is not empty.
  // Otherwise, show a message about the program being empty.
  showStudents() {
    const students = (
        <List
            dataArray={this.state.students}
            renderRow={(rowData) =>
                <ListItem button onPress={()=>Actions.student({title: rowData.first_name + ' ' + rowData.last_name,
                    stud_id: rowData.student_id, bib_num: this.findRow(rowData.student_id)})}>
                  <Text>{rowData.first_name + ' ' + rowData.last_name}</Text>
                </ListItem>
              }
        />
    );

    const noStudents = (
        <View>
          <H3 style={[styles.textAlignCenter, styles.mediumVerticalMargin]}>There are no students registered for this program.</H3>
          <H2 style={styles.textAlignCenter}>Click the 'Add' button to get started.</H2>
        </View>
    );

    return (this.hasStudents()) ? students : noStudents;
  }


  // Show a footer with a pacer and bmi collection button if this program has students.
  // Otherwise, hide the footer.
  showFooter() {
    const footer = (
        <Footer>
          <FooterTab>
            <Button active onPress={()=>Actions.pacer()}>
              Pacer Test
            </Button>

            <Button active onPress={()=>Actions.bmi({program_name: this.props.title, students: this.state.students})}>
              BMI Collection
            </Button>

          </FooterTab>
        </Footer>
    );

    return (this.hasStudents()) ? footer : null;
  }
}

const mapStateToProps = (state) => ({
  studentsState: state.studentsState
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudents: (program_id) => {
    dispatch(actions.fetchStudents(program_id));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentsContainer);
