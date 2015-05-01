var express = require('express');
var router = express.Router();
var path = require('path');
var common = require('../common.js');
var news = require('../../models/news.js');
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


module.exports = router;