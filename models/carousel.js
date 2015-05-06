var Model = require('./model.js');
var util = require('util');

function Carousel() {
	Model.call(this, 'carousel');
	//子类定义的非原型属性放在这个后面，不然会被覆盖
}
util.inherits(Carousel, Model);
//子类定义的原型属性放在这个后面，不然会被覆盖

//public是app.js中被设置为static得路径，需要出去路径最前面的public
Carousel.prototype.find = function(data, callback) {
	this.collection.find(data, function(err, docs) {
		this.delPathPrefix(docs,'img');
		callback(err, docs);
	});
}

//按时间的倒序输出
Carousel.prototype.sortByDate = function(callback) {
	var that=this
	that.collection.find().sort({
		date: -1
	}, function(err, docs) {
		that.delPathPrefix(docs,'img')
		callback(err, docs);
	})
}


module.exports = Carousel;