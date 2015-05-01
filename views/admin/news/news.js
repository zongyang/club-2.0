$(function() {
	var ue = UE.getEditor('admin-news-editor');
	initOptBtns();
})


function initOptBtns() {
	/*$('#admin-news table .options .glyphicon-remove ').unbind('click').bind('click', function() {
		var tr = $(this).parent().parent();
		var name = tr.find('.name').text();
		tr.addClass('active').siblings().removeClass('active');
		modalShow('提示', '是否要删除 ' + name + ' ?', sendRemoveRequest);
	});*/
	$('#admin-news table .options .glyphicon-edit').unbind('click').bind('click', function() {
		var tr = $(this).parent().parent();
		tr.addClass('active').siblings().removeClass('active');

		$('#admin-news .list').fadeOut('slow');
		$('#admin-news .editor').fadeIn('slow');
		
	});
}