var common = require('../common.js');
var Login = require('../../models/login');

var router_login = function(router) {
	//管理员登录页
	router.get('/admin', function(req, res, next) {
		var mokuai = 'admin';
		var path = 'admin/admin';
		var page = common.pageFlag();
		var loginFLag = false
		page.login = true;

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
	//登录
	router.post('/admin/login', function(req, res, next) {
		var mokuai = 'admin';
		var path = 'admin/admin';
		var page = common.pageFlag();
		page.login = true;

		var login = new Login(req.body);
		//检测
		var result = login.check();
		if (!result.success) {
			res.send(result);
			return;
		}
		//数据库查找
		login.findOne({}, function(doc) {
			//管理员还没有记录需要初始化
			if (doc == null) {
				login.init(function(doc) {
					checkAdmin(req, res, doc, login.obj);
				});
			} else {
				checkAdmin(req, res, doc, login.obj);
			}
		});

	});

	//注销
	router.post('/admin/logout', function(req, res, next) {
		if (req.session.user == null) {
			res.send({
				success: false,
				info: '未登录，无需注销！'
			});
		}
		req.session.user = null;
		res.send({
			success: true,
			info: '注销成功！'
		});
	});

}

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
module.exports = router_login;