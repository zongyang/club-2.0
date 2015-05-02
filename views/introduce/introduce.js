$(function() {
	$.ajax({
		type: 'get',
		url: '/get-introduce-content',
		success: function(res) {
			if (res.content)
				$('#content').append(res.content)
				uParse('#content');
		}
	})
})
