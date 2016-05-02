//新建图片分组的提示的标签
function addGroupTab(){

	return addGroupTip().append(innerContent().append(bd()).append(ft()).append(outTri()).append(inTri()));

	function addGroupTip(){
		var $addGroup = $('<div></div>').addClass('add-group-tip edit-dialog');
		$addGroup.attr('data-dialogFlag','1');
		return $addGroup;
	}
	function innerContent(){
		return $('<div></div>').addClass('inner-content');
	}
	function bd(){
		return $('<div></div>').addClass('bd').append(paragraph()).append(form('haha'));
	}
	function paragraph(){
		return $('<p>新建分组</p>');
	}
	function form(){
		var $form = $('<form></form>').attr('role','form');
		var $formGroup = $('<div></div>').addClass('form-group');
		var $input = $('<input>').addClass('form-control').attr('type','text');
		return $form.append($formGroup.append($input));
	}
	function ft(){
		var $ft = $('<div></div>').addClass('ft row');
		var $okButton = $('<button>确定</button>').addClass('ok btn btn-primary col-md-5');
		var $cancelButton = $('<button>取消</button>').addClass('cancel btn btn-default col-md-5 col-md-offset-2');
		return $ft.append($okButton).append($cancelButton);
	}
	function outTri(){
		return $('<i></i>').addClass('out-tri');
	}
	function inTri(){
		return $('<i></i>').addClass('in-tri');
	}
}

//重命名图片分组的提示的标签
function renameGroupTab(){

	return renameTip().append(innerContent().append(bd()).append(ft()).append(outTri()).append(inTri()));

	function renameTip(){
		var $renameTip = $('<div></div>').addClass('rename-group-tip edit-dialog');
		$renameTip.attr('data-dialogFlag','1');
		return $renameTip;
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
	function form(){
		var $form = $('<form></form>').attr('role','form');
		var $formGroup = $('<div></div>').addClass('form-group');
		var $input = $('<input>').addClass('form-control').attr('type','text');
		return $form.append($formGroup.append($input));
	}
	function ft(){
		var $ft = $('<div></div>').addClass('ft row');
		var $okButton = $('<button>确定</button>').addClass('ok btn btn-primary col-md-5');
		var $cancelButton = $('<button>取消</button>').addClass('cancel btn btn-default col-md-5 col-md-offset-2');
		return $ft.append($okButton).append($cancelButton);
	}
	function outTri(){
		return $('<i></i>').addClass('out-tri');
	}
	function inTri(){
		return $('<i></i>').addClass('in-tri');
	}
}

//删除分组图片分组的提示的标签
function delGroupTab(){


	return delTip().append(innerContent().append(bd()).append(ft()).append(outTri()).append(inTri()));

	function delTip(){
		var $delTip = $('<div></div>').addClass('del-group-tip edit-dialog');
		$delTip.attr('data-dialogFlag','1');
		return $delTip;
	}
	function innerContent(){
		return $('<div></div>').addClass('inner-content');
	}
	function bd(){
		return $('<div></div>').addClass('bd').append(paragraph1()).append(paragraph2());
	}
	function paragraph1(){
		return $('<p>仅删除分组，不删除图片，组内图片</p>');
	}
	function paragraph2(){
		return $('<p>将自动归入未分组</p>');
	}
	function ft(){
		var $ft = $('<div></div>').addClass('ft row');
		var $okButton = $('<button>确定</button>').addClass('ok btn btn-primary col-md-5');
		var $cancelButton = $('<button>取消</button>').addClass('cancel btn btn-default col-md-5 col-md-offset-2');
		return $ft.append($okButton).append($cancelButton);
	}
	function outTri(){
		return $('<i></i>').addClass('out-tri');
	}
	function inTri(){
		return $('<i></i>').addClass('in-tri');
	}
}
