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