var express = require('express');
var router = express.Router();
var index = require('./index.js');
var ueditor=require('./ueditor.js');
var admin = require('./admin/admin.js');


router.use('/', index);
router.use('/admin', admin);
router.use('/ueditor',ueditor);

module.exports = router;