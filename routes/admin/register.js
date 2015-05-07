var express = require('express');
var router = express.Router();
var Register = require('../../models/register.js');
var Settings = require('../../models/settings.js');
var common = require('../common.js');
var ObjectId = require('mongojs').ObjectId;
var fs = require('fs')
var path = require('path')

router.get('/', function(req, res, next) {
	var register = new Register();
	var settings = new Settings();
	register.sortByDate(function(err, registers) {
		settings.findOne({}, function(err, settings) {

			settings = (settings) ? settings : {}
			res.render('admin/register/register', {
				module: 'register',
				page: {
					admin: true,
					register: true
				},
				docs: registers,
				_switch: settings.switch
			});
		})

	})
});

router.post('/remove', function(req, res, next) {

	if (common.isEmpty(req.body.id)) {
		res.send({
			success: false,
			info: '没有id'
		})
		return;
	}
	var register = new Register();
	var obj = {
		_id: ObjectId(req.body.id)
	}

	register.findOne(obj, function(err, doc) {
		register.remove(obj, function(err, result) {
			//删除文件
			if (doc && fs.existsSync(doc.resume)) {
				fs.unlinkSync(doc.resume);
			}
			res.send({
				success: true,
				info: '删除成功！'
			});
		})
	});
});

router.get('/download', function(req, res, next) {
	var _path = req.query.file
	if (common.isEmpty(_path)) {
		res.send({
			success: false,
			info: '没有文件名'
		})
		return
	}

	res.download(path.join(process.cwd(), _path));
})

router.post('/switch', function(req, res, next) {
	var flag = req.body.flag;
	if (common.isEmpty(flag)) {
		res.send({
			success: false,
			info: '非法操作，没有开关状态'
		})
		return
	}
	if (flag == 'true')
		flag = true
	else
		flag = false

	var settings = new Settings()
	settings.update(flag, function(err, doc) {
		if (err)
			res.send({
				success: false,
				info: err
			})
		else
			res.send({
				success: true,
				info: '修改成功！'
			})

	})

})
module.exports = router;