var Model = require('./model.js');
var util = require('util');

function Introduce(shopId, address) {
	Model.call(this, 'introduce');
	//子类定义的非原型属性放在这个后面，不然会被覆盖

}
util.inherits(Introduce, Model);
//子类定义的原型属性放在这个后面，不然会被覆盖


module.exports = Introduce;