import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View} from 'react-native';
import { Container, Content, List, ListItem, Footer, FooterTab, Button, H2, H3,Left,Right,Body,Text} from 'native-base';
import scoresTheme from '../themes/scoresTheme';
import { connect } from 'react-redux';
import * as studentActions from '../actions/student';
import * as eventActions from '../actions/event';
import dates from '../util/dates';

import styles from '../styles';

class ResultContainer extends Component {
    constructor(props) {
        super(props);
        const student_ids = [], event = null;
        this.state = {...props.studentsState, ...props.eventsState, student_ids, event};
    }

    componentWillMount() {
        this.state.students=this.props.students;
    }

    componentWillReceiveProps(nextProps) {
        const newStudentsState = nextProps.students;
        if (newStudentsState && newStudentsState.students) {
            this.state.students = newStudentsState.students;
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
                    <View style={{flexDirection: 'row', flex: 1}}>
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
        const studentArray = this.state.students;
        const students = (
            <List dataArray={studentArray}
                renderRow={(rowData) =>
                    <ListItem>
                        <Text>{'Level: ' + rowData.pacer}</Text>
                        <Text style={{marginLeft:20}}>{'Student: '+rowData.first_name + ' ' + rowData.last_name}</Text>
                    </ListItem>

                }
            />
        );

        const noStudents = (
            <View>
                <H3 style={[styles.textAlignCenter, styles.mediumVerticalMargin]}>No data to show.</H3>
                {/*<H2 style={styles.textAlignCenter}>Click the 'Add' button to get started.</H2>*/}
            </View>
        );
        return (this.hasStudents()) ? students : noStudents;
    }


    // Otherwise, hide the footer.
    showFooter() {
        const program = {program_name: this.props.title, program_id: this.props.program_id};
        const footer = (
            <Footer>
                <FooterTab>
                </FooterTab>
            </Footer>
        );

        return (this.hasStudents()) ? footer : null;
    }
}

const mapStateToProps = (state) => ({
    studentsState: state.studentsState,
    // eventsState: state.eventsState
});
//
// const mapDispatchToProps = (dispatch) => ({
//     fetchStudents: (program_id) => {
//         dispatch(studentActions.fetchStudents(program_id));
//     },
//     fetchEvents: (program_id) => {
//         dispatch(eventActions.fetchEvents(program_id));
//     }
// });

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(ResultContainer);