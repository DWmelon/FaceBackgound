function getBasicData(){
	
	var groupUrl = 'http://localhost:8080/MesClouds/group';
	var groupParam = {};
	var groupLength;//分组的数目
	var imgLength;//图片的数组
	var groupArr; //存放所有分组的数组
	var imgArr;//存放所有图片的数组

	//请求所有的组，而且会返回第一个分组的所有图片-----start
	$.get(groupUrl,function(groupData){
		//console.log(groupData);
		if(typeof(groupData) != 'object'){
			groupData = $.parseJSON(groupData);
		}
		groupLength = groupData.imageGroup.length;
		imgLength = groupData.image.length;
		groupArr = groupData.imageGroup;
		imgArr = groupData.image;
		//把数据存放到对象里面-----start
		GroupMessage.groupLength = groupLength;
		GroupMessage.imgLength = imgLength;
		GroupMessage.groupArr = groupArr;
		GroupMessage.imgArr = imgArr;
		console.log(GroupMessage.groupArr);

		//把数据存放到对象里面-----end

		//设置当前组的组名-----start
		$('.group-name').html("未分组");
			//如果是默认分组，也就是未分组。不能操作改变组名，和删除组名
		if(groupArr[0].groupName == "未分组"){
			$('.rename-group').remove();
			$('.del-group').remove();
		}
		//设置当前组的组名-----end

		//添加组信息-----start
		for(var i = 0; i < groupLength; i++){
			var $groupItem = groupTab(groupArr[i]);
			if($groupItem.children('a').data("groupId") == groupArr[0].groupId){
				$groupItem.addClass('active');//设置分组高亮，显示当前组
			}
			$(".group-list").append($groupItem);
		}
		$('.group-list').append(newGroupTab());//添加“新建分组按钮”
		//添加组信息-----end
		
		//设置页数与当前显示的图片数量-----start
		operateFunction.arrangeImg(GroupMessage.imgArr);
		//请求结束，将loading层隐藏
		operateFunction.loading(false);
	});
	//请求所有的组，而且会返回第一个分组的所有图片-----end
	return;
}

// var GroupMessage = {

// 	groupLength:0,//分组的数目
// 	imgLength:0,//当前组所有图片的数组的长度
// 	groupArr:0, //存放所有分组的数组
// 	imgArr:0,//当前组所有图片的数组

// 	setGroupLength:function(groupLength){
// 		this.groupLength = groupLength;
// 	},
// 	setImgLength:function (imgLength){
// 		this.imgLength = imgLength;
// 	},
// 	setGroupArr:function (groupArr){
// 		this.groupArr = groupArr;
// 	},
// 	setImgArr:function (imgArr){
// 		this.imgArr = imgArr;
// 	},
// 	getGroupLength:function (){
// 		return this.groupLength;
// 	},
// 	getImgLength:function (){
// 		return this.imgLength;
// 	},
// 	getGroupArr:function (){
// 		return this.groupArr;
// 	},
// 	getImgArr:function (){
// 		return this.imgArr;
// 	},

// 	//得到除当前组的所有组的信息
// 	getAllGroupNotNow:function (){
// 		var nowGroupId = $('.group-list').children('.active').children().data('groupId');
// 		var allGroup = getGroupArr();
// 		var resultGroup = [];
// 		var len = getGroupLength;
// 		for(var i = 0; i < len; i++){
// 			if(allGroup[i].groupId != nowGroupId){
// 				var groupItem = {"groupId":allGroup[i].groupId,"groupName":allGroup[i].groupName};
// 				resultGroup[resultGroup.length] = groupItem;
// 				resultGroup.length++;
// 			}
// 		}
// 		//console.log(resultGroup);
// 		return resultGroup;
// 	},
// 	//删除分组
	
// }