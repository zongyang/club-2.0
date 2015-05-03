var express = require('express');
var router = express.Router();
var common = require('./common.js');
var News = require('../models/news');
var Project = require('../models/project');
var Introduce = require('../models/introduce');
var Carousel = require('../models/carousel');
var Member = require('../models/member');
var ObjectId = require('mongojs').ObjectId;

router.get('/', function(req, res, next) {
    var carousel = new Carousel();
    var news = new News();
    var project = new Project();

    carousel.sortByDate(function(err1, carousels) {
        news.sortByDate(function(err2, newses) {
            project.sortByDate(function(err3, projects) {
                res.render('index/index', {
                    module: 'index',
                    carousels: carousels,
                    newses: newses,
                    projects: projects,
                    page: {
                        admin: false,
                        index: true
                    }
                })
            })
        })
    })
})

router.get('/introduce', function(req, res, next) {

    (new Introduce()).findOne({},
        function(err, doc) {
            doc = (doc) ? doc : {};
            res.render('introduce/introduce', {
                module: 'introduce',
                doc: doc,
                page: {
                    admin: false,
                    introduce: true
                }
            });
        });
});

router.get('/member', function(req, res, next) {

    (new Member()).findOne({},
        function(err, doc) {
            doc = (doc) ? doc : {};
            res.render('member/member', {
                module: 'member',
                doc: doc,
                page: {
                    admin: false,
                    member: true
                }
            });
        });
});


router.get('/news', function(req, res, next) {
    var obj = {
        _id: ObjectId(req.query.id)
    };
    (new News()).findOne(obj, function(err, doc) {
        doc = (doc) ? doc : {};
        res.render('news/news', {
            module: 'news',
            doc: doc,
            page: {
                admin: false,
                news: true
            }
        })
    })
})

router.get('/project', function(req, res, next) {
    var obj = {
        _id: ObjectId(req.query.id)
    };
    (new Project()).findOne(obj, function(err, doc) {
        doc = (doc) ? doc : {};
        res.render('project/project', {
            module: 'project',
            doc: doc,
            page: {
                admin: false,
                project: true
            }
        })
    })
})
router.get('/register', function(req, res, next) {
    res.render('register/register', {
        module: 'register',
        page: {
            admin: false,
            register: true
        }
    })
})
module.exports = router;