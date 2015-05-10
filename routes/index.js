var express = require('express');
var router = express.Router();
var common = require('./common.js');
var News = require('../models/news');
var Project = require('../models/project');
var Introduce = require('../models/introduce');
var Carousel = require('../models/carousel');
var Member = require('../models/member');
var Register = require('../models/register');
var Settings = require('../models/settings');
var ObjectId = require('mongojs').ObjectId;
var multer = require('multer');

router.get('/', function(req, res, next) {
    var carousel = new Carousel();
    var news = new News();
    var project = new Project();
    var settings = new Settings();
    carousel.sortByDate(function(err1, carousels) {
        news.sortByDate(function(err2, newses) {
            project.sortByDate(function(err3, projects) {
                settings.findOne({}, function(err, settings) {
                    settings = (settings) ? settings : {}
                    res.render('index/index', {
                        module: 'index',
                        carousels: carousels,
                        newses: newses,
                        projects: projects,
                        page: {
                            admin: false,
                            index: true
                        },
                        _switch: settings.switch
                    })
                })
            })
        })
    })
})

router.get('/introduce', function(req, res, next) {
    findByModule('introduce', res);
});

router.get('/member', function(req, res, next) {
    findByModule('member', res);
});


router.get('/news', function(req, res, next) {
    var obj = {
        _id: ObjectId(req.query.id)
    };
    findByModule('news', res, obj);

})

router.get('/project', function(req, res, next) {
    var obj = {
        _id: ObjectId(req.query.id)
    };
    findByModule('project', res, obj);
})
router.get('/register', function(req, res, next) {
    var settings = new Settings();
    var project = new Project();
    settings.findOne({}, function(err, settings) {
        settings = (settings) ? settings : {}
        if (settings.switch) {
            project.find({}, {
                name: true
            }, function(err, projects) {
                console.log(projects)
                res.render('register/register', {
                    module: 'register',
                    page: {
                        admin: false,
                        register: true
                    },
                    projects: projects,
                    _switch: settings.switch
                })
            })

        } else
            res.send('暂未开通报名功能，请联系管理员开通报名功能')

    })
})


router.post('/register/add', multer({
    dest: 'public/resume',
    putSingleFilesInArray: true,
    rename: function(fieldname, filename) {
        return Date.now();
    },
    changeDest: function(dest, req, res) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        return dest;
    },
    limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024 //10MB
    },
    onFileUploadStart: function(file, req, res) {

    },
    onFileUploadComplete: function(file, req, res) {
        console.log(file.originalname + ' upload success! ');
    },
    onFilesLimit: function() {
        console.log('files limits');

    },
    onFileSizeLimit: function(file) {
        console.log('file size limits');

    },
    onError: function(error, next) {
        console.log(error);
        next(error);
    },
    onParseEnd: function(req, next) {
        next();
    }
}));


router.post('/register/add', function(req, res, next) {
    if (res.finished) {
        return
    }

    var checkResult = checkRegister(req.body);
    if (!checkResult.success) {
        res.send(checkResult);
        return;
    }
    req.body['resume'] = req.files['resume'][0].path;
    req.body['date'] = common.getDate();
    var register = new Register();
    register.insert(req.body, function(err, doc) {
        register.delPathPrefix([doc], 'resume');
        res.send({
            success: true,
            info: doc
        })
    })
})

function checkRegister(body) {

    var result = common.checkByType(body);
    if (!result.success)
        return result

    var regEmail = /^\w+@\w+\.\w+$/
    var regNo = /^\d{8,}$/
    var regTel = /^[\d-]+$/

    if (!regEmail.test(body.email))
        return {
            success: false,
            info: '请正确填写Email'
        }

    if (!regNo.test(body.no))
        return {
            success: false,
            info: '请正确填写学号（学号长度大于等于8）'
        }

    if (!regTel.test(body.phone))
        return {
            success: false,
            info: '请正确填写电话'
        }

    return {
        success: true
    }

}

function findByModule(_module, res, query) {
    query = (query) ? query : {}
    var models = {
        introduce: new Introduce,
        member: new Member,
        news: new News,
        project: new Project,
        register: new Register
    }
    var settings = new Settings();

    models[_module].findOne(query, function(err, doc) {
        doc = (doc) ? doc : {};
        settings.findOne({}, function(err, settings) {
            settings = (settings) ? settings : {};
            res.render(_module + '/' + _module, {
                module: _module,
                doc: doc,
                page: {
                    admin: false,
                    _module: true
                },
                _switch: settings.switch
            });
        })
    })
}


module.exports = router;