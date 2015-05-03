$(function() {
	$('#carousel li.circle').each(function(index) {
		$(this).attr('data-slide-to', index);
		if (index == 0) {
			$(this).addClass('active')
		}
	});
	$('#carousel .item:nth(0)').addClass('active');

	$('#main-content .news li').click(function() {
		location.href = '/news?id=' + $(this).data('id');
	});
	$('#main-content .project li').click(function() {
		location.href = '/project?id=' + $(this).data('id');
	});
});