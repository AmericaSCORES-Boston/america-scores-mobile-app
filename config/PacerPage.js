import React, { Component } from 'react';
import {
    ListView,
    StyleSheet,
    Text,
} from 'react-native';

const student = require('../config/person.js');

function PacerStudent(student, numFailed) {
    this.student = student;
    this.numFailed = numFailed;

    this.failTest = function() { this.numFailed++ }
};

const PacerPage = (props) => {
    const { students } = props;

    this.failStudent = function(studNum) { students[studNum].failTest()}
};

PacerPage.proptypes = {
    students: React.PropTypes.array.isRequired,
};

export default PacerPage;