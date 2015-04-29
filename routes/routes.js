var express = require('express');
var router = express.Router();
var index = require('./index.js');
var admin = require('./admin/admin.js');
/* GET home page. */


router.get('/', function(req, res, next) {
	res.render('layout');
});
//index(router);
//admin(router);



module.exports = router;