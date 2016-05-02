$(function(){
	//通过ajax获取数据
	getBasicData();//imgDepsity_getBasicData.js文件

	//禁止移动分组和删除操作
	banImgOperate();

	//重命名与删除分组
	renameAndDelGroup();

	//选中图片的多选框，对图片进行操作,释放按钮
	releaseOperBtn();

	//全选所有图片
	selectAllImg();

	//对图片进行操作的提示的显示
	showOperateTip();

	//对图片进行操作，编辑、移动到别的分组、删除；还有批量的移动图片与删除图片
	operateImg();

	//右侧对分组的点击与操作
	operateGroup();

	//图片库翻页
	turnPage();

	//对body绑定点击事件
	bodyBindClick();
});
//禁止移动分组和删除操作
function banImgOperate(){
	$(".move-img").attr("disabled",true);
	$(".del-img").attr("disabled",true);
}

//重命名与删除分组
function renameAndDelGroup(){
	$('.group-oper').on('click',function(ev){
		var $target = $(ev.target);
		if($target.hasClass('rename-group')){
			renameGroupFun($target);
			return;
		}else if($target.hasClass('del-group')){
			delGroupFun($target);
			return;
		}else{
			return;
		}
	})
	function renameGroupFun($target){
		if($target.children('.edit-dialog').length > 0){
			return;
		}else{
			removeDialog();//先清除所有的弹出框

			var $renameGroupTab = renameGroupTab();//renameGroupTab()函数是在imgDeposity_addGroupOperTab.js
			$target.parent().append($renameGroupTab);//添加弹出窗口

			var groupName = $.trim($target.siblings('.group-name').html());
			$renameGroupTab.find('input').val(groupName).focus();
			$renameGroupTab.find('.ok').on('click',determine);
			$renameGroupTab.find('.cancel').on('click',cancel);
			return;
		}
	}

	function delGroupFun($target){
		if($target.children('.edit-dialog').length > 0){
			return;
		}else{
			removeDialog();//先清除所有的弹出框

			var $delGroupTab = delGroupTab();//delGroupTab()函数是在imgDeposity_addGroupOperTab.js
			$target.parent().append($delGroupTab);
			$delGroupTab.find('.ok').on('click',determine);
			$delGroupTab.find('.cancel').on('click',cancel);
			return;
		}
	}

	//点击确定-----start
	function determine(ev){
		var $target = $(ev.target);
		var $parent = $target.parent().parent().parent();
		if($parent.hasClass('rename-group-tip')){//选中的是重命名

			var inputName = findInputValue($parent.find('.form-control'));//获取输入的值
			var srcGroupId = findSrcGroupId();//找到当前所在组
			operateFunction.renameGroup(inputName,srcGroupId,$parent);

		}else{//选中的是删除分组
			var srcGroupId = findSrcGroupId();//找到当前所在组
			operateFunction.delGroup(srcGroupId,$parent);
		}
		// $parent.hide();
		// $parent.remove();
		return false;
	}
	//点击确定-----end

	//点击取消-----start
	function cancel(ev){
		var $target = $(ev.target);
		var $parent = $target.parent().parent().parent();
		if($parent.hasClass('rename-group-tip')){//选中的是重命名
			
			
		}else{//选中的是删除分组
			
		}
		$parent.hide();
		$parent.remove();
		return false;
	}
	//点击取消-----end

	//删除其他部分的弹出层-----start
	function removeDialog(){
		if($('.edit-dialog').length>0){
			$('.edit-dialog').hide().remove();
		}
		return;
	}
	//删除其他部分的弹出层-----end
}

//选中图片的多选框，对图片进行操作,释放按钮
function releaseOperBtn(){
	$(".group").on("click",selectEle);

	//由于对整个group都部署了点击事件，因此要选择被点击的元素，
	function selectEle(ev){
		var $target = $(ev.target);
		if($target.hasClass('img-checkbox')){
			$target = $(".img-checkbox");
			selectCheckbox($target);
			return;
		}else{
			return;
		}
	}

	//已经找到了checkbox组，可以对此进行操作
	function selectCheckbox($checkbox){
		var $moveGroup = $(".move-img");
		var $delImg = $(".del-img");
		if($checkbox.is(":checked")){
			$moveGroup.attr("disabled",false);
			$delImg.attr("disabled",false);
		}
		else{
			$moveGroup.attr("disabled",true);
			$delImg.attr("disabled",true);
		}
		return;
	}
}
//全选所有图片
function selectAllImg(){
	$("#select-all").on("click",function(){
		var that = $(this);
		var $checkboxGroup = $(".img-checkbox");
		var $moveGroup = $(".move-img");
		var $delImg = $(".del-img");

		if(that.is(":checked")){//原来没有被选中，现在全部选中
			$checkboxGroup.prop({
				checked: true
			});
			$moveGroup.attr("disabled",false);
			$delImg.attr("disabled",false);
		}
		else{//原来选中了，点击后全部不选中
			$checkboxGroup.prop({
				checked: false
			});
			$moveGroup.attr("disabled",true);
			$delImg.attr("disabled",true);
		}
		return;
	});
}

//对图片进行操作的提示的显示
function showOperateTip(){
	$(".group").on("mouseover",showSelectEle);
	$(".group").on("mouseout",hideSelectEle);

	function showSelectEle(ev){
		var $target = $(ev.target);
		if($target.hasClass('oper-tip')){
			showTip($target);
			return false;
		}
		return false;
	}
	function hideSelectEle(ev){
		var $target = $(ev.target);
		if($target.hasClass('oper-tip')){
			hideTip($target);
			return false;
		}
		else{
			return false;
		}
	}
	function showTip($target){
		$target.siblings('.tool-area').show();
	}
	function hideTip($target){
		$target.siblings('.tool-area').hide();
	}
}

//对图片进行操作，编辑、移动到别的分组、删除；还有批量的移动图片与删除图片
function operateImg(){

	$(".group").on('click',selectedEle);

	numerousImgOper();//批量处理图片

	function selectedEle(ev){
		var $target = $(ev.target);
		if($target.hasClass('edit')){
			//点击选中了编辑图片名字
			editImgName($target);
		}else if($target.hasClass('move')){
			//点击选中了移动图片
			moveImg($target);
		}else if($target.hasClass('del')){
			//点击删除图片
			delImg($target);
		}else if($target.hasClass('cancel btn')){
			//对弹出的对话框选择取消
			hideDialog($target);
			return;
		}else if($target.hasClass('ok btn')){
			//确定操作，进行数据处理
			handleOperate($target);
		}else{
			return;
		}
		return;
	}

	//点击选中了编辑图片名字
	function editImgName($target){
		var $imgItemBd = $target.parent().parent().parent().siblings('.img-item-bd');
		if($imgItemBd.children('.edit-tip').length > 0){
			return;
		}else{
			//removeOtherDialog();//把所有的弹出层删除掉
			removeDialog();
			$imgItemBd.append(editTipTab());
			//获取图片的名字
			var imgName = $.trim($imgItemBd.find('.img-name').html());
			$imgItemBd.find('form').find('input').val(imgName).focus();
			return;
		}
	}
	//点击选中了移动图片
	function moveImg($target){
		var $imgItemBd = $target.parent().parent().parent().siblings('.img-item-bd');
		if($imgItemBd.children().hasClass('move-tip')){
			return;
		}else{
			//removeOtherDialog();//先把除点中的弹出层删除掉
			removeDialog();
			$imgItemBd.append(moveTipTab());
			return;
		}
	}
	//点击删除图片
	function delImg($target){
		var $imgItemBd = $target.parent().parent().parent().siblings('.img-item-bd');
		if($imgItemBd.children().hasClass('del-tip')){
			return;
		}else{
			//removeOtherDialog();//先把除点中的弹出层删除掉
			removeDialog();
			$imgItemBd.append(delTipTab());
			return;
		}
	}
	//对弹出的对话框选择取消
	function hideDialog($target){
		var $parent = $target.parent().parent().parent();

		findImgId($parent.siblings('img'),true);//第一个参数是把图片传过去，第二参数是判断是否选中一个

		$parent.hide().remove();
		
	}
	//确定操作，进行数据处理
	function handleOperate($target){
		var $parent = $target.parent().parent().parent();

		if($parent.hasClass('edit-tip')){//是编辑名称的操作
			var inputName = findInputValue($parent.find('.form-control'));//输入的值
			var imgId = findImgId($parent.siblings('img'),true);//获取图片的id
			var srcGroupId = findSrcGroupId();//获取当前分组的id
			var imgLabel = $parent.siblings('.check-cont').children('.img-name');
			console.log(imgLabel);
			var isSuccess = operateFunction.editImgName(inputName,imgId,srcGroupId,imgLabel,$parent);//在imgDepoity_operateImg.js的文件里面

		}else if($parent.hasClass('move-tip')){//是移动分组的操作
			var srcGroupId = findSrcGroupId();//获取当前分组的id
			var destGroupId = findDestGroupId($parent.find('input[name="group"]'));//获取目的分组的id
			var imgId = findImgId($parent.siblings('img'),true);//获取图片的id

			if(destGroupId == false){//没有选择目标组，不能移动
				alert('请选择组');
			}else{
				var imgBox = $parent.parent().parent();
				operateFunction.moveImg(imgId,srcGroupId,destGroupId,imgBox,$parent);
			}

		}else{//是删除图片的操作
			var imgId = findImgId($parent.siblings('img'),true);//获取图片的id
			var srcGroupId = findSrcGroupId();//获取当前分组的id
			var imgBox = $parent.parent().parent();;
			operateFunction.delImg(imgId,srcGroupId,imgBox,$parent);
		}
		return;
	}

	//批量操作图片
	function numerousImgOper(){
		//批量移动图片
		$('.move-img').on('click',function(){
			var that = $(this);
			removeDialog();
			that.parent().append(moveTipTab());
			return;
		});

		//批量删除图片
		$('.del-img').on('click',function(){
			var that = $(this);
			removeDialog();
			that.parent().append(delTipTab());
			return;
		});
		//删除其他部分的弹出层
		function removeDialog(){
			if($('.edit-dialog').length>0){
				$('.edit-dialog').hide().remove();
			}
			return;
		}

		//对批量操作进行确定或取消
		$('.img-oper').on('click',function(ev){
			var $target = $(ev.target);
			var $parent = $target.parent().parent().parent();

			if($target.hasClass('cancel btn')){

				$parent.remove();
			}else if($target.hasClass('ok btn')){

				if($parent.hasClass('move-tip')){//移动图片到某个分组
					var imgIdArr = findImgId($parent,false);//接收要图片的id
					var srcGroupId = findSrcGroupId();//接收当前所在组的id
					var destGroupId = findDestGroupId($parent.find('input[name="group"]'));//获取选中的分组
					var imgBox = findSelectedImgBox();//找出所有被选中的图片的box
					if(destGroupId == false){
						alert("请选择组");
					}else{
						operateFunction.moveImg(imgIdArr,srcGroupId,destGroupId,imgBox,$parent);	
					}
				}else{//删除选中的图片
					var srcGroupId = findSrcGroupId();//获取当前所在组
					var imgIdArr = findImgId($target,false);//获取所有图片的id
					var imgBox = findSelectedImgBox();//找出所有被选中的图片的box
					operateFunction.delImg(imgIdArr,srcGroupId,imgBox,$parent);
					// console.log('批量操作---删除分组');
					// console.log(srcGroupId);
					// console.log(imgIdArr);
				}
			}
			return;
		});
	}
	//删除其他部分的弹出层
	function removeDialog(){
		if($('.edit-dialog').length>0){
			$('.edit-dialog').hide().remove();
		}
		return;
	}
}

//右侧对分组的点击与操作
function operateGroup(){
	$('.panel-side').on('click',selectEle);

	//选择相应的元素
	function selectEle(ev){
		var $target = $(ev.target);
		if($target.hasClass('add-new-group') || $target.hasClass('glyphicon-plus') || $target.hasClass('new-group-span')){
			//点击新建分组
			if($target.hasClass('new-group-span')){
				//console.log($target);
				$target = $target.parent();
			}
			addGroup($target); 
			return;
		}else if($target.hasClass('cancel')){
			//点击取消，隐藏对话框
			hideDialog($target);
		}else if($target.hasClass('group-item')){
			//选中了对应分组，请求该组的数据
			selectedGroup($target);

		}else if($target.hasClass('side-group-name')){
			//选中了对应分组，请求该组的数据
			selectedGroup($target.parent());
		}else if($target.hasClass('side-group-count')){
			//选中了对应分组，请求该组的数据
			selectedGroup($target.parent());
		}else if($target.hasClass('ok btn')){
			dertermineCreate();
		}else if($target.hasClass('cancel btn')){
			alert('cancel');
		}
		return
	}
	//点击新建分组
	function addGroup($target){
		removeDialog();
		$target.append(addGroupTab());
		$target.find('form').find('input').focus();
		return;
	}
	//点击确定，请求数据
	function dertermineCreate(){
		var groupName = findInputValue($('.add-group-tip').find('input'));//输入新建分组的名字
		operateFunction.createNewGroup(groupName,$('.add-group-tip'));

	}
	//点击取消，隐藏对话框
	function hideDialog($target){
		$target.parent().parent().parent().hide();
	}
	//删除其他部分的弹出层
	function removeDialog(){
		if($('.edit-dialog').length>0){
			$('.edit-dialog').hide().remove();
		}
		return;
	}
	//选中了对应分组，请求该组的数据
	function selectedGroup($target){
		var groupId = $target.data('groupId');
		operateFunction.jumpToOtherGroup(groupId,$target.parent());
	}
}

//图片库翻页
function turnPage(){
	var $pageNav = $('.page-nav');
	//前一页
	$pageNav.children('.prev').on('click',function(){
		var nowPage = parseInt($pageNav.children('.now').html()),
			sumPage = parseInt($pageNav.children('.sum').html());
		if(nowPage == 1){//已经是第一页
			tipUtil.warningTip('已经是第一页');
		}else{
			operateFunction.jumpPage(nowPage-1);
		}
	});
	//后一页
	$pageNav.children('.next').on('click',function(){
		var nowPage = parseInt($pageNav.children('.now').html()),
			sumPage = parseInt($pageNav.children('.sum').html());
		if(nowPage == sumPage){
			tipUtil.warningTip('已经是最后一页');
		}else{
			operateFunction.jumpPage(nowPage+1);
		}
	});
	//跳转页
	$('.page-go').find('.jump-page').on('click',function(){
		var inputPageNum = parseInt($(this).siblings('input').val()),
			sumPage = parseInt($('.page-nav').find('.sum').html());
		if(inputPageNum >=1 && inputPageNum <= sumPage){
			operateFunction.jumpPage(inputPageNum);
		}else{
			tipUtil.warningTip('请输入正确的页码');
		}
	});

}

//对body绑定点击事件
function bodyBindClick(){
	$('body').on('click',function(ev){
		var $target = $(ev.target);
		var $parent3 = $target.parent().parent().parent();//这个参数紧紧表示从target往上三层的parent
		if($target.hasClass('edit-dialog')
			|| $target.parent().hasClass('edit-dialog')
			|| $parent3.hasClass('edit-dialog')
			|| $parent3.parent().hasClass('edit-dialog')
			|| $parent3.parent().parent().hasClass('edit-dialog')){
			
		}else if($('.edit-dialog').length > 0 && $target.attr('data-dialogflag') !='1'){
			$('.edit-dialog').hide().remove();
		}
		return;
	})
}