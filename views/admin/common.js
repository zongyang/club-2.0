$(function() {
	init();
})

function init() {
	if ($('#users').length > 0) {
		initUsers();
	}
	if ($('#projects').length > 0) {
		initProjects();
	}
	if($('#news').length>0){
		initNews();
	}
	if($('#introduce').length>0){
		initIntroduce();
	}
	if($('#login').length>0){
		initLogin();
	}
	if($('#modify').length>0){
		initModify();
	}
	$('table').tablesort();
}