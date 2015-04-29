var db = require('./db.js');
var common = require('./common.js');
var common1 = require('../routes/common.js');
var settings = require('../settings.js');

function Login(login) {
	this.obj = login;
}
Login.prototype.collection = db.get('admin');

//在第一次进入系统时根据用户配置管理员
Login.prototype.init = function(callback) {
	var obj = {
		name: settings.admin,
		password: settings.password
	}
	this.collection.insert(obj,
		function(err, doc) {
			callback(doc);
		}
	);

}
Login.prototype.insert = common.insert;

Login.prototype.find = common.find;

Login.prototype.findOne = common.findOne;

Login.prototype.findAndModify = common.findAndModify;
Login.prototype.remove = common.remove;
Login.prototype.check = function() {
	if (this.obj == null) {
		return {
			success: false,
			info: '拜托请不要这样！'
		}
	}
	if (common1.isEmpty(this.obj.password)) {
		return {
			success: false,
			info: '密码不能为空！'
		};
	}
	if (common1.isEmpty(this.obj.name)) {
		return {
			success: false,
			info: '管理员名不能为空！'
		};
	}
	return {
		success: true
	}
}

module.exports = Login;