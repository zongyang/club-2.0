var common = {
	getDate: function() {
		var date = new Date();
		var year, month, day;

		year = date.getFullYear();
		month = date.getMonth() + 1;
		day = date.getDate();
		return year + '-' + month + '-' + day;
	},
	isEmpty: function() {
		var len = arguments.length;
		var str;
		for (var i = 0; i < len; i++) {
			str = arguments[i];

			if (str === null)
				return true;
			if (typeof(str) == 'string' && str.trim() === '')
				return true;

		}
		return false
	},
	checkByType: function(obj, type) {
		if (this.isEmpty(obj))
			return {
				success: false,
				info: '非法操作！'
			}

		for (var key in obj) {
			if (key == 'id' || key == '_id')
				continue;
			if (this.isEmpty(obj[key]))
				return {
					success: false,
					info: '非法操作！'
				}

		}

		//修改检查
		if (type)
			if (common.isEmpty(obj.id))
				return {
					success: false,
					info: '没有id,不能修改！'
				}

		return {
			success: true
		}
	}
}
module.exports = common;