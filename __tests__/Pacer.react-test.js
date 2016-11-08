import React from 'react';
import renderer from 'react-test-renderer';

import PacerPage from '../config/PacerPage.js';
const person = require('../config/person.js');
var Joe = new person("Joe", "Swanson", 10281996);
var Dave = new person("Dave", "Lamb", 8261990);
var boys = new roster("Boys team 1", [Joe, Dave]);

it('renders a Pacer using Snapshots', () => {
    expect(renderer.create(
        <PacerPage
            students = { boys }/>)).toMatchSnapshot();
});

it('renders a Pacer with one student failed once using Snapshots', () => {
    expect(renderer.create(
        <PacerPage
            students = { boys }/>).failStudent(0)).toMatchSnapshot();
});

it('renders a Pacer with one student failed twice using Snapshots', () => {
    expect(renderer.create(
        <PacerPage
            students = { boys }/>).failStudent(0).failStudent(0)).toMatchSnapshot();
});

it('renders a Pacer with two students failed once using Snapshots', () => {
    expect(renderer.create(
        <PacerPage
            students = { boys }/>).failStudent(0).failStudent(1)).toMatchSnapshot();
});