var getEditData = {

	fillingData:function(sourceId){
		//显示加载中提示
		getEditData.loading(true);
		var url = "http://localhost:8080/MesClouds/ReadMaterialById";
		var param = {
			"id" : sourceId
		};
		$.post(url,param,function(data){
			data = $.parseJSON(data);
			if(data.result == false){
				tipUtil.warningTip('获取素材信息失败');
			}else{
				console.log(data.result);
				getEditData.storeEditData(data.result.materialBody);//1.把接收到的数据存储起来
				getEditData.fillingEditArea();//2.显示编辑区的数据
				getEditData.addSmallItem(data.result.materialBody.slice(1));//3.增加小的图文消息
			}

			//隐藏加载中提示
			getEditData.loading(false);
		});	
	},
	storeEditData:function(materialBodyData){
		var bodyDataLen = materialBodyData.length;
		editAreaData = [];
		for(var i = 0; i < bodyDataLen; i++){
			var editData = {
				"tit" : materialBodyData[i].title,
				"author" : materialBodyData[i].author,
				"imgUrl" : materialBodyData[i].imgUrl,
				"checkbox" : (materialBodyData[i].isShow) == 1 ? true : false,
				"ueditor" : materialBodyData[i].mainContent,
				"ueditorValIsRight":true
			};
			// var check = (materialBodyData[i].isShow) == 1 ? true : false;
			// editData.checkbox = check;
			editAreaData.push(editData);
		}
		console.log(materialBodyData);
		return;
	},
	fillingEditArea:function(){
		//向页面填充数据-----start
		var data = editAreaData[0];
		$("#editTitle").val(data.tit);
		$('.img-box').find('.edit-title').html(data.tit);
		$("#editAuthor").val(data.author);
		$('.img-box').find('.main-img').show().attr('src',data.imgUrl);
		$('.up-load-img').show().children('img').show().attr("src",data.imgUrl);
		$('#cover-img').attr('checked',data.checkbox);
		$($("#ueditor_0")[0].contentWindow.document.body).html(data.ueditor);

		//var check = data.isShow == "1" ? true : false;
		
		//向页面填充数据-----end

		//填充显示字节数
		$('#editTitle').siblings('label').find('.count-word').html(data.tit.length + '/64');
		$('#editAuthor').siblings('label').find('.count-word').html(data.author.length + '/8');

		//判断标题的长度
		if($('.img-box').find('.edit-title').height() > 28){
			$('.img-box').find('.edit-title').css('top','104px');
		}else{
			$('.img-box').find('.edit-title').css('top','132px');
		}
	},
	addSmallItem:function(itemData){
		//增加左侧预览部分的小图文消息-----start
		if(itemData.length <= 1){
			//如果只有一个小图文消息，则不增加
		}else{
			for(var i = 1; i < itemData.length; i++){
				insertNewImgInfo(1);//insertNewInfo这个函数在insertInfoToMore.js文件
			}
		}
		//增加左侧预览部分的小图文消息-----end

		//往小图文消息预览块填充信息-----start
		var $smallItem = $('#detail-info').find('.small-item');
		$smallItem.each(function(idx){
			var that = $(this);
			that.find('.small-title').html(itemData[idx].title);
			that.find('.deposi-img').show().attr('src',itemData[idx].imgUrl);
		});
		//往小图文消息预览块填充信息-----end
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