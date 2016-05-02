function insertNewImgInfo(sourceId){
	var that = $("#detail-info").children('.add-small-item');
	var $smallItemArr = that.parent().children('.small-item');
	var len = $smallItemArr.length;
	//判断small-item是否长度为0，为0的话，data-id就从1开始,否则自增
	if(len <=0 ){
		id = 1;
		//console.log(id);
	}
	else{
		var id = parseInt($smallItemArr.last().attr("data-id"));
		id = id + 1;
		//console.log(id);
	}
	//判断图文消息长度是否大于8
	if(len >=7){
		alert("图文消息长度不能大于8");
	}
	else{
		//添加左侧预览部分----start
		var $newInfo = newInfo(id);
		that.before($newInfo);
		//添加左侧预览部分----end

		if(sourceId){
			//编辑添加的small-item，不需要新增编辑区内容
		}else{
			//新建一个对应编辑区的内容，内容为空
			addEditData(id);
		}
	} 
	return;
}
function newInfo(id){
	return smallItem(id).append(title()).append(imgBox()).append(topCover());
}
//新建子元素
function smallItem(id){
	return $("<div></div>").addClass('small-item item row').attr("data-id",id);
}
function title(){
	var $h4 = $("<h4></h4>").addClass('col-md-7 small-title edit-title').html("标题");
	//var $a = $("<a></a>").addClass("small-title edit-title").html("标题");
	return $h4;
}
function imgBox(){
	var $box = $("<div></div>").addClass('small-img-box col-md-offset-1 col-md-4');
	var $img = $("<img>").addClass('deposi-img');
	var $backWord = $("<div></div>").addClass('back-word').html("缩略图");
	return $box.append($img).append($backWord);
}
function topCover(){
	$topCover = $("<div></div>").addClass('small-top-cover');
	$pencil = $("<a></a>").addClass('small-icon edit-icon glyphicon glyphicon-pencil');
	$trash = $("<a></a>").addClass('small-icon del-icon glyphicon glyphicon-trash');
	return $topCover.append($pencil).append($trash);
}