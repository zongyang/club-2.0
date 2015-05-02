

function modalShow(title, info, ok, cancle) {
	var m = $('#modal');
	m.find('.title').text(title);
	m.find('.info').text(info);
	m.find('.ok').unbind('click').bind('click', function() {
		if (ok)
			ok();
		m.modal('hide');
	});
	m.find('.cancle').unbind('click').bind('click', function() {
		if (cancle)
			cancle();
	});
	m.modal('show');
}

function alertShow(info, dom, duration) {
	duration = (duration) ? duration : 2000;
	var al = '<div class="alert alert-info">';
	al += '<button type="button" class="close" data-dismiss="alert">×</button>';
	al += '<strong>' + info + '</strong>';
	al += '</div>'

	$(al).insertBefore(dom).delay(200).addClass("in").fadeOut(duration);

}

var supportImages = ['image/gif', 'image/jpeg', 'image/png'];