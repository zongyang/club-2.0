$(function() {
	initSwitch();
	$('#admin-register table .options .glyphicon-remove').unbind('click').bind('click', function() {
		var tr = $(this).parent().parent();
		var name = tr.find('.name').text();
		tr.addClass('active').siblings().removeClass('active');
		modalShow('提示', '是否要删除 ' + name + ' ?', sendRemoveRequest);
	});
})

function sendRemoveRequest() {
	var tr = $('#admin-register table .active');
	var id = tr.find('.id').text();
	$.ajax({
		type: 'post',
		url: 'remove',
		data: {
			id: id
		},
		success: function(response) {
			if (response.success) {
				tr.remove();
			}
			alertShow(response.info, $('#admin-register table'));
		}
	});
}

function initSwitch() {
	var _switch = $('#admin-register .switch input').bootstrapSwitch();
	$('#admin-register .switch input').on('switchChange.bootstrapSwitch', function(event, state) {
		$.ajax({
			type: 'post',
			url: 'switch',
			data: {
				flag: state
			},
			success: function(res) {
				alertShow(res.info, $('#admin-register table'));
			}
		})
	});

}