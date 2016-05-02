function getNewEditPlace(editorId){
	var $editArea = getEditArea().append(getOutTri()).append(getTri());//把三角形加进去
	var $form = getForm().append(getFormGroup("标题","（字数不超过50个）","text")).
						  append(getFormGroup("作者","（选填）","text")).
						  append(getFormGroupElse()).
						  append(getFormInlineBtn()).
						  append(getFormCheckBox());//表单的全部内容
	var $editForm = getEditForm().append($form);
	var $mainTitle = getMainTitle(editorId);
	return $editArea.append($editForm).append($mainTitle);
}
//edit-area
function getEditArea(){
	return $("<div></div>").addClass('edit-area-sm');
}
//out-triangle
function getOutTri(){
	return $("<span></span>").addClass('out-triangle');
}
//triangle
function getTri(){
	return $("<span></span>").addClass('triangle');
}
//edit-form;form
function getEditForm(){
	return $("<div></div>").addClass('edit-form form');
}
function getForm(){
	return $("<form></form>").attr("role","form");
}
//form-group
function getFormGroup(title,tip,type){
	var $div = $("<div></div>").addClass('form-group');
	var $label = $("<label></label>").html(title);
	var $span = $("<span></span>").addClass('input-tip').html(tip);
	var $input = $("<input>").addClass('form-control').attr("type",type);
	$label.append($span);
	return $div.append($label).append($input);
}
//封面，大图片
function getFormGroupElse(){
	var $div = $("<div></div>").addClass('form-group');
	var $label = $("<label></label>");
	var $span = $("<span></span>").addClass('input-tip').html("（大图片建议尺寸：900像素 * 500像素）");
	$label.append($span);
	return $div.append($label);
}
//form-group form-inline 按钮组
function getFormInlineBtn(){
	var $div = $("<div></div>").addClass('form-group form-inline');
	var $button1 = $("<button></button>").addClass('btn btn-default').html("上传图片");
	var $button2 = $("<button></button>").addClass('btn btn-default').html("从图片库选择");
	return $div.append($button1).append($button1);
}
//form-group form-inline checkbox组
function getFormCheckBox(){
	var $div = $("<div></div>").addClass('form-group form-inline');
	var $input = $("<input>").attr("type","checkbox");
		$input.attr("id","cover-img");
	var $label = $("<label></label>").attr("for","cover-img");
	var $span = $("<span></span>").addClass('input-tip').html("封面图片显示在正文中");
	$label.append($span);
	return $div.append($input).append($label);
}
//add-summary
function getSummary(){
	var $div = $("<div></div>").addClass('add-summary');
	var $a = $("<a></a>").attr("href","javascript:void(0);");
	var $textarea = $("<textarea></textarea>");
	return $div.append($a).append($textarea);
}
//main-article
function getMainTitle(id){
	var $div = $("<div></div>").addClass('main-article');
	var $p = $("<p></p>").addClass('title').html("正文");
	var $script = $("<script></script>").css({
		width:"100%",
		height:"300px"
	}).attr("id",id);
	$script.attr("type","text/plain");
	return $div.append($p).append($script);
}
// <div id="edit-area" class="col-md-7">
// 	<span class="out-triangle"></span>
// 	<span class="triangle"></span>
// 	<div class="edit-form form">
// 		<form role="form">
// 			<div class="form-group">
// 				<label>标题<span class="input-tip">（字数不超过50个）</span></label>
// 				<input type="text" class="form-control">
// 			</div>
// 			<div class="form-group">
// 				<label>作者<span class="input-tip">（选填）</span></label>
// 				<input type="text" class="form-control">
// 			</div>
// 			<div class="form-group">
// 				<label>
// 					封面<span class="input-tip">（大图片建议尺寸：900像素 * 500像素）
// 					</span>
// 				</label>
// 			</div>
// 			<div class="form-group form-inline">
// 				<button class="btn btn-default">上传图片</button>
// 				<button class="btn btn-default">从图片库选择</button>
// 			</div>
// 			<div class="form-group form-inline">
// 				<input id="cover-img" type="checkbox">
// 				<label for="cover-img">
// 					<span class="input-tip">封面图片显示在正文中</span>
// 				</label>
// 			</div>
// 		</form>
// 	</div>
// 	<div class="add-summary">
// 		<a href="javascript:void(0);">添加摘要</a>
// 		<textarea></textarea>
// 	</div>
// 	<div class="main-article">
// 		<p class="title">正文</p>
// 		<script id="editor" type="text/plain" style="width:100%;height:300px;"></script>
// 	</div>
// </div>