$(function() {
	//初始化编辑插件
	UE.getEditor('admin-news-editor')

	//初始化列表中的删除、编辑按钮
	initEditDelBtns();

	$('#admin-news .add-news').click(function() {
		editorShow(true);
		setOptionTag('add');
	});

	$('#admin-news .save').click(save);
	$('#admin-news .cancle').click(function() {
		editorHide();
	});
})

function initEditDelBtns() {
	$('#admin-news .list .glyphicon-remove').unbind('click').bind('click', function() {
		var tr = $(this).parent().parent();
		var name = tr.find('.name').text();
		tr.addClass('active').siblings().removeClass('active');
		modalShow('提示', '是否要删除 ' + name + ' ?', remove);
	});

	$('#admin-news .list  .glyphicon-edit').unbind('click').bind('click', function() {
		var tr = $(this).parent().parent();
		tr.addClass('active').siblings().removeClass('active');
		setOptionTag('edit');
		editorShow();

	});
}

function setOptionTag(type) {
	if (type == 'add')
		$('.editor .save').addClass('add').removeClass('edit');
	else
		$('.editor .save').addClass('edit').removeClass('add');
}

function setEditorContentByActiveTr(callabck) {
	var id = $('#admin-news .list .active .id').text();
	
	$.ajax({
		type: 'get',
		url: 'getContent',
		data: {
			id: id
		},
		success: function(response) {
			if (response.success) {
				callabck();
				UE.getEditor('admin-news-editor').setContent(response.content);
			} else
				modalShow('异常', response.info);

		}
	});
}

function save() {
	var type = ($('.editor .save').hasClass('edit')) ? 'edit' : 'add';
	var name = $('#admin-news .editor .name').val();
	var intro = $('#admin-news .editor .intro').val();
	var content = UE.getEditor('admin-news-editor').getContent();
	var id = $('#admin-news .list .active .id').text();
	var data = (type == 'edit') ? {
		content: content,
		intro:intro,
		name: name,
		id: id
	} : {
		content: content,
		intro:intro,
		name: name
	}

	if (name == '') {
		modalShow('提示', '名称不能为空');
		return;
	}

	if (content == '') {
		modalShow('提示', '内容不能为空');
		return;
	}
	if (intro == '') {
		modalShow('提示', '简介不能为空');
		return;
	}
	if (type == 'edit' && id == '') {
		modalShow('提示', '请选择需要修改的记录先');
		return;
	}


	$.ajax({
		type: 'post',
		url: type,
		data: data,
		success: function(response) {
			if (response.success) {
				editorHide();
				if (type == 'edit'){
					$('#admin-news .list .active .name').text(name)
					$('#admin-news .list .active .intro').text(intro)
				}
				else
					addRow(response.id, name, intro,response.date);
				return;
			};
			modalShow('提示', response.info);
		}
	});

}

function remove() {
	var tr = $('#admin-news .list .active');
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
			alertShow(response.info, $('#admin-news .list  table'));
		}
	});
}

function editorShow(add) {
	if (add) {
		$('#admin-news .editor .name').val('');
		$('#admin-news .editor .intro').val('');
		$('#admin-news .editor>h3').text('添加');
		$('#admin-news .list').hide('slow');
		$('#admin-news .editor').show('slow');
		UE.getEditor('admin-news-editor').execCommand('cleardoc');
	} else {
		setEditorContentByActiveTr(function() {
			var name=$('#admin-news .list .active .name').text();
			var intro=$('#admin-news .list .active .intro').text();
			$('#admin-news .editor>h3').text('修改 ' + name);
			$('#admin-news .editor .name').val(name);
			$('#admin-news .editor .intro').val(intro);
			$('#admin-news .list').hide('slow');
			$('#admin-news .editor').show('slow');

		});


	}

}

function editorHide() {
	$('#admin-news .list').show('slow');
	$('#admin-news .editor').hide('slow');
}

function addRow(id, name, intro,date) {
	var tb = $('#admin-news .list tbody');
	var tr = '<tr class="success">';
	tr += '<td class="id hidden">' + id + '</td>';
	tr += '<td class="name">' + name + '</td>';
	tr += '<td class="intro">' + intro + '</td>';
	tr += '<td class="date">' + date + '</td>';
	tr += '<td class="options"><span class="glyphicon glyphicon-edit"></span><span class="glyphicon glyphicon-remove"></span></td>';
	tr += '</tr>';
	tb.prepend(tr);
	initEditDelBtns();
}