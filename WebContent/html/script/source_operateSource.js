var operateSource = {

	sourceDataArr:null,

	//初始化数据
	initSourceData:function(sourceData){
		this.setSourceData(sourceData);//把数据存储起来
		if(sourceData.length > 10){
			this.showSourceData(this.sourceDataArr.slice(0,10));//如果素材长度大于10的话，只显示前10个
		}else{
			this.showSourceData(sourceData);//素材长度小于10，全部显示
		}
		this.setSourceData(sourceData);//把数据存储起来
		this.setaPage();//设置显示页面
	},
	showSourceData:function(sourceDataArr){
		var len = sourceDataArr.length;
		var $list = $("#content-list").children('.list');
		for(var i=0;i<len;i++){
			var idx = this.minHeight($list);//找出高度最低的列
			var multiple = sourceDataArr[i].isMulti;
			if(multiple){
				//如果是多图文的话,插入多图文
				$list.eq(idx).append(addMoreInfo(sourceDataArr[i]));

			}else{
				//如果是单图文的话，插入单图文
				$list.eq(idx).append(addOneInfo(sourceDataArr[i]));
			}
		}
		return;
	},
	minHeight:function(list){
		var minH = parseInt(list.eq(0).css("height"));
		var	outIdx = 0;
		var len = list.size();
		var minH = parseInt(list.eq(0).css("height"));
		for(var i=1;i<len;i++){
			var thisH = parseInt(list.eq(i).css("height"));
			if(minH > thisH) {
				minH = thisH;
				outIdx = i;
			}
		}
		return outIdx;
	},
	delSource:function($target){
		var sourceId = $target.data('infoId');
		var param = {
			"id":sourceId
		};
		var url = "http://localhost:8080/MesClouds/DeleteMaterial"
		$.post(url,param,function(data){
			data = $.parseJSON(data);
			if(data.result){
				//删除元素-----start
				$target.hide(500);
				window.setTimeout(function(){
					$target.remove();
				},600);
				//删除元素-----end
				//删除本地数据-----start
				var sourceData = operateSource.sourceDataArr,
					sourceDataLen = sourceData.length;
				for(var i = 0; i < sourceDataLen; i++){
					if(sourceId == sourceData[i].id){//如果找到数组中要删除的元素
						for(var j = i; j < sourceDataLen - 1; j++){
							operateSource.sourceDataArr[j] = sourceData[j+1];
						}
						operateSource.sourceDataArr[sourceDataLen - 1] = null;
						operateSource.sourceDataArr.length = sourceDataLen - 1;
						break;
					}
				}
				//删除本地数据-----end
				tipUtil.successTip('成功删除素材！');
				return true;
			}else{
				tipUtil.warningTip('删除素材失败');
				return false;
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
	},
	setSourceData:function(data){
		this.sourceDataArr = data;
		console.log("接收素材的数据");
		console.log(this.sourceDataArr);
	},
	getSourceData:function(){
		return this.sourceDataArr;
	},
	//设置页面显示的页数	
	setaPage:function(){
		var sourceDataLen = this.sourceDataArr.length;
		if(sourceDataLen > 10){//如果素材数目小于10个，就全部显示，大于10个就分页显示
			var sumPage = parseInt(sourceDataLen / 10);
			if(sourceDataLen % 10 > 0){
				sumPage++;
			}
			$('.page-wrap').find('.now').html("1");
			$('.page-wrap').find('.sum').html(sumPage).end().show();
		}else{
			$('.page-wrap').hide();
		}
	},
	//传入页码
	jumpToPage:function(pageNum){
		var start = 10 * (pageNum-1),
			end = (10 * pageNum) > (this.sourceDataArr.length) ? (this.sourceDataArr.length) : (10 * pageNum);
		$('#content-list').children('.list').children().not('#add-info').hide();
		this.showSourceData(this.sourceDataArr.slice(start,end));
		//设置当前页码
		$('.page-nav').find('.now').html(pageNum);
		//清楚输入跳转的页码
		$('.page-wrap').find('.form-group').children('input').val('');
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