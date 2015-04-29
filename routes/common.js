var common = {
	pageFlag: function() {
		return {
			users: false,
			projects: false,
			news: false,
			introduce: false,
			login: false,
			modify:false
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
	isEmpty:function(str){
		if(str==null){
			return true;
		}
		if(str.trim()==''){
			return true;
		}
		return false;

	}
};

module.exports = common;