function imgTab(imgObj){

	return imgItem().append(imgItemBd(imgObj)).append(imgItemFt(imgObj));

	function imgItem(){
		return $('<div></div>').addClass('img-item col-md-3');
	}
	function imgItemBd(){
		return $('<div></div>').addClass('img-item-bd').append(img(imgObj)).append(checkOut(imgObj));
	}
	function img(imgObj){
		var $img =  $('<img>');
		$img.attr('src',imgObj.url);
		$img.attr('data-imgId',imgObj.imgId);
		return $img;
	}
	function checkOut(imgObj){
		//console.log(imgObj);
		var $check = $('<div></div>').addClass('check-cont');
		var $input = $('<input/>').addClass('img-checkbox').prop({
			id: imgObj.imgId,
			type: 'checkbox',
			name: 'selected'
		});
		var $label =$('<label></label>').addClass('img-name').html(imgObj.imgName).attr('for',imgObj.imgId);
		return $check.append($input).append($label);
	}
	function imgItemFt(){
		return $('<div></div>').addClass('img-item-ft').append(imgOperList());
	}
	function imgOperList(){
		var $ulList = $('<ul></ul>').addClass('img-oper-list row');
		var $editTip = imgOperItem('edit');
		var $moveTip = imgOperItem('move');
		var $delTip = imgOperItem('del');
		return $ulList.append($editTip).append($moveTip).append($delTip);
	}
	function imgOperItem(type){
		var $liItem = $("<li></li>").addClass('img-oper-item col-md-4');
		var $a = $('<a></a>').addClass('oper-tip glyphicon').prop({
			href: 'javascript:void(0);',
		});
		$a.attr("data-dialogFlag","1");
		var $toolArea = $('<div></div>').addClass('tool-area');
		var $toolTip = $('<span></span>').addClass('tool-tip');
		var $toolTri = $('<span></span>').addClass('tool-tri');
		if(type == 'edit'){
			$a.addClass('edit glyphicon-pencil');
			$toolTip.html('编辑分组');
		}else if(type == 'move'){
			$a.addClass('move glyphicon-move');
			$toolTip.html('移动分组');
		}else{
			$a.addClass('del glyphicon-trash');
			$toolTip.html('删除');
		}
		$toolArea.append($toolTip).append($toolTri);
		return $liItem.append($a).append($toolArea);
	}
}