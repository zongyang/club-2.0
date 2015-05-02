var Model = require('./model.js');
var util = require('util');

function Member(shopId, address) {
	Model.call(this, 'member');
	//子类定义的非原型属性放在这个后面，不然会被覆盖
}
util.inherits(Member, Model);
//子类定义的原型属性放在这个后面，不然会被覆盖


module.exports = Member;