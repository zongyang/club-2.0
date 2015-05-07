var Model = require('./model.js');
var util = require('util');
var settings = require('../settings.js');

function Login() {

	Model.call(this, 'admin');
	//子类定义的非原型属性放在这个后面，不然会被覆盖

}
util.inherits(Login, Model);
//子类定义的原型属性放在这个后面，不然会被覆盖

Login.prototype.init = function(callback) {
	var obj = {
		name: settings.admin,
		password: settings.password
	}
	this.insert(obj, function(err, doc) {
		callback();
	})
}

module.exports = Login;