var express = require('express');
var router = express.Router();
var index = require('./index.js');
var ueditor=require('./ueditor.js');
//var admin=require('./admin/login.js');
var admin = require('./admin/admin.js');

router.get('/', function(req, res, next) {
	res.redirect('/index');
});

router.use('/index', index);
router.use('/admin', admin);
router.use('/ueditor',ueditor);


module.exports = router;