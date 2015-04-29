function initModify() {
	$('#modify .name.ok').click(nameEdit);
	$('#modify .pwd.ok').click(pwdEdit);
	$('#modify .pwd.reset').click(pwdReset);
}

function nameEdit() {
	var name = $('#modify input.name').val();
	$.ajax({
		url: 'modify/name',
		data: {
			name: name
		},
		type: 'post',
		success: function(data) {
			msgAlert('提示', data.info);
		}
	});
}

function pwdEdit() {
	var old = $('#modify input.old').val();
	var _new = $('#modify input.new').val();
	var again = $('#modify input.again').val();

	$.ajax({
		url: 'modify/pwd',
		data: {
			old: old,
			'new': _new,
			again: again
		},
		type: 'post',
		success: function(data) {
			msgAlert('提示', data.info);
		}
	});
}

function pwdReset() {
	$('#modify .old.input').val('');
	$('#modify .new.input').val('');
	$('#modify .again.input').val('');
}