import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert, View } from 'react-native';
import { Container, Content, Button, Picker, InputGroup, Input, List, H1, H2, H3 } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions/student';
import scoresTheme from '../themes/scoresTheme';
import numbers from '../util/numbers';
import dates from '../util/dates';

import styles from '../styles/index';

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
    }

    componentWillReceiveProps(nextProps) {
        const newStudentData = nextProps.studentData;
        if (newStudentData.searchResults !== this.state.searchResults) {
            this.state.searchResults = newStudentData.searchResults;
            this.showSearchResults();
        }
        else if (newStudentData.message !== this.state.message) {
            Alert.alert('Student Already Exists', newStudentData.message);
        }
    }

    // Show the results of the search in an alert box (if a student has or hasn't been found).
    showSearchResults() {
        const self = this,
            displayName = `${this.state.first_name} ${this.state.last_name}`,
            displayDob = `${this.state.month}/${this.state.day}/${this.state.year}`,
            studentFound = this.state.searchResults.length > 0,
            student = (studentFound) ? this.state.searchResults[0] : null;

        if (studentFound) {
            student.dob = student.dob.substring(0, 10);
        }

        const alertTitle = (studentFound) ? 'Existing Student Found' : 'Student Not Found';

        const alertBody = (studentFound) ?
                `${displayName} was found.\n` +
                `Date of Birth: ${displayDob}\n\n` +
                'Add them to this program?' :
                `${displayName} was not found.\n` +
                `Date of Birth: ${displayDob}\n\n` +
                'Create this student?';

        const alertButtons = (studentFound) ?
            [{text: 'Cancel', style: 'cancel'},
             {text: 'OK', onPress: () => self.addExistingStudent(student) }] :
            [{text: 'Cancel', style: 'cancel'},
             {text: 'OK', onPress: () => self.createStudent() }];

        Alert.alert(alertTitle, alertBody, alertButtons);
    }

    // Add an existing student to this program and go back to the students page.
    addExistingStudent(student) {
        this.props.addExistingStudent(this.props.program_id, this.state.student_ids, student);
        Actions.pop();
    }

    // Create a new student to add to this program, and go back to the students page.
    createStudent() {
        this.props.createStudent(this.props.program_id, this.state.first_name, this.state.last_name, this.state.dob);
        Actions.pop();
    }

    // Search for a student with the given name and date of birth.
    searchStudent() {
        const self = this,
            first_name = this.state.first_name.trim(),
            last_name = this.state.last_name.trim(),
            year = this.state.year.trim(),
            month = this.state.month.trim(),
            day = dates.formatDayMonth(numbers.toInt(this.state.day.trim())),
            dob = dates.formatDateString(month, day, year, '-');

        this.setState({first_name, last_name, year, month, day, dob}, function() {
            this.props.searchStudent(self.state.first_name, self.state.last_name, self.state.dob);
        });
    }

    // Is the search input valid?  All fields must be filled, and date of birth must meet the required conditions.
    isValidSearch() {
        return this.isFirstNameValid() &&
            this.isLastNameValid() &&
            this.isMonthValid() &&
            this.isDayValid() &&
            this.isYearValid() &&
            this.isLeapYearValid();
    }

    // Is the first name entered valid?
    isFirstNameValid() {
        const first_name = this.state.first_name.trim();
        return first_name.length > 0;
    }

    // Is the last name entered valid?
    isLastNameValid() {
        const last_name = this.state.last_name.trim();
        return last_name.length > 0;
    }

    // Is the month entered valid?
    isMonthValid() {
        const month = this.state.month.trim();
        return month.length > 0;
    }

    // Is the day entered valid?  Checks that the day is an integer between 1 and 31.
    isDayValid() {
        const day = numbers.toInt(this.state.day.trim()),
            dayString = dates.formatDayMonth(day);
        const month = this.state.month.trim();

        var min = this.props.dayMin;
        var max = this.props.dayMax;
        if (month == '02') {
          max = 29
        }
        return (dayString.length > 0) &&
            (numbers.isInt(day)) &&
            (day >= min) &&
            (day <= max);
    }

    // Is the year entered valid?  Checks that the year is an integer between the current year (2016) and 30 years
    // before (1986).
    isYearValid() {
        const year = numbers.toInt(this.state.year.trim());

        return (year.toString().length === 4) &&
            (numbers.isInt(year)) &&
            (year >= this.props.yearMin) &&
            (year < this.props.currentYear);
        return true;
    }

    // Checking special cases for leap years
    isLeapYearValid() {
      const day = numbers.toInt(this.state.day.trim());
      const month = this.state.month.trim();
      const year = numbers.toInt(this.state.year.trim());
      var dayMax = this.props.dayMax;
      var isLeapYear = false;

      // checking if this is a leap year
      if (year % 4 == 0 ||
        ((year % 100 == 0) && (year % 400 == 0))) {
        isLeapYear = true;
      }

      if (!isLeapYear && month == '02') {
        dayMax = 28;
      }
      if (month != '02') {
        // avoid throwing double errors
        return true;
      }
      // final checking for the day with conditions about the month and year
      return (day <= dayMax);
    }

    render() {
        return (
            <Container style={[styles.container, styles.containerPadding]}>
                <Content theme={scoresTheme}>
                    <H3 style={styles.textAlignCenter}>To add a student to this program,</H3>
                    <H3 style={styles.textAlignCenter}>search by their name, and date of birth.</H3>

                    <View style={styles.mediumMarginTop}>
                        <H2 style={styles.bold}>Name</H2>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: .75, flexDirection: 'row', paddingRight: 10 }}>
                                <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                                    <Input placeholder={'First'}
                                           autoCapitalize="words"
                                           returnKeyType="next"
                                           onChangeText={(first_name) => this.setState({first_name})}
                                           onSubmitEditing={() => { this._last_name._textInput.focus();}}
                                    />
                                </InputGroup>
                            </View>

                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <InputGroup style={[styles.InputGroup, {flex: 1}]}>
                                    <Input ref={component => this._last_name = component}
                                           placeholder={'Last'}
                                           autoCapitalize="words"
                                           returnKeyType="next"
                                           onChangeText={(last_name) => this.setState({last_name})}
                                    />
                                </InputGroup>
                            </View>
                        </View>
                    </View>

                    <View style={styles.mediumMarginTop}>
                        <H2 style={styles.bold}>Date of Birth</H2>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: .75, flexDirection: 'row'}}>
                                <Picker
                                    style={{flex: 1}}
                                    iosHeader="Month"
                                    mode="dropdown"
                                    selectedValue={this.state.month}
                                    onValueChange={(month) => this.setState({month})} >

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

                            <View style={{flex: .4, flexDirection: 'row', paddingHorizontal: 10}}>
                                <InputGroup error={!this.isDayValid()}
                                            success={this.isDayValid()}
                                            style={[styles.InputGroup, {flex: 1}]}>
                                    <Input placeholder={'Day'}
                                           keyboardType="numeric"
                                           returnKeyType="next"
                                           maxLength={2}
                                           onChangeText={(day) => this.setState({day})}
                                           onSubmitEditing={() => { this._year._textInput.focus();}}
                                    />
                                </InputGroup>
                            </View>

                            <View style={{flex: .75, flexDirection: 'row'}}>
                                <InputGroup error={!this.isYearValid()}
                                            success={this.isYearValid()}
                                            style={[styles.InputGroup, {flex: 1}]}>
                                    <Input ref={component => this._year = component}
                                           placeholder={'Year'}
                                           returnKeyType="next"
                                           keyboardType="numeric"
                                           maxLength={4}
                                           onChangeText={(year) => this.setState({year})}
                                    />
                                </InputGroup>
                            </View>
                        </View>
                    </View>

                    {this.showErrors()}

                    <View style={styles.mediumMarginTop}>
                        <Button large block disabled={!this.isValidSearch()} onPress={() => this.searchStudent()}>
                            <H1 style={styles.white}>Search</H1>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }

    // Show a list of errors to the user based on their inputs so far.
    showErrors() {
        let errors = [];

        if (!this.isFirstNameValid()) {
            errors.push('\u2022 The first name is missing.');
        }
        if (!this.isLastNameValid()) {
            errors.push('\u2022 The last name is missing.');
        }
        if (!this.isMonthValid()) {
            errors.push('\u2022 The month has not been selected.');
        }
        if (!this.isDayValid()) {
          if (this.state.month.trim() == '02') {
            errors.push(`\u2022 For February, the day must be between 1 and 29.`);
          }
          else {
            errors.push(`\u2022 The day must be between ${this.props.dayMin} and ${this.props.dayMax}.`);
          }
        }
        if (!this.isYearValid()) {
            errors.push(`\u2022 The year must be between ${this.props.yearMin} and ${this.props.currentYear}.`);
        }
        if (!this.isLeapYearValid()) {
            errors.push(`\u2022 Day is invalid with February in a common year.`);
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

AddStudentContainer.propTypes = {
    studentData: PropTypes.object.isRequired,
    currentYear: PropTypes.number.isRequired,
    yearMin: PropTypes.number.isRequired,
    dayMin: PropTypes.number.isRequired,
    dayMax: PropTypes.number.isRequired
};

const currentYear = new Date().getFullYear();

AddStudentContainer.defaultProps = {
    studentData: {},
    currentYear,
    yearMin: currentYear - 30,
    dayMin: 1,
    dayMax: 31
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
    addExistingStudent: (program_id, student_ids, student) => {
        dispatch(actions.addExistingStudent(program_id, student_ids, student));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddStudentContainer);
