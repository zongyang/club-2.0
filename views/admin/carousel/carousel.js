$(function() {
	initOptBtns();
	$('.add-carousel').click(function() {
		carouselModalShow(null, sendAddRequest);
	});
})

function initOptBtns() {
	$('#admin-carousel table .options .glyphicon-remove ').unbind('click').bind('click', function() {
		var tr = $(this).parent().parent();
		var name = tr.find('.name').text();
		tr.addClass('active').siblings().removeClass('active');
		modalShow('提示', '是否要删除 ' + name + ' ?', sendRemoveRequest);
	});

	$('#admin-carousel .scan a').tooltip({
		html: true
	}).tooltip('show').tooltip('hide');
}

function carouselModalShow(obj, ok, cancle) {
	obj = (obj == null) ? {
		name: '',
		urlName: '',
		url: '',
		content: ''
	} : obj;
	var modal = $('#admin-carousel-modal');


	modal.find('.modal-title').text('添加轮转图片');

	for (var key in obj)
		modal.find('.' + key).val(obj[key]);


	modal.find('.img').val('');


	modal.find('.ok').unbind('click').bind('click', function() {
		if (ok)
			ok();
		modal.modal('hide');
	})
	modal.find('.cancle').unbind('click').bind('click', function() {
		if (cancle)
			cancle();
	})

	modal.modal('show');
}

function getVals() {
	var obj = {
		name: '',
		urlName: '',
		url: '',
		content: ''
	}

	var modal = $('#admin-carousel-modal');

	for (var key in obj)
		obj[key] = modal.find('.' + key).val();

	return obj;
}

function check() {
	var obj = getVals();
	if (obj.name == '')
		return {
			success: false,
			info: '名称不能为空'
		}
	if (obj.urlName == '')
		return {
			success: false,
			info: '链接名称不能为空'
		}
	if (obj.url == '')
		return {
			success: false,
			info: '链接地址不能为空'
		}
	if (obj.content == '')
		return {
			success: false,
			info: '内容不能为空'
		}

	var fileInput = $('#admin-carousel-modal .img');
	if (fileInput.val() == '')
		return {
			success: false,
			info: '请选择图片'
		}
	if (supportImages.indexOf(fileInput[0].files[0].type) == -1) {
		return {
			success: false,
			info: '请选择图片文件'
		}
	}


	return {
		success: true,
		info: null
	}
}

function sendAddRequest() {
	var modal = $('#admin-carousel-modal');
	var checkResult = check();
	if (!checkResult.success) {
		alertShow(checkResult.info, modal.find('form'));
		return;
	}

	var file = $('#admin-carousel-modal .img')[0].files[0];
	var fd = new FormData();
	var vals = getVals();

	fd.append('img', file);
	for (var key in vals)
		fd.append(key, vals[key])

	$.ajax({
		type: 'post',
		url: 'insert',
		data: fd,
		contentType: false,
		processData: false,
		cache: false,
		success: function(response) {
			if (!response.success) {
				alertShow(response.info, $('#admin-carousel table'));
				return;
			}
			vals.id = response.id;
			vals.img = response.img;
			addRow(vals);
		}
	});

}

function sendRemoveRequest() {
	var tr = $('#admin-carousel table .active');
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
			alertShow(response.info, $('#admin-carousel table'));
		}
	});
}

function addRow(obj) {
	var tb = $('#admin-carousel table tbody');
	var tr = '<tr class="success">';
	tr += '<td class="id hidden">' + obj.id + '</td>';
	tr += '<td class="name">' + obj.name + '</td>';
	tr += '<td class="content">' + obj.content + '</td>';
	tr += '<td><strong><a class="url" href="' + obj.url + '">' + obj.urlName + '</a></strong></td>';
	tr += '<td><div class="scan"><a href="#" data-tooltip="tooltip" title="" data-original-title="<img class=\'scan-tip\' src=\'' + obj.img + '\'></img>">预览</a></div></td>';
	tr += '<td class="options"><span class="glyphicon glyphicon-remove"></span></td>';
	tr += '</tr>';
	tb.prepend(tr);
	initOptBtns();
}