$(function() {
	//初始化编辑插件
	UE.getEditor('admin-introduce-editor')

	//加载记录
	findOne();

	//事件
	$('#admin-introduce .save').click(save);
})


function save() {

	var content = UE.getEditor('admin-introduce-editor').getContent();
	var data = {
		content: content
	}

	if (content == '') {
		modalShow('提示', '内容不能为空');
		return;
	}

	$.ajax({
		type: 'post',
		url: 'addOrUpdate',
		data: data,
		success: function(response) {
			modalShow('提示', response.info);
		}
	});
}

function findOne() {
	$.ajax({
		type: 'get',
		url: 'findOne',
		success: function(response) {
			var doc = (response.doc) ? response.doc : {
				content: ''
			};
			var ue = UE.getEditor('admin-introduce-editor');
			ue.ready(function() {
				ue.setContent(doc.content);
			});
		}
	});
}