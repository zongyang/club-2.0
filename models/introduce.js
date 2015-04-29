var db=require('./db.js');
var common=require('./common.js');
var common1=require('../routes/common.js');
function Introduce(intr){
	this.obj=intr;
}
//消息的collection
Introduce.prototype.collection=db.get('introduce');
//存储消息信息
Introduce.prototype.insert=common.insert;
//读取消息信息
Introduce.prototype.find=common.find;
//读取消息信息
Introduce.prototype.findOne=common.findOne;
//项目消息操作
Introduce.prototype.findAndModify=common.findAndModify;
Introduce.prototype.remove=common.remove;



module.exports=Introduce;