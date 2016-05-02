//添加编辑图片名字的模块，创建相应的标签。
function editTipTab(){

	return editTip().append(innerContent().append(bd()).append(ft()).append(outTri()).append(inTri()));

	function editTip(){
		var $editTip = $('<div></div>').addClass('edit-tip edit-dialog');
		$editTip.attr('data-dialogFlag','1');
		return $editTip;
	}
	function innerContent(){
		return $('<div></div>').addClass('inner-content');
	}
	function bd(){
		return $('<div></div>').addClass('bd').append(paragraph()).append(form('haha'));
	}
	function paragraph(){
		return $('<p>编辑名称</p>');
	}
	function form(ImgName){
		var $form = $('<form></form>').attr('role','form');
		var $formGroup = $('<div></div>').addClass('form-group');
		var $input = $('<input>').addClass('form-control').val(ImgName).attr('type','text');
		return $form.append($formGroup.append($input));
	}
	function ft(){
		var $ft = $('<div></div>').addClass('ft row');
		var $okButton = $('<button>确定</button>').addClass('ok btn btn-primary col-md-5');
		var $cancelButton = $('<button>取消</button>').addClass('cancel btn btn-default col-md-5 col-md-offset-1');
		return $ft.append($okButton).append($cancelButton);
	}
	function outTri(){
		return $('<i></i>').addClass('out-tri');
	}
	function inTri(){
		return $('<i></i>').addClass('in-tri');
	}	
}

//修改图片的名字，创建相应的标签。
function moveTipTab(){

	return moveTip().append(innerContent().append(bd()).append(ft()).append(outTri()).append(inTri()));

	function moveTip(){
		var $moveTip = $('<div></div>').addClass('move-tip edit-dialog');
		$moveTip.attr('data-dialogFlag','1');
		return $moveTip;
	}
	function innerContent(){
		return $('<div></div>').addClass('inner-content');
	}	
	function bd(){
		var groupArr = GroupMessage.getAllGroupNotNow();//在imgDepoity_getBasicData.js里面
		return $('<div></div>').addClass('bd').append(radio(groupArr));
	}
	function radio(imgGroup){//imgGroup里面有参数 放置分组名
		var $radio = $('<div></div>').addClass('radio');
		for(var i = 0; i < imgGroup.length; i++){
			var $label = $('<label></label>').addClass('col-md-6').attr('for','group-' + imgGroup[i].groupId);
			var $input = $('<input/>').prop({
				type: 'radio',
				id: 'group-' + imgGroup[i].groupId,
				name: 'group'
			});
			$input.data('groupId',imgGroup[i].groupId);
			$label.append($input).append($('<span></span>').html(imgGroup[i].groupName));
			$radio.append($label);
		};
		return $radio;
	}
	function ft(){
		var $ft = $('<div></div>').addClass('ft row');
		var $okButton = $('<button>确定</button>').addClass('ok btn btn-primary col-md-5');
		var $cancelButton = $('<button>取消</button>').addClass('cancel btn btn-default col-md-5 col-md-offset-1');
		return $ft.append($okButton).append($cancelButton);
	}
	function outTri(){
		return $('<i></i>').addClass('out-tri');
	}
	function inTri(){
		return $('<i></i>').addClass('in-tri');
	}
}

//删除图片，创建相应的标签。
function delTipTab(){

	return delTip().append(innerContent().append(bd()).append(ft()).append(outTri()).append(inTri()));

	function delTip(){
		var $delTip = $('<div></div>').addClass('del-tip edit-dialog');
		$delTip.attr('data-dialogFlag','1');
		return $delTip;
	}
	function innerContent(){
		return $('<div></div>').addClass('inner-content');
	}
	function bd(){
		return $('<div></div>').addClass('bd').append(paragraph());
	}
	function paragraph(){
		return $('<p>确定删除此素材吗？</p>');
	}
	function ft(){
		var $ft = $('<div></div>').addClass('ft row');
		var $okButton = $('<button>确定</button>').addClass('ok btn btn-primary col-md-5');
		var $cancelButton = $('<button>取消</button>').addClass('cancel btn btn-default col-md-5 col-md-offset-1');
		return $ft.append($okButton).append($cancelButton);
	}
	function outTri(){
		return $('<i></i>').addClass('out-tri');
	}
	function inTri(){
		return $('<i></i>').addClass('in-tri');
	}
}