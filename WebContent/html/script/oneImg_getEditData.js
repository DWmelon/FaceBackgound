var getEditData = {

	fillingData:function(sourceId){
		getEditData.loading(true);
		var url = "http://localhost:8080/MesClouds/ReadMaterialById";
		var param = {
			"id" : sourceId
		};
		$.post(url,param,function(data){
			data = $.parseJSON(data);
			if(data.result == false){
				tipUtil.warningTip('获取素材信息失败');
				getEditData.loading(false);
			}else{
				//向页面填充数据-----start
				var resultData = data.result;
				$("#editTitle").val(resultData.materialBody[0].title);
				$('.article-title').children('a').html(resultData.materialBody[0].title);
				$("#editAuthor").val(resultData.materialBody[0].author);
				$('.img-box').children('img').show().attr('src',resultData.materialBody[0].imgUrl);
				$('.up-load-img').show().children('img').show().attr("src",resultData.materialBody[0].imgUrl);
				$('.add-summary').children('textarea').css('display','inline-block').val(resultData.summary);
				$('.show-summary').html(resultData.summary).show();
				$($("#ueditor_0")[0].contentWindow.document.body).html(resultData.materialBody[0].mainContent);

				var check = resultData.materialBody[0].isShow == "1" ? true : false;
				$('#cover-img').attr('checked',check);
				//向页面填充数据-----end

				//填充显示字节数
				$('#editTitle').siblings('label').find('.count-word').html(resultData.materialBody[0].title.length + '/64');
				$('#editAuthor').siblings('label').find('.count-word').html(resultData.materialBody[0].author.length + '/8');
				$('.add-summary').find('.count-word').html(resultData.summary.length + '/120');

				//隐藏加载中的提示
				getEditData.loading(false);
			}
		});
	},
	loading:function(flag){//true是显示，false是隐藏
		if(flag){
			$('#loading-wrap').show();
			$('#loading-img').show();
			$('#loading-tip').show();
		}else{
			$('#loading-wrap').hide();
			$('#loading-img').hide();
			$('#loading-tip').hide();
		}
		return;
	},
}