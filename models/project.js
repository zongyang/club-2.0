var Model = require('./model.js');
var util = require('util');

function Project() {
	Model.call(this, 'project');
	//子类定义的非原型属性放在这个后面，不然会被覆盖

}
util.inherits(Project, Model);
//子类定义的原型属性放在这个后面，不然会被覆盖


module.exports = Project;