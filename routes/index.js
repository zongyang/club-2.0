var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
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

function index(router) {
  //首页
  router.get('/index', function(req, res, next) {
    var mokuai = 'index';
    var newsList, projects, introduce;
    //新闻
    (new News).find({}, function(err, docs) {
      newsList = docs;
      //项目
      (new Project).find({}, function(err, docs) {
        projects = docs;
        //简介
        (new Introduce).findOne({}, function(doc) {
          if (doc == null) {
            doc = {};
            doc._id = null;
            doc.info = null;
          }
          introduce = doc;

          //渲染
          res.render('index/index', {
            mokuai: mokuai,
            newsList: newsList,
            projects: projects,
            introduce: introduce
          });
        });

      });
    });
  });
  //报名
  router.post('/index/signup', function(req, res, next) {
    var user = new User(req.body);
    //检测
    var result = user.check();
    if (result !== null) {
      res.send({
        success: false,
        info: '报名失败：' + result
      });
      return;
    }
    //检测用户是否已存在
    user.findOne({
      name: user.obj.name
    }, function(doc) {
      if (doc != null) {
        res.send({
          success: false,
          info: '报名失败：改用户已存在！'
        });
        return;
      }
      user.insert(function(err, doc) {
        if (err) {
          res.send({
            success: false,
            info: '报名失败：' + err
          });
          return;
        }
        res.send({
          success: true,
          info: doc.name
        });
      })
    })
  });
  //文件上传
  router.post('/index/upload', function(req, res, next) {
    if (req.files.length == 0) {
      res.send('没有文件');
      return;
    }
    res.send('上传完毕');
  });


  router.get('/index/news', function(req, res, next) {
    var mokuai = 'news';
    var id = req.query.id;

    (new News).findOne({
      _id: id
    }, function(doc) {
      if (doc == null) {
        doc = {};
      };
      console.log(doc)
      res.render('news/news', {
        mokuai: mokuai,
        news: doc
      });
    });

  });

  router.get('/index/projects', function(req, res, next) {
    var mokuai = 'projects';
    var id = req.query.id;

    (new Project).findOne({
      _id: id
    }, function(doc) {
      if (doc == null) {
        doc = null
      }
      res.render('projects/projects', {
        mokuai: mokuai,
        project: doc
      });
    })

  });
}

module.exports = router;