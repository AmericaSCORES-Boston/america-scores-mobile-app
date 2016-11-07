module.exports = setFocus;

var site = require('../config/sites.js');
var roster = require('../config/roster.js');

function setFocus(type) {
  if (type instanceof site) {
    return type.rosters;
  }
  else  if (type instanceof roster){
    return type.people;
  }
  else {
    return type.sites;
  }
};
