var express = require('express');
var router = express.Router();
var Login = require('../../models/login.js');
var common = require('../common.js');

router.get('/', function(req, res, next) {
	res.render('admin/modify/modify', {
		module: 'modify',
		page: {
			admin: true,
			modify: true
		}
	});
});
router.get('/logout', function(req, res, next) {
	if (req.session.user == null) {
		res.send({
			success: false,
			info: '未登录'
		});
		return;
	}
	req.session.user = null;
	res.send({
		success: true,
		info: '注销成功'
	});
});
router.post('/password', function(req, res, next) {
	var result = common.checkByType(req.body);
	if (!result.success) {
		res.send(result);
		return;
	}

	if (req.body.new != req.body.again) {
		res.send({
			success: false,
			info: '两次密码不一致'
		});

		return;
	}

	if (req.body.new.length < 6) {
		res.send({
			success: false,
			info: '密码长度必须大于6'
		});

		return;
	}
	var login = new Login();

	login.findOne({
		password: req.body.old
	}, function(err, doc) {
		if (doc == null) {
			res.send({
				success: false,
				info: '修改失败：密码错误'
			});
			return;
		}

		login.update({}, {
			$set: {
				password: req.body.new
			}
		}, function(doc, result) {
			res.send({
				success: true,
				info: '修改成功！'
			});
		});

	});



});
router.post('/name', function(req, res, next) {
	if (common.isEmpty(req.body.name)) {
		res.send({
			success: false,
			info: '用户名不能为空'
		});
		return;
	}

	(new Login()).update({}, {
		$set: {
			name: req.body.name
		}
	}, function(doc, result) {
		res.send({
			success: true,
			info: '修改成功！'
		});
	});
});

router.get('/get-name', function(req, res, next) {
	(new Login()).findOne({}, function(err, doc) {
		doc = (doc) ? doc : {};
		res.send({
			success: true,
			name: doc.name
		});
	});
});

module.exports = router;