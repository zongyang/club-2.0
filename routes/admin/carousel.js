var express = require('express');
var router = express.Router();
var Carousel = require('../../models/carousel.js');

router.get('/', function(req, res, next) {
	res.render('admin/carousel/carousel', {
		module: 'carousel',
		page: {
			admin: true
		}
	})
});


module.exports = router;