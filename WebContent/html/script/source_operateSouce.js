var operateSource = {

	delSource:function($target){
		var sourceId = $target.data('infoId');
		var param = {
			"id":sourceId
		};
		var url = "http://localhost:8080/MesClouds/DeleteMaterial"
		$.post(url,param,function(data){
			data = $.parseJSON(data);
			if(data.result){
				$target.hide(500);
				window.setTimeout(function(){
					$target.remove();
				},800);
				tipUtil.successTip('成功删除素材！');
			}else{
				tipUtil.warningTip('删除素材失败');
			}
		});
	},
	editSource:function($target){
		var sourceId = $target.data('infoId');
		var href = "http://localhost:8080/MesClouds/html/html/";
		if($target.hasClass('more-info')){
			//编辑多图文
			window.location.href = href + "moreImg.html?sourceId=" + sourceId;
		}else if($target.hasClass('info')){
			//编辑单图文
			window.location.href = href + "oneImg.html?sourceId=" + sourceId;
		}
	}
}