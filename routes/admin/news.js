var express = require('express');
var router = express.Router();
var path = require('path');
var common = require('../common.js');
var News = require('../../models/news.js');
var common = require('../common.js');
var ObjectId = require('mongojs').ObjectId;

router.get('/', function(req, res, next) {
	res.render('admin/news/news', {
		module: 'news',
		page: {
			admin: true,
			news: true
		}
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
				id: doc._id
			});
	});
})

module.exports = router;