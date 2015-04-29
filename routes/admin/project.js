var common = require('../common.js');
var Project = require('../../models/project');



var router_project = function(router) {
	//项目列表的显示
	router.get('/admin/projects', function(req, res, next) {
		var mokuai = 'admin';
		var path = 'admin/admin';
		var page = common.pageFlag();
		page.projects = true;

		(new Project).find({}, function(err, docs) {
			res.render(path, {
				mokuai: mokuai,
				projects: docs,
				page: page
			});
		});

	});
	router.post('/admin/projects/edit', function(req, res, next) {
		var project = new Project(req.body);
		var obj = project.obj;
		var result = project.check();
		if (!result.success) {
			res.send({
				success: false,
				info: result.info
			});
			return;
		}
		//修改

		project.findAndModify({
			_id: obj.id
		}, {
			$set: {
				name: obj.name,
				peoples: obj.peoples,
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
	//项目的添加
	router.post('/admin/projects/add', function(req, res, next) {
		var project = new Project(req.body);
		//检测
		var result = project.check();
		if (!result.success) {
			res.send({
				success: false,
				info: result.info
			});
			return;
		}

		//插入
		project.insert(function(err, doc) {
			if (err) {
				res.send({
					success: false,
					info: err
				});
				return;
			}
			res.send({
				success: true,
				info: '项目添加成功！',
				id: doc._id
			});
		});

	});

	//项目的删除
	router.post('/admin/projects/delete', function(req, res, next) {
		var project = new Project();
		var id = req.body.id;
		project.remove({
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
				info: '项目删除成功！'
			});
		});
	});
}



module.exports = router_project;