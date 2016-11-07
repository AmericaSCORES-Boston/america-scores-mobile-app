import React from 'react';

const person = require('../config/person.js');
var Joe = new person("Joe", "Swanson", 10281996);
var Mary = new person("Mary", "Lamb", 8261990);
const roster = require('../config/roster.js');
var boys1 = new roster("Boys team 1", [Joe, Mary]);
var boys2 = new roster("Boys team 2", [Joe]);
var girls1 = new roster("Girls team 1", [Mary]);
var girls2 = new roster("Girls team 2", []);
const site = require('../config/sites.js');
var site1 = new site("Park", [boys1, boys2, girls1]);
const coach = require('../config/coach.js');
var coach1 = new coach("Dave", []);

describe('setFocus', () => {
  it('sets the focus to Site s and shows he has 3 rosters', () => {
    const setFocus = require('../config/setFocus.js');
    expect(setFocus(site1).length).toBe(3);
  })
})

describe('setFocus', () => {
  it('sets the focus of the roster and shows he has 2 people', () => {
    const setFocus = require('../config/setFocus.js');
    expect(setFocus(boys1).length).toBe(2);
  })
})

describe('addRoster', () => {
  it('adds a new roster and makes sure its there', () => {
    const setFocus = require('../config/setFocus.js');
    site1.newRoster("Girls team 2", []);
    expect(setFocus(site1).length).toBe(4);
  })
})

describe('addPerson', () => {
  it('adds a new person and makes sure its there', () => {
    const setFocus = require('../config/setFocus.js');
    boys1.newPerson("Jack", "Candle", 6271995);
    expect(setFocus(boys1).length).toBe(3);
  })
})

describe('addSite', () => {
  it('adds a new site and makes sure its there', () => {
    const setFocus = require('../config/setFocus.js');
    coach1.newSite("Jack", [site1]);
    expect(setFocus(coach1).length).toBe(1);
  })
})
