$(function() {
	$('#register .submit').click(add);
	$('#register .again').click(function() {
		initVals()
		viewTogle()
	});
})

function add() {
	var file = $('#register .resume')[0].files[0];
	var vals = getVals();
	var fd = new FormData();
	var checkResult = check();

	if (!checkResult.success) {
		modalShow('错误', checkResult.info)
		return
	}

	fd.append('resume', file);
	for (var key in vals)
		fd.append(key, vals[key])

	$.ajax({
		type: 'post',
		url: 'add',
		data: fd,
		contentType: false,
		processData: false,
		cache: false,
		success: function(response) {

			if (response.success) {
				viewTogle();
				setTableVals(response.info);
			} else
				modalShow('提示', response.info);
		}
	});
}

function getVals() {
	return {
		name: $('#register .name').val(),
		no: $('#register .no').val(),
		acadamy: $('#register .acadamy').val(),
		profession: $('#register .profession').val(),
		phone: $('#register .phone').val(),
		email: $('#register .email').val()
	}
}

function initVals() {
	$('#register .name').val('')
	$('#register .no').val('')
	$('#register .acadamy').val('')
	$('#register .profession').val('')
	$('#register .phone').val('')
	$('#register .email').val('')
	$('#register .resume').val('')
}

function setTableVals(obj) {
	var index = 0;
	var tds = $('#register table td:odd').not('.td-resume');

	for (var key in obj) {
		$(tds[index]).text(obj[key]);
		index++;
	}
	$('#register .td-resume').html('<a href="'+obj.resume+'" target="_blank">简历</a>')
}

function check() {
	var vals = getVals();
	if (vals.name == '')
		return {
			success: false,
			info: '姓名不能为空'
		}
	if (vals.no == '')
		return {
			success: false,
			info: '学号不能为空'
		}
	if (vals.acadamy == '')
		return {
			success: false,
			info: '学院不能为空'
		}
	if (vals.profession == '')
		return {
			success: false,
			info: '专业不能为空'
		}
	if (vals.phone == '')
		return {
			success: false,
			info: '电话不能为空'
		}
	if (vals.email == '')
		return {
			success: false,
			info: 'email不能为空'
		}
	if ($('#register .resume').val() == '')
		return {
			success: false,
			info: '简历不能为空'
		}

	var regEmail = /^\w+@\w+\.\w+$/
	var regNo = /^\d{8,}$/
	var regTel = /^[\d-]+$/

	if (!regEmail.test(vals.email))
		return {
			success: false,
			info: '请正确填写Email'
		}

	if (!regNo.test(vals.no))
		return {
			success: false,
			info: '请正确填写学号（学号长度大于等于8）'
		}

	if (!regTel.test(vals.phone))
		return {
			success: false,
			info: '请正确填写电话'
		}
	return {
		success: true
	}
}

function viewTogle() {
	$('#register form').toggleClass('hidden');
	$('#register .submit').toggleClass('hidden');
	$('#register table').toggleClass('hidden');
	$('#register .again').toggleClass('hidden');
}