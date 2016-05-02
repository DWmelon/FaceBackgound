//点击上传按钮
$(".upload-img").click(function(){
  $("#upload-file").click();
})

//文件判定。
function fileChange(e){
  var url = $("#upload-file").val();
  var lastFix = url.indexOf('.');
  var pos = lastFix;
  while(pos>-1){
    lastFix = pos;
    pos = url.indexOf('.', pos+1);
  } 
  var fix = url.slice(lastFix+1,url.length);
  if(fix != 'bmp'&&fix != 'png'&&fix != 'jpeg'&&fix != 'jpg'&&fix != 'gif'){
    alert("您选择的图片格式不正确，请重新选择！");
    return false;
  }

  $("#userId").val("1111");
  //$("#groupId").val($('.group-list').children('.active').children('a').data('groupId'));
  $('#groupId').val($('.group-list').children('.active').children('a').data('groupId').toString());
  //console.log($('.group-list').children('.active').children('a').data('groupId').toString());
  $("#submit-img").submit();
}

$("#submit-img").submit(function(e){
  e.preventDefault();
  $(this).ajaxSubmit(function(data){
    if(typeof(data) != 'object'){
      data = $.parseJSON(data);
    }
    if(data.result){
      var data = {
        "userId":"1111",
        "groupId":$('.group-list').children('.active').children('a').data('groupId').toString()
      };
      operateFunction.loading(true);//正在获取数据
      $.post("http://localhost:8080/MesClouds/groupImage",data,function(data){
        console.log(data);
        operateFunction.arrangeImg(data);//更新图片面板
        //更新组数量-----start
        var $groupCount = $('.group-list').children('.active').find('.side-group-count'),
            prevCountStr = $groupCount.html().toString(),
            prevCountLen = prevCountStr.length - 1,
            nowCount = parseInt(prevCountStr.slice(1,prevCountLen)) + 1;
        $groupCount.html('(' + nowCount + ')');
        //更新组数量-----end
        tipUtil.successTip("上传图片成功");//提示上传成功
      })
    }
  });
  return false;
});