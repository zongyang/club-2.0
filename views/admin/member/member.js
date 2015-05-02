//与introduce模块是完全一样的
(function() {
	var script = $('<script type="text/javascript" src="/admin/introduce/introduce.js"></script>');
	$('script:last-child').after(script);
})()