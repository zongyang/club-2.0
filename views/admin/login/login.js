$(function() {
	$('#admin-login .login').click(function() {
		var name = $('#admin-login .name').val();
		var password = $('#admin-login .password').val();

		if(name==''||password==''){
			modalShow('提示', '用户或者密码不能为空');
			return;
		}

		$.ajax({
			type: 'post',
			url: 'login',
			data: {
				name: name,
				password: password
			},
			success: function(res) {
				if (res.success) {
					location.href = '/admin/index';
				}
				modalShow('提示', res.info);
			}
		});
	});
});