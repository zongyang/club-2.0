var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var common = require('../common.js');
var Carousel = require('../../models/carousel.js');
var ObjectId = require('mongojs').ObjectId;
var supportImages = ['image/gif', 'image/jpeg', 'image/png'];

router.get('/', function(req, res, next) {
	var carousel = new Carousel();
	carousel.find({}, function(err, docs) {
		res.render('admin/carousel/carousel', {
			module: 'carousel',
			docs: docs,
			page: {
				admin: true,
				carousel: true
			}
		});
	});

});

router.post('/insert', multer({
	dest: 'public/carousel',
	putSingleFilesInArray: true,
	rename: function(fieldname, filename) {
		return Date.now();
	},
	changeDest: function(dest, req, res) {
		var obj = req.body;
		if (!fs.existsSync(dest)) {
			fs.mkdirSync(dest);
		}
		return dest;
	},
	limits: {
		files: 1,
		fileSize: 10 * 1024 * 1024 //10MB
	},
	onFIleUploadStart: function(file, req, res) {

		var checkResult = common.checkByType(req.body);

		if (!checkResult.success) {
			res.send(checkResult);
			return;
		}

		if (supportImages.indexOf(file.mimetype) == -1) {
			console.log('not support type');
			res.send({
				success: false,
				info: 'not support type'
			});
			return false;

		}
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

router.post('/insert', function(req, res, next) {
	req.body.img = req.files['img'][0].path;

	var carousel = new Carousel();
	//插入数据库
	carousel.insert(req.body, function(err, doc) {
		if (err) {
			res.send({
				success: false,
				info: err
			});
			return;
		}
		res.send({
			success: true,
			id: doc._id,
			img: doc.img
		});
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
	var carousel = new Carousel();
	var obj = {
		_id: ObjectId(req.body.id)
	}

	carousel.findOne(obj, function(err, doc) {
		if (err) {
			res.send({
				success: false,
				info: err
			});
			return;
		}
		carousel.remove(obj, function(err, result) {
			if (err) {
				res.send({
					success: false,
					info: err
				});
				return;
			}
			//删除文件
			//console.log(doc)
			if (doc && fs.existsSync(doc.img)) {
				fs.unlinkSync(doc.img);
			}
			res.send({
				success: true,
				info: '删除成功！'
			});

		})
	});


})

module.exports = router;