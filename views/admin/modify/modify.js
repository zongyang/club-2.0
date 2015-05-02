$(function() {
	var dom = $('#admin-modify');
	dom.find('.name-ok').click(editName);
	dom.find('.password-ok').click(editPassword);
	dom.find('.password-reset').click(reset);
	dom.find('.logout').click(logout);

	getName();
})

function editName() {
	var name = $('#admin-modify .name').val();
	if (name == '') {
		modalShow('提示', '用户名不能为空');
		return;
	}
	$.ajax({
		type: 'post',
		data: {
			name: name
		},
		url: 'name',
		success: function(res) {
			modalShow('提示', res.info);
		}
	});
}

function editPassword() {
	var old = $('#admin-modify .old').val();
	var _new = $('#admin-modify .new').val();
	var again = $('#admin-modify .again').val();

	if (old == '' || _new == '' || again == '') {
		modalShow('提示', '不能有空得输入项');
		return;
	}
	if (_new != again) {
		modalShow('提示', '两次密码输入不一致');
		return;
	}
	if (_new.length < 6) {
		modalShow('提示', '密码长度不能小于6位');
		return;
	}
	$.ajax({
		type: 'post',
		data: {
			old: old,
			'new': _new,
			again: again
		},
		url: 'password',
		success: function(res) {
			modalShow('提示', res.info);
			if (res.success)
				reset();
		}
	});
}

function getName() {
	$.ajax({
		type: 'get',
		url: 'get-name',
		success: function(res) {
			$('#admin-modify .name').val(res.name);
		}
	});
}

function logout() {
	$.ajax({
		type: 'get',
		url: 'logout',
		success: function(res) {
			console.log(res.info)
			location.href = '/admin/login'
		}
	});
}

function reset() {
	$('#admin-modify .old').val('');
	$('#admin-modify .new').val('');
	$('#admin-modify .again').val('');
}