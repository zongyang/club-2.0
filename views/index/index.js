$(function() {
	$('#carousel .item:nth(0)').addClass('active');
	$('#main-content .news li').click(function() {
		location.href = '/news?id=' + $(this).data('id');
	});
	$('#main-content .project li').click(function(){
		location.href = '/project?id=' + $(this).data('id');
	});
});