$(function(){
	//判断是否是编辑信息，是的话，就加载要编辑的素材的数据
	judgeEditOrNot();
	//左侧显示部分，编辑或删除东西，鼠标放到上面进行性显示
	editOrDel();
	//鼠标放在添加消息上面时候的提示
	hoverImgInfo();
	//点击添加图文消息
	addImgInfo();
	//点击编辑图文消息
	clickEditImgInfo();
	//点击删除图文消息
	clickDelImgInfo();
	//编辑图文消息
	editImgInfo();
	//删除已经上传的图片
	delUploadImg();

	//点击从图库选择图片
	upLoadImgFromDeposi();
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
//左侧显示部分，编辑或删除东西，鼠标放到上面进行性显示
function editOrDel(){
	//为整个版面添加事件
	var detailInfo = $("#detail-info");

	detailInfo.on("mouseover",showCoverTop);
	detailInfo.on("mouseout",hideCoverTop);

	//显示灰色层，显示出提示
	function showCoverTop(ev){
		var $target = $(ev.target);
		if($target.hasClass('title')){
			$target.siblings('.top-cover').show();
		}else if($target.hasClass('main-img')){
			$target.siblings('.top-cover').show();
		}
		else if($target.hasClass('cover-word')){
			$target.siblings(".top-cover").show();
		}
		else if($target.hasClass('icon')){
			$target.parent().show();
			$target.addClass('icon-active');
		}
		else if($target.hasClass('small-icon')){
			$target.parent().show();
			$target.addClass('icon-active');
		}
		else if($target.hasClass('small-item')){
			$target.children('.small-top-cover').show();
		}
		else if($target.hasClass('small-title')){
			$target.parent().siblings('.small-top-cover').show();
		}
		else if($target.hasClass('col-md-7')){
			$target.siblings('.small-top-cover').show();
		}
		else if($target.hasClass('small-top-cover')){
			$target.show();
		}
		return false;
	}
	//隐藏灰色层，隐藏出提示
	function hideCoverTop(ev){
		var $target = $(ev.target);
		if($target.hasClass('top-cover')){
			$target.hide();
		}
		else if($target.hasClass('icon')){
			$target.removeClass('icon-active');
		}
		else if($target.hasClass('small-icon')){
			$target.removeClass('icon-active');
		}
		else if($target.hasClass('small-item')){
			$target.children('.small-top-cover').hide();
		}
		else if($target.hasClass('small-top-cover')){
			$target.hide();
		}
		return false;
	}
}

//鼠标放在添加消息上面时候的提示
function hoverImgInfo(){
	var $addSmallItem = $("#detail-info").children('.add-small-item');
	$addSmallItem.on("mouseover",darkedColor);
	$addSmallItem.on("mouseout",lightedColor);

	function darkedColor(ev){
		$target = $(ev.target);
		if($target.hasClass('cross-icon')){
			$target.addClass('icon-active');
			$target.parent().addClass('item-active');
		}
		else{
			$target.addClass('item-active');
			$target.children().addClass('icon-active');
		}
		return false;
	}
	function lightedColor(ev){
		$target = $(ev.target);
		if($target.hasClass('cross-icon')){
			$target.addClass('icon-active');
			$target.parent().addClass('item-active');
		}
		else if($target.hasClass('add-small-item')){
			$target.removeClass('item-active');
			$target.children('.icon-active').removeClass('icon-active');
		}
		return false;
	}
}

//点击添加图文消息
function addImgInfo(){
	var addSmallItem = $("#detail-info").children('.add-small-item');
	addSmallItem.on("click",insertNewImgInfo);//insertNewInfo这个函数在insertInfoToMore.js文件
}	

//点击编辑图文消息的图标，注意，是那个编辑的图标，也就是那个铅笔的图标,而不是对内容进行编辑
function clickEditImgInfo(){
	var $detailBox = $("#detail-info");
	$detailBox.on("click",editInfo);

	function editInfo(ev){
		var $target = $(ev.target);
		if($target.hasClass('edit-icon')){
			var $parent = $target.parent().parent();
			var $parentId;
			//这是选择到了小的图文消息
			if($parent.hasClass('item')){
				//
			}
			//这是选择到了主图文消息
			else{
				//因为主图文消息比小图文消息多一层，因此要向上再上一层
				$parent = $parent.parent();
			}
			$parentId = $parent.attr("data-id");
			var $now = $("#detail-info").children(".now");//查找之前的item

			if($parentId != $now.attr("data-id")){//不是点击同一个元素

				if($("#detail-info").children().hasClass('last')) {
					var $last = $("#detail-info").children(".last");//查找之前再之前的item
					$last.removeClass('last');//之前再之前的设置为没有，这个可能是undefine
				}
				$now.removeClass('now').addClass('last');//之前的设置为last
				$parent.addClass('now');

				//1.保存之前的数据
				saveEditData();
				//2.把当前选中的图文消息的编辑区数据显示出来
				showEditData($parentId);
				//3.对相应的编辑区位置做出改变
				changeLocate($parentId);
				//4.隐藏所有之气操作失败的提示
				$('#edit-area').find('.fail').hide();
			}
			return false;
		}
	}

	//1.保存之前的数据
	function saveEditData(){
		var $editArea = $("#edit-area");
		var titleVal = $editArea.find("#editTitle").val();
		var authorVal = $editArea.find("#editAuthor").val();
		var imgUrl = $editArea.find('.up-load-img').children('img').attr('src');
		var checkBoxVal = $editArea.find("#cover-img").attr("checked");
		var ueditorVal = $($("#ueditor_0")[0].contentWindow.document.body).html();
		var editData = {
			"tit" : titleVal,
			"author" : authorVal,
			"imgUrl" : imgUrl,
			"checkbox" : checkBoxVal,
			"ueditor" : ueditorVal,
			"ueditorValIsRight" : false
		}
		//判断正文数目-----start
		var $val = $('#edui1_wordcount').html();
		var j = 5;
		var sum = 0;
		while(1){
			var temp = parseInt($val.charAt(j));
			if(temp || temp == 0){
				sum = sum * 10 + temp;
				j++;
			}else{
				break;
			}
		}
		if(sum > 10000 || sum <= 0){
			editData.ueditorValIsRight = false;
		}else{
			//正文内容输入正确
			editData.ueditorValIsRight = true;
		}
		//判断正文数目-----end
		var _id = parseInt($("#detail-info").children(".last").attr("data-id"));
		setEditData(editData,_id);//该方法在editAreaData文件中
		return;
	};

	//2.把当前选中的图文消息的编辑区数据显示出来
	function showEditData($parentId){
		var _id = parseInt($parentId);
		var selectedData = getEditDataById(_id);//获取数据
		//设置数据
		var $editArea = $("#edit-area");
		var $title = $editArea.find("#editTitle"),
			$author = $editArea.find("#editAuthor"),
			$img = $editArea.find("#cover-img"),
			$ueditor = $($("#ueditor_0")[0].contentWindow.document.body);

		$title.val(selectedData.tit);
		$author.val(selectedData.author);
		$img.attr("checked",selectedData.checkbox);
		$ueditor.children().remove().end().html(selectedData.ueditor);

		//判断图片的url是否为空，是空，则不显示图片-----start
		if(selectedData.imgUrl && selectedData.imgUrl !=" "){
			$editArea.find('.up-load-img').css('display','block').children('img').attr('src',selectedData.imgUrl);
		}else{
			$editArea.find('.up-load-img').css('display','none').children('img').attr('src',"");
		}
		//判断图片的url是否为空，是空，则不显示图片-----end

		//判断标题是否大于64个字符，是则显示warning-----start
		if(selectedData.tit.length > 64){
			$title.siblings('label').find('.count-word').html(selectedData.tit.length + '/64').addClass('count-word-warning');
		}else{
			$title.siblings('label').find('.count-word').html(selectedData.tit.length + '/64').removeClass('count-word-warning');
		}
		//判断标题是否大于64个字符，是则显示warning-----end

		//判断是否是主图文消息，且预览图层的标题高度是否大于28px-----start
		var $nowItem = $('#detail-info').find('.now');

		if($nowItem.hasClass('main-item') && $nowItem.find('.title').height() > 28){
			$nowItem.find('.title').css('top',"104px");
		}else if($nowItem.hasClass('main-item')){
			$nowItem.find('.title').css('top',"132px");
		}
		//判断是否是主图文消息，且预览图层的标题高度是否大于28px-----start

		//判断作者是否大于8个字符，是则显示warnin---start
		if(selectedData.author.length > 8){
			$author.siblings('label').find('.count-word').html(selectedData.author.length + '/8').addClass('count-word-warning');
		}else{
			$author.siblings('label').find('.count-word').html(selectedData.author.length + '/8').removeClass('count-word-warning');
		}
		//判断作者是否大于8个字符，是则显示warnin---end
		return;
	}

	//3.对应的编辑区位置做出相应的改变
	function changeLocate($parentId){
		var $children = $("#detail-info").children(),
			index=0;
		$children.each(function(idx,element){
			if($(this).attr("data-id") == $parentId){
				index = idx;
				return false;
			}
		});
		var marginTop = index==0 ? 0 : (100 * index)+88;
		$("#edit-area").css("margin-top",marginTop);
	}
}

//点击删除图文消息
function clickDelImgInfo(){
	var $detailBox = $("#detail-info");
	$detailBox.on("click",delInfo);

	function delInfo(ev){
		var $target = $(ev.target);
		if($target.hasClass('del-icon')){
			if($('#detail-info').find('.small-item').length <= 1){
				tipUtil.warningTip('多图文至少需要2条消息!');
			}
			else{
				//保存当前正在编辑的数据-----start
				var nowId = parseInt($('#detail-info').find('.now').attr('data-id'));
				var $editArea = $("#edit-area");
				var titleVal = $editArea.find("#editTitle").val();
				var authorVal = $editArea.find("#editAuthor").val();
				var imgUrl = $editArea.find('.up-load-img').children('img').attr('src');
				var checkBoxVal = $editArea.find("#cover-img").attr("checked");
				var ueditorVal = $($("#ueditor_0")[0].contentWindow.document.body).html();
				var editData = {
					"tit" : titleVal,
					"author" : authorVal,
					"imgUrl" : imgUrl,
					"checkbox" : checkBoxVal,
					"ueditor" : ueditorVal
				}
				//var _id = parseInt($("#detail-info").children(".last").attr("data-id"));
				setEditData(editData,nowId);//该方法在editAreaData文件中
				//保存当前正在编辑的数据-----end
				var $smallItem = $target.parent().parent();
				//恢复位置上一个元素的数据-----start
				if($smallItem.hasClass('now')){
					$smallItem.removeClass('now').siblings('.last').removeClass('last').end().prev().addClass('now');
				}
				if($smallItem.hasClass('last')){
					$smallItem.siblings('.now').removeClass('now').addClass('last').end().removeClass('last').prev().addClass('now');
				}
				else{
					if($smallItem.siblings().hasClass('last')){
						$smallItem.siblings().removeClass('last');
					}
					$smallItem.siblings(".now").removeClass('now').addClass("last").end().prev().addClass('now');
					//$smallItem.siblings(".now").removeClass('now');
				}

				var prevId = parseInt($smallItem.prev().attr("data-id"));
				recoverEditData(prevId);
				changeLocate(prevId);
				//恢复位置上一个元素的数据-----end
				_id = parseInt($smallItem.attr("data-id"));
				$smallItem.remove();//删除预览对应部分
				delEditData(_id);//删除数据，这个方法在editAreaData文件里面
			}
		}
	}
	//恢复编辑区的内容
	function recoverEditData(id){
		var selectedData = getEditDataById(id);
		var $editArea = $("#edit-area");
		$editArea.find("#editTitle").val(selectedData.tit);
		$editArea.find("#editAuthor").val(selectedData.author);
		$editArea.find("#cover-img").attr("checked",selectedData.checkbox);
		$($("#ueditor_0")[0].contentWindow.document.body).html(selectedData.ueditor);
		//判断图片的url是否为空，是空，则不显示图片
		if(selectedData.imgUrl && selectedData.imgUrl !=" "){
			$editArea.find('.up-load-img').css('display','block').children('img').attr('src',selectedData.imgUrl);
		}else{
			$editArea.find('.up-load-img').css('display','none').children('img').attr('src',"");
		}
		
		return;
	}
	//编辑区位置偏移
	function changeLocate($parentId){
		var $children = $("#detail-info").children(),
			index=0;
		$children.each(function(idx,element){
			if($(this).attr("data-id") == $parentId){
				index = idx;
				return false;
			}
		});
		var marginTop = index==0 ? 0 : (100 * index)+88;
		$("#edit-area").css("margin-top",marginTop);
	}
}

//编辑图文消息,注意，这里是直接在编辑区进行输入编辑
function editImgInfo(){
	//编辑标题
	$("#editTitle").on("keyup",function(){
		$now = $("#detail-info").children(".now");
		$nowTitle = $now.find(".edit-title");
		var inputVal = $(this).val();

		//统计字数-----start
		var inputValLen = inputVal.length;
		if(inputValLen <= 64){
			$(this).siblings('label').find('.count-word').html(inputValLen + '/64').removeClass('count-word-warning');
		}else{
			$(this).siblings('label').find('.count-word').html(inputValLen + '/64').addClass('count-word-warning');
		}
		//统计字数-----end

		//预览左边的试图层-----start
		$val = $.trim(inputVal);
		if($val != ""){
			$nowTitle.html($(this).val());
		}
		else{
			$nowTitle.html("标题");
		}
		//如果是主图文输入大于高度28px，即要分两行显示
		if($nowTitle.height() > 28 && $now.hasClass('main-item')){
			$nowTitle.css('top','104px');
		}else if($now.hasClass('main-item')){
			$nowTitle.css('top','132px');
		}
		//预览左边的试图层-----end
		$(this).siblings('.fail').hide();
	});

	//编辑作者
	$('#editAuthor').on('keyup',function(){
		$now = $("#detail-info").children(".now");
		$nowAuthor = $now.find("#editAuthor");

		var inputVal = $(this).val();

		//统计字数-----start
		var inputValLen = inputVal.length;
		if(inputValLen <= 8){
			$(this).siblings('label').find('.count-word').html(inputValLen + '/8').removeClass('count-word-warning');
		}else{
			$(this).siblings('label').find('.count-word').html(inputValLen + '/8').addClass('count-word-warning');
		}
		//统计字数-----end
		$(this).siblings('.fail').hide();
	});
}


//删除已经上传的图片
function delUploadImg(){
	$('.del-upload-img').on('click',function(){
		$(this).parent().hide().end().siblings('img').attr('src',' ');//右手边编辑区的图片删除掉
		//$('.img-box').children('img').css('display','none').attr('src',' ');
		var nowEditItem = $('#detail-info').find('.now');
		if(nowEditItem.hasClass('main-item')){
			$('.img-box').children('img').css('display','none').attr('src',' ');
		}else if(nowEditItem.hasClass('small-item')){
			nowEditItem.find('.deposi-img').hide().attr('src',data.url);
		}
		//删除数组中的数据,imgUrl置为空-----start
		var nowEditId = parseInt($('#detail-info').find('.now').attr('data-id'));
		var nowEditData = getEditDataById(nowEditId);
		nowEditData.imgUrl = "";
		setEditData(nowEditData,nowEditId);
		//删除数组中的数据,imgUrl置为空-----end

	});
}
//保存并上传消息
$("#save").on("click",function(){

	// handleMessage.checkMessageForMore();//判断数据是否写全，是否不符合规则
	
	arrangeEditData();//要对数据进行处理
	var isSuccess = handleMessage.checkMessageForMore();//检查数据是否有问题
	if(isSuccess){
		handleMessage.uploadMessageForMore();//上传给服务器
	}
});