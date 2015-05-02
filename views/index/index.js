$(function() {
	$('#carousel .item:nth(0)').addClass('active');
	$('#main-content .news li').click(function() {
		debugger;
		location.href = '/news?id=' + $(this).data('id');
	});
	$('#main-content .project li').click(function(){
		location.href = '/news?project=' + $(this).data('id');
	});
});