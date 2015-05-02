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
		res.render('admin/project/project', {
			module: 'project',
			page: {
				admin: true,
				news: true
			},
			docs: docs
		});
	});

});
module.exports = router;