var express = require('express');
var router = express.Router();
var index = require('./index.js');
var admin = require('./admin/admin.js');
/* GET home page. */


router.get('/', function(req, res, next) {
	res.redirect('/index');
});

router.use('/index', index);
router.use('/admin', admin);


module.exports = router;