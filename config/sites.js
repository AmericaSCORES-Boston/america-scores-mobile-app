module.exports = site;

const roster = require('../config/roster.js');

function site(name, rosters) {
  this.name = name;
  this.rosters = rosters;
  this.newRoster = function(name, people) {this.rosters[this.rosters.length] = new roster(name, people)};
};
