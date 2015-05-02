//与news模块是完全一样的
(function() {
	var script = $('<script type="text/javascript" src="/admin/news/news.js"></script>');
	$('script:last-child').after(script);
})()