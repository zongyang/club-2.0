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