var editAreaData = [' '];
//初始化编辑区数据
 function initEditData(){
 	var $p = $("<p></p>").html(" ");
 	var editData = {
 		"title" : " ",
 		"author" : " ",
 		"imgUrl" : " ",
 		"checkbox" : true,
 		"ueditor" : $p
 	}
 	editAreaData[0] = editData;
 	return editAreaData;
 }

 //增加一个空图文消息，相应增加数据
 function addEditData(id){
 	var $p = $("<p></p>").html(" ");
 	var editData = {
 		"tit" : " ",
 		"author" : " ",
 		"imgUrl" : " ",
 		"checkbox" : true,
 		"ueditor" : $p
 	}
 	editAreaData[id] = editData;
 	return;
 }
 //获取数据
 function getEditData(id){
 	return editAreaData[id];
 }
 //设置数据
 function setEditData(data,id){
 	editAreaData[id] = data;
 }
 //删除数据,把相应的值置为null
 function delEditData(id){
 	editAreaData[id] = null;
 }
 function arrangeEditData(){
 	var len = editAreaData.length;
 	for(var i=0 ; i<len ; i++){
 		if(editAreaData[i] == null){
 			for(var j=i;j<len-1;j++){
 				editAreaData[j] = editAreaData[j+1];
 			}
 			editAreaData.length = len-1;
 		}
 	}
 	return editAreaData;
 }