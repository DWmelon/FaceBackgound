function upLoadImgFromDeposi(){
	$(".img-from-deposi").click(function(){
		var windowH = $(window).height();
		var windowW = $(window).width();
		//设置弹出窗的大小。及内容的位置
		setLocation(windowW,windowH);

		//为整个版面添加点击事件
		thisBindClickEvent();
	});

	//测试用的
	// $(".close-dialog").click(function(){
	// 	$("#img-reposity-box").hide();
	// 	$("#img-reposity").hide();
	// });

	//设置大小、位置
	function setLocation(w,h){
		var imgDeposiBox = $("#img-reposity-box");
		var imgDeposi = $("#img-reposity");
		var _top = (h-582)/2;
		var _left = (w-847)/2;
		imgDeposiBox.css({
			"width":w,
			"height":h,
			"display":"block"
		});
		imgDeposi.css({
			"top":_top,
			"left":_left,
			"display":"block"
		});
	}

	//为整个版面添加点击事件
	function thisBindClickEvent(){
		$("#img-reposity").on("click",selectElement);
	}

	//点击版面的时候，判断元素，不同的元素产生不同的效果
	function selectElement(ev){
		var $target = $(ev.target);
		if($target.hasClass('close-dialog')){
			closeDialog($target);//关闭版面
			return;
		}
		if($target.hasClass('deposi-img')){
			showMarkPanel($target);//显示 "选中图片"层
			return;
		}
		if($target.hasClass('tick-img')){
			hideMarkPanel($target);//关闭选中图片层
			return;
		}
		if($target.hasClass('img-name')){
			operateMarkPanel($target);//显示或隐藏 "选中图片"层
			return;
		}

		else{
			console.log($target.attr("class"));
			return;
		}
	}
	//关闭版面
	function closeDialog($target){
		$("#img-reposity-box").hide();
		$("#img-reposity").hide();
	}

	//显示 "选中图片"
	function showMarkPanel($target){
		$(".selected-mark").hide();
		$(".tick-img").hide();
		if($target.hasClass('img-name')){
			$target.siblings(".selected-mark").show().end().siblings('.tick-img').show();
			console.log($target);
			console.log("show");
		}
		else{
			$target.parent().siblings(".selected-mark").show().end().siblings('.tick-img').show();
		}
		return;
	}
	//关闭选中图片层
	function hideMarkPanel($target){
		if($target.hasClass('img-name')){
			$target.siblings('.selected-mark').hide().end().siblings('.tick-img').hide();
			console.log($target);
			console.log("hide");
		}
		else{
			$target.hide().siblings('.selected-mark').hide();
		}
		return;
	}
	//显示或隐藏 "选中图片"层
	function operateMarkPanel($target){
		if($target.siblings('.selected-mark').css("display") == "none"){
			showMarkPanel($target);
		}
		else{
			hideMarkPanel($target);
		}
		return;
	}
}