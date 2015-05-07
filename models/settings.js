var Model = require('./model.js');
var util = require('util');

function Settings() {
	Model.call(this, 'settings');
	//子类定义的非原型属性放在这个后面，不然会被覆盖

}
util.inherits(Settings, Model);
//子类定义的原型属性放在这个后面，不然会被覆盖
Settings.prototype.update = function(flag, callback) {
	var that = this;
	that.collection.findAndModify({
		query: {},
		update: {
			$set: {
				'switch': flag
			}
		}
	}, function(err, doc, lastErrorObject) {

		if (doc != null) {
			callback(err, doc)
			return
		}

		//如果没有则插入一条初始记录
		that.insert({
			'switch': flag
		}, function(err, doc) {
			callback(err, doc)
		})

	})
}

module.exports = Settings;