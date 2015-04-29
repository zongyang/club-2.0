var common = require('../common.js');
var News = require('../../models/news');



var router_news = function(router) {
	//列表的显示
	router.get('/admin/news', function(req, res, next) {
		var mokuai = 'admin';
		var path = 'admin/admin';
		var page = common.pageFlag();
		page.news = true;

		(new News).find({}, function(err, docs) {
			res.render(path, {
				mokuai: mokuai,
				newslist: docs,
				page: page
			});
		});

	});
	router.post('/admin/news/edit', function(req, res, next) {
		var news = new News(req.body);
		var obj = news.obj;
		var result = news.check();
		if (!result.success) {
			res.send({
				success: false,
				info: result.info
			});
			return;
		}
		//修改

		news.findAndModify({
			_id: obj.id
		}, {
			$set: {
				name: obj.name,
				date: obj.date,
				info: obj.info,
				content: obj.content
			}
		}, function() {
			res.send({
				success: true,
				info: '修改成功!'
			});
		});
	});
	//添加
	router.post('/admin/news/add', function(req, res, next) {
		var news = new News(req.body);
		news.obj.date=common.getDate();
		//检测
		var result = news.check();
		if (!result.success) {
			res.send({
				success: false,
				info: result.info
			});
			return;
		}

		//插入
		news.insert(function(err, doc) {
			if (err) {
				res.send({
					success: false,
					info: err
				});
				return;
			}
			res.send({
				success: true,
				info: '消息添加成功！',
				id: doc._id,
				date:doc.date
			});
		});

	});

	//删除
	router.post('/admin/news/del', function(req, res, next) {
		var news = new News();
		var id = req.body.id;
		console.log(id);
		news.remove({
			'_id': id
		}, function(err) {
			if (err) {
				res.send({
					success: false,
					info: err
				});
				return;
			}
			res.send({
				success: true,
				info: '消息删除成功！'
			});
		});
	});
}



module.exports = router_news;