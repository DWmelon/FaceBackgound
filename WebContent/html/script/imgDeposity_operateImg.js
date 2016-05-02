//找出所有被选中的图片的id
function findImgId($target,one){
	//遍历所有的checkbox，查看选中的hceckbox对应的操作
	var imgIdArr=[];
	if(one == true){
		imgIdArr[imgIdArr.length] = ($target.attr("data-imgId")).toString();
	}else{
		$('.img-checkbox').each(function(){
			var that = $(this);
			if(that.is(":checked")){
				var imgId = (that.parent().siblings('img').attr("data-imgId")).toString();
				var len = imgIdArr.length;
				imgIdArr[len] = imgId;
				imgIdArr.length = len + 1;
			}
		});
	}
	return imgIdArr;
}

//找出当前所在组的id
function findSrcGroupId(){
	var _id =  $('.group-list').children('.active').children().data('groupId');
	return _id;
}

//找出移动到分组的目的分组的id
function findDestGroupId($radio){
	var groupId = false;
	$radio.each(function(){
		if($(this).is(':checked')){
			groupId = parseInt($(this).data('groupId'));
			return false;
		}
	});
	return groupId;
}

//找出输入的值
function findInputValue(element){
	return element.val();
}

//找出所有被选中的图片的box
function findSelectedImgBox(){
	var imgBox = $("<i></i>");
	var boxLen = 0;
	$('.img-checkbox').each(function(){
		var that = $(this);
		if(that.is(":checked")){
			//var $itemBd = that.parent().parent().parent();
			//if(imgBox == null){
			//	imgBox = $itemBd
			//}else{
				//imgBox.add($(that.parent().parent().parent()));
			//}
			//console.log(that);
			var $parent = that.parent().parent().parent();
			imgBox = imgBox.add($parent);
			boxLen++;
		}
	});
	return imgBox.slice(0,boxLen);
}

//对图片，分组进行的各种操作
var operateFunction = {

	editImgName:function(inputName,imgId,srcGroupId,imgLabel,$target){
		operateFunction.loading(true);//显示加载中
		var url = 'http://localhost:8080/MesClouds/imgRename';
		var param={"newName":inputName,"imgId":imgId[0].toString(),"groupId":srcGroupId.toString(),"userId":"1111"};
		$.post(url,param,function(data){		
			var image = data.image;
			var len = image.length;
			var newName;
			for(var i = 0; i < len; i++){
				if(imgId == image[i].imgId){
					newName = image[i].imgName;
					break;
				}
			}
			imgLabel.html(newName);
			$target.hide().remove();
			operateFunction.loading(false);
			tipUtil.successTip('重命名图片成功');
		});
	},
	moveImg:function(imgId,srcGroupId,destGroupId,$target,$dialog){
		operateFunction.loading(true);//显示加载中
		var url = 'http://localhost:8080/MesClouds/imgMove'
		var arr = {"imgIdArr":imgId,"newGroupId":destGroupId.toString(),"oldGroupId":srcGroupId.toString(),"userId":"1111"};
		var param = {data:JSON.stringify(arr)};
		$.get(url,param,function(data){
			console.log(data);
			operateFunction.loading(false);//隐藏loading层
			operateFunction.arrangeImg(data.image);//排列好图片
			operateFunction.refreshGroup(data.imageGroup,srcGroupId); //刷新组信息
			tipUtil.successTip('移动图片成功');
		});
	},
	delImg:function(imgId,srcGroupId,$target,$dialog){
		operateFunction.loading(true);

		var arr = {"imgIdArr":imgId,"groupId":srcGroupId,"userId":"1111"};
		var param={data:JSON.stringify(arr)};
		var url = 'http://localhost:8080/MesClouds/imgDelete';
		$.get(url,param,function(data){
			$target.hide(1000).remove();
			$dialog.hide().remove();
			operateFunction.refreshGroup(data.imageGroup,srcGroupId);
			operateFunction.arrangeImg(data.image);
			operateFunction.loading(false);
			tipUtil.successTip('删除图片成功');
		});
	},
	renameGroup:function(newGroupName,srcGroupId,dialog){
		operateFunction.loading(true);
		var url = 'http://localhost:8080/MesClouds/imgGroupRename';
		console.log(srcGroupId,newGroupName);
		var param = {"groupId":srcGroupId.toString(),"newGroupName":newGroupName,"userId":"1111"};

		$.post(url,param,function(data){
			dialog.hide().remove();
			$('.group-name').html(newGroupName);
			$('.group-list').children('.active').children('a').html(newGroupName);
			operateFunction.loading(false);
			tipUtil.successTip('重命名分组成功');
		});
	},
	delGroup:function(srcGroupId,dialog){
		operateFunction.loading(true);
		var url = 'http://localhost:8080/MesClouds/deleImgGroup';
		var param = {"groupId":srcGroupId.toString(),"userId":"1111"};
		$.get(url,param,function(data){
			console.log(data);
			dialog.hide().remove();
			//跳转到未分组的界面-----start
			var $li = $('.group-list').children().first();
			$('.group-list').children('.active').remove();
			$li.addClass('active');
			var destGroupId = $('.group-list').children().first().find('a').data('groupId');
			operateFunction.jumpToOtherGroup(destGroupId,$li,data.imageGroup);//跳转到其他分组
			GroupMessage.deleteGroup(srcGroupId);//对存储所有分组的变量进行处理
			tipUtil.successTip('删除分组成功');
			//跳转到未分组的界面-----end
			//console.log(data);
		});
	},
	jumpToOtherGroup:function(groupId,$li,groupArr){//跳转到指定的分组，第一个参数是目的分组的id，第二个参数是点击到的li，第三个是可选参数，是所有组的信息
		//alert(groupId);
		operateFunction.loading(true);
		$li.siblings('.active').removeClass('active').end().addClass('active');
		$('.group-name').html($li.children('a').children('.side-group-name').html());
		var url = 'http://localhost:8080/MesClouds/groupImage';
		var param = {"groupId":groupId.toString(),"userId":"1111"};
		$.post(url,param,function(data){
			console.log(data);
			//添加图片到视图当中并且情况跳转页面的输入-----start
			operateFunction.arrangeImg(data);
			$('.jump-page').siblings('input').val('');
			//添加图片到视图当中并且情况跳转页面的输入-----end
			if($li.children('a').data('groupId') != 1){//判断是否是未分组，如果不是未分组，则有重命名与删除分组的操作
				if($('.group-oper').children().hasClass('rename-group')){
					
				}else{
					//创建元素-----start
					operateFunction.createRenameTab();
					// var $box = $('.group-oper');
					// var $renameTab = $('<a></a>').addClass('rename-group').prop({
					// 	href: 'javascript:void(0);'
					// }).html('重命名分组').css('display','inline-block').attr('data-dialogFlag',"1");
					// var $delGroupTab = $('<a></a>').addClass('del-group oper-tip-group').prop({
					// 	href: 'javascript:void(0);'
					// }).html('删除分组').css('display','inline-block').attr('data-dialogFlag','1');
					// //创建元素-----end
					// $box.append($renameTab).append($delGroupTab);
				}
			}else{
				if($('.group-oper').children().hasClass('rename-group')){
					$('.group-oper').children('.rename-group').remove().end().children('.del-group').remove();
				}
			}
			GroupMessage.imgLength = data.length;//修改GroupMessage的当前组的图片长度与图片数组
			GroupMessage.imgArr = data;
			
			if(groupArr){
				operateFunction.refreshGroup(groupArr,1);//如果是删除分组情况的话，就要刷新分组信息
			}
			operateFunction.loading(false);
		});
	},
	createNewGroup:function(newGroup,$dialog){
		//处理输入的字符串-----start
		newGroup = $.trim(newGroup);
		if(newGroup.length > 6){
			tipUtil.warningTip('输入字符数不能大于6');
		}
		//处理输入的字符串-----end
		else{
			operateFunction.loading(true);//显示加载图片

			var url = 'http://localhost:8080/MesClouds/createImgGroup';
			var param = {"groupName":newGroup,"userId":"1111"};
			$.post(url,param,function(data){
				//console.log(data);
				$dialog.hide().remove();
				$('.group').children().remove();

				//创建新的元素，插入到分组里面-----start
				var groupArr = data.imageGroup;
				var newGroupId = 0;
				for(var i = groupArr.length - 1; i > 0; i--){
					if(groupArr[i].groupName == newGroup){
						newGroupId = groupArr[i].groupId;
						break;
					}
				}
				var $li = $("<li></li>").addClass('active')
				var $a = $("<a></a>").addClass('group-item').data('groupId',newGroupId).attr("href","javascript:void(0);");
				var	$groupName = $('<span></span>').addClass('side-group-name').html(newGroup);
				var	$groupCount = $('<span></span>').addClass('side-group-count').html('(0)');
				$li.append($a.append($groupName).append($groupCount));
				$('.group-list').children('.active').removeClass('active');
				$li.insertBefore($('.add-new-group').parent());
				$('.group-name').html(newGroup);
				//创建新的元素，插入到分组里面-----end

				//修改对象GroupMessage对象的属性值-----start
				var groupObj = {
					groupId :0,
					groupName:0,
					groupType:0,
					length:0
				}
				groupObj.groupId = newGroupId;
				groupObj.groupName = newGroup;
				groupObj.groupType = null;
				groupObj.length = 0;
				groupObj.userId = 1111;
				var len = GroupMessage.groupArr.length;
				GroupMessage.groupArr[len] = groupObj;
				GroupMessage.groupArr.length = len + 1;
				GroupMessage.groupLength++;
				//修改对象GroupMessage对象的属性值-----end

				$('.page-wrap').hide();//隐藏翻页
				operateFunction.createRenameTab();//显示重命名与删除功能
				operateFunction.loading(false);
				tipUtil.successTip('新建分组成功');
				//alert('新建成功');
			});
		}
	},
	jumpPage:function(pageNum){
		operateFunction.loading(true);
		var begin = 12 * (pageNum-1),
			imgLength = GroupMessage.imgLength,
			end = ((12 * pageNum) > imgLength) ? (imgLength-1) : (12 * pageNum - 1 );
		var $group = $('.group');
		var imgArr = GroupMessage.imgArr;

		$group.children().remove();
		for(var i = begin; i <= end; i++){
			$group.append(imgTab(imgArr[i]));
		}

		$('.page-nav').find('.now').html(pageNum);//修改当前的页码
		$('.page-go').find('input').val('');//清空输入跳转的页码
		operateFunction.loading(false);
	},
	arrangeImg:function(imgArr){//把图片显示进行排版，分页显示
		operateFunction.loading(true);
		var imgArrLen = imgArr.length,
			showImgLen,
			$group = $(".group"),
			$pageWrap = $('.page-wrap');

		if(imgArrLen > 11){//当图片数大于一页的，也就是图片数多于12张
			var sumPage = parseInt((imgArrLen) / 12),
				remainImgNum = parseInt((imgArrLen) % 12);
			if(remainImgNum > 0){
				sumPage++;
			}

			$pageWrap.show().find('.now').html('1').end().find('.sum').html(sumPage);
			imgArrShowLen = 12;//如果图片数大于12张的时候，一页最多显示12张
		}else{
			imgArrShowLen = imgArrLen;//如果少于12张，直接显示当前的所有页
			$pageWrap.hide();
		}
		//先把当前的图片全部隐藏掉，然后显示当前组的图片-----start
		$group.children().remove();

		for(var i = 0; i < imgArrShowLen; i++){
			$group.append(imgTab(imgArr[i]));
		}
		//先把当前的图片全部隐藏掉，然后显示当前组的图片-----end
		operateFunction.loading(false);
	},
	refreshGroup:function(groupArr,activeGroupId){
		$('.group-list').children().remove();//删除当前所有的组信息
		//添加组信息-----start
		var groupLength = groupArr.length;

		for(var i = 0; i < groupLength; i++){
			var $groupItem = groupTab(groupArr[i]);
			if($groupItem.children('a').data("groupId") == activeGroupId && (!($groupItem.hasClass('active')))){
				$groupItem.addClass('active');//设置分组高亮，显示当前组
			}
			$(".group-list").append($groupItem);
		}
		$('.group-list').append(newGroupTab());//添加“新建分组按钮”
		//添加组信息-----end
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
	createRenameTab:function(){
		//创建元素-----start
		var $box = $('.group-oper');
		if($box.children().hasClass('rename-group')){
			return;
		}
		var $renameTab = $('<a></a>').addClass('rename-group').prop({
			href: 'javascript:void(0);'
		}).html('重命名分组').css('display','inline-block').attr('data-dialogFlag',"1");
		var $delGroupTab = $('<a></a>').addClass('del-group oper-tip-group').prop({
			href: 'javascript:void(0);'
		}).html('删除分组').css('display','inline-block').attr('data-dialogFlag','1');
		//创建元素-----end
		$box.append($renameTab).append($delGroupTab);
	}
}