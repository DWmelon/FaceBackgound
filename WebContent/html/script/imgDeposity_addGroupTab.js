//增加所有分组
function groupTab(group){
	var groupObj = group;
	return liTab().append(aTab(groupObj));
	function liTab(){
		return $('<li></li>');
	}
	function aTab(groupObj){
		var $aTab = $("<a></a>").addClass('group-item'),
			$groupName = $('<span></span>').addClass('side-group-name').html(groupObj.groupName),
			$groupCount = $('<span></span>').addClass('side-group-count').html('(' + groupObj.length + ')');
		$aTab.append($groupName).append($groupCount).data('groupId',groupObj.groupId).attr('href','javascript:void(0);');
		return $aTab;
	}
}

//增加“新建分组”按钮
function newGroupTab(){
	var $liTab = $('<li></li>');
	var $aTab = $('<a></a>').addClass('add-new-group');
	$aTab.attr('href',"javascript:void(0);")
	$aTab.attr("data-dialogFlag","1");
	var $iTab = $('<i></i>').addClass('glyphicon glyphicon-plus');
	var $span = $('<span>新建分组</span>').addClass('new-group-span');
	$span.attr('data-dialogFlag','1');	
	$iTab.attr("data-dialogFlag","1");
	return $liTab.append($aTab.append($iTab).append($span));
}