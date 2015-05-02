var express = require('express');
var router = express.Router();
var common = require('./common.js');
var News = require('../models/news');
var Project = require('../models/project');
var Introduce = require('../models/introduce');
var Carousel = require('../models/carousel.js');

router.get('/', function(req, res, next) {

  var carousel = new Carousel();
  carousel.find({}, function(err, docs) {
    res.render('index/index', {
      module: 'index',
      carousels: docs,
      page: {
        admin: false
      }
    })
  });
})

module.exports = router;