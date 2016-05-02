var GroupMessage = {

	groupLength : " ",//分组的数目
	imgLength : " ",//图片的数组
	groupArr : " ", //存放所有分组的数组
	imgArr : " ",//存放所有图片的数组

	//得到除当前组的所有组的信息
	getAllGroupNotNow: function (){
		var nowGroupId = $('.group-list').children('.active').children().data('groupId');
		var allGroup = this.groupArr;
		var resultGroup = [];
		var len = this.groupLength;
		for(var i = 0; i < len; i++){
			if(allGroup[i].groupId != nowGroupId){
				var groupItem = {"groupId":allGroup[i].groupId,"groupName":allGroup[i].groupName};
				resultGroup[resultGroup.length] = groupItem;
			}
		}
		console.log(resultGroup);
		return resultGroup;
	},
	//删除分组
	deleteGroup:function(groupId){
		var thisGroupArr = this.groupArr;
		var	len = thisGroupArr.length;
		var	flag = len - 1;
		for(var i = 0; i < len; i++){
			if(groupId == thisGroupArr[i].groupId){
				flag = i;
				break;
			}
		}

		for(var i = flag; i < len - 1; i++){
			this.groupArr[i] = thisGroupArr[i+1];
		}
		this.groupArr.length--;
		this.groupLength--;
		return;
	}
};