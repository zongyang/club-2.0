var express = require('express');
var router = express.Router();
var Login = require('../../models/login.js');
var common = require('../common.js');

router.get('/', function(req, res, next) {
	if (req.session.user != null) {
		res.redirect('/admin/index');
		return
	}
	
	res.render('admin/login/login', {
		module: 'login',
		page: {
			admin: true,
			login: true
		}
	});
})

router.post('/login', function(req, res, next) {
	if (common.isEmpty(req.body.name, req.body.password)) {
		res.send({
			success: false,
			info: '用户名或者密码不能为空！'
		});
		return;
	}

	var login = new Login();
	login.findOne({}, function(err, doc) {
		//数据库还没有记录时需要初始化
		if (doc == null) {
			login.init(function(err, doc) {
				checkAdmin(req, res, doc, req.body)
			})
			return;
		}
		checkAdmin(req, res, doc, req.body);

	});
});

function checkAdmin(req, res, doc, obj) {
	//登录失败
	if (doc.name !== obj.name || doc.password !== obj.password) {
		res.send({
			success: false,
			info: '登录失败：用户名或密码错误！'
		});
		return;
	}
	//登录成功
	req.session.user = doc._id; //记住登录状态
	res.send({
		success: true,
		info: '登录成功!'
	});
	return;
}

module.exports = router;