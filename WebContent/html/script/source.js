
$(function(){
	//请求数据，添加内容
	addInfo();
	//select info
	selectInfo();
	//tool tip
	tooltip();
	//删除内容
    deleteInfo();
    //搜索素材消息
    searchInfo();
    //点击翻页
    jumpPage();
    
});
//请求数据，添加内容
function addInfo(){
	var url = 'http://localhost:8080/MesClouds/QueryMaterialByGroup';
	var param = {"userId":"1111"};
	operateSource.loading(true);
	$.post(url,param,function(data){
		var jsonData;
		if(typeof(data) != 'object'){
			jsonData = $.parseJSON(data);
		}
		else {
			jsonData = data;	
		}
		//operateSource.setSourceData(jsonData.result);//获取到数据，前端自己存储起来
		//operateSource.setaPage();//设置页数

		//handleData(jsonData.result);//显示素材
		operateSource.initSourceData(jsonData.result);//初始化数据

		//设置显示所有消息的长度
		$('#count').children('span').html(jsonData.result.length);

		//隐藏加载中的提示
		operateSource.loading(false);
	});	
}

//删除内容
function deleteInfo(){
	var $footer = $(".info-footer").find("a");
	var $contentList = $("#content-list");
	$footer.on("click",function(){});
	$contentList.on("click",selectOperType);

	function selectOperType(ev){
		$target = $(ev.target);
		if($target.hasClass('glyphicon-trash')){
			//删除消息
			var isSuccess = operateSource.delSource($target.parent().parent().parent());
		}else if($target.hasClass('glyphicon-pencil')){
			//编辑消息
			operateSource.editSource($target.parent().parent().parent());
		}
	}
}
//添加图文消息的提示，显示添加单图文消息还是多图文消息
function selectInfo(){
	var $addInfo = $("#add-info");
	var $typeBox = $addInfo.find('.type-box')
	$addInfo.on("mouseover",hideCross);
	$addInfo.on("mouseout",showCross);
	$typeBox.on("mouseover",function(){});
	$typeBox.on("mouseout",function(){});
	function showCross(ev){
		if(ev.target.className != "one"){
			$(this).find('.one').removeClass('one-active');
		}
		if(ev.target.className != "more"){
			$(this).find('.more').removeClass('more-active');	
		}
		$(this).children('.add-icon').show();
		$(this).children('.select-type').hide();
		return false;
	}
	function hideCross(ev){
		if($(ev.target).hasClass("one") || $(ev.target).hasClass("one-img")){
			$(this).find('.one').addClass('one-active');
		}
		if($(ev.target).hasClass("more") || $(ev.target).hasClass("more-img")){
			$(this).find('.more').addClass('more-active');	
		}
		$(this).children('.add-icon').hide();
		$(this).children('.select-type').show();
		return false;
	}
}
//tool tip
function tooltip(){
	var $footer = $(".info-footer").find("a");
	var $contentList = $("#content-list");

	$footer.on("mouseover",function(){});
	$footer.on("mouseout",function(){});
	$contentList.on("mouseover",tooltipShow);
	$contentList.on("mouseout",tooltipHide);

	function tooltipShow(ev){
		$target = $(ev.target);
		if($target.hasClass('glyphicon')){
			var $paren = $target.parent(),
				classNa = $paren.attr("data-target");
			$target.addClass('active');
			$paren.siblings('.' + classNa).show();

		}
		return false;
	}
	function tooltipHide(ev){
		$target = $(ev.target);
		if(!($target.hasClass('glyphicon-pencil')) || !($target.hasClass('glyphicon-trash'))){
			var $paren = $target.parent();
			$paren.siblings('.tip').hide().end().find(".glyphicon").removeClass('active');
		}
		return false;
	}
}

//搜索素材消息
function searchInfo(){
	$('#search-btn').on('click',function(){
		var searchVal = $.trim($('#search').val());
		if(!searchVal){
			window.location.href = window.location.href;
		}else{
			var param = {
				"userId":"1111",
				"name" : searchVal
			};
			operateSource.loading(true);//显示加载中的提示
			var url = 'http://localhost:8080/MesClouds/ReadMaterialByName';
			$.post(url,param,function(data){
				data = $.parseJSON(data);
				if(data.result.length<=0){
					tipUtil.warningTip('没有对应的素材');
					$('#content-list').children('.list').children().remove();
					$('#count').html('在最近三个月素材中找到(共 ' + data.result.length + ' 个)');
					operateSource.initSourceData(data.result);
					operateSource.loading(false);//隐藏加载中的提示
				}else{
					$('#content-list').children('.list').children().remove();
					$('#count').html('在最近三个月素材中找到(共 ' + data.result.length + ' 个)');
					operateSource.initSourceData(data.result);
					operateSource.loading(false);//隐藏加载中的提示
				}
			})
		}
	});
}

//点击翻页
function jumpPage(){
	//下一页
	var $pageWrap = $('.page-wrap');
	$pageWrap.find('.next').on('click',function(){
		var nowPage = parseInt($pageWrap.find('.now').html()),
			sumPage = parseInt($pageWrap.find('.sum').html());
		if(nowPage >= sumPage){
			tipUtil.warningTip('当前页是最后一页');
		}else{
			operateSource.jumpToPage(nowPage + 1);
		}
	});
	//上一页
	$pageWrap.find('.prev').on('click',function(){
		var nowPage = parseInt($pageWrap.find('.now').html());
		if(nowPage <= 1){
			tipUtil.warningTip('当前页是第一页！');
		}else{
			operateSource.jumpToPage(nowPage - 1);
		}
	});
	//跳转页面
	$pageWrap.find('.jump-page').on('click',function(){
		var inputPageNum = parseInt($(this).siblings('input').val()),
			sumPage = parseInt($pageWrap.find('.sum').html());
			if(inputPageNum >=1 && inputPageNum <= sumPage){
				operateSource.jumpToPage(inputPageNum);
			}else{
				tipUtil.warningTip('请输入正确的页码');
			}
	});
}