var Model = require('./model.js');
var util = require('util');

function Register() {
	Model.call(this, 'register');
	//子类定义的非原型属性放在这个后面，不然会被覆盖
}
util.inherits(Register, Model);
//子类定义的原型属性放在这个后面，不然会被覆盖
Register.prototype.find = function(data, callback) {
	this.collection.find(data, function(err, docs) {
		this.delPathPrefix(docs,'img');
		callback(err, docs);
	});
}

module.exports = Register;