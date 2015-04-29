var express = require('express');
var router = express.Router();
var user = require('./user.js');
var project = require('./project.js');
var news = require('./news.js');
var introduce = require('./introduce.js');
var login = require('./login.js');
var modify=require('./modify.js');
var carousel=require('./carousel.js');



router.use('/carousel',carousel);
/*var admin_introduce = function(router) {
    login(router);
	router.all('/admin/*', function(req, res, next) {
		if (req.session.user != null) {
			next();
		} else {
			req.flash('error','未登录！');
			res.redirect('/admin');
		}
	})

	project(router);
	user(router);
	news(router);
	introduce(router);
	modify(router);
	
}*/

module.exports = router;