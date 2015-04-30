var Model = require('./model.js');
var util = require('util');

function Carousel() {
	Model.call(this, 'carousel');
	//子类定义的非原型属性放在这个后面，不然会被覆盖
}
util.inherits(Carousel, Model);
//子类定义的原型属性放在这个后面，不然会被覆盖
Carousel.prototype.find = function(data, callback) {

	//public是app.js中被设置为static得路径，需要出去路径最前面的public
	this.collection.find(data, function(err, docs) {
		var pos;
		docs.forEach(function(doc) {
			pos = doc.img.indexOf('/');
			doc.img = doc.img.substr(pos+1);
		});
		callback(err, docs);
	});
}
module.exports = Carousel;