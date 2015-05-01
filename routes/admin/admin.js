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
router.use('/news',news);

module.exports = router;