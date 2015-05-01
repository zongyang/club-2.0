var express = require('express');
var router = express.Router();
var path = require('path');
var common = require('../common.js');
var News = require('../../models/news.js');
var common = require('../common.js');
var ObjectId = require('mongojs').ObjectId;

router.get('/', function(req, res, next) {
	var news = new News();
	news.find({}, {
		name: true,
		date: true
	}, function(err, docs) {
		res.render('admin/news/news', {
			module: 'news',
			page: {
				admin: true,
				news: true
			},
			docs: docs
		});
	});

});
router.post('/add', function(req, res, next) {
	var checkResult = common.checkByType(req.body);

	if (!checkResult.success) {
		res.send(checkResult);
		return;
	}

	var news = new News();
	req.body['date'] = common.getDate();
	news.insert(req.body, function(err, doc) {
		if (err)
			res.send({
				success: false,
				info: err
			})

		else
			res.send({
				success: true,
				info: '新闻添加成功！',
				id: doc._id,
				date: doc.date
			});
	});
})
router.post('/edit', function(req, res, next) {
	var checkResult = common.checkByType(req.body, true);

	if (!checkResult.success) {
		res.send(checkResult);
		return;
	}

	var news = new News();

	news.update({
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
router.post('/remove', function(req, res, next) {
	var news = new News();
	news.remove({
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
router.get('/getContent', function(req, res, next) {
	var obj = {
		_id: ObjectId(req.query.id)
	};
	var news = new News();
	news.findOne(obj, function(err, doc) {
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


module.exports = router;