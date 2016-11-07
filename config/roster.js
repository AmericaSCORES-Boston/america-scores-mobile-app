module.exports = roster;

const person = require('../config/person.js');

function roster(name, people) {
  this.name = name;
  this.people = people;
  this.newPerson = function(firstName, lastName, dob) {
    this.people[this.people.length] = new person(firstName, lastName, dob)
  }
};
