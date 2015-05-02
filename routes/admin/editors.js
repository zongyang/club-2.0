var path = require('path');
var common = require('../common.js');
var news = require('../../models/news.js');
var project = require('../../models/project.js');
var introduce = require('../../models/introduce.js');
var member = require('../../models/member.js');
var register = require('../../models/register.js');
var common = require('../common.js');
var ObjectId = require('mongojs').ObjectId;

var models = {
	news: news,
	project: project,
	introduce: introduce,
	member: member,
	register: register
};

function getPageObj(type) {
	var page = {};
	page[type] = true;
	page['admin'] = true;
	return page;
}
module.exports = function(router, type) {

	router.get('/'+type, function(req, res, next) {
		var model = new models[type];
		model.find({}, {
			name: true,
			date: true
		}, function(err, docs) {
			res.render('admin/'+type+'/'+type, {
				module: type,
				page: getPageObj(type),
				docs: docs
			});
		});

	});
	router.post('/'+type+'/add', function(req, res, next) {
		var checkResult = common.checkByType(req.body);

		if (!checkResult.success) {
			res.send(checkResult);
			return;
		}

		var model = new models[type];
		req.body['date'] = common.getDate();
		model.insert(req.body, function(err, doc) {
			if (err)
				res.send({
					success: false,
					info: err
				})

			else
				res.send({
					success: true,
					info: '添加成功！',
					id: doc._id,
					date: doc.date
				});
		});
	})
	router.post('/'+type+'/edit', function(req, res, next) {
		var checkResult = common.checkByType(req.body, true);

		if (!checkResult.success) {
			res.send(checkResult);
			return;
		}

		var model = new models[type];

		model.update({
			_id: ObjectId(req.body.id)
		}, {
			$set: {
				name: req.body.name,
				content: req.body.content
			}
		}, function(err, result) {
			if (err) {
				res.send({
					success: false,
					info: err
				});
			} else {
				res.send({
					success: true,
					info: '修改成功！'
				});
			}
		});
	});
	router.post('/'+type+'/remove', function(req, res, next) {
		var model = new models[type];
		model.remove({
			_id: ObjectId(req.body.id)
		}, function(err, result) {
			if (err) {
				res.send({
					success: false,
					info: err
				});
			} else {
				res.send({
					success: true,
					info: '删除成功！'
				});
			}
		});
	});
	router.get('/'+type+'/getContent', function(req, res, next) {
		var obj = {
			_id: ObjectId(req.query.id)
		};
		var model = new models[type];
		model.findOne(obj, function(err, doc) {
			if (err)
				res.send({
					success: false,
					info: err
				})
			if (doc == null)
				res.send({
					success: false,
					info: '没有找到相应的记录，刷新浏览器，获取最新数据！'
				})
			else
				res.send({
					success: true,
					content: doc.content
				});
		});
	});

};