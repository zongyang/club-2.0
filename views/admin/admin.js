$(function() {
	init();
})

function init() {
	if ($('#users').length > 0) {
		initUsers();
	}
	if ($('#projects').length > 0) {
		initProjects();
	}
	if($('#news').length>0){
		initNews();
	}
	if($('#introduce').length>0){
		initIntroduce();
	}
	if($('#login').length>0){
		initLogin();
	}
	if($('#modify').length>0){
		initModify();
	}
	$('table').tablesort();
}
function initIntroduce () {
	$('#introduce .button.ok').click(function(){
		var obj={
			info:$('#introduce textarea.info').val(),
			id:$('#introduce .id').text()
		}
		if(obj.info.trim()==''){
			msgAlert('提示', '简介内容不能为空！');
			return;
		}

		$.ajax({
			url:'introduce/edit',
			data:obj,
			type:'post',
			success:function(data){
				msgAlert('提示', data.info);
				$('#introduce .id').text(data.id);
				$('.empty').remove();
			}
		});
	});
}

function initLogin() {
	$('#login .ok').click(function(){
		var val=getLoginVal();
		if(val.name==''){
			msgAlert('提示','管理员名不能为空！');
			return;
		}
		if(val.password==''){
			msgAlert('提示','管理员密码不能为空！');
			return;
		}
		$.ajax({
			url:'login',
			data:val,
			type:'post',
			success:function(data){
				msgAlert('提示',data.info);
				if(data.success){
					$('#login .logined').removeClass('hidden');
					$('#login .login').addClass('hidden');
				}
			}
		});
	});

	$('#login .reset').click(function(){
		setLoginVal('','');
	});

	$('#login .logout').click(function(){
		$.ajax({
			url:'logout',
			type:'post',
			success:function(data){
				msgAlert('提示',data.info);
				if(data.success){
					$('#login .login').removeClass('hidden');
					$('#login .logined').addClass('hidden');
				}
			}
		});
	});
}

function getLoginVal() {
	var obj = {};
	obj.name = $('#login .name').val();
	obj.password = $('#login .password').val();
	return obj;
}

function setLoginVal(name, password) {
	$('#login .name').val(name);
	$('#login .password').val(password);
}
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
function initNews() {
	$('#news .add').click(addNews);
	$('#news table i.close').click(function() {
		$(this).addClass('active');
		$('#news table i.close').not($(this)).removeClass('active');
		delNews();
	});
	$('#news i.edit').click(function() {
		$(this).addClass('active');
		$('#news i.edit').not($(this)).removeClass('active');

		var obj=getNewsFromTb('edit');
		newsAlert('修改 '+obj.name,obj,function(){
			editNews();
		});
		
	});
}

function addNews() {
	newsAlert('添加新消息', {}, function() {
		var obj = getNewsFromMo();
		if (obj.name == '') {
			msgAlert('提示', '消息名不能为空!');
			return;
		}
		$.ajax({
			url: 'news/add',
			data: obj,
			type: 'post',
			success: function(data) {
				msgAlert('提示', data.info);
				if (data.success) {
					obj.id = data.id;
					obj.date = data.date;
					addNewsRow(obj);
				}
			}
		});
	})
}

function delNews() {
	var obj = getNewsFromTb('close');

	msgAlert('提示', '确认要删除  "' + obj.name + '" 吗？', function() {
		$.ajax({
			url: 'news/del',
			data: {
				id: obj.id
			},
			type: 'post',
			success: function(data) {
				msgAlert('提示', data.info);
				if (data.success) {
					$('#news table tbody tr:nth(' + obj.index + ')').remove();
				}
			}
		});

	});

}

function editNews() {
	var obj = getNewsFromMo('edit');
	var tb_obj=getNewsFromTb('edit');
	if (obj.name == '') {
		msgAlert('提示', '消息名不能为空!');
		return;
	}
	obj.id=tb_obj.id;
	$.ajax({
		url: 'news/edit',
		data: obj,
		type: 'post',
		success: function(data) {
			msgAlert('提示', data.info);
			if (data.success) {
				var row = $('#news table tbody tr:nth(' + tb_obj.index + ')');
				for(var p in obj){
					row.find('.'+p).text(obj[p]);
				}
			}
		}
	});
}

function addNewsRow(obj) {
	var tbody = $('#news tbody');
	var tr = '<tr>';
	tr += '<td class="name">' + obj.name + '</td>';
	tr += '<td class="info">' + obj.info + '</td>';
	tr += '<td class="date">' + obj.date + '</td>';
	tr += '<td class="content hidden">' + obj.content + '</td>';
	tr += '<td><i class="close icon"></i><i class="edit icon"></i></td>';
	tr += '<td class="id hidden">' + obj.id + '</td>';
	tr += '</tr>';
	tbody.append(tr);
}


function getNewsFromMo() {
	var obj = {};
	var modal = $('.news.modal');
	obj.name = modal.find('.name input').val();
	obj.info = modal.find('.info input').val();
	obj.content = modal.find('.content textarea').val();
	return obj;
}

function getNewsFromTb(type) {
	var active = $('#news table i.' + type + '.active');
	var index = $('#news table i.' + type).index(active);
	var row = $('#news table tbody tr:nth(' + index + ')')
	var obj = {
		name: '',
		info: '',
		date: '',
		content: '',
		id: ''
	};

	for (var p in obj) {
		obj[p] = row.find('.' + p).text();
	}

	obj.index = index;
	return obj;

}

function newsAlert(title, obj, ok, cancle) {
	var modal = $('.news.modal');
	modal.find('.title').text(title);


	if (obj.date)
		modal.find('.date').removeClass('hidden').text(obj.date);
	else
		modal.find('.date').addClass('hidden');
	if (obj.name)
		modal.find('.name input').val(obj.name);
	else
		modal.find('.name input').val('');
	if (obj.info)
		modal.find('.info input').val(obj.info);
	else
		modal.find('.info input').val('');
	if (obj.content)
		modal.find('.content textarea').val(obj.content);
	else
		modal.find('.content textarea').val('');

	modal.modal({
		onApprove: ok,
		onDeny: cancle
	});
	modal.modal('show');

}



/**********************************/
//初始化项目列表
function initProjects() {
	proEditAlert().init();
	//编辑
	$('#projects table i.edit').click(function() {
		//标记行
		$(this).addClass('active');
		$('#projects table i.edit').not($(this)).removeClass('active');

		var modal = proEditAlert();
		var obj = getProDataByActive();
		modal.init(editProject);

		modal.show('修改项目', obj.name, obj.peoples, obj.info, obj.content);
	});
	//添加
	$('#projects .add').click(function() {
		var modal = proEditAlert();
		modal.init(addProject);
		modal.show('添加新项目');
	});
	//删除
	$('#projects table i.close').click(delProject);
}

//获得选择行的数据
function getProDataByActive(type) {
	var active = $('#projects table i.' + type + '.active');
	var index = $('#projects table i.' + type).index(active);
	var row = $('#projects table tbody tr:nth(' + index + ')')
	var obj = {};

	obj.index = index;
	obj.row = row;
	obj.id = row.find('td.id').text();
	obj.name = row.find('td.name').text();
	obj.peoples = row.find('td.peoples').text();
	obj.info = row.find('td.info').text();
	obj.content = row.find('td.content').text();
	return obj;
}

//添加项目提交
function addProject() {
	var obj = proEditAlert().get();
	if (obj.name == '') {
		msgAlert('提示', '项目名不能为空！');
		return;
	}
	$.ajax({
		url: 'projects/add',
		data: obj,
		type: 'post',
		success: function(data) {
			msgAlert('提示', data.info);
			if (!data.success) {
				return;
			}

			var tbody = $('#projects tbody');
			var tr = '<tr>';
			//添加一行
			for (var pro in obj) {
				if (pro !== 'content') {
					tr += '<td>' + obj[pro] + '</td>';
				} else {
					tr += '<td class="hidden">' + obj[pro] + '</td>';
				}
			}
			tr += '<td class="id hidden">' + data.id + '</td>';
			tr += '<td><i class="close icon"></i><i class="edit icon"></i></td>';
			tr += '</tr>';

			tbody.append(tr);

		}
	});
}

//编辑项目提交
function editProject() {
	var obj = proEditAlert().get();
	var rowObj = getProDataByActive('edit');
	obj.id = rowObj.id;
	if (obj.name == '' || obj.id == '') {
		msgAlert('提示', '项目名不能为空！');
		return;
	}
	$.ajax({
		url: 'projects/edit',
		data: obj,
		type: 'post',
		success: function(data) {
			msgAlert('提示', data.info);
			if (!data.success) {
				return;
			}
			rowObj.row.find('.name').text(obj.name);
			rowObj.row.find('.peoples').text(obj.peoples);
			rowObj.row.find('.info').text(obj.info);
			rowObj.row.find('.content').text(obj.content);
		}
	});
}

//删除项目
function delProject() {
	//标记行
	$(this).addClass('active');
	$('#projects table i.close').not($(this)).removeClass('active');

	var rowObj = getProDataByActive('close');
	msgAlert('提示', '确认要删除  "' + rowObj.name + '" 吗？', function() {
		$.ajax({
			url: 'projects/delete',
			data: {
				id: rowObj.id
			},
			type: 'post',
			success: function(data) {
				msgAlert('提示', data.info);
				if (!data.success) {
					return;
				}
				$('#projects table tbody tr:nth(' + rowObj.index + ')').remove();

			}
		});
	});

}

//项目编辑弹出层
function proEditAlert() {
	var modal = $('.projects.modal');
	return {
		self: modal,
		init: function(onApprove, onDeny) {
			var that = this;
			modal.modal({
				onApprove: onApprove,
				onDeny: onDeny
			});
		},
		title: modal.find('.title'),
		name: modal.find('.name input'),
		peoples: modal.find('.peoples input'),
		info: modal.find('.info input'),
		content: modal.find('.content textarea'),
		show: function(title, name, peoples, info, content) {
			//初始化
			this.title.text('');
			this.name.val('');
			this.peoples.val('');
			this.info.val('');
			this.content.val('');

			if (title) {
				this.title.text(title);
			}
			if (name) {
				this.name.val(name);
			}
			if (peoples) {
				this.peoples.val(peoples);
			}
			if (info) {
				this.info.val(info);
			}
			if (content) {
				this.content.val(content);
			}
			this.self.modal('show');
		},
		get: function() {
			return {
				name: this.name.val(),
				peoples: this.peoples.val(),
				info: this.info.val(),
				content: this.content.val()
			}
		}
	}
}
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