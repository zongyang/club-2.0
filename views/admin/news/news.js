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
		editorHide(true);
	});
})

function initEditDelBtns() {
	/*$('#admin-news table .options .glyphicon-remove ').unbind('click').bind('click', function() {
		var tr = $(this).parent().parent();
		var name = tr.find('.name').text();
		tr.addClass('active').siblings().removeClass('active');
		modalShow('提示', '是否要删除 ' + name + ' ?', sendRemoveRequest);
	});*/
	$('#admin-news table .options .glyphicon-edit').unbind('click').bind('click', function() {
		var tr = $(this).parent().parent();
		tr.addClass('active').siblings().removeClass('active');
		setOptionTag('edit');
		editorShow();

	});
}

function setOptionTag(type) {
	if (type = 'add')
		$('.editor .save').addClass('add').removeClass('edit');
	else
		$('.editor .save').addClass('edit').removeClass('add');
}


function save() {
	var type = ($('.editor .save').hasClass('edit')) ? 'edit' : 'add';
	var name = $('#admin-news .editor .name').val();
	var content = UE.getEditor('admin-news-editor').getContent();
	var id = '';
	var data = (type == 'edit') ? {
		content: content,
		name: name,
		id: id
	} : {
		content: content,
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
	if (type == 'edit' && id == '') {
		modalShow('提示', '请选择需要修改的记录先');
		return;
	}


	$.ajax({
		type: 'post',
		url: type,
		data: data,
		success: function(response) {
			modalShow('提示', response.info);
			if (response.success) {
				editorHide(true);
			};
		}
	});

}

function cancle() {

}

function editorShow(add) {
	$('#admin-news .list').fadeOut('slow');
	$('#admin-news .editor').fadeIn('slow');
}

function editorHide(add) {
	$('#admin-news .list').fadeIn('slow');
	$('#admin-news .editor').fadeOut('slow');
	$('#admin-news .editor .name').val('');
	UE.getEditor('admin-news-editor').execCommand('cleardoc');;
}