function msgAlert(title,info,ok,cancle){
	var m=$('.ui.small.modal');
	m.modal({
		onApprove:ok,
		onDeny:cancle
	});
	m.find('.header p').text(title);
	m.find('.content p').text(info);
	m.modal('show');
}

function checkEmail(str){
	var reg=new RegExp(/^\w+@\w+\.\w+$/);
	return reg.test(str);
}


$('.collapse').collapse();

