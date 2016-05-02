
//从图片库上传
$(".img-from-deposi").on('click',function(){
	
    $.post("../../group",{"id":"1111"},function(data){
      picDate = data.image;
      menuGroud = data.imageGroup;
      
      if(picDate.length == 0){
        $(".select-img-box").html("").append(groupNoneImg());
        initGroud(menuGroud);
      }else{
        initSelectImg();
      }

      //把操作失误提示隐藏
      $('.img-limit').hide();
    })

    showPic();//显示图片库弹出框
});

var picDate  = null;

var menuGroud = null;

//初始化选择面板

function initSelectImg(){
	initGroud(menuGroud);
	splitPic(picDate,0);
	if(picDate.length>10){
		$(".page-lefe").css("display","block");
		$(".face-page").html("1");
		$(".num-page").html(parseInt(picDate.length/10)+1);
	}
}

//分组没有图片

function  groupNoneImg(){
	var $div = $("<div class = 'no-img'></div>");
	$div.html("该分组暂时没有图片素材");
	return $div;
}

function imgLoad(){
	var $div = $("<div class = 'load-img'></div>"),
		$img = $("<img></img>");
	$img.attr("src","..\/img\/load.gif");

	$div.append($img);
	//console.log($div);
	return $div;
}
//建立分组
function creatGroud(data){
	var $dd = $("<dd class = 'inner-menu-item'></dd>"),
		$id = $("<span class = 'group-id'></span>"),
		$ddLink = $("<a class = 'inner-menu-link'>"),
		$groupName = $("<span class = 'item-name'></span>"),
		$groudlength = $("<em class = 'num'>(<span></span>)</em>");

	$id.html(data.groupId).css("display","none");
		
	$ddLink.attr({
		'href':'javasrcipt:void(0)',
		'title':data.groupName
	});

	$dd.click(function(){
		$(".inner-menu-item").removeClass("active-item");
		$(".page").css("display","none");
		$(this).addClass("active-item");
		$(".select-img-box").html("").append(imgLoad());
		var data = {
			"userId":$("#user-id").html(),
			"groupId":$(".active-item").find(".group-id").html()
		};
		$.post("http://localhost:8080/MesClouds/groupImage",data,function(data){
			
				picDate = data;
				if(data.length == 0){
					setTimeout('$(".select-img-box").html("").append(groupNoneImg())',1000);

				}else{
					
					splitPic(picDate,0);
					if(picDate.length>10){
						$(".page-lefe").css("display","block");
						$(".face-page").html("1");
						$(".num-page").html(parseInt(picDate.length/10)+1);
					}
				
				}	
			})
	})

	$groupName.html(data.groupName);

	$groudlength.find("span").html(data.length);

	$ddLink.append($groupName).append($groudlength);
	$dd.append($ddLink).append($id);
	return $dd;
}

//初始化构建分组
function initGroud(data){
	var dl = $(".inner-menu");
	dl.html("");
	for(var i = 0 ,len = data.length;i<len;i++){
		dl.append(creatGroud(data[i]));
	}
	dl.children().eq(0).addClass("active-item");
}


//页面下一页
$(".btn-next").click(function(){
	$(".select-number").html('0');
	var nextlength = parseInt($(".face-page").html())+1;
	var totollength = parseInt($(".num-page").html());
	splitPic(picDate,nextlength-1);
	$(".page").css("display","none");
	$(".face-page").html(nextlength);
	if(nextlength == totollength){	
		$(".page-right").css("display","block");	
	}else{
		$(".page-center").css("display","block");
	}
})
//页面上一页
$(".btn-pre").click(function(){
	$(".select-number").html('0');
	var prelength = parseInt($(".face-page").html())-1;
	var totollength = parseInt($(".num-page").html());
	splitPic(picDate,prelength - 1);
	$(".page").css("display","none");
	$(".face-page").html(prelength);
	if(prelength == 1){
		$(".page-lefe").css("display","block");
	}else{
		$(".page-center").css("display","block");
	}
})
//页面跳转
$(".page-go").click(function(){
	var changeString = $(this).parent().find(".length-change").val();
	var changelength = parseInt(changeString);
	if(changeString !== ''|| changelength > parseInt($(".num-page").html())||changelength<1){
		alert("您输入的格式不正确！");
		$(this).parent().find(".length-change").val("");
		return false;
	}
	$(".select-number").html('0');
	$(".page").css("display","none");
	if(changeString !== ''){
		splitPic(picDate,changelength - 1);
		$(".face-page").html(changeString);
		if(changelength == 1){
			$(".page-lefe").css("display","block");
		}else{
			if(changelength == parseInt($(".num-page").html())){
				$(".page-right").css("display","block");
			}else{
				$(".page-center").css("display","block");
			}
		}
	}
})

//页面关闭按钮
$(".btn-exit").click(function(){
	$(".page").css("display","none");
	$("#select-img").fadeOut(500);
	$("#mask").fadeOut(500);
})
//页面取消按钮
$(".cancel-btn").click(function(){
	$(".page").css("display","none");
	$("#select-img").fadeOut(500);
	$("#mask").fadeOut(500);
})
//点击上传按钮
$(".upload-btn").click(function(){
	$("#upload-file").click();
})

//确定按钮点击事件
$(".certain-btn").click(function(){
	var url = $(".maskSelect").parent().find("img").attr("src");
	$("#select-img").fadeOut(500);
	$("#mask").fadeOut(500);
	// $('.up-load-img').css("display","block").children('img').attr('src',url);
	// $('.img-box').children('img').css('display','block').attr('src',url);
	var nowEditItem = $('#detail-info').find('.now');//当前正在编辑的item
    if(nowEditItem.hasClass('main-item')){//那是主图文消息
    	$('.img-box').children('img').css('display','block').attr('src',url);
    }else if(nowEditItem.hasClass('small-item')){
    	nowEditItem.find('.deposi-img').show().attr('src',url);
    }
    $('.up-load-img').css('display','block').children('img').attr('src',url);//右手边编辑区显示对应图片
})

//图标点击事件

function showPic(){
	/*var $selectPic = $(".edit-active");
	$selectPic.find("i").css("backgroundPositionY",parseInt($selectPic.find("i").css("backgroundPositionY"),10)+30+'px');
	$selectPic.removeClass("edit-active");
	$(".edit-pic").find("i").css("backgroundPositionY","-90px");
	$(".edit-pic").addClass("edit-active");*/
	$("#mask").css({
		"width":$(document).width(),
		"height":$(document).height(),
		"display":"block",
		"background-color":"rgb(65, 53, 53)",
		"position": "absolute",
		"z-index":"9999",
		"opacity":"0.5"
	});
	$("#select-img").fadeIn(500);
	$(".select-img-box").html("").append(imgLoad());
	$(".page").css("display","none");
}

//构建浏览页面
function splitPic(data,length){

	if((length-1)*10 > data.length){
		return false;
	}else{
		var $div = $(" <div class = 'img-pic'></div>");
		var $ul  = $(" <ul class = 'img-list' ></ul>");
		if((length+1)*10 > data.length){
			for(var i = length*10;i < data.length; i++){
				var $pic =  creatPic(picDate[i]);
				if((data.length-length*10)>5){
					$(".select-img-box").css("height","350px");
				}else{
					$(".select-img-box").css("height","180px");
				}
				$ul.append($pic);
			}
		}else{
			for(var i = length*10;i < length*10+10;i++){
				var $pic =  creatPic(picDate[i]);
				$ul.append($pic);
				$(".select-img-box").css("height","350px");
			}
		}
		$div.append($ul);
		$(".select-img-box").html('').append($div);
	}
}

//创建图片类型。
function creatPic(data){
	var $li = $("<li class = 'img-item'></li>"),
		$div = $("<div class = 'selected'></div>"),
	 	$img = $(" <img class = 'pic'>"),
	 	$nameBox = $("<span class = 'imgName'></span>"),
	 	$hiddenBox = $("<div class = 'hiddenBox'></div>"),
	 	$hiddenSelect = $("<div class = 'hiddenSelect'></div>"),
	 	$hiddenMask = $("<div class = 'hiddenMask'></div>");
	
	$div.click(function(event){	
		if($(".maskSelect")){
			$(".maskSelect").css("display","none");
		}
		$(".select-number").html("1");
		var target = event.target;
		$(target).parent().find(".hiddenBox").css("display","block").addClass("maskSelect");
		$(".certain-btn").attr("disabled",false);
	});

	$hiddenBox.click(function(event){				
		var target = event.target;
		$(".select-number").html("0");
		if($(target).hasClass("hiddenBox")){
			$(target).css("display","none");
		}else{
			$(target).parent().css("display","none");
		}
		$(".certain-btn").attr("disabled",true);
		event.stopPropagation();
	});



	var imgName = data.imgName;
	if(defLen(data.imgName)>=9){//统计哪里的名字需要剪切
		var cutLen = 0;
		var len = 0;
		for(var i = 0;i<data.imgName.length;i++){
			if(len >=9){
				cutLen = i;
				break;
			}
			if(data.imgName.charCodeAt(i)>255){
				len += 2;
			}else{
				len += 1;
			}
		}
		imgName = data.imgName.slice(0,cutLen) + '...';
	}
	$img.attr({
		alt:imgName,
		src:data.url
	});

	$nameBox.html(imgName);

	$hiddenBox.append($hiddenMask).append($hiddenSelect);

	$div.append($img).append($nameBox).append($hiddenBox);
	
	$li.append($div);

	return $li;
}
//统计字符串长度，汉字算两个字节，其他的算一个。
function defLen(data){
	var len = 0;
	for(var i = 0;i<data.length;i++){
		if(data.charCodeAt(i)>255){
			len += 2;
		}else{
			len += 1;
		}
	}
	return len;
}
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
	$("#groupId").val($(".active-item").find(".group-id").html());
	console.log($('#userId').val());
	console.log($("#groupId").val());
	$("#submit-img").submit();
}

$("#submit-img").submit(function(e){
	e.preventDefault();
	$(this).ajaxSubmit(function(data){
		if(typeof(data) != 'object'){
			data = $.parseJSON(data)
		}
		if(data.result){
			$(".page").css("display","none");
			$(".select-img-box").html("").append(imgLoad());
			var data = {
				"userId":$("#userId").val(),
				"groupId":$(".active-item").find(".group-id").html().toString()
			};
			$.post("http://localhost:8080/MesClouds/groupImage",data,function(data){
				picDate = data;
										
				splitPic(picDate,0);
				if(picDate.length>10){
					$(".page-lefe").css("display","block");
					$(".face-page").html("1");
					$(".num-page").html(parseInt(picDate.length/10)+1);
				}

			})
		}
	});
	return false;
});

//点击“上传图片”-----start
$('#upload-from-local').on('click',function(){
	$('#upload-local-file').click();
	//fileChange();
});

//文件判定。
function fileChangeLocal(e){
  var url = $("#upload-local-file").val();
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

  $("#local-userId").val("1111");
  //$("#groupId").val($('.group-list').children('.active').children('a').data('groupId'));
  $('#local-groupId').val("1");
  console.log($("#local-userId").val());
  console.log($('#local-groupId').val());
  //console.log($('.group-list').children('.active').children('a').data('groupId').toString());
  $("#upload-local").submit();
}

$("#upload-local").submit(function(e){
  e.preventDefault();
  $(this).ajaxSubmit(function(data){
    if(typeof(data) != 'object'){
      data = $.parseJSON(data);
    }
    var nowEditItem = $('#detail-info').find('.now');//当前正在编辑的item
    if(nowEditItem.hasClass('main-item')){//那是主图文消息
    	$('.img-box').children('img').css('display','block').attr('src',data.url);
    }else if(nowEditItem.hasClass('small-item')){
    	nowEditItem.find('.deposi-img').show().attr('src',data.url);
    }
    $('.up-load-img').css('display','block').children('img').attr('src',data.url);//右手边编辑区显示对应图片
    //隐藏错误操作提示信息
	$('.img-limit').hide();
  });
  return false;
});
//点击“上传图片”-----end