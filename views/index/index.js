var inputs;

$(function() {
	init();
})

function init() {
		$('#sign-up select').dropdown();
		inputs = new Inputs();
		$('#sign-up .submit').click(function() {
			//测试文件上传
			//fileUpload();

			if (inputs.check()) {
				submit();
			}

		});
	}
	//文件上传的操作
function fileUpload(name) {
	var files = $('#sign-up .file input')[0].files;
	var data = new FormData();
	data.append(name, files[0]);
	$.ajax({
		type: 'post',
		url: 'upload',
		data: data,
		contentType: false,
		processData: false,
		cache: false,
		success: function(data) {
			//console.log(data);
		}
	});
}

function submit() {
	$.ajax({
		url: 'signup',
		type: 'post',
		data: inputs.get(),
		success: function(data) {
			if (!data.success) {
				msgAlert('提示', data.info);
				return;
			}
			msgAlert('提示', '报名成功！');
			//上传文件
			fileUpload(data.info);
		},
		error: function(err) {
			msgAlert('提示', err);
		}
	});
}

function Inputs() {
	this.name = $('#sign-up .name input');
	this.no = $('#sign-up .no input');
	this.academy = $('#sign-up .academy input');
	this.profession = $('#sign-up .profession input');
	this.grade = $('#sign-up .grade input');
	this.phone = $('#sign-up .phone input');
	this.email = $('#sign-up .email input');
	this.project = $('#sign-up .project select');
	this.file = $('#sign-up .file input');
}
Inputs.prototype.get = function() {
	return {
		"name": this.name.val(),
		"no": this.no.val(),
		"academy": this.academy.val(),
		"profession": this.profession.val(),
		"grade": this.grade.val(),
		"phone": this.phone.val(),
		"email": this.email.val(),
		"project": this.project.val(),
		"file": this.file[0].files[0].name
	}
}
Inputs.prototype.check = function() {
	if (this.name.val() == '') {
		msgAlert('提示', '请正确填写姓名！');
		return false;
	}
	if (this.no.val() == '') {
		msgAlert('提示', '请正确填写学号！');
		return false;
	}
	if (this.academy.val() == '') {
		msgAlert('提示', '请正确填写学院！');
		return false;
	}
	if (this.profession.val() == '') {
		msgAlert('提示', '请正确填写专业！');
		return false;
	}
	if (this.grade.val() == '') {
		msgAlert('提示', '请正确填写年级！');
		return false;
	}
	if (this.phone.val() == '') {
		msgAlert('提示', '请正确填写手机！');
		return false;
	}
	if (!checkEmail(this.email.val())) {
		msgAlert('提示', '请正确填写邮箱！');
		return false;
	}
	if (this.project.val() == '') {
		msgAlert('提示', '请选择感兴趣的项目！');
		return false;
	}
	if (this.file.val() == '') {
		msgAlert('提示', '请选择简历！');
		return false;
	}
	return true;
}