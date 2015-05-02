var express = require('express');
var router = express.Router();
var editors = require('./editors.js');
var login = require('./login.js');
var modify = require('./modify.js');
var carousel = require('./carousel.js');


router.use('/carousel', carousel);

//有编辑器插件的路由
['news', 'project', 'introduce', 'member', 'register'].forEach(function(type) {
	router.use('/' + type, function(res, req, next) {
		editors(router, type);
		next();
	})
});

module.exports = router;