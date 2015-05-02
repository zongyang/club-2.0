$(function() {
	$.ajax({
		type: 'get',
		url: '/get-member-content',
		success: function(res) {
			if (res.content)
				$('#content').append(res.content)
				uParse('#content');
		}
	})
})
