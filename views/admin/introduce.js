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
