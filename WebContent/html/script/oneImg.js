$(function(){
	//判断是否是编辑信息，是的话，就加载要编辑的素材的数据
	judgeEditOrNot();
	//编辑图文消息
	editImgInfo();
	//从图库添加图片
	upLoadImgFromDeposi();

	//删除已经上传的图片
	delUploadImg();
});
//判断是否是编辑信息，是的话，就加载要编辑的素材的数据
function judgeEditOrNot(){
	var param = getRequest();
	if(param.sourceId){
		getEditData.fillingData(param.sourceId);
	}
}
//获取页面url中的参数
function getRequest() {
   var url = location.search; //获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}
//编辑图文消息
function editImgInfo(){
	//编辑标题
	$("#editTitle").on("keyup",function(){
		var inputVal = $(this).val();//输入的值

		//统计字数-----start
		var inputValLen = inputVal.length;
		if(inputValLen <= 64){
			$(this).siblings('label').find('.count-word').html(inputValLen + "/64").removeClass('count-word-warning');
		}
		else{
			$(this).siblings('label').find('.count-word').html(inputValLen + "/64").addClass('count-word-warning');
		}
		//统计字数-----end

		//显示在左边的预览图层上-----start
		var $val = $.trim(inputVal);
		if($val != ""){
			$("#detail-info").find(".article-title").children("a").html($val);
		}
		else{
			$("#detail-info").find(".article-title").children("a").html("标题");
		}
		//显示在左边的预览图层上-----end

		//把操作失误隐藏
		$('.title-limit').hide();
	});

	//编辑作者
	$('#editAuthor').on('keyup',function(){
		var inputVal = $(this).val();//输入的值

		//统计字数-----start
		var inputValLen = inputVal.length;
		if(inputValLen <= 8){
			$(this).siblings('label').find('.count-word').html(inputValLen + "/8").removeClass('count-word-warning');
		}
		else{
			$(this).siblings('label').find('.count-word').html(inputValLen + "/8").addClass('count-word-warning');
		}
		//统计字数-----end

		//把操作失误隐藏
		$('.author-limit').hide();
	});

	//编辑摘要
	$("#edit-area").find(".add-summary").children("textarea").on("keyup",function(){
		var inputVal = $(this).val();
		//统计字数-----start
		var inputValLen = inputVal.length;
		if(inputValLen <= 120){
			$(this).siblings('label').find('.count-word').html(inputValLen + "/120").removeClass('count-word-warning');
		}
		else{
			$(this).siblings('label').find('.count-word').html(inputValLen + "/120").addClass('count-word-warning');
		}
		//统计字数-----end

		//显示在左边的预览图层上-----start
		$val = $.trim(inputVal);
		if($val != ""){
			$(".img-box").children('.show-summary').show().html($val);
		}
		else{
			$(".img-box").children('.show-summary').hide().html("");
		}
		//显示在左边的预览图层上-----end

		//把操作失误隐藏
		$('.summary-limit').hide();
	});

}
//删除已经上传的图片
function delUploadImg(){
	$('.del-upload-img').on('click',function(){
		$(this).parent().hide().end().siblings('img').attr('src','');
		$('.img-box').children('img').css('display','none').attr('src','');
	});
}

//点击保存消息，上传到服务器
$("#save").on("click",function(){
	if(handleMessage.checkMessageForOne()){//判断数据是否写全，是否不符合规则
		handleMessage.uploadMessageForOne();//上传图片给服务器
	}
});