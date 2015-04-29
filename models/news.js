var db=require('./db.js');
var common=require('./common.js');
var common1=require('../routes/common.js');
function News(news){
	this.obj=news;
}
//消息的collection
News.prototype.collection=db.get('news');
//存储消息信息
News.prototype.insert=common.insert;
//读取消息信息
News.prototype.find=common.find;
//读取消息信息
News.prototype.findOne=common.findOne;
//项目消息操作
News.prototype.findAndModify=common.findAndModify;
News.prototype.remove=common.remove;
//检验
News.prototype.check=function(){
	if(common1.isEmpty(this.obj.name)){
		return {success:false,info:'消息名不能为空'};
	}
	return {success:true,info:''};
}


module.exports=News;