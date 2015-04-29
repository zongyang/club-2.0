var db=require('./db.js');
var common=require('./common.js');
var common1=require('../routes/common.js');
var settings=require('../settings.js');
function User(user){
	if(user){
		user.file=settings.dest+'/'+user.name+getExet(user.file);
	}
	this.obj=user;	
}
//用户的collection
User.prototype.collection=db.get('users');
//存储用户信息
User.prototype.insert=common.insert;
//读取所有用户信息
User.prototype.find=common.find;
//读取一条用户信+
User.prototype.findOne=common.findOne;
//更新操作
User.prototype.update=common.update;
User.prototype.remove=common.remove;
//检验(现在只做空值的检查)
User.prototype.check=function(){
	for(var pro in this.obj){
		if(common1.isEmpty(this.obj[pro])){
			return pro;
		}
	}
	return null;
}
function getExet(str){
	return str.substr(str.lastIndexOf('.'));
}

module.exports=User;