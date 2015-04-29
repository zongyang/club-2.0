var db=require('./db.js');
var common=require('./common.js');
var common1=require('../routes/common.js');
function Project(project){
	this.obj=project;	
}
//项目的collection
Project.prototype.collection=db.get('projects');
//存储项目信息
Project.prototype.insert=common.insert;
//读取项目信息
Project.prototype.find=common.find;
//读取项目信息
Project.prototype.findOne=common.findOne;
//项目更新操作
Project.prototype.findAndModify=common.findAndModify;
Project.prototype.remove=common.remove;
//检验
Project.prototype.check=function(){
	if(common1.isEmpty(this.obj.name)){
		return {success:false,info:'项目名不能为空！'};
	}
	return {success:true,info:''};
}


module.exports=Project;