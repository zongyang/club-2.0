var express = require('express');
var router = express.Router();
var editors = require('./editors.js');
var login = require('./login.js');
var modify = require('./modify.js');
var carousel = require('./carousel.js');
var index = require('./index.js');
var register = require('./register.js')

router.use('/', function(req, res, next) {
	var reg = /^\/login/; //登陆时不需要验证
	if (!reg.test(req.path)) {
		if (req.session.user != null) {
			next();
		} else {
			req.flash('error', '未登陆');
			res.redirect('/admin/login');
		}
	} else {
		next();
	}
})
router.use('/login', login);
router.use('/index', index);
router.use('/carousel', carousel);
router.use('/modify', modify);
router.use('/register', register);
//有编辑器插件的路由
['news', 'project', 'introduce', 'member'].forEach(function(type) {
	router.use('/' + type, function(res, req, next) {
		editors(router, type);
		next();
	})
});

module.exports = router;