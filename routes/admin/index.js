var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('admin/index/index', {
		module: 'index',
		page: {
			admin: true,
			index: true
		}
	});
})
module.exports = router;