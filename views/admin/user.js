//初始化人员列表
function initUsers() {
	$('#users table i.close').click(function() {
		$(this).addClass('active');
		$('#users table i.close').not($(this)).removeClass('active');
		delUser();
	});
}

function delUser() {
	var obj=getUserFromTb('close');
	msgAlert('提示', '确认要删除用户  "' + obj.name + '" 吗？', function() {
		$.ajax({
			url: 'users/delete',
			data: {
				id: obj.id
			},
			type: 'post',
			success: function(data) {
				msgAlert('提示', data.info);
				if (data.success) {
					$('#users table tbody tr:nth(' + obj.index + ')').remove();
				}
			}
		});

	});
}

function getUserFromTb(type) {
	var active = $('#users table i.' + type + '.active');
	var index = $('#users table i.' + type).index(active);
	var row = $('#users table tbody tr:nth(' + index + ')')
	var obj = {
		id: '',
		name: ''
	};

	for (var p in obj) {
		obj[p] = row.find('.' + p).text();
	}

	obj.index = index;
	return obj;

}