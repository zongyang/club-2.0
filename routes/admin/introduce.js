var common = require('../common.js');
var Introduce = require('../../models/introduce');



var router_introduce = function(router) {
	//列表的显示
	router.get('/admin/introduce', function(req, res, next) {
		var mokuai = 'admin';
		var path = 'admin/admin';
		var page = common.pageFlag();
		page.introduce = true;

		(new Introduce).findOne({}, function(doc) {
			if (doc == null) {
				doc = {};
				doc._id = null;
				doc.introduce = null;
			}
			res.render(path, {
				mokuai: mokuai,
				introduce: doc,
				page: page
			});
		});

	});
	router.post('/admin/introduce/edit', function(req, res, next) {
		var introduce = new Introduce(req.body);
		var obj = introduce.obj;

		//如果没有记录则添加一条
		if (obj.id == '') {
			delete obj.id;
			introduce.insert(function(err, doc) {
				if (err) {
					res.send({
						success: false,
						info: err
					});
					return;
				}
				res.send({
					success: true,
					info: '修改成功！',
					id: doc._id
				});
			});
		} else { //修改
			introduce.findAndModify({
				_id: obj.id
			}, {
				$set: {
					info: obj.info
				}
			}, function() {
				res.send({
					success: true,
					info: '修改成功!'
				});
			});
		}
	});
}
module.exports = router_introduce;