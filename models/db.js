var settings = require('../settings.js');
var mongodb = require('mongodb');
var monk = require('monk');
var db = monk(getConstr(settings));

function getConstr(settings) {
	return settings.host+'/' + settings.db;
}
module.exports = db;