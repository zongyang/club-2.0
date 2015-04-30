var common = {
	pageFlag: function() {
		return {
			users: false,
			projects: false,
			news: false,
			introduce: false,
			login: false,
			modify: false
		}
	},
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
			if (str.trim() === '')
				return true;

		}
		return false

	}
};

module.exports = common;