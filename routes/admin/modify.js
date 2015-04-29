var common = require('../common.js');
var Login = require('../../models/login');

var router_modify = function(router) {
	//信息修改页
	router.get('/admin/modify', function(req, res, next) {
		var mokuai = 'admin';
		var path = 'admin/admin';
		var page = common.pageFlag();
		var loginFLag = false
		page.modify = true;

		//已登录
		if (req.session.user) {
			loginFLag = true;
		}
		res.render(path, {
			mokuai: mokuai,
			loginFLag: loginFLag,
			page: page
		});

	});

	//密码修改
	router.post('/admin/modify/pwd', function(req, res, next) {
		var login = new Login();
		//检测
		if (common.isEmpty(req.session.id)) {
			res.send({
				success: false,
				info: '没有提供id!'
			});
			return;
		}
		if (common.isEmpty(req.body.old)) {
			res.send({
				success: false,
				info: '管理员密码不能为空!'
			});
			return;
		}
		if (common.isEmpty(req.body.new)) {
			res.send({
				success: false,
				info: '新密码不能为空!'
			});
			return;
		}
		if (common.isEmpty(req.body.again)) {
			res.send({
				success: false,
				info: '请再次输入新密码!'
			});
			return;
		}
		if (req.body.new !== req.body.again) {
			res.send({
				success: false,
				info: '两次密码必须一致!'
			});
			return;
		}
		login.findOne({
			_id: req.session.user,
			password: req.body.old
		}, function(doc) {
			if (doc == null) {
				res.send({
					success: true,
					info: '原密码不对!'
				});
				return;
			}

			login.findAndModify({
					_id: req.session.user,
					password: req.body.old
				}, {
					$set: {
						password: req.body.new
					}
				},
				function() {
					res.send({
						success: true,
						info: '管理员密码修改成功!'
					});
				});
		});
	});


	//管理员名修改
	router.post('/admin/modify/name', function(req, res, next) {
		var login = new Login();
		//检测
		if (common.isEmpty(req.session.user)) {
			res.send({
				success: false,
				info: '没有提供id!'
			});
			return;
		}
		if (common.isEmpty(req.body.name)) {
			res.send({
				success: false,
				info: '管理员名不能为空!'
			});
			return;
		}
		login.findAndModify({
			_id: req.session.user
		}, {
			$set: {
				name: req.body.name
			}
		}, function() {
			res.send({
				success: true,
				info: '管理员名修改成功!'
			});
		});
	});
}
module.exports = router_modify;