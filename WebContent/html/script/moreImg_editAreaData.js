var editAreaData = [];

function initEditData(){
	var $p = $("<p></p>").html("");
	var editData = {
		"title" : "",
		"author" : "",
		"imgUrl" : " ",
		"checkbox" : true,
		"ueditor" : $p,
		"ueditorValIsRight":false
	}
	editAreaData[0] = editData;
	return editAreaData;
}

//增加一个空图文消息，相应增加数据
function addEditData(id){
	var $p = $("<p></p>").html("");
	var editData = {
		"tit" : "",
		"author" : "",
		"imgUrl" : " ",
		"checkbox" : true,
		"ueditor" : $p,
		"ueditorValIsRight":false
	}
	editAreaData[id] = editData;
	return;
}
//获取数据
function getEditDataById(id){
	return editAreaData[id];
}
//设置数据
function setEditData(data,id){
	editAreaData[id] = data;
}
//删除数据,把相应的值置为null
function delEditData(id){
	editAreaData[id] = null;
}
//保存之前编辑的数据
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
		"ueditorValIsRight": false
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
}
function saveNowEditData(){
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
		"ueditorValIsRight": false
	};
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
	var _id = parseInt($("#detail-info").children(".now").attr("data-id"));
	setEditData(editData,_id);//该方法在editAreaData文件中
	return;
}
function arrangeEditData(){
	saveNowEditData();
	var len = editAreaData.length;
	for(var i=0 ; i<len ; i++){
		if(editAreaData[i] == null){
			for(var j=i;j<len-1;j++){
				editAreaData[j] = editAreaData[j+1];
			}
			editAreaData.length = len-1;
		}
	}
	console.log(editAreaData);
	return editAreaData;
}
//显示编辑区的数据，通过editAreaData
function showEditDataByIdx(idx){
	var selectedData = editAreaData[idx];//获取数据
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