module.exports = coach;

const site = require('../config/sites.js');

function coach(name, sites) {
  this.name = name;
  this.sites = sites;
  this.newSite = function(name, rosters) {this.sites[this.sites.length] = new site(name, rosters)};
};
