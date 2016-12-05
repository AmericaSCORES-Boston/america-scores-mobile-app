import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { Container, Content, List, ListItem, Footer, FooterTab, Button, H2, H3 } from 'native-base';
import scoresTheme from '../themes/scoresTheme';
import { connect } from 'react-redux';
import * as studentActions from '../actions/student';
import * as eventActions from '../actions/event';
import dates from '../util/dates';

import styles from '../styles';

class StudentsContainer extends Component {
  constructor(props) {
    super(props);
    const student_ids = [],
        eventToday = null;
    this.state = {...props.studentsState, ...props.eventsState, student_ids, eventToday};

    this.props.component.onRight = () => {
      Actions.addStudent({program_id: this.props.program_id});
    };

    this.props.component.rightTitle = 'Add';
  }

  componentWillMount() {
    this.props.fetchStudents(this.props.program_id);
    this.props.fetchEvents(this.props.program_id);
  }

  componentWillReceiveProps(nextProps) {
    const newStudentsState = nextProps.studentsState,
        newEventsState = nextProps.eventsState;
    if (newStudentsState && newStudentsState.students) {
      this.state = newStudentsState;
    }

    if (newEventsState.events && this.state.events !== newEventsState.events) {
      this.state.events = newEventsState.events;
      const filteredEvents = this.state.events.slice().filter(function(event) {
        return dates.getDateStringFromSql(event.event_date) === dates.getTodayDateString();
      });
      if (filteredEvents.length > 0) {
        this.setState({eventToday: filteredEvents[0]});
      }
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


  // Show a list of students for this program if it is not empty.
  // Otherwise, show a message about the program being empty.
  showStudents() {
    const students = (
        <List
            dataArray={this.state.students}
            renderRow={(rowData) =>
                <ListItem button onPress={()=>Actions.individualStudent({title: rowData.first_name + ' ' + rowData.last_name, student: rowData})}>
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
    const program = {program_name: this.props.title, program_id: this.props.program_id};
    const footer = (
        <Footer>
          <FooterTab>
            <Button active onPress={()=>Actions.pacer({students: this.state.students, event: this.state.eventToday})}>
              Pacer Test
            </Button>

            <Button active onPress={()=>Actions.bmi({program, students: this.state.students, event: this.state.eventToday})}>
              BMI Collection
            </Button>

          </FooterTab>
        </Footer>
    );

    return (this.hasStudents()) ? footer : null;
  }
}

const mapStateToProps = (state) => ({
  studentsState: state.studentsState,
  eventsState: state.eventsState
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudents: (program_id) => {
    dispatch(studentActions.fetchStudents(program_id));
  },
  fetchEvents: (program_id) => {
    dispatch(eventActions.fetchEvents(program_id));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentsContainer);
