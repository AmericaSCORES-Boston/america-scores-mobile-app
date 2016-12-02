import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert, View, ListView, Text, StyleSheet } from 'react-native';
import { Container, Content, Button, InputGroup, Input } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions/student';

import styles from '../styles';

class AddStudentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.studentData,
            first_name: '',
            last_name: '',
            year: '',
            month: '',
            day: '',
            dob: ''
        };
        
        this.props.component.onRight = () => {
            Actions.pop();
        };
        
        this.props.component.rightTitle = 'Done';
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        const newStudentData = nextProps.studentData;
        if (newStudentData.searchResult != this.state.searchResult) {
            this.state.searchResult = newStudentData.searchResult;
            const self = this;
            if (this.state.searchResult.length > 0) {
                const student = this.state.searchResult[0];
                student.dob = student.dob.substring(0, 10);

                Alert.alert(
                    'Student Found',
                    `${this.state.first_name} ${this.state.last_name} was found.  Add them to this program?`,
                    [
                        {text: 'Cancel', onPress: () => Actions.pop() },
                        {text: 'OK', onPress: () => self.addExistingStudent(student) }
                    ]
                );
            }
            else {
                Alert.alert(
                    'Student Not Found',
                    `${this.state.first_name} ${this.state.last_name} was not found.  Create a new student?`,
                    [
                        {text: 'Cancel', style: 'cancel'},
                        {text: 'OK', onPress: () => self.createStudent() }
                    ]
                );
            }
        }
    }

    addExistingStudent(student) {
        this.props.addExistingStudent(this.props.program_id, student);
        Actions.pop();
    }

    createStudent() {
        this.props.createStudent(this.props.program_id, this.state.first_name, this.state.last_name, this.state.dob);
        Actions.pop();
    }

    onValueChange (value: string) {
        this.setState({
            selected1 : value
        });
    }

    searchStudent() {
        let dob = [this.state.year, this.state.month, this.state.day];
        this.state.dob = dob.join("-");
        this.props.searchStudent(this.state.first_name, this.state.last_name, this.state.dob);
    }

    render() {
        var self = this;
        return (
            <Container style={[styles.container, styles.grayBg]}>
                <Content>
                    <Text style={styles.textAlignCenter}>To add a student to this program, search by their first and last name, and date of birth.</Text>
                    <InputGroup style={styles.inputGroup}>
                        <Input placeholder="First Name" onChangeText={(first_name) => this.setState({first_name})}/>
                    </InputGroup>
                    <InputGroup style={styles.inputGroup}>
                        <Input placeholder="Last Name" onChangeText={(last_name) => this.setState({last_name})}/>
                    </InputGroup>
                    <InputGroup style={styles.inputGroup}>
                        <Input placeholder="Year" onChangeText={(year) => this.setState({year})}/>
                    </InputGroup>
                    <InputGroup style={styles.inputGroup}>
                        <Input placeholder="Month (i.e. 09)" onChangeText={(month) => this.setState({month})}/>
                    </InputGroup>
                    <InputGroup style={styles.inputGroup}>
                        <Input placeholder="Day (i.e. 09)" onChangeText={(day) => this.setState({day})}/>
                    </InputGroup>
                    <Button style={styles.textCenter} onPress={() => self.searchStudent()}>
                        Search
                    </Button>
                </Content>
            </Container>
        );
    }
}

AddStudentContainer.propTypes = {
    studentData: PropTypes.object.isRequired
};

AddStudentContainer.defaultProps = {
    studentData: {}
};

const mapStateToProps = (state) => ({
    studentData: state.studentsState
});

const mapDispatchToProps = (dispatch) => ({
    searchStudent: (first_name, last_name, dob) => {
        dispatch(actions.searchStudent(first_name, last_name, dob));
    },
    createStudent: (program_id, first_name, last_name, dob) => {
        dispatch(actions.createStudent(program_id, first_name, last_name, dob));
    },
    addExistingStudent: (program_id, student) => {
        dispatch(actions.addExistingStudent(program_id, student))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddStudentContainer);